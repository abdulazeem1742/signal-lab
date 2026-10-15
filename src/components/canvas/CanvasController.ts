import type { CanvasMode } from "@/types";
import {
  createParticles,
  flowAngle,
  getParticleCount,
  resizeParticles,
  type Particle,
} from "@/components/canvas/ParticleSystem";
import {
  bindMouseInteraction,
  createMouseState,
  updateMouseLerp,
  type MouseState,
} from "@/components/canvas/MouseInteraction";
import {
  getSectionState,
  MODE_PRESETS,
  subscribeSectionState,
  type ModePreset,
  type SectionState,
} from "@/components/canvas/SectionState";

interface ControllerOptions {
  canvas: HTMLCanvasElement;
  reducedMotion: boolean;
}

interface Runtime {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  dpr: number;
  particles: Particle[];
  mouse: MouseState;
  section: SectionState;
  raf: number;
  disposed: boolean;
  time: number;
  /** Smoothly interpolated preset toward target section */
  blend: ModePreset;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseAccent(): { r: number; g: number; b: number } {
  const raw =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim() || "#e8ff47";

  if (raw.startsWith("#")) {
    const hex = raw.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    return {
      r: parseInt(full.slice(0, 2), 16),
      g: parseInt(full.slice(2, 4), 16),
      b: parseInt(full.slice(4, 6), 16),
    };
  }

  return { r: 232, g: 255, b: 71 };
}

function targetForShape(
  shape: ModePreset["shape"],
  index: number,
  total: number,
  width: number,
  height: number,
  time: number,
  particle: Particle,
): { x: number; y: number } {
  const cx = width * 0.5;
  const cy = height * 0.5;

  switch (shape) {
    case "orbit": {
      const rings = 4;
      const ring = index % rings;
      const inRing = Math.floor(index / rings);
      const countInRing = Math.max(8, Math.ceil(total / rings));
      const radius = Math.min(width, height) * (0.14 + ring * 0.1);
      const angle =
        (inRing / countInRing) * Math.PI * 2 + time * (0.12 - ring * 0.02);
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius * 0.62,
      };
    }
    case "lattice": {
      const cols = Math.ceil(Math.sqrt(total * (width / height)));
      const rows = Math.ceil(total / cols);
      const col = index % cols;
      const row = Math.floor(index / cols);
      return {
        x: ((col + 0.5) / cols) * width,
        y: ((row + 0.5) / rows) * height,
      };
    }
    case "wave": {
      const t = index / total;
      const x = t * width;
      const y =
        cy +
        Math.sin(t * Math.PI * 4 + time * 0.7) * height * 0.18 +
        (particle.depth - 0.5) * height * 0.12;
      return { x, y };
    }
    case "path": {
      const t = (index / total + time * 0.03) % 1;
      const x = width * 0.1 + t * width * 0.8;
      const y =
        height * 0.25 +
        Math.sin(t * Math.PI * 2) * height * 0.28 +
        (index % 5) * 12;
      return { x, y };
    }
    case "constellation": {
      const clusters = 5;
      const cluster = index % clusters;
      const angle = (cluster / clusters) * Math.PI * 2 + time * 0.05;
      const radius = Math.min(width, height) * 0.28;
      const bx = cx + Math.cos(angle) * radius;
      const by = cy + Math.sin(angle) * radius * 0.7;
      return {
        x: bx + (particle.ox % 80) - 40,
        y: by + (particle.oy % 80) - 40,
      };
    }
    case "calm": {
      const angle = (index / total) * Math.PI * 2 + time * 0.08;
      const radius = Math.min(width, height) * (0.2 + particle.depth * 0.12);
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius * 0.55,
      };
    }
    case "flow":
    default:
      return { x: particle.ox, y: particle.oy };
  }
}

export class CanvasController {
  private runtime: Runtime | null = null;
  private unbindMouse: (() => void) | null = null;
  private unsubSection: (() => void) | null = null;
  private reducedMotion: boolean;
  private accent = { r: 232, g: 255, b: 71 };

  constructor(options: ControllerOptions) {
    this.reducedMotion = options.reducedMotion;
    const ctx = options.canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const initial = MODE_PRESETS.hero;
    this.runtime = {
      ctx,
      width: 0,
      height: 0,
      dpr: 1,
      particles: [],
      mouse: createMouseState(),
      section: getSectionState(),
      raf: 0,
      disposed: false,
      time: 0,
      blend: { ...initial },
    };

    this.accent = parseAccent();
    this.unbindMouse = bindMouseInteraction(this.runtime.mouse);
    this.unsubSection = subscribeSectionState((state) => {
      if (this.runtime) this.runtime.section = state;
    });

    this.resize(options.canvas);
    this.loop();
  }

  resize(canvas: HTMLCanvasElement) {
    if (!this.runtime) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = this.reducedMotion
      ? Math.floor(getParticleCount(width) * 0.3)
      : getParticleCount(width);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    this.runtime.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.runtime.width = width;
    this.runtime.height = height;
    this.runtime.dpr = dpr;
    this.runtime.particles =
      this.runtime.particles.length === 0
        ? createParticles(count, width, height)
        : resizeParticles(this.runtime.particles, width, height, count);

    this.accent = parseAccent();
  }

  private loop() {
    if (!this.runtime || this.runtime.disposed) return;

    const tick = (now: number) => {
      if (!this.runtime || this.runtime.disposed) return;
      this.runtime.time = now * 0.001;
      this.draw();
      this.runtime.raf = requestAnimationFrame(tick);
    };

    this.runtime.raf = requestAnimationFrame(tick);
  }

  private blendToward(target: ModePreset, amount: number) {
    if (!this.runtime) return;
    const b = this.runtime.blend;
    b.speed = lerp(b.speed, target.speed, amount);
    b.connectDistance = lerp(b.connectDistance, target.connectDistance, amount);
    b.organization = lerp(b.organization, target.organization, amount);
    b.opacity = lerp(b.opacity, target.opacity, amount);
    b.mouseForce = lerp(b.mouseForce, target.mouseForce, amount);
    b.trail = lerp(b.trail, target.trail, amount);
    b.glow = lerp(b.glow, target.glow, amount);
    b.connect = target.connect;
    b.shape = target.shape;
  }

  private draw() {
    const runtime = this.runtime;
    if (!runtime) return;

    const { ctx, width, height, particles, mouse, section, time, blend } =
      runtime;
    const target =
      MODE_PRESETS[section.mode as CanvasMode] ?? MODE_PRESETS.hero;

    this.blendToward(target, 0.045);
    updateMouseLerp(mouse, 0.1);

    // Soft trail fade — creates luminous motion streaks
    const fade = this.reducedMotion ? 1 : clamp(blend.trail, 0.12, 0.45);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgba(6, 7, 8, ${fade})`;
    ctx.fillRect(0, 0, width, height);

    const { r, g, b } = this.accent;
    const motionScale = this.reducedMotion ? 0.15 : 1;

    // Cursor aura
    if (mouse.active && blend.mouseForce > 0.15 && !this.reducedMotion) {
      const radius = 120 + blend.mouseForce * 40;
      const aura = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        radius,
      );
      aura.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.12 * blend.glow})`);
      aura.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${0.04 * blend.glow})`);
      aura.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Physics + draw particles
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const depthSpeed = 0.45 + p.depth * 0.9;

      if (blend.shape === "flow" || blend.organization < 0.2) {
        const angle = flowAngle(p.x, p.y, time);
        p.vx += Math.cos(angle) * 0.035 * blend.speed * depthSpeed;
        p.vy += Math.sin(angle) * 0.035 * blend.speed * depthSpeed;
      }

      if (blend.organization > 0.05) {
        const targetPos = targetForShape(
          blend.shape,
          i,
          particles.length,
          width,
          height,
          time,
          p,
        );
        p.vx += (targetPos.x - p.x) * 0.012 * blend.organization;
        p.vy += (targetPos.y - p.y) * 0.012 * blend.organization;
      }

      // Soft noise drift
      p.vx += Math.sin(time * 0.7 + p.phase) * 0.008 * blend.speed;
      p.vy += Math.cos(time * 0.55 + p.phase * 1.3) * 0.008 * blend.speed;

      // Mouse — attract hubs, repel fine dust (readable interaction)
      if (mouse.active && blend.mouseForce > 0) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 1;
        const radius = 160 + blend.mouseForce * 30;
        if (dist < radius) {
          const strength = ((radius - dist) / radius) * blend.mouseForce;
          if (p.hub) {
            p.vx -= (dx / dist) * strength * 0.06;
            p.vy -= (dy / dist) * strength * 0.06;
          } else {
            p.vx += (dx / dist) * strength * 0.05;
            p.vy += (dy / dist) * strength * 0.05;
          }
        }
      }

      p.vx *= 0.94;
      p.vy *= 0.94;
      p.x += p.vx * motionScale;
      p.y += p.vy * motionScale;

      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;

      const pulse = 0.7 + Math.sin(time * 2.2 + p.phase) * 0.3;
      const alpha =
        blend.opacity *
        p.life *
        (0.35 + p.depth * 0.65) *
        (p.hub ? 1 : 0.75) *
        pulse;

      // Glow for hubs
      if (p.hub && blend.glow > 0.3 && !this.reducedMotion) {
        const glowR = p.size * (6 + blend.glow * 4);
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`);
        glow.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${alpha * 0.12})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (p.hub ? 1.15 : 1), 0, Math.PI * 2);
      ctx.fill();
    }

    // Network links — hub-biased for a cleaner constellation look
    if (blend.connect && blend.connectDistance > 0 && !this.reducedMotion) {
      const maxDist = blend.connectDistance;
      const maxDistSq = maxDist * maxDist;
      const hubs = particles.filter((p) => p.hub);
      const linkBudget = width < 768 ? 70 : width < 1200 ? 120 : 160;
      let links = 0;

      ctx.lineWidth = 0.7;
      ctx.lineCap = "round";

      // Hub-to-nearby connections first (high visual value)
      for (const hub of hubs) {
        for (let j = 0; j < particles.length; j += 1) {
          if (links >= linkBudget) break;
          const other = particles[j];
          if (other === hub) continue;
          const dx = hub.x - other.x;
          const dy = hub.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= maxDistSq) continue;
          const dist = Math.sqrt(distSq);
          const a =
            (1 - dist / maxDist) * blend.opacity * (other.hub ? 0.45 : 0.22);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.beginPath();
          ctx.moveTo(hub.x, hub.y);
          ctx.lineTo(other.x, other.y);
          ctx.stroke();
          links += 1;
        }
      }

      // Sparse secondary mesh among nearby non-hubs
      const step = Math.max(2, Math.floor(particles.length / 90));
      for (let i = 0; i < particles.length && links < linkBudget; i += step) {
        const a = particles[i];
        for (let j = i + step; j < particles.length; j += step) {
          if (links >= linkBudget) break;
          const c = particles[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= maxDistSq * 0.55) continue;
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / (maxDist * 0.75)) * blend.opacity * 0.12;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(c.x, c.y);
          ctx.stroke();
          links += 1;
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  dispose() {
    if (!this.runtime) return;
    this.runtime.disposed = true;
    cancelAnimationFrame(this.runtime.raf);
    this.unbindMouse?.();
    this.unsubSection?.();
    this.runtime = null;
  }
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  size: number;
  /** 0–1 depth layer — larger / brighter when closer */
  depth: number;
  /** Phase offset for shimmer / pulse */
  phase: number;
  /** Hub particles get glow + stronger connections */
  hub: boolean;
  life: number;
}

export function createParticles(
  count: number,
  width: number,
  height: number,
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i += 1) {
    const depth = Math.random();
    const hub = Math.random() > 0.92;
    const x = Math.random() * width;
    const y = Math.random() * height;
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      ox: x,
      oy: y,
      size: hub
        ? 2.2 + Math.random() * 2.4
        : 0.6 + depth * 1.8 + Math.random() * 0.6,
      depth,
      phase: Math.random() * Math.PI * 2,
      hub,
      life: 0.55 + Math.random() * 0.45,
    });
  }
  return particles;
}

export function getParticleCount(width: number): number {
  if (width < 640) return 160;
  if (width < 1024) return 380;
  if (width < 1440) return 620;
  return 820;
}

export function resizeParticles(
  particles: Particle[],
  width: number,
  height: number,
  targetCount: number,
): Particle[] {
  if (particles.length === targetCount) {
    for (const particle of particles) {
      particle.x = Math.min(Math.max(particle.x, 0), width);
      particle.y = Math.min(Math.max(particle.y, 0), height);
      particle.ox = Math.min(Math.max(particle.ox, 0), width);
      particle.oy = Math.min(Math.max(particle.oy, 0), height);
    }
    return particles;
  }
  return createParticles(targetCount, width, height);
}

/** Cheap value noise — enough for organic flow without a noise library */
export function flowAngle(x: number, y: number, time: number): number {
  const s = 0.0018;
  const n =
    Math.sin(x * s + time * 0.18) * Math.cos(y * s * 1.3 - time * 0.12) +
    Math.sin((x + y) * s * 0.7 + time * 0.08) * 0.5;
  return n * Math.PI * 2;
}

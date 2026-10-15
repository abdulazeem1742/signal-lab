export interface MouseState {
  x: number;
  y: number;
  tx: number;
  ty: number;
  active: boolean;
}

export function createMouseState(): MouseState {
  return { x: 0, y: 0, tx: 0, ty: 0, active: false };
}

export function updateMouseLerp(mouse: MouseState, ease = 0.08) {
  mouse.x += (mouse.tx - mouse.x) * ease;
  mouse.y += (mouse.ty - mouse.y) * ease;
}

/** Track pointer on window so the canvas can stay pointer-events: none. */
export function bindMouseInteraction(mouse: MouseState): () => void {
  const onMove = (event: PointerEvent) => {
    mouse.tx = event.clientX;
    mouse.ty = event.clientY;
    mouse.active = true;
  };

  const onLeave = () => {
    mouse.active = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerleave", onLeave);

  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerleave", onLeave);
  };
}

"use client";

import { useEffect, useRef } from "react";
import { CanvasController } from "@/components/canvas/CanvasController";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useMediaQuery";

/**
 * Fixed full-viewport particle field. HTML content stays above.
 * Complexity scales down on mobile and when reduced motion is preferred.
 */
export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<CanvasController | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (reducedMotion && isMobile) {
      return;
    }

    const controller = new CanvasController({
      canvas,
      reducedMotion,
    });
    controllerRef.current = controller;

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => controller.resize(canvas));
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      controller.dispose();
      controllerRef.current = null;
    };
  }, [reducedMotion, isMobile]);

  if (reducedMotion && isMobile) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[var(--z-canvas)] h-dvh w-screen"
    />
  );
}

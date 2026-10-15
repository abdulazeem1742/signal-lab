"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface ScrollProgressProps {
  className?: string;
}

/**
 * Thin top progress bar driven by scroll ratio.
 * Updates transform via ref — no React re-renders on scroll.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max > 0 ? doc.scrollTop / max : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${next})`;
      }
      if (trackRef.current) {
        trackRef.current.setAttribute(
          "aria-valuenow",
          String(Math.round(next * 100)),
        );
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[var(--z-overlay)] h-[2px] bg-transparent",
        className,
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-label="Reading progress"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

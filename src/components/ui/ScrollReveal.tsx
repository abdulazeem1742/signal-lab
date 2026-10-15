"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** y offset in px */
  y?: number;
  delay?: number;
  start?: string;
}

/**
 * GSAP ScrollTrigger entrance. Prefer over Framer for section-level reveals
 * so one library owns scroll-linked motion.
 */
export function ScrollReveal({
  children,
  className,
  y = 40,
  delay = 0,
  start = "top 88%",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    registerGsapPlugins();

    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: "play none none none",
          },
        },
      );
    }, element);

    return () => ctx.revert();
  }, [reducedMotion, y, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

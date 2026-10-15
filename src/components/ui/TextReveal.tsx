"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Visual display only — parent should own semantic heading tags */
  as?: "div" | "span";
  delay?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  className,
  as = "div",
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    if (as === "span") {
      return <span className={className}>{children}</span>;
    }
    return <div className={className}>{children}</div>;
  }

  if (as === "span") {
    return (
      <motion.span
        ref={ref as unknown as React.RefObject<HTMLSpanElement>}
        className={cn("will-change-transform", className)}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

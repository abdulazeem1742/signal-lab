"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Stagger between words in seconds */
  stagger?: number;
  once?: boolean;
}

/**
 * Word-level reveal. Prefer this over character splits for readability
 * and reduced DOM cost.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: 0.65,
              delay: delay + index * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : null}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

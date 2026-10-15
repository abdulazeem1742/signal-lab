"use client";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: "slow" | "base" | "fast";
  separator?: string;
}

const speedDuration = {
  slow: "60s",
  base: "40s",
  fast: "24s",
} as const;

export function Marquee({
  items,
  className,
  speed = "base",
  separator = "·",
}: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion();
  const content = items.join(`  ${separator}  `);

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-border py-5",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max whitespace-nowrap font-display text-2xl md:text-3xl font-bold tracking-tight text-muted",
          !reducedMotion && "animate-marquee",
        )}
        style={
          reducedMotion
            ? undefined
            : ({
                ["--marquee-duration" as string]: speedDuration[speed],
              } as React.CSSProperties)
        }
      >
        <span className="px-6">{content}</span>
        <span className="px-6" aria-hidden>
          {content}
        </span>
      </div>
    </div>
  );
}

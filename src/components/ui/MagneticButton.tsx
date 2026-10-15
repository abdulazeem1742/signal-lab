"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";
import type { ButtonSize, ButtonVariant } from "@/types";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MagneticButtonBaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  strength?: number;
}

interface MagneticAsButton extends MagneticButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface MagneticAsLink extends MagneticButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: undefined;
  external?: boolean;
}

type MagneticButtonProps = MagneticAsButton | MagneticAsLink;

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-[#0a0b0d] hover:brightness-110 active:brightness-95 [&_svg]:text-[#0a0b0d]",
  secondary:
    "border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/5",
  ghost: "bg-transparent text-foreground hover:bg-foreground/5",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-small gap-2",
  md: "h-12 px-6 text-small gap-2.5",
  lg: "h-14 px-8 text-body gap-3",
};

export function MagneticButton(props: MagneticButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    strength = 0.35,
  } = props;

  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  const classes = cn(
    "inline-flex items-center justify-center font-medium tracking-wide",
    "transition-[filter,background-color,border-color,color] duration-300 ease-out-expo",
    "rounded-none will-change-transform",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (props.href) {
    const external = "external" in props && props.external;
    return (
      <motion.div style={{ x: springX, y: springY }} className="inline-flex">
        <Link
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={props.href}
          className={classes}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={props.type ?? "button"}
      className={classes}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={props.onClick}
    >
      {children}
    </motion.button>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonSize, ButtonVariant } from "@/types";

interface ButtonBaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  type?: undefined;
  onClick?: undefined;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

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

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    disabled = false,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center font-medium tracking-wide",
    "transition-[filter,background-color,border-color,color,transform] duration-300 ease-out-expo",
    "disabled:pointer-events-none disabled:opacity-40",
    "rounded-none",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  if (props.href) {
    const external = "external" in props && props.external;
    return (
      <Link
        href={props.href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      className={classes}
      disabled={disabled}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}

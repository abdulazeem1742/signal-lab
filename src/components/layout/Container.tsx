import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav";
  width?: "default" | "wide" | "narrow" | "full";
}

const widthClass = {
  default: "container-site",
  wide: "container-wide",
  narrow: "container-narrow",
  full: "w-full px-[var(--gutter)]",
} as const;

export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return <Tag className={cn(widthClass[width], className)}>{children}</Tag>;
}

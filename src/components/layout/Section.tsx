import { cn } from "@/lib/cn";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div" | "article";
  /** Associates section with canvas mode via data attribute */
  canvasMode?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

export function Section({
  children,
  id,
  className,
  as: Tag = "section",
  canvasMode,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("section-padding relative", className)}
      data-canvas-mode={canvasMode}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}

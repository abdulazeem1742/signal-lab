import type { Project } from "@/types";
import { cn } from "@/lib/cn";

interface ProjectPreviewProps {
  project: Project;
  className?: string;
  active?: boolean;
}

/**
 * Large editorial visual for a project. Used in detail pages and
 * immersive work transitions — intentionally not a card.
 */
export function ProjectPreview({
  project,
  className,
  active = true,
}: ProjectPreviewProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden bg-surface transition-opacity duration-500",
        active ? "opacity-100" : "opacity-40",
        className,
      )}
      style={{
        background: `linear-gradient(145deg, ${project.accent}28 0%, transparent 52%),
          radial-gradient(circle at 80% 20%, ${project.accent}18, transparent 40%),
          var(--surface)`,
      }}
      role="img"
      aria-label={`${project.title} preview`}
    >
      <div className="absolute inset-0 flex items-end justify-between p-6 md:p-10">
        <span
          className="font-display text-6xl md:text-8xl font-bold tracking-tight opacity-30"
          style={{ color: project.accent }}
          aria-hidden
        >
          {project.number}
        </span>
        <span className="text-caption text-muted-foreground">{project.year}</span>
      </div>
    </div>
  );
}

import type { Project } from "@/types";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col gap-5 border-t border-border pt-8",
        className,
      )}
    >
      <div
        className="aspect-[16/10] bg-surface"
        style={{
          background: `linear-gradient(145deg, ${project.accent}22 0%, transparent 55%), var(--surface)`,
        }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-caption text-accent mb-2">{project.category}</p>
          <h3 className="font-display text-2xl font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          className="mt-1 size-5 shrink-0 text-muted group-hover:text-accent transition-colors duration-300"
          aria-hidden
        />
      </div>
    </Link>
  );
}

"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hover language: media zoom + soft sheen sweep — no card lift.
 */
export function Work() {
  const listRef = useRef<HTMLUListElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !listRef.current) return;
    registerGsapPlugins();

    const items =
      listRef.current.querySelectorAll<HTMLElement>("[data-project-item]");
    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        const fromX = index % 2 === 0 ? -64 : 64;
        gsap.fromTo(
          item,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 1.05,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, listRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Section
      id={SECTION_IDS.work}
      canvasMode="work"
      aria-labelledby="work-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects that earned their place."
          description="A cross-section of platforms, products, and brand systems — each shaped for a specific ambition."
          titleId="work-heading"
          className="mb-14 md:mb-20"
        />

        <ul ref={listRef} className="flex flex-col">
          {projects.map((project, index) => (
            <li key={project.slug} data-project-item>
              <Link
                href={`/work/${project.slug}`}
                className={cn(
                  "group grid gap-6 border-t border-border py-10 md:grid-cols-12 md:gap-8 md:py-14",
                  "focus-visible:outline-offset-[-2px]",
                  index === projects.length - 1 && "border-b",
                )}
              >
                <div className="flex items-baseline justify-between md:col-span-2 md:block">
                  <span className="text-caption text-muted transition-colors duration-700 group-hover:text-accent">
                    {project.number}
                  </span>
                  <span className="text-caption text-muted md:mt-3 md:block">
                    {project.year}
                  </span>
                </div>

                <div className="md:col-span-5">
                  <div className="relative mb-2 aspect-[16/10] w-full overflow-hidden bg-surface">
                    <div
                      className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(145deg, ${project.accent}30 0%, transparent 55%), var(--surface)`,
                      }}
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full"
                      aria-hidden
                    />
                    <div className="relative flex h-full items-end p-5 md:p-6">
                      <span
                        className="font-display text-4xl md:text-5xl font-bold tracking-tight opacity-35 transition-opacity duration-700 group-hover:opacity-75"
                        style={{ color: project.accent }}
                      >
                        {project.title.slice(0, 1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 md:col-span-5">
                  <div>
                    <p className="text-caption text-accent mb-3">
                      {project.category}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-700 group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-small text-muted-foreground text-pretty max-w-md">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <ul className="flex flex-wrap gap-x-3 gap-y-1">
                      {project.technologies.map((tech) => (
                        <li key={tech} className="text-caption text-muted">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex size-10 shrink-0 items-center justify-center border border-border text-foreground transition-[background-color,border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-accent group-hover:bg-accent group-hover:text-[#0a0b0d] group-hover:[&_svg]:text-[#0a0b0d]">
                      <ArrowUpRight
                        className="size-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                      <span className="sr-only">View {project.title}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

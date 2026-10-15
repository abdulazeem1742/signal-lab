"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities } from "@/data/capabilities";
import { SECTION_IDS } from "@/lib/constants";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hover language: accent rail wipe + title tracking — no vertical lift
 * (avoids fighting GSAP transforms).
 */
export function Capabilities() {
  const listRef = useRef<HTMLUListElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !listRef.current) return;
    registerGsapPlugins();

    const rows =
      listRef.current.querySelectorAll<HTMLElement>("[data-capability]");
    const ctx = gsap.context(() => {
      rows.forEach((row, index) => {
        const fromX = index % 2 === 0 ? -48 : 48;
        gsap.fromTo(
          row,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: row,
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
      id={SECTION_IDS.capabilities}
      canvasMode="capabilities"
      aria-labelledby="capabilities-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="What we shape."
          description="Four disciplines. One standard — experiences that feel inevitable."
          titleId="capabilities-heading"
          className="mb-14 md:mb-20"
        />

        <ul ref={listRef} className="grid gap-0 border-t border-border">
          {capabilities.map((capability, index) => (
            <li key={capability.id} data-capability>
              <article className="group relative grid gap-4 overflow-hidden border-b border-border py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  aria-hidden
                />

                <span className="pl-0 text-caption text-muted transition-colors duration-700 group-hover:text-accent md:col-span-1 md:pl-3">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-4 md:pl-2">
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight transition-[letter-spacing,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:tracking-[0.02em] group-hover:text-accent">
                    {capability.title}
                  </h3>
                </div>

                <div className="md:col-span-4">
                  <p className="text-small text-muted-foreground text-pretty max-w-md transition-opacity duration-700 group-hover:opacity-100 opacity-80">
                    {capability.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-3 md:justify-end">
                  {capability.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-caption text-muted transition-colors duration-700 group-hover:text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                  <ArrowUpRight
                    className="ml-auto size-4 shrink-0 text-accent opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 -translate-x-2 md:ml-2"
                    aria-hidden
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

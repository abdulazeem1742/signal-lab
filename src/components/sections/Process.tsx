"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import { SECTION_IDS } from "@/lib/constants";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hover language: soft fill rise from bottom + number invert — no lift.
 */
export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !listRef.current) return;
    registerGsapPlugins();

    const steps =
      listRef.current.querySelectorAll<HTMLElement>("[data-process-step]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        steps,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        },
      );
    }, listRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Section
      id={SECTION_IDS.process}
      canvasMode="process"
      aria-labelledby="process-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="From idea to system."
          description="A clear path. No theatre. Each stage exists to reduce risk and raise the standard."
          titleId="process-heading"
          className="mb-14 md:mb-20"
        />

        <ol
          ref={listRef}
          className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4"
        >
          {processSteps.map((step) => (
            <li key={step.id} data-process-step>
              <article className="group relative flex h-full flex-col overflow-hidden border border-border p-5 md:p-6">
                <span
                  className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-accent/[0.07] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  aria-hidden
                />

                <span className="relative mb-8 inline-flex size-9 items-center justify-center border border-border text-caption text-accent transition-[background-color,border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-accent group-hover:bg-accent group-hover:text-[#0a0b0d]">
                  {step.number}
                </span>

                <h3 className="relative font-display text-2xl md:text-3xl font-bold tracking-tight mb-4 transition-colors duration-700 group-hover:text-accent">
                  {step.title}
                </h3>
                <p className="relative mt-auto text-small text-muted-foreground text-pretty transition-colors duration-700 group-hover:text-foreground/75">
                  {step.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

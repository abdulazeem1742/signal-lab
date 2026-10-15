"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { aboutContent } from "@/data/about";
import { SECTION_IDS } from "@/lib/constants";

/**
 * Hover language: number glow + underline — stats stay grounded.
 */
export function About() {
  return (
    <Section
      id={SECTION_IDS.about}
      canvasMode="about"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <Badge className="mb-6">{aboutContent.eyebrow}</Badge>
              <h2 id="about-heading" className="text-heading text-balance">
                {aboutContent.headline}
              </h2>
            </ScrollReveal>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7">
            {aboutContent.body.map((paragraph, index) => (
              <ScrollReveal key={paragraph} delay={0.08 * (index + 1)}>
                <p className="text-subheading text-muted-foreground text-pretty font-normal tracking-normal">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-10 border-t border-border pt-10 sm:grid-cols-3 md:mt-20">
          {aboutContent.stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={0.1 * index}>
              <li className="group">
                <p className="font-display text-5xl md:text-6xl font-bold tracking-tight text-accent transition-[text-shadow,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:drop-shadow-[0_0_24px_rgba(232,255,71,0.35)]">
                  {stat.value}
                </p>
                <p className="mt-3 text-caption text-muted">
                  <span className="relative inline-block">
                    {stat.label}
                    <span
                      className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                      aria-hidden
                    />
                  </span>
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

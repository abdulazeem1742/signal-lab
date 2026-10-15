"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/ui/TextReveal";
import { SECTION_IDS } from "@/lib/constants";

const lines = [
  { text: "We believe the web is still", muted: false },
  { text: "capable of wonder —", muted: true },
  { text: "when craft meets intention,", muted: false },
  { text: "and every motion earns", muted: true },
  { text: "its place.", muted: false },
];

const pillars = [
  {
    title: "Clarity first",
    body: "If the idea isn’t clear, no amount of motion will save it.",
  },
  {
    title: "Motion with purpose",
    body: "Animation should guide, reveal, and reward — never decorate.",
  },
  {
    title: "Built to last",
    body: "Performance, accessibility, and maintainability are design decisions.",
  },
];

/**
 * Hover language: top rule draws in — quiet, editorial.
 */
export function Manifesto() {
  return (
    <Section
      id={SECTION_IDS.manifesto}
      canvasMode="manifesto"
      aria-labelledby="manifesto-heading"
    >
      <Container>
        <TextReveal>
          <Badge className="mb-8">Philosophy</Badge>
        </TextReveal>

        <h2 id="manifesto-heading" className="sr-only">
          Company philosophy
        </h2>

        <blockquote className="max-w-5xl">
          {lines.map((line, index) => (
            <TextReveal key={line.text} delay={0.08 * index}>
              <p
                className={
                  line.muted
                    ? "text-heading text-muted-foreground"
                    : "text-heading"
                }
              >
                {line.text}
              </p>
            </TextReveal>
          ))}
        </blockquote>

        <div className="mt-16 grid gap-8 border-t border-border pt-10 md:grid-cols-3 md:gap-10">
          {pillars.map((item, index) => (
            <TextReveal key={item.title} delay={0.1 * index}>
              <div className="group relative pt-5">
                <span
                  className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12"
                  aria-hidden
                />
                <h3 className="font-display text-lg font-semibold tracking-tight mb-3 transition-colors duration-700 group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="text-small text-muted-foreground text-pretty transition-colors duration-700 group-hover:text-foreground/70">
                  {item.body}
                </p>
              </div>
            </TextReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

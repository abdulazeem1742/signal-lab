"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { SECTION_IDS } from "@/lib/constants";

export function Hero() {
  return (
    <Section
      id={SECTION_IDS.hero}
      canvasMode="hero"
      className="flex min-h-dvh flex-col !py-0"
      aria-label="Introduction"
    >
      <Container className="flex flex-1 flex-col justify-center gap-10 py-[calc(var(--nav-height)+1.5rem)] md:gap-12 md:py-[calc(var(--nav-height)+2.5rem)]">
        <div className="max-w-5xl">
          <TextReveal>
            <p className="text-caption text-accent mb-5 md:mb-7">
              Digital studio · Est. 2018
            </p>
          </TextReveal>

          <h1 className="font-display font-bold tracking-[-0.04em] leading-[0.92] text-[clamp(2.5rem,7.5vw,6.25rem)]">
            <TextReveal as="span" className="block" delay={0.05}>
              We build
            </TextReveal>
            <TextReveal
              as="span"
              className="block text-muted-foreground"
              delay={0.12}
            >
              digital
            </TextReveal>
            <TextReveal as="span" className="block" delay={0.19}>
              experiences
            </TextReveal>
            <TextReveal as="span" className="block" delay={0.26}>
              that <span className="text-accent">move.</span>
            </TextReveal>
          </h1>
        </div>

        <div className="grid max-w-5xl gap-8 border-t border-border pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10 md:pt-10">
          <TextReveal delay={0.35}>
            <p className="text-body text-muted-foreground text-pretty max-w-md">
              Signal crafts immersive web platforms, product interfaces, and
              brand systems for companies who measure design by impact — not
              decoration.
            </p>
          </TextReveal>

          <TextReveal delay={0.45}>
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href="#work" variant="primary" size="md">
                View work
                <ArrowUpRight className="size-4" aria-hidden />
              </MagneticButton>
              <MagneticButton href="#contact" variant="secondary" size="md">
                Start a project
              </MagneticButton>
            </div>
          </TextReveal>
        </div>

        <TextReveal delay={0.55}>
          <div className="mt-auto flex items-center justify-between pt-4 md:pt-6">
            <p className="text-caption text-muted">Scroll to explore</p>
            <a
              href="#manifesto"
              className="inline-flex items-center gap-2 text-caption text-muted-foreground transition-colors duration-500 hover:text-foreground"
              aria-label="Scroll to manifesto"
            >
              <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden />
              Manifesto
            </a>
          </div>
        </TextReveal>
      </Container>
    </Section>
  );
}

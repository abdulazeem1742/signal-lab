import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { aboutContent } from "@/data/about";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE.legalName} and how we bring digital experiences to life.`,
};

export default function AboutPage() {
  return (
    <SitePageLayout>
      <article className="py-section">
        <Container>
          <header className="grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <Badge className="mb-6">{aboutContent.eyebrow}</Badge>
                <h1 className="text-hero max-w-5xl text-balance">
                  {aboutContent.headline}
                </h1>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={0.1}>
                <p className="text-subheading text-muted-foreground text-pretty">
                  {aboutContent.body[0]}
                </p>
              </ScrollReveal>
            </div>
          </header>

          <section
            className="mt-20 grid gap-10 border-t border-border pt-10 md:mt-28 md:grid-cols-12 md:gap-8"
            aria-label="How we work"
          >
            <div className="md:col-span-4">
              <ScrollReveal>
                <p className="text-caption text-accent">Our point of view</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight">
                  Intentional by design.
                </h2>
              </ScrollReveal>
            </div>
            <div className="flex flex-col gap-6 md:col-span-7 md:col-start-6">
              {aboutContent.body.slice(1).map((paragraph, index) => (
                <ScrollReveal key={paragraph} delay={0.08 * (index + 1)}>
                  <p className="text-subheading text-muted-foreground text-pretty font-normal">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.16}>
                <p className="text-subheading text-muted-foreground text-pretty font-normal">
                  From the first conversation through launch, we bring strategy,
                  design, and engineering together to make digital work with
                  clarity and character.
                </p>
              </ScrollReveal>
            </div>
          </section>

          <ul className="mt-16 grid gap-10 border-t border-border pt-10 sm:grid-cols-3 md:mt-20">
            {aboutContent.stats.map((stat, index) => (
              <li key={stat.label}>
                <ScrollReveal delay={0.1 * index}>
                  <p className="font-display text-5xl font-bold tracking-tight text-accent md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-caption text-muted">{stat.label}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>

          <div className="mt-20 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-subheading text-muted-foreground">
              Have something ambitious in mind?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-small text-accent transition-colors hover:text-foreground"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </article>
    </SitePageLayout>
  );
}

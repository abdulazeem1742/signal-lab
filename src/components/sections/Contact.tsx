"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { TextReveal } from "@/components/ui/TextReveal";
import { SECTION_IDS } from "@/lib/constants";

export function Contact() {
  return (
    <Section
      id={SECTION_IDS.contact}
      canvasMode="contact"
      aria-labelledby="contact-heading"
      className="pb-[clamp(4rem,10vw,7rem)]"
    >
      <Container>
        <div className="grid gap-12 border-t border-border pt-16 md:pt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <TextReveal>
              <p className="text-caption text-accent mb-8">Have an idea?</p>
              <h2 id="contact-heading" className="text-display max-w-5xl">
                Let&apos;s build <span className="text-accent">it.</span>
              </h2>
              <p className="mt-8 max-w-md text-body text-muted-foreground text-pretty">
                Tell us about the problem you&apos;re solving. We&apos;ll tell
                you honestly whether we&apos;re the right studio to solve it.
              </p>
            </TextReveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}

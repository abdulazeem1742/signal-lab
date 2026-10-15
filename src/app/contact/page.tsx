import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { SitePageLayout } from "@/components/layout/SitePageLayout";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell Signal about your next digital project.",
};

export default function ContactPage() {
  return (
    <SitePageLayout>
      <section aria-labelledby="contact-page-heading" className="py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="mb-6 text-caption text-accent">Have an idea?</p>
              <h1 id="contact-page-heading" className="text-display text-balance">
                Let&apos;s build <span className="text-accent">it.</span>
              </h1>
              <p className="mt-8 max-w-md text-subheading text-muted-foreground text-pretty">
                Tell us what you&apos;re trying to make happen. We&apos;ll get
                back to you with a thoughtful next step.
              </p>
              <a
                className="mt-8 inline-flex items-center gap-2 text-small text-foreground hover:text-accent"
                href={`mailto:${SITE.email}`}
              >
                {SITE.email}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </SitePageLayout>
  );
}

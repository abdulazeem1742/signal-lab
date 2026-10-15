import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { footerNav, socialLinks } from "@/data/navigation";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border pb-10 pt-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-bold tracking-tight">
              {SITE.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-4 max-w-xs text-small text-muted-foreground text-pretty">
              {SITE.tagline} Crafted with intention for brands that refuse the
              ordinary.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-caption text-muted mb-4">Navigate</p>
            <ul className="flex flex-col gap-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-small text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-caption text-muted mb-4">Connect</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-small text-foreground hover:text-accent transition-colors duration-300"
                >
                  {SITE.email}
                </a>
              </li>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-muted">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-caption text-muted">{SITE.location}</p>
        </div>
      </Container>
    </footer>
  );
}

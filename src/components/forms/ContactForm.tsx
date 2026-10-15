"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const fieldClassName =
  "w-full border border-border bg-surface px-4 py-3 text-body text-foreground placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

export function ContactForm() {
  const [showPreviewNotice, setShowPreviewNotice] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowPreviewNotice(true);
  }

  return (
    <div>
      <form
        className="grid gap-5"
        onSubmit={handleSubmit}
        aria-describedby="contact-form-note"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-small text-muted-foreground">
            Name
            <input
              className={fieldClassName}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              required
            />
          </label>
          <label className="grid gap-2 text-small text-muted-foreground">
            Email
            <input
              className={fieldClassName}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
          </label>
        </div>

        <label className="grid gap-2 text-small text-muted-foreground">
          <span>
            Company <span className="text-muted">(optional)</span>
          </span>
          <input
            className={fieldClassName}
            type="text"
            name="company"
            autoComplete="organization"
            placeholder="Your company"
          />
        </label>

        <label className="grid gap-2 text-small text-muted-foreground">
          Tell us about your project
          <textarea
            className={`${fieldClassName} min-h-36 resize-y`}
            name="message"
            placeholder="What are you looking to build?"
            rows={5}
            required
          />
        </label>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg">
            Send inquiry
            <ArrowUpRight className="size-4" aria-hidden />
          </Button>
          <p id="contact-form-note" className="max-w-sm text-caption text-muted">
            Form preview only; messages aren&apos;t sent yet. Email us at{" "}
            <a
              className="text-foreground underline decoration-border underline-offset-4 hover:text-accent"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </form>

      {showPreviewNotice && (
        <p className="mt-4 text-small text-accent" role="status">
          No message was sent. Please email {SITE.email} directly.
        </p>
      )}
    </div>
  );
}

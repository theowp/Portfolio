"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { useMessages } from "@/context/MessagesContext";
import { withBasePath } from "@/lib/paths";
import { SITE } from "@/lib/site";

export function Footer() {
  const { locale, messages } = useMessages();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-foreground">{SITE.fullName}</p>
          <p className="mt-1 text-sm text-muted">{messages.footer.tagline}</p>
          <p className="mt-2 text-xs text-muted/80">
            © {year} {SITE.fullName}. {messages.footer.rights}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-foreground transition hover:border-gold/40 hover:text-gold"
          >
            <Mail className="h-4 w-4" />
            {SITE.email}
          </a>
          <Link
            href={withBasePath(`/${locale}/contact`)}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-foreground transition hover:bg-gold hover:text-background"
          >
            {messages.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}

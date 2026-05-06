import { Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { MotionSection } from "@/components/MotionSection";
import { getMessages, isLocale } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return { title: messages.contactPage.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const messages = getMessages(raw);
  const c = messages.contactPage;
  const common = messages.common;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <MotionSection>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 max-w-3xl rounded-lg border border-gold/25 bg-surface/60 p-4 text-sm leading-relaxed text-foreground/95 sm:text-base">
          {c.hook}
        </p>
      </MotionSection>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <MotionSection className="space-y-5">
          <div className="rounded-xl border border-border bg-surface/80 p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">
              {common.email}
            </h2>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-2 inline-flex items-center gap-2 text-sm text-foreground hover:text-gold"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {SITE.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:border-gold/40 hover:text-gold"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:border-gold/40 hover:text-gold"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </MotionSection>

        <MotionSection>
          <ContactForm />
        </MotionSection>
      </div>
    </div>
  );
}

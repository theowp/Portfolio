import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { ProfilePlaceholder } from "@/components/ProfilePlaceholder";
import { HeroScene } from "@/components/effects/HeroScene";
import { TypewriterHeadline } from "@/components/effects/TypewriterHeadline";
import { AnimatedStats, type StatItem } from "@/components/effects/AnimatedStats";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/paths";
import { SITE } from "@/lib/site";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const h = messages.home;

  const statItems: StatItem[] = [
    { kind: "number", end: 4, label: h.stats.experiences },
    { kind: "number", end: 2, label: h.stats.formations },
    { kind: "number", end: 12, label: h.stats.waterpolo },
    { kind: "text", value: h.stats.spActive, label: h.stats.sp },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <HeroScene>
        <MotionSection className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">
              {h.kicker}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {SITE.fullName}
            </h1>
            <TypewriterHeadline key={locale} phrases={h.typewriterPhrases} />
            <p className="mt-4 max-w-2xl text-lg text-muted sm:text-xl">{h.role}</p>
            <p className="mt-2 max-w-2xl text-sm text-foreground/85 sm:text-base">
              {h.degreeLine}
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-muted">
              <p>{h.rhythm}</p>
              <p className="inline-flex items-center gap-2 text-foreground/90">
                <MapPin className="h-4 w-4 text-gold" aria-hidden />
                {h.location}
              </p>
              <p className="inline-flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-foreground transition hover:text-gold"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {SITE.email}
                </a>
              </p>
              <p className="flex flex-wrap gap-3 pt-1 text-sm">
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  LinkedIn
                </a>
                <span className="text-border">|</span>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
                <span className="text-border">|</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-gold underline-offset-4 hover:underline"
                >
                  Email
                </a>
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withBasePath(`/${locale}/projects`)}
                className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-gold/90"
              >
                {h.ctaProjects}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={withBasePath(`/${locale}/contact`)}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-gold/40 hover:text-gold"
              >
                {h.ctaContact}
              </Link>
            </div>
          </div>
          <ProfilePlaceholder />
        </MotionSection>
      </HeroScene>

      <MotionSection className="mt-16">
        <AnimatedStats items={statItems} />
      </MotionSection>

      <MotionSection stagger className="mt-20 grid gap-6 md:grid-cols-3">
        {h.pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-xl border border-border bg-surface/80 p-5 shadow-sm shadow-black/15"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-gold/90">
              {pillar.subtitle}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>
          </div>
        ))}
      </MotionSection>
    </div>
  );
}

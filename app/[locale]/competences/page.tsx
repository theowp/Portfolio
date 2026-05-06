import {
  Award,
  Camera,
  Clapperboard,
  HeartPulse,
  Radio,
  Waves,
} from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { SkillGroupsAnimated } from "@/components/competences/SkillGroupsAnimated";
import type { SkillGroupKey } from "@/components/competences/SkillGroupsAnimated";
import { getMessages, isLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const groupKeys: SkillGroupKey[] = [
  "dataBi",
  "analytics",
  "nocode",
  "devIa",
  "soft",
];

const interestIcons = [Award, Waves, Radio, Camera, Clapperboard, HeartPulse];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return { title: messages.competencesPage.title };
}

export default async function CompetencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const messages = getMessages(raw);
  const c = messages.competencesPage;

  const groups = groupKeys.map((key) => ({
    key,
    title: c.groups[key],
    items: c.items[key],
    level: c.skillBarLevels[key],
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <MotionSection>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {c.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {c.intro}
        </p>
      </MotionSection>

      <SkillGroupsAnimated groups={groups} caption={c.skillBarCaption} />

      <MotionSection className="mt-14">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          {c.certificationsTitle}
        </h2>
        <ul className="mt-4 space-y-3">
          {c.certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-col gap-1 rounded-lg border border-border bg-surface/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-sm text-foreground">{cert.name}</span>
              <span className="text-xs font-semibold text-gold">{cert.year}</span>
            </li>
          ))}
        </ul>
      </MotionSection>

      <MotionSection className="mt-14">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          {c.interestsTitle}
        </h2>
        <MotionSection stagger className="mt-4 grid gap-3 sm:grid-cols-2">
          {c.interests.map((text, i) => {
            const Icon = interestIcons[i] ?? Award;
            return (
              <div
                key={text}
                className="flex items-start gap-3 rounded-lg border border-border bg-surface/70 p-4"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <span className="text-sm text-muted">{text}</span>
              </div>
            );
          })}
        </MotionSection>
      </MotionSection>
    </div>
  );
}

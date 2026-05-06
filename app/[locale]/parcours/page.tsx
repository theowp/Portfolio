import { MotionSection } from "@/components/MotionSection";
import { ParcoursTimeline } from "@/components/parcours/ParcoursTimeline";
import { getMessages, isLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const educationOrder = ["kedge", "eugenia", "dauphine", "lycee"] as const;
const experienceOrder = ["brandsisters", "sdis", "louisette", "doa"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const messages = getMessages(raw);
  return { title: messages.parcoursPage.title };
}

export default async function ParcoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const messages = getMessages(raw);
  const p = messages.parcoursPage;

  const education = educationOrder.map((key) => {
    const b = messages.education[key];
    return {
      school: b.school,
      degree: b.degree,
      courses: b.courses,
      ...("tools" in b && b.tools ? { tools: b.tools } : {}),
    };
  });

  const experience = experienceOrder.map((key) => {
    const b = messages.experience[key];
    return {
      company: b.company,
      role: b.role,
      bullets: b.bullets,
      icon: key === "sdis" ? ("fire" as const) : ("brief" as const),
    };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <MotionSection>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {p.title}
        </h1>
      </MotionSection>

      <MotionSection className="mt-14">
        <ParcoursTimeline
          educationTitle={p.education}
          experienceTitle={p.experience}
          education={education}
          experience={experience}
        />
      </MotionSection>
    </div>
  );
}

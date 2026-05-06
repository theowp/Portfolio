import { ProjectCard } from "@/components/ProjectCard";
import { MotionSection } from "@/components/MotionSection";
import { projectsMeta } from "@/data/projects";
import { getMessages, isLocale } from "@/lib/i18n";
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
  return { title: messages.projectsPage.title };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const messages = getMessages(raw);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <MotionSection>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {messages.projectsPage.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {messages.projectsPage.intro}
        </p>
      </MotionSection>

      <MotionSection stagger className="mt-12 grid gap-6 md:grid-cols-2">
        {projectsMeta.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            stack={project.stack}
            link={project.link}
            glow={project.glow}
          />
        ))}
      </MotionSection>
    </div>
  );
}

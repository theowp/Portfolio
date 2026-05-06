"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type TimelineIcon = "grad" | "brief" | "fire";

export type TimelineEdu = {
  school: string;
  degree: string;
  courses: string;
  tools?: string;
};

export type TimelineExp = {
  company: string;
  role: string;
  bullets: string[];
  icon: Exclude<TimelineIcon, "grad">;
};

function IconBadge({ kind }: { kind: TimelineIcon }) {
  const map: Record<TimelineIcon, string> = {
    grad: "🎓",
    brief: "💼",
    fire: "🚒",
  };
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 text-lg shadow-sm"
      aria-hidden
    >
      {map[kind]}
    </span>
  );
}

function EduCard({ item }: { item: TimelineEdu }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative rounded-xl border border-border bg-surface/80 p-5 shadow-sm shadow-black/15 sm:p-6"
    >
      <div className="flex gap-3">
        <IconBadge kind="grad" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {item.school}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{item.degree}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.courses}</p>
          {item.tools ? (
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.tools}</p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function ExpCard({ item }: { item: TimelineExp }) {
  const kind: TimelineIcon = item.icon === "fire" ? "fire" : "brief";
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="relative rounded-xl border border-border bg-surface/80 p-5 shadow-sm shadow-black/15 sm:p-6"
    >
      <div className="flex gap-3">
        <IconBadge kind={kind} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {item.company}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{item.role}</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted">
            {item.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export function ParcoursTimeline({
  educationTitle,
  experienceTitle,
  education,
  experience,
}: {
  educationTitle: string;
  experienceTitle: string;
  education: TimelineEdu[];
  experience: TimelineExp[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineVisible = useInView(rootRef, { once: true, margin: "-10% 0px" });

  return (
    <div ref={rootRef} className="relative">
      <div className="pointer-events-none absolute left-5 top-0 bottom-0 w-px overflow-hidden md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="h-full w-full bg-gradient-to-b from-gold/15 via-gold/75 to-gold/15"
          initial={{ scaleY: 0 }}
          animate={lineVisible ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      <section className="relative space-y-6 pl-12 md:pl-0">
        <h2 className="text-lg font-semibold text-gold sm:text-xl md:pl-12">
          {educationTitle}
        </h2>
        <div className="space-y-6 md:ml-12 md:max-w-[calc(50%-2rem)]">
          {education.map((e) => (
            <EduCard key={e.school + e.degree} item={e} />
          ))}
        </div>
      </section>

      <section className="relative mt-16 space-y-6 pl-12 md:pl-0">
        <h2 className="text-lg font-semibold text-gold sm:text-xl md:pl-12">
          {experienceTitle}
        </h2>
        <div className="space-y-6 md:ml-auto md:max-w-[calc(50%-2rem)] md:pr-2">
          {experience.map((e) => (
            <ExpCard key={e.company + e.role} item={e} />
          ))}
        </div>
      </section>
    </div>
  );
}

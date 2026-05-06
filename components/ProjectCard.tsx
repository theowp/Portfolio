"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import ParallaxTilt from "react-parallax-tilt";
import type { ProjectId } from "@/data/projects";
import { glowClass, type ProjectGlow } from "@/data/projects";
import { useMessages } from "@/context/MessagesContext";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  id: ProjectId;
  stack: string[];
  link?: string;
  glow: ProjectGlow;
};

export function ProjectCard({ id, stack, link, glow }: Props) {
  const { locale, messages } = useMessages();
  const p = messages.projects[id];
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();
  const tiltOn = !mobile && !reduce;

  const body = (
    <article
      className={`group relative flex h-full min-h-full flex-col overflow-hidden rounded-xl border border-border bg-surface/80 p-5 shadow-sm shadow-black/20 transition-shadow duration-300 ${glowClass[glow]}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 translate-x-[-120%] skew-x-[-12deg] bg-gradient-to-r from-transparent via-white/[0.07] to-transparent group-hover:animate-shine" />
      </div>
      <div className="relative z-[1] flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold/90">
              {p.category}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">{p.title}</h2>
          </div>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border/80 bg-background/60 px-2.5 py-0.5 text-xs font-medium text-foreground/90"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-border/60 bg-background/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {messages.projectsPage.keyFigures}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-foreground/95">
            {p.metrics.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="text-gold">•</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="relative z-[2] mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-foreground transition hover:bg-gold hover:text-background"
          >
            {messages.projectsPage.viewDeck}
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <Link
            href={`/${locale}/contact/`}
            className="relative z-[2] mt-4 inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:border-gold/40 hover:text-gold"
          >
            {messages.nav.contact}
          </Link>
        )}
      </div>
    </article>
  );

  return tiltOn ? (
    <ParallaxTilt
      tiltMaxAngleX={7}
      tiltMaxAngleY={7}
      perspective={900}
      scale={1.02}
      transitionSpeed={1600}
      gyroscope={false}
      className="h-full"
    >
      {body}
    </ParallaxTilt>
  ) : (
    <div className="h-full">{body}</div>
  );
}

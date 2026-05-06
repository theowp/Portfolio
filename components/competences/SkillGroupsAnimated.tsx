"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type SkillGroupKey = "dataBi" | "analytics" | "nocode" | "devIa" | "soft";

type Group = {
  key: SkillGroupKey;
  title: string;
  items: string[];
  level: number;
};

export function SkillGroupsAnimated({
  groups,
  caption,
}: {
  groups: Group[];
  caption: string;
}) {
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();
  const light = mobile || reduce;

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {groups.map((g, i) => (
        <motion.div
          key={g.key}
          initial={light ? false : { opacity: 0, y: 24 }}
          whileInView={light ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.45, delay: light ? 0 : i * 0.06 }}
          className="rounded-xl border border-border bg-surface/80 p-5 shadow-sm shadow-black/15"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gold">
              {g.title}
            </h2>
            <span className="text-[10px] text-muted/80">{g.level}%</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background/80">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent to-gold/90"
              initial={light ? false : { width: 0 }}
              whileInView={light ? undefined : { width: `${g.level}%` }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: light ? 0 : 0.12 + i * 0.05 }}
            />
          </div>
          <p className="mt-2 text-[11px] leading-snug text-muted/70">{caption}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {g.items.map((item) => (
              <motion.li
                key={item}
                whileHover={light ? undefined : { scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="rounded-full border border-border/80 bg-background/50 px-3 py-1 text-xs font-medium text-foreground shadow-sm transition-shadow duration-200 hover:border-gold/35 hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)] sm:text-sm"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

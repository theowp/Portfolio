"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ParticlesLayer = dynamic(
  () =>
    import("@/components/effects/HeroParticlesInner").then((m) => ({
      default: m.HeroParticlesInner,
    })),
  { ssr: false, loading: () => null },
);

export function HeroScene({ children }: { children: ReactNode }) {
  const mobile = useIsMobile();
  const reduce = usePrefersReducedMotion();

  return (
    <div className="relative overflow-hidden">
      {!mobile && !reduce ? (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
          <div className="pointer-events-auto absolute inset-x-0 -top-8 bottom-0 md:inset-[-8%]">
            <ParticlesLayer />
          </div>
        </div>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

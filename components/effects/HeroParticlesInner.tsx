"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  detectRetina: true,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: { enable: true },
    },
    modes: {
      repulse: { distance: 90, duration: 0.35, factor: 3, speed: 0.6 },
    },
  },
  particles: {
    color: { value: ["#F5F5F5", "#C9A84C"] },
    links: {
      color: "rgba(201, 168, 76, 0.35)",
      distance: 110,
      enable: true,
      opacity: 0.35,
      width: 0.6,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: true,
      speed: 0.45,
      straight: false,
    },
    number: {
      value: 48,
      density: { enable: true, width: 900, height: 900 },
    },
    opacity: { value: { min: 0.12, max: 0.45 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.2 } },
  },
};

export function HeroParticlesInner() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const opts = useMemo(() => options, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-tsparticles"
      className="pointer-events-auto absolute inset-0 h-full w-full"
      options={opts}
    />
  );
}

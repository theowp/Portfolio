"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 52;
const DELETE_MS = 28;
const HOLD_MS = 2200;

type Phase = "typing" | "hold" | "deleting";

export function TypewriterHeadline({ phrases }: { phrases: string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const t = window.setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  const full = phrases[phraseIndex] ?? "";

  useEffect(() => {
    if (phrases.length === 0) return;
    let id: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < full.length) {
        id = setTimeout(() => {
          setDisplay(full.slice(0, display.length + 1));
        }, TYPE_MS);
      } else {
        id = setTimeout(() => setPhase("hold"), HOLD_MS);
      }
    } else if (phase === "hold") {
      id = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        id = setTimeout(() => setDisplay((d) => d.slice(0, -1)), DELETE_MS);
      } else {
        id = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, 280);
      }
    }

    return () => clearTimeout(id);
  }, [display, full, phase, phraseIndex, phrases.length]);

  return (
    <div
      className="mt-4 min-h-[3.25rem] text-2xl font-semibold tracking-tight text-gold sm:min-h-[3.75rem] sm:text-3xl lg:min-h-[4.25rem] lg:text-4xl"
      aria-live="polite"
    >
      <span className="text-gold">{display}</span>
      <span
        className={`ml-0.5 inline-block w-[3px] align-baseline sm:w-1 ${
          showCursor ? "bg-gold/90" : "bg-transparent"
        }`}
        style={{ height: "0.9em" }}
        aria-hidden
      />
    </div>
  );
}

"use client";

import CountUp from "react-countup";

export type StatItem =
  | { kind: "number"; end: number; label: string }
  | { kind: "text"; value: string; label: string };

export function AnimatedStats({ items }: { items: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border bg-surface/70 p-4 text-center shadow-sm shadow-black/20"
        >
          <p className="text-2xl font-semibold text-gold sm:text-3xl tabular-nums">
            {s.kind === "number" ? (
              <CountUp
                end={s.end}
                duration={2.1}
                decimals={0}
                enableScrollSpy
                scrollSpyOnce
                scrollSpyDelay={120}
              />
            ) : (
              <span>{s.value}</span>
            )}
          </p>
          <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

import { SITE } from "@/lib/site";

export function ProfilePlaceholder() {
  return (
    <div
      className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-border bg-gradient-to-br from-accent/40 to-surface text-xl font-semibold tracking-tight text-gold ring-2 ring-gold/20 sm:h-40 sm:w-40 sm:text-2xl"
      aria-label={`Photo de profil — ${SITE.initials} (placeholder)`}
    >
      {SITE.initials}
    </div>
  );
}

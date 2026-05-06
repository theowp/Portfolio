"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { withBasePath } from "@/lib/paths";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const pref =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    const loc = pref === "en" ? "en" : "fr";
    router.replace(withBasePath(`/${loc}`));
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background px-4 text-center text-muted">
      <div className="h-8 w-8 animate-pulse rounded-full border-2 border-gold/40 border-t-transparent" />
      <p className="text-sm">Chargement…</p>
    </div>
  );
}

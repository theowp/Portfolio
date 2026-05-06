import Link from "next/link";
import { withBasePath } from "@/lib/paths";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
      <h1 className="text-2xl font-semibold text-foreground">Page introuvable</h1>
      <p className="max-w-md text-sm text-muted">
        La page demandée n’existe pas ou a été déplacée.
      </p>
      <Link
        href={withBasePath("/fr")}
        className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-foreground transition hover:bg-gold hover:text-background"
      >
        Retour à l’accueil (FR)
      </Link>
    </div>
  );
}

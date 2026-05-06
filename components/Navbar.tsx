"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useMessages } from "@/context/MessagesContext";
import { stripBasePath, swapLocaleInPath, withBasePath } from "@/lib/paths";
import { SITE } from "@/lib/site";
import type { Locale, Messages } from "@/lib/i18n";

type NavKey = keyof Messages["nav"];

const navItems: { suffix: string; labelKey: NavKey }[] = [
  { suffix: "", labelKey: "home" },
  { suffix: "/projects", labelKey: "projects" },
  { suffix: "/parcours", labelKey: "parcours" },
  { suffix: "/competences", labelKey: "competences" },
  { suffix: "/contact", labelKey: "contact" },
];

export function Navbar() {
  const { locale, messages } = useMessages();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (next: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", next);
    }
    router.push(swapLocaleInPath(pathname, next));
    setOpen(false);
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-border/50 bg-background/55 backdrop-blur-xl"
          : "border-border/80 bg-background/80 backdrop-blur-md"
      }`}
      initial={false}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={withBasePath(`/${locale}`)}
          className="group flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(201,168,76,0.55)] transition group-hover:scale-110" />
          <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            {SITE.fullName.split(" ")[0]}{" "}
            <span className="text-gold/90">{SITE.fullName.split(" ").slice(1).join(" ")}</span>
          </span>
        </Link>

        <LayoutGroup id="main-nav">
          <nav className="relative hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const href = withBasePath(`/${locale}${item.suffix}`);
            const norm = stripBasePath(pathname);
            const active =
              item.suffix === ""
                ? norm === `/${locale}` || norm === `/${locale}/`
                : norm.startsWith(`/${locale}${item.suffix}`);
            return (
              <Link
                key={item.labelKey}
                href={href}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-gold" : "text-muted hover:text-foreground"
                }`}
              >
                {messages.nav[item.labelKey]}
                {active ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-surface/90 ring-1 ring-gold/20"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>
        </LayoutGroup>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex rounded-md border border-border bg-surface/60 p-0.5">
            <button
              type="button"
              onClick={() => switchLocale("fr")}
              className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                locale === "fr"
                  ? "bg-accent text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={`rounded px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
                locale === "en"
                  ? "bg-accent text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>
          <div className="flex items-center gap-1 border-l border-border pl-3">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-muted transition hover:bg-surface hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-muted transition hover:bg-surface hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-md p-2 text-muted transition hover:bg-surface hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <div className="flex rounded-md border border-border bg-surface/60 p-0.5">
            <button
              type="button"
              onClick={() => switchLocale("fr")}
              className={`rounded px-2 py-1 text-[11px] font-semibold ${
                locale === "fr" ? "bg-accent text-foreground" : "text-muted"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={`rounded px-2 py-1 text-[11px] font-semibold ${
                locale === "en" ? "bg-accent text-foreground" : "text-muted"
              }`}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="rounded-md border border-border p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const href = withBasePath(`/${locale}${item.suffix}`);
              return (
                <Link
                  key={item.labelKey}
                  href={href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  {messages.nav[item.labelKey]}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex gap-2 border-t border-border pt-3">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border py-2 text-sm"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border py-2 text-sm"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}

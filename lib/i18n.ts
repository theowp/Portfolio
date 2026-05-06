import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export type Messages = typeof fr;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getMessages(locale: string): Messages {
  return locale === "en" ? en : fr;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SessionEffects } from "@/components/effects/SessionEffects";
import { LocaleHtml } from "@/components/LocaleHtml";
import { Navbar } from "@/components/Navbar";
import { MessagesProvider } from "@/context/MessagesContext";
import { getMessages, isLocale, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale);
  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);

  return (
    <>
      <LocaleHtml locale={locale} />
      <MessagesProvider locale={locale} messages={messages}>
        <SessionEffects />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </MessagesProvider>
    </>
  );
}

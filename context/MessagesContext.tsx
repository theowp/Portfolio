"use client";

import { createContext, useContext } from "react";
import type { Locale, Messages } from "@/lib/i18n";

type Value = {
  locale: Locale;
  messages: Messages;
};

const MessagesContext = createContext<Value | null>(null);

export function MessagesProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  return (
    <MessagesContext.Provider value={{ locale, messages }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) {
    throw new Error("useMessages must be used within MessagesProvider");
  }
  return ctx;
}

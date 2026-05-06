"use client";

import { useState } from "react";
import { useMessages } from "@/context/MessagesContext";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const { messages } = useMessages();
  const c = messages.contactPage;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Portfolio] ${name || "Contact"}`.trim(),
    );
    const body = encodeURIComponent(
      `${c.hook}\n\n---\nNom / Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-surface/80 p-5 sm:p-6"
    >
      <h2 className="text-lg font-semibold text-foreground">{c.formTitle}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted">{c.formName}</span>
          <input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-gold/30 focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted">{c.formEmail}</span>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-gold/30 focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="text-muted">{c.formMessage}</span>
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none ring-gold/30 focus:ring-2"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-gold/90 sm:w-auto"
      >
        {c.formSubmit}
      </button>
      <p className="text-xs text-muted">{c.formHint}</p>
    </form>
  );
}

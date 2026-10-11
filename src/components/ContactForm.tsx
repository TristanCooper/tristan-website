"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5000;

const inputClasses =
  "w-full bg-transparent ring-1 ring-inset ring-foreground/15 px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-[invalid=true]:ring-red-400";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError(null);
    try {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedMessage = message.trim();
      if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        throw new Error("Please complete all fields");
      }
      if (trimmedName.length > MAX_NAME) {
        throw new Error(`Name must be ${MAX_NAME} characters or fewer`);
      }
      if (trimmedEmail.length > MAX_EMAIL || !EMAIL_RE.test(trimmedEmail)) {
        throw new Error("Please enter a valid email address");
      }
      if (trimmedMessage.length > MAX_MESSAGE) {
        throw new Error(`Message must be ${MAX_MESSAGE} characters or fewer`);
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send message");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch (err: unknown) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const hasError = status === "error";

  return (
    <div className="max-w-none">
      {status === "success" ? (
        <div className="mt-4 bg-foreground/5 p-4" role="status">Thanks! Your message has been sent.</div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-4 max-w-xl" noValidate>
          {/* Honeypot */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company" className="block text-sm">Company</label>
            <input
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-transparent ring-1 ring-inset ring-foreground/15 px-3 py-2"
              autoComplete="off"
              tabIndex={-1}
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm">Name</label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={MAX_NAME}
              aria-invalid={hasError}
              aria-describedby={hasError ? "contact-error" : undefined}
              className={inputClasses}
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={MAX_EMAIL}
              aria-invalid={hasError}
              aria-describedby={hasError ? "contact-error" : undefined}
              className={inputClasses}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
              maxLength={MAX_MESSAGE}
              aria-invalid={hasError}
              aria-describedby={hasError ? "contact-error" : undefined}
              className={inputClasses}
            />
          </div>

          {status === "error" && (
            <div id="contact-error" role="alert" className="text-sm text-red-400">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-brand px-3 py-1 text-dark-navy-950 hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

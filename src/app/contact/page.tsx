"use client";

import { useState } from "react";

export default function ContactPage() {
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
      if (!name.trim() || !email.trim() || !message.trim()) {
        throw new Error("Please complete all fields");
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to send message");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="prose prose-zinc max-w-none">
      <h2 className="m-0 text-xl font-normal">Contact</h2>
      <p className="mt-3 text-sm text-foreground/70">Fill out the form and I’ll get back to you.</p>

      {status === "success" ? (
        <div className="mt-4 bg-foreground/5 p-4" role="status">Thanks! Your message has been sent.</div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4 max-w-xl" noValidate>
          {/* Honeypot */}
          <div className="hidden">
            <label htmlFor="company" className="block text-sm">Company</label>
            <input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-transparent ring-1 ring-inset ring-foreground/15 px-3 py-2" autoComplete="off" />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm">Name</label>
            <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-transparent ring-1 ring-inset ring-foreground/15 px-3 py-2" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm">Email</label>
            <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent ring-1 ring-inset ring-foreground/15 px-3 py-2" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm">Message</label>
            <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} required className="w-full bg-transparent ring-1 ring-inset ring-foreground/15 px-3 py-2" />
          </div>

          {status === "error" && (
            <div className="text-sm text-red-500">{error}</div>
          )}

          <div>
            <button type="submit" disabled={status === "submitting"} className="bg-brand px-3 py-1">
              {status === "submitting" ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

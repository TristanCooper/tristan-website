import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5000;

// Simple in-memory sliding-window rate limit: 5 requests / min / IP.
// Note: per-instance only; use KV/Upstash for multi-instance production.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  hits.set(ip, timestamps);
  return false;
}

// POST /api/contact
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const data = await req.json().catch(() => null);
    if (!data || typeof data !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const { name, email, message, company } = data as {
      name?: string;
      email?: string;
      message?: string;
      company?: string; // honeypot
    };

    // Honeypot check
    if (typeof company === "string" && company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    if (trimmedName.length > MAX_NAME) {
      return NextResponse.json({ ok: false, error: `Name must be ${MAX_NAME} characters or fewer` }, { status: 400 });
    }
    if (trimmedEmail.length > MAX_EMAIL || !EMAIL_RE.test(trimmedEmail)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address" }, { status: 400 });
    }
    if (trimmedMessage.length > MAX_MESSAGE) {
      return NextResponse.json({ ok: false, error: `Message must be ${MAX_MESSAGE} characters or fewer` }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO;
    const FROM = process.env.CONTACT_FROM || "portfolio@resend.dev";

    if (!RESEND_API_KEY || !TO) {
      return NextResponse.json({ ok: false, error: "Server not configured. Missing RESEND_API_KEY or CONTACT_TO." }, { status: 500 });
    }

    const subject = `New contact from ${trimmedName.slice(0, MAX_NAME)}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
        <h2 style="margin:0 0 8px 0;">New Contact Message</h2>
        <p style="margin:0 0 4px 0;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p style="margin:0 0 4px 0;"><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p style="margin:12px 0 0 0; white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        html,
        reply_to: [trimmedEmail],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("Resend send failed:", res.status, text.slice(0, 500));
      return NextResponse.json({ ok: false, error: "Email send failed. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

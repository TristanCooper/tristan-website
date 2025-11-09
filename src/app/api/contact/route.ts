import { NextResponse } from "next/server";

// POST /api/contact
export async function POST(req: Request) {
  try {
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
    if (company && company.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO;
    const FROM = process.env.CONTACT_FROM || "portfolio@resend.dev";

    if (!RESEND_API_KEY || !TO) {
      return NextResponse.json({ ok: false, error: "Server not configured. Missing RESEND_API_KEY or CONTACT_TO." }, { status: 500 });
    }

    const subject = `New contact from ${name}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">
        <h2 style="margin:0 0 8px 0;">New Contact Message</h2>
        <p style="margin:0 0 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 4px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:12px 0 0 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
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
        reply_to: [email],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json({ ok: false, error: `Email send failed: ${text || res.statusText}` }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Unknown error" }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

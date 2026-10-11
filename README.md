# tristan-website

Personal portfolio for Tristan Cooper. Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - dev server
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run lint` - ESLint

## Environment

Contact form posts to `POST /api/contact` which sends via Resend:

```bash
RESEND_API_KEY=...
CONTACT_TO=you@example.com
CONTACT_FROM=portfolio@resend.dev
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Rate limiting on `/api/contact` is in-memory (5/min/IP). Use KV/Upstash for multi-instance production.

## Fonts

Self-hosted Besley via `next/font/local` (`public/fonts/besley/`). No Google Fonts CDN dependency.

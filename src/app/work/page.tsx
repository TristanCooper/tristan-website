import type { Metadata } from "next";
import FilterableProjects, { type Project } from "@/components/FilterableProjects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Tristan Cooper - ERP, SaaS, edge systems and eCommerce.",
};

const PROJECTS: Project[] = [
  {
    href: "/work",
    image: "/odoo-call-board.png",
    title: "Odoo Business Essentials",
    description:
      "A collection of practical Odoo CE addons built to solve real sales and CRM challenges for small businesses.",
    tags: ["Inventory & ERP", "Odoo"],
  },
  {
    href: "/work/small-batch-roasting",
    title: "Small Batch Roasting",
    image: "/small-batch-roasting.png",
    description:
      "Overhauled a roastery stuck with a brittle WordPress/plugin setup with phantom stock and routine overselling across multi-origin lots. Rebuilt around a “Coffee Pools” model that mirrors warehouse reality: raw harvest lots and physical barrels dynamically governing child SKUs and multi-bean blends, with Cloudflare Workers + D1 handling atomic deductions via Shopify webhooks in real time. Shipped a multi-persona ops portal: a spatial lot/barrel map for dispatch, blend stockout-risk alerts, and intake tooling.",
    tags: ["Shopify", "SaaS", "Inventory & ERP"],
  },
  {
    href: "https://greenfield.coffee",
    title: "Greenfield Coffee",
    description:
      "End-to-end B2B roastery management SaaS. Next.js, TypeScript, Tailwind, PostgreSQL and Prisma on Vercel with auditable stock ledgers, roast-loss-aware batch planning, Kanban scheduling, and predictive demand modeling.",
    tags: ["SaaS", "Inventory & ERP", "Next.js"],
  },
  {
    href: "https://carbonneutraldrinks.com/",
    image: "/carbon-neutral-drinks.png",
    title: "Carbon Neutral Drinks",
    description:
      "Bespoke high-performance Shopify DTC engine. Custom Liquid theme with no heavy apps for Core Web Vitals, technical SEO with JSON-LD, and full-funnel Meta/Google attribution with conversion-focused checkout.",
    tags: ["Shopify", "Performance & SEO"],
  },
];

export default function WorkPage() {
  return (
    <div className="max-w-none">
      <h1 className="m-0 mb-4 text-2xl sm:text-3xl font-normal leading-tight">Work</h1>
      <FilterableProjects projects={PROJECTS} />
    </div>
  );
}

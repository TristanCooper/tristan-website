import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Small Batch Roasting",
  description:
    "Legacy platform migration and real-time edge inventory for a green-coffee supplier: Coffee Pools data model, Cloudflare Workers plus D1, and an internal ops portal.",
};

export default function SmallBatchRoastingPage() {
  return (
    <article className="max-w-none">
      {/* Kicker + headline + standfirst */}
      <header className="space-y-4">
        <p className="m-0 text-xs uppercase tracking-[0.2em] text-brand">
          Case study
        </p>
        <h1 className="m-0 text-4xl sm:text-5xl font-normal leading-[1.05] tracking-tight text-balance">
          Small Batch Roasting
        </h1>
        <p className="m-0 text-lg sm:text-xl text-foreground/85 leading-relaxed max-w-[60ch]">
          Operational overhaul and edge systems design for a green-coffee
          supplier: from a brittle WordPress setup to inventory the business
          can trust.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-foreground/15 py-3 text-xs uppercase tracking-widest text-foreground/60">
          <span>Shopify</span>
          <span aria-hidden="true" className="opacity-40">/</span>
          <span>Edge inventory</span>
          <span aria-hidden="true" className="opacity-40">/</span>
          <span>Internal ops tooling</span>
          <span aria-hidden="true" className="opacity-40">/</span>
          <span>Pre-launch</span>
        </div>
      </header>

      {/* Hero figure + opening text side by side */}
      <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
        <figure className="m-0 space-y-2">
          <div className="relative w-full aspect-[16/8] overflow-hidden rounded ring-1 ring-inset ring-foreground/15">
            <Image
              src="/small-batch-roasting.png"
              alt="Small Batch Roasting storefront showing live origin stock counts"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="text-xs uppercase tracking-widest text-foreground/50">
            Fig. 01: Storefront with live origin counts, pre-launch work.
          </figcaption>
        </figure>

        {/* 01: Problem */}
        <section>
          <SectionKicker index="01" title="The problem" />
          <div className="mt-4 space-y-4 [&>p]:text-foreground/80 [&>p]:leading-relaxed">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-brand">
              The business ran on WordPress with a tangle of plugins. Stock counts
              were inaccurate, phantom stock appeared across multi-origin lots,
              and overselling was frequent.
            </p>
            <p>
              The deeper issue was representation: the warehouse reality of raw
              harvest lots and physical barrels had no faithful model in the
              system. When the software disagrees with the warehouse, nobody
              trusts the numbers, and every team invents its own workaround.
            </p>
          </div>
        </section>
      </div>

      {/* Pull quote */}
      <blockquote className="my-10 border-l-2 border-brand pl-5 sm:pl-6">
        <p className="m-0 text-2xl sm:text-3xl font-normal italic leading-snug text-balance">
          “The software should tell the truth about the warehouse.”
        </p>
      </blockquote>

      {/* 02: Model */}
      <section>
        <SectionKicker index="02" title="The model: Coffee Pools" />
        <div className="mt-4 gap-8 md:columns-2 [&>p]:mb-4 [&>p]:text-foreground/80 [&>p]:leading-relaxed">
          <p>
            The core design move was an information architecture that mirrors
            the warehouse. Raw harvest lots and physical barrels became an
            abstract parent data model (“Coffee Pools”) that dynamically governs
            child SKUs and multi-bean blends.
          </p>
          <p>
            Blend availability derives from its underlying pools, so a stockout
            risk in one lot propagates honestly instead of silently overselling.
            This kept the range distinct from a standard Greenfield-style SaaS
            build: the emphasis here is operational overhaul, translating
            physical reality into data.
          </p>
        </div>
      </section>

      {/* 03: Engine */}
      <section className="mt-10">
        <SectionKicker index="03" title="The engine: serverless edge" />
        <div className="mt-4 gap-8 md:columns-2 [&>p]:mb-4 [&>p]:text-foreground/80 [&>p]:leading-relaxed">
          <p>
            Shopify webhooks feed a serverless edge engine built on Cloudflare
            Workers with Cloudflare D1, performing atomic deductions in real
            time as orders land.
          </p>
          <p>
            Moving this off the legacy stack removed the plugin failure modes
            and made counts accurate at the moment of sale, which is the only
            moment that matters for overselling.
          </p>
        </div>
        <figure className="m-0 mt-6 space-y-2">
          <div className="relative w-full aspect-[2044/648] overflow-hidden rounded bg-white ring-1 ring-inset ring-foreground/15">
            <Image
              src="/small-batch-engine-diagram.png"
              alt="Architecture diagram of the sbr-inventory-sync Cloudflare Worker, connecting Shopify webhooks, staff goods-in, the D1 roast ledger, and Xero invoicing"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-contain"
            />
          </div>
          <figcaption className="text-xs uppercase tracking-widest text-foreground/50">
            Fig. 02: Sync engine, from webhooks and goods-in to live counts and invoices.
          </figcaption>
        </figure>
      </section>

      {/* 04: Portal + lots board figure threaded in */}
      <section className="mt-10">
        <SectionKicker index="04" title="The portal: built for the warehouse" />
        <div className="mt-4 gap-8 md:columns-2 [&>p]:mb-4 [&>p]:text-foreground/80 [&>p]:leading-relaxed">
          <p>
            A multi-persona internal tool covers dispatch, with a spatial lot
            and barrel map; operations, with blend stockout-risk alerts; and
            intake. Each role sees the same pools through the lens it needs.
          </p>
          <p>
            This part of the work is internal to the company, so there is no
            public link to share. What follows is the lots board: live pool
            stock with lifecycle actions, exactly as the warehouse team uses it.
          </p>
        </div>
        <figure className="m-0 mt-6 space-y-2">
          <div className="relative w-full aspect-[8/3] overflow-hidden rounded ring-1 ring-inset ring-foreground/15">
            <Image
              src="/small-batch-lots-board.png"
              alt="Internal lots board showing live pool stock across coffee lots"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="text-xs uppercase tracking-widest text-foreground/50">
            Fig. 03: Lots board, live pool stock with lifecycle actions.
          </figcaption>
        </figure>
      </section>

      {/* 05: Storefront + flavour finder figure threaded in */}
      <section className="mt-10">
        <SectionKicker index="05" title="The storefront" />
        <div className="mt-4 gap-8 md:columns-2 [&>p]:mb-4 [&>p]:text-foreground/80 [&>p]:leading-relaxed">
          <p>
            Up front, customers get honest numbers and help finding their
            coffee. The Flavour Finder matches stated tastes against live lot
            data, so recommendations are always tied to what is actually in
            stock.
          </p>
          <p>
            It is the same pools model wearing a shopper-friendly face: shade in
            the flavours you enjoy, avoid the ones you do not, and the matches
            respect real availability.
          </p>
        </div>
        <figure className="m-0 mt-6 space-y-2">
          <div className="relative w-full aspect-[21/10] overflow-hidden rounded ring-1 ring-inset ring-foreground/15">
            <Image
              src="/small-batch-flavour-finder.png"
              alt="Flavour Finder taste wheel matching customers to in-stock coffees"
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="text-xs uppercase tracking-widest text-foreground/50">
            Fig. 04: Flavour Finder, taste preferences matched against live stock.
          </figcaption>
        </figure>
      </section>

      {/* Colophon / close */}
      <footer className="mt-12 border-t border-foreground/15 pt-6">
        <p className="m-0 text-xs uppercase tracking-[0.2em] text-foreground/60">
          Why it matters
        </p>
        <p className="mt-3 max-w-[65ch] text-foreground/80 leading-relaxed">
          This project is data modeling, physical operations, and distributed
          systems, not just UI. It shows I can take a business whose system
          contradicts its warehouse and rebuild it so the software tells the
          truth.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Shopify", "SaaS", "Inventory & ERP"].map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs ring-1 ring-inset ring-foreground/15">
              {t}
            </span>
          ))}
        </div>
        <p className="m-0 mt-6 text-sm">
          <Link
            href="/work"
            className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Back to all work
          </Link>
        </p>
      </footer>
    </article>
  );
}

function SectionKicker({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-foreground/15 pb-2">
      <span className="text-xs font-medium tracking-[0.2em] text-brand">{index}</span>
      <h2 className="m-0 text-sm font-normal uppercase tracking-[0.2em] text-foreground/80">
        {title}
      </h2>
    </div>
  );
}

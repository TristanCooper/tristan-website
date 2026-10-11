import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/navigation/ProjectCard";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Home",
  description: "Tristan Cooper - I build and implement digital business solutions with a flair for design.",
};

export default function Home() {
  return (
    <div className="max-w-none space-y-12">
      {/* Intro */}
      <FadeIn className="max-w-none">
        <h1 className="m-0 text-2xl sm:text-3xl font-normal leading-tight">
          I build and implement digital business solutions
        </h1>
        <p className="mt-0 text-foreground/80">
          with a flair for design that gives users an exceptional experience.
        </p>
      </FadeIn>

      {/* Featured case study teaser */}
      <FadeIn className="max-w-none">
        <div className="grid items-center gap-6 md:grid-cols-2 ring-1 ring-inset ring-foreground/15 p-4 sm:p-6">
          <Link
            href="/work/small-batch-roasting"
            className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            aria-label="Read the Small Batch Roasting case study"
          >
            <span className="relative block w-full aspect-[16/8] overflow-hidden rounded">
              <Image
                src="/small-batch-roasting.png"
                alt="Small Batch Roasting storefront showing live origin stock counts"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </span>
          </Link>
          <div>
            <p className="m-0 text-xs uppercase tracking-[0.2em] text-brand">
              Featured case study
            </p>
            <h2 className="m-0 mt-2 text-2xl font-normal leading-tight">
              <Link
                href="/work/small-batch-roasting"
                className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Small Batch Roasting
              </Link>
            </h2>
            <p className="m-0 mt-2 text-foreground/80">
              From phantom stock and overselling to real-time edge inventory:
              how a Coffee Pools data model and Cloudflare Workers rebuilt
              trust between a roastery and its software.
            </p>
            <p className="m-0 mt-3">
              <Link
                href="/work/small-batch-roasting"
                className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Read the case study
              </Link>
            </p>
          </div>
        </div>
      </FadeIn>

      <section className="max-w-none">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="m-0 text-xl font-normal">Selected work</h2>
          <Link
            href="/work"
            className="text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            View all work
          </Link>
        </div>
        {/* Grid: on md+, show project card and CTA in one row, equal height */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Project */}
          <div className="h-full">
            <ProjectCard
              href="https://carbonneutraldrinks.com/"
              image="/carbon-neutral-drinks.png"
              title="Carbon Neutral Drinks"
              description="Bespoke high-performance Shopify DTC engine."
            />
          </div>

          {/* CTA */}
          <FadeIn onceInView className="mt-8 lg:mt-0 md:h-full">
            <div className="md:h-full ring-1 ring-inset ring-foreground/15 p-4 sm:p-6 flex flex-col justify-between gap-4">
              <div>
                <h2 className="m-0 text-xl font-normal">Let’s work together</h2>
                <p className="m-0 mt-1 text-foreground/80">Have a project in mind or a role to discuss? I’m open to interesting opportunities.</p>
              </div>
              <Link
                href="/contact"
                className="shrink-0 bg-brand px-3 py-1 self-start text-dark-navy-950 hover:bg-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Get in touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

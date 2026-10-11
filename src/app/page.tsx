import type { Metadata } from "next";
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
      {/* Hero */}
      <FadeIn className="max-w-none">
        <h1 className="m-0 text-2xl sm:text-3xl font-normal leading-tight">
          I build and implement digital business solutions
        </h1>
        <p className="mt-0 text-foreground/80">
          with a flair for design that gives users an exceptional experience.
        </p>
      </FadeIn>

      <section className="max-w-none">
        <h2 className="m-0 text-xl font-normal">Featured projects</h2>
        {/* Grid: on md+, show two columns, equal height */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Project 1 */}
          <div className="h-full">
            <ProjectCard
              href="/work"
              image="/odoo-call-board.png"
              title="Odoo Business Essentials"
              description="Practical Odoo CE addons solving real sales and CRM challenges."
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

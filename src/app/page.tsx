"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import ProjectCard from "@/components/navigation/ProjectCard";

export default function Home() {
  return (
    <div className="max-w-none space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="prose prose-zinc max-w-none"
      >
        <h2 className="m-0 text-2xl sm:text-3xl font-normal leading-tight">
          I build and ship stunning web applications
        </h2>
        <p className="mt-0 text-foreground/80">
          with a focus on reliability and business impact whilst achieving accessible and pixel-perfect design
        </p>
      </motion.div>


      <section className="prose prose-zinc max-w-none">
        <h3 className="m-0 text-xl font-normal">Featured projects</h3>
        {/* Grid: on md+, show two project cards and CTA in one row (3 columns), equal height */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 md:gap-6 lg:gap-8 items-stretch">
          {/* Project 1 */}
          <div className="h-full">
            <ProjectCard
              href="/work"
              image="/launchpad.png"
              title="Launchpad"
              description="No-code splash page generator with code export and easy deploy."
            />
          </div>

          {/* Project 2 */}
          <div className="h-full">
            <ProjectCard
              href="/work"
              image="/odoo-call-board.png"
              title="Odoo Business Essentials"
              description="Practical Odoo CE addons solving real sales and CRM challenges."
            />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-8 md:mt-0 md:h-full"
          >
            <div className="md:h-full ring-1 ring-inset ring-foreground/15 p-4 sm:p-6 flex flex-col justify-between gap-4">
              <div>
                <h3 className="m-0 text-xl font-normal">Let’s work together</h3>
                <p className="m-0 mt-1 text-foreground/80">Have a project in mind or a role to discuss? I’m open to interesting opportunities.</p>
              </div>
              <Link href="/contact" className="shrink-0 bg-brand px-3 py-1 self-start">Get in touch</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

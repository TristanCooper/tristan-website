"use client";

import * as motion from "motion/react-client";
import { useScroll, useSpring } from "motion/react";
import { useRef } from "react";

type Item = {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
};

const ITEMS: Item[] = [
  {
    year: "2025",
    title: "Sales and Business ERP Development",
    subtitle: "JICG",
    description: "Working to grow sales by improving the efficiency of the sales process and streamlining the business operations with the development of an ERP system.",
  },
  {
    year: "2019 - 2025",
    title: "Software Engineer",
    subtitle: "Peacock/NBCU",
    description: "After Sky was acquired by NBCUinversal, the new US streaming service was created from the codebase of NowTV with an aim on scalability and localisation as key priorities due to the ambition to launch in multiple countries.",
  },
  {
    year: "2017 - 2018",
    title: "Software Engineer",
    subtitle: "NowTV",
    description: "Part of the original team to build the entirely new NowTV Web account management platform after business pivoted to focus on streaming, internet and phone. A large emphasis was placed on accessibility and pixel-perfect design.",
  },
  {
    year: "2014 - 2017",
    title: "Apprentice Software Engineer",
    subtitle: "BSkyB",
    description: "Developed and maintained internal tools for the company to aid in the development of new features, such as an API Explorer and a service health check dashboard.",
  },
  {
    year: "2012 - 2014",
    title: "A-Levels",
    subtitle: "Shaftesbury",
    description: "Studied Computing at Shaftesbury with end of year project deployed at local dairy firm to help manage machine maintenance.",
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.6,
  });

  return (
    <div className="prose prose-zinc max-w-none">
      <div ref={containerRef} className="relative mt-8">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-foreground/10" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-4 top-0 bottom-0 w-px origin-top bg-foreground/30 z-10"
        />

        <ul className="space-y-10">
          {ITEMS.map((item, i) => (
            <li key={i} className="relative pl-10 sm:pl-16">
              <span className="absolute left-4 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full bg-brand" />

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
                className="max-w-prose"
              >
                <p className="m-0 text-xs uppercase tracking-wide text-foreground/60">{item.year}</p>
                <h3 className="m-0 text-lg font-medium">{item.title}</h3>
                {item.subtitle ? (
                  <p className="m-0 text-sm text-foreground/70">{item.subtitle}</p>
                ) : null}
                <p className="mt-2 text-sm text-foreground/80">{item.description}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
    title: "Associate Software Engineer",
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
    offset: ["start 10%", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.6,
  });

  return (
    <div className="prose prose-zinc max-w-none grid grid-cols-6">
      <div className="space-y-3 col-span-6 md:col-span-1 order-2 md:order-1 md:pr-6">
        <p>
          I grew up in rural Dorset taking apart computers before I'd learned to properly put them back together. That curiosity led me to programming, and by the time I finished school, I'd built a maintenance tracking system for a local dairy - solving real problems with code felt natural.
        </p>
        <p>
          At 18, I moved to London for a software engineering apprenticeship at Sky, where I'd spend the next decade building customer-facing platforms. I worked across NowTV, Sky, and Peacock - account management systems, subscription flows, help sites, and retention features. These platforms served millions of users daily, and getting them right meant balancing complex business requirements with polished, accessible interfaces.
        </p>
        <p>
         I ensure accessibility without compromising aesthetics. Poring over the details: transitions, spacing, micro-interactions. <span className="font-bold text-brand">Providing the polish that makes something feel premium.</span> 
        </p>
      </div>

      <div ref={containerRef} className="relative col-span-6 md:col-span-5 order-1 md:order-2">
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

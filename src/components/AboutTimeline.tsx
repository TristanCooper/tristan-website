"use client";

import * as motion from "motion/react-client";
import { useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

export type TimelineItem = {
  year: string;
  title: string;
  subtitle?: string;
  description: string;
};

export default function AboutTimeline({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
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
    <div ref={containerRef} className="relative col-span-6 md:col-span-4 order-1 md:order-2">
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-foreground/10" />
      {reduceMotion ? (
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-foreground/30 z-10" />
      ) : (
        <motion.div
          style={{ scaleY: progress }}
          className="absolute left-4 top-0 bottom-0 w-[2px] origin-top bg-foreground/30 z-10"
        />
      )}

      <ul className="space-y-10">
        {items.map((item, i) => (
          <li key={`${item.year}-${item.title}`} className="relative pl-10 sm:pl-16">
            <span className="absolute left-4 top-1.5 h-2 w-2 -translate-x-[3px] z-10 rounded-full bg-brand" />

            {reduceMotion ? (
              <div className="max-w-[65ch]">
                <TimelineContent item={item} />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
                className="max-w-[65ch]"
              >
                <TimelineContent item={item} />
              </motion.div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineContent({ item }: { item: TimelineItem }) {
  return (
    <>
      <p className="m-0 text-xs uppercase tracking-wide text-foreground/60">{item.year}</p>
      <h3 className="m-0 text-lg font-medium">{item.title}</h3>
      {item.subtitle ? (
        <p className="m-0 text-sm text-foreground/70">{item.subtitle}</p>
      ) : null}
      <p className="mt-2 text-sm text-foreground/80">{item.description}</p>
    </>
  );
}

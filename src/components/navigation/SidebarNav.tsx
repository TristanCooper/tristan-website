"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import * as motion from "motion/react-client";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function SidebarNav() {
  const pathname = usePathname() || "/";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, { a: HTMLAnchorElement | null; b: HTMLSpanElement | null }>>({});
  const homeRef = useRef<HTMLAnchorElement | null>(null);
  const homeBaselineRef = useRef<HTMLSpanElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const activeHref = useMemo(() => {
    const match = LINKS.find((l) => pathname === l.href);
    return match?.href ?? null;
  }, [pathname]);

  const homeActiveHref = useMemo(() => {
    return !activeHref;
  }, [activeHref]);

  // Compute dot position next to the active link using a baseline probe
  useEffect(() => {
    const DOT = 8; // dot size in px (h-2 w-2)
    const GAP = 2; // horizontal gap after word in px

    const compute = () => {
      const container = containerRef.current;
      if (!container) return;

      const isHome = !activeHref;
      const anchor = isHome ? homeRef.current : linkRefs.current[activeHref!]?.a ?? null;
      const baseline = isHome ? homeBaselineRef.current : linkRefs.current[activeHref!]?.b ?? null;
      if (!anchor || !baseline) return setPos(null);

      const cRect = container.getBoundingClientRect();
      const aRect = anchor.getBoundingClientRect();
      const bRect = baseline.getBoundingClientRect();

      const targetLeft = aRect.right - cRect.left + GAP; // gap after word
      // Align the DOT's bottom to the text baseline
      const targetTop = bRect.bottom - cRect.top - DOT/2;
      setPos({ x: Math.round(targetLeft), y: Math.round(targetTop) });
    };

    compute();

    // Recompute on resize
    window.addEventListener("resize", compute);

    // Observe container size/content changes (e.g., wrapping at mobile)
    const ro = typeof ResizeObserver !== "undefined" && containerRef.current
      ? new ResizeObserver(() => compute())
      : null;
    if (ro && containerRef.current) ro.observe(containerRef.current);

    // Recompute after fonts load (metrics can shift baselines)
    let fontReady = false;
    if (typeof document !== "undefined" && (document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => {
        fontReady = true;
        compute();
      });
    }

    return () => {
      window.removeEventListener("resize", compute);
      if (ro && containerRef.current) ro.disconnect();
    };
  }, [activeHref]);

  return (
    <div ref={containerRef} className="relative">
      {/* Moving dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: pos ? 1 : 0,
          scale: homeActiveHref ? 1.5 : 1,
          x: pos ? pos.x : 0,
          y: pos ? pos.y : 0,
        }}
        transition={{
          x: { type: "spring", stiffness: 500, damping: 28, mass: 0.8, bounce: 0.2 },
          y: { type: "spring", stiffness: 500, damping: 28, mass: 0.8, bounce: 0.2 },
          scale: { type: "spring", stiffness: 500, damping: 30, mass: 0.7, bounce: 0.25 },
          opacity: { duration: 0.2 }
        }}
        className="pointer-events-none absolute left-0 top-0 h-1 w-1 rounded-full bg-red-500"
        aria-hidden
      />

      {/* Name (home link) */}
      <h1 className="text-2xl font-normal tracking-tight sm:text-3xl">
        <Link ref={homeRef} href="/">
          Tristan Cooper
          <span ref={homeBaselineRef} className="inline-block align-baseline w-0 h-0" />
        </Link>
      </h1>

      {/* Nav */}
      <nav className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        {LINKS.map(({ href, label }, i) => (
          <span key={href} className="inline-flex items-center gap-4">
            <Link
              ref={(el) => {
                const existing = linkRefs.current[href] ?? { a: null, b: null };
                linkRefs.current[href] = { ...existing, a: el };
              }}
              href={href}
              className="underline-offset-4 hover:underline"
            >
              {label}
              <span
                ref={(el) => {
                  const existing = linkRefs.current[href] ?? { a: null, b: null };
                  linkRefs.current[href] = { ...existing, b: el };
                }}
                className="inline-block align-baseline w-0 h-0"
              />
            </Link>
            {i < LINKS.length - 1 && <span className="opacity-30">/</span>}
          </span>
        ))}
      </nav>
    </div>
  );
}

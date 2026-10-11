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

  // Compute dot position as a full-stop: tight after the word, bottom sitting on the baseline
  useEffect(() => {
    const DOT_HOME = 8; // h-2 w-2
    const DOT_NAV = 6; // h-1.5 w-1.5
    const GAP = 3; // tight gap, like period kerning

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

      const dot = isHome ? DOT_HOME : DOT_NAV;
      const baselineY = bRect.bottom - cRect.top;
      const targetLeft = aRect.right - cRect.left + GAP;
      // Full-stop: dot bottom sits on the baseline
      const targetTop = baselineY - dot;
      setPos({ x: Math.round(targetLeft), y: Math.round(targetTop) });
    };

    compute();

    // Recompute on resize
    window.addEventListener("resize", compute);

    // Observe container size/content changes (e.g., wrapping at mobile)
    const el = containerRef.current;
    const ro =
      typeof ResizeObserver !== "undefined" && el
        ? new ResizeObserver(() => compute())
        : null;
    if (ro && el) ro.observe(el);

    // Recompute after fonts load (metrics can shift baselines)
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        compute();
      });
    }

    return () => {
      window.removeEventListener("resize", compute);
      if (ro) ro.disconnect();
    };
  }, [activeHref]);

  return (
    <div ref={containerRef} className="relative">
      {/* Moving dot (full-stop) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: pos ? 1 : 0,
          x: pos ? pos.x : 0,
          y: pos ? pos.y : 0,
        }}
        transition={{
          x: { type: "spring", stiffness: 500, damping: 28, mass: 0.8, bounce: 0.2 },
          y: { type: "spring", stiffness: 500, damping: 28, mass: 0.8, bounce: 0.2 },
          opacity: { duration: 0.2 }
        }}
        className={`pointer-events-none absolute left-0 top-0 rounded-full bg-brand ${
          homeActiveHref ? "h-2 w-2" : "h-1.5 w-1.5"
        }`}
        aria-hidden="true"
      />

      {/* Name (home link) */}
      <div className="text-2xl font-normal tracking-tight sm:text-3xl text-center sm:text-left">
        <Link ref={homeRef} href="/" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
          Tristan Cooper
          <span ref={homeBaselineRef} className="inline-block align-baseline w-0 h-0" aria-hidden="true" />
        </Link>
      </div>

      {/* Nav */}
      <nav aria-label="Primary" className="mt-4 flex flex-wrap items-center gap-4 text-sm">
        {LINKS.map(({ href, label }, i) => (
          <span key={href} className="inline-flex items-center gap-4">
            <Link
              ref={(el) => {
                const existing = linkRefs.current[href] ?? { a: null, b: null };
                linkRefs.current[href] = { ...existing, a: el };
              }}
              href={href}
              aria-current={activeHref === href ? "page" : undefined}
              className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {label}
              <span
                ref={(el) => {
                  const existing = linkRefs.current[href] ?? { a: null, b: null };
                  linkRefs.current[href] = { ...existing, b: el };
                }}
                className="inline-block align-baseline w-0 h-0"
                aria-hidden="true"
              />
            </Link>
            {i < LINKS.length - 1 && <span className="opacity-30">/</span>}
          </span>
        ))}
      </nav>
    </div>
  );
}

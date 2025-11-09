"use client";

import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

type PageTransitionProps = PropsWithChildren<{ className?: string }>;

export default function PageTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import SidebarNav from "../components/navigation/SidebarNav";
import PageTransition from "../components/PageTransition";

export const metadata: Metadata = {
  title: "Tristan Cooper",
  description: "Personal site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Besley:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-serif antialiased`}>
        <main className="min-h-screen bg-background p-4 sm:p-8 text-foreground flex flex-col sm:flex-row gap-2 sm:gap-8">
          {/* Floating sidebar box */}
          <div className="mx-auto sm:mx-0 w-fit ring-1 ring-inset ring-foreground/15 self-start shrink-0">
            <div className="p-4 sm:p-8">
              <aside>
                <SidebarNav />
              </aside>
            </div>
          </div>

          {/* Page content */}
          <PageTransition className="mt-4 sm:mt-0 p-4 sm:pt-0 self-start flex-1 min-w-full sm:min-w-0">
            {children}
          </PageTransition>
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

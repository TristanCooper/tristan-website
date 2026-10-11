import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import SidebarNav from "../components/navigation/SidebarNav";
import PageTransition from "../components/PageTransition";

export const metadata: Metadata = {
  title: {
    default: "Tristan Cooper",
    template: "%s | Tristan Cooper",
  },
  description: "Tristan Cooper - software engineer building digital business solutions, ERP and web platforms.",
  openGraph: {
    title: "Tristan Cooper",
    description: "Software engineer building digital business solutions, ERP and web platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-serif antialiased`}>
        <main className="min-h-screen bg-background p-4 sm:p-8 text-foreground flex flex-col sm:flex-row gap-2 sm:gap-8">
          {/* Floating sidebar box */}
          <div className="w-full sm:w-fit sm:mx-0 ring-1 ring-inset ring-foreground/15 self-start shrink-0">
            <div className="p-4 sm:p-8">
              <aside>
                <SidebarNav />
              </aside>
            </div>
          </div>

          {/* Page content */}
          <PageTransition className="mt-4 sm:mt-0 p-4 sm:pt-0 self-start flex-1 w-full min-w-0">
            {children}
          </PageTransition>
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

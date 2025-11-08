import type { Metadata } from "next";
import "./globals.css";
import SidebarNav from "../components/navigation/SidebarNav";

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
        <main className="min-h-screen bg-background p-8 text-foreground">
          {/* Inset frame */}
          <div className="min-h-[calc(100vh-4rem)] ring-1 ring-inset ring-foreground/15">
            <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-12 sm:p-8">
              {/* Left sidebar */}
              <aside className="sm:col-span-4">
                <SidebarNav />
              </aside>
              {/* Right content panel */}
              <section className="sm:col-span-8">
                {children}
              </section>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

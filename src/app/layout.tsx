import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Dock, Footer } from "@/components/Chrome";
import { SiteScripts } from "@/components/SiteScripts";
import { SITE } from "@/data/site";
import { BASE_PATH, asset } from "@/lib/basePath";
import "./site.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE.url}/`),
  title: {
    default: `${SITE.brand} | Home Additions & Renovations Melbourne`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    "Over 40 years in Melbourne residential construction. Home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts.",
  icons: {
    icon: [
      { url: asset("/favicon.ico") },
      { url: asset("/assets/img/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: asset("/assets/img/apple-touch-icon.png"),
  },
  openGraph: {
    siteName: SITE.brand,
    locale: "en_AU",
    type: "website",
    images: [{ url: `${SITE.url}/assets/img/og.jpg`, width: 1200, height: 630 }],
  },
  other: { "theme-color": "#071630" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // site-behaviour adds classes to <html> before hydration finishes.
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400..700&display=swap" rel="stylesheet" />
        <script
          // Opt in to the scroll reveal before first paint.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-reveal')" }}
        />
      </head>
      <body data-base={BASE_PATH}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Dock />
        <SiteScripts />
      </body>
    </html>
  );
}

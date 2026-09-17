import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Header } from "@/components/Header";
import { Dock, Footer } from "@/components/Chrome";
import { SiteScripts } from "@/components/SiteScripts";
import { SITE } from "@/data/site";
import { BASE_PATH, asset } from "@/lib/basePath";
import "./site.css";

// Self-hosted at build time. next/font also generates a metrics-matched
// fallback, so text doesn't reflow when the web font arrives.
const archivo = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-archivo" });

/* Runs before first paint:
   - js-reveal: CSS may hide things the script will reveal (dock, form stages)
   - is-loading: no transitions until the site script has started, so the
     header doesn't animate into its scrolled state on a mid-page reload
   - sets the header's scrolled state from the first scroll event, without
     waiting for React to hydrate */
const EARLY = `(function(){var d=document.documentElement;d.classList.add('js-reveal','is-loading');function s(){var h=document.getElementById('siteHeader');if(h){h.classList.toggle('is-scrolled',window.scrollY>40)}}window.addEventListener('scroll',s,{passive:true});document.addEventListener('DOMContentLoaded',s)})()`;

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
  other: { "theme-color": "#07080a" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // site-behaviour adds classes to <html> before hydration finishes.
    <html lang="en-AU" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: EARLY }} />
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

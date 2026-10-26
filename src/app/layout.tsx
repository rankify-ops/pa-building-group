import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Header } from "@/components/Header";
import { Dock, Footer } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { SiteScripts } from "@/components/SiteScripts";
import { SITE } from "@/data/site";
import { BASE_PATH, asset } from "@/lib/basePath";
import { localBusinessJsonLd } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";
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
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${SITE.brand} | Thornbury Builders, North-East Melbourne`,
    template: `%s | ${SITE.brand}`,
  },
  description:
    `Home additions, renovations, kitchens, bathrooms and outdoor living across Thornbury and north-east Melbourne. Office at ${SITE.address.street}. Call ${SITE.mobile.label}.`,
  icons: {
    icon: [
      { url: asset("/assets/img/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon.ico") },
      { url: asset("/assets/img/favicon-32x32.png"), sizes: "32x32", type: "image/png" },
    ],
    apple: asset("/assets/img/apple-touch-icon.png"),
  },
  openGraph: {
    siteName: SITE.brand,
    locale: "en_AU",
    type: "website",
    url: absoluteUrl("/"),
    images: [{
      url: absoluteUrl("/assets/img/og.jpg"),
      width: 1200,
      height: 630,
      alt: `${SITE.brand}, Melbourne builders based in Thornbury`,
    }],
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
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Dock />
        <SiteScripts />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { SITE } from "@/data/site";

const OG_IMAGE = {
  url: `${SITE.url}/assets/img/og.jpg`,
  width: 1200,
  height: 630,
  alt: `${SITE.brand}, Melbourne builders based in Thornbury`,
};

export function canonicalUrl(path: string) {
  if (path === "/") return `${SITE.url}/`;
  const withLead = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${withLead.endsWith("/") ? withLead : `${withLead}/`}`;
}

/** Title, description, canonical and Open Graph for one page. */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  /** Omit on the 404 template, which has no URL of its own. */
  path?: string;
  index?: boolean;
}): Metadata {
  const url = path ? canonicalUrl(path) : undefined;
  const fullTitle = title.includes(SITE.brand) ? title : `${title} | ${SITE.brand}`;
  return {
    // absolute so the root page (which does not inherit the layout title template)
    // still carries the brand, and nested pages are not branded twice.
    title: { absolute: fullTitle },
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      ...(url ? { url } : {}),
      siteName: SITE.brand,
      locale: "en_AU",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

/** Project photography: suburb and the kind of work, plus a caption when there is one. */
export function projectAlt(project: { name: string; kind: string }, caption?: string) {
  const place = `${project.kind} in ${project.name}, Melbourne`;
  return caption ? `${caption} — ${place}` : place;
}

import type { Metadata } from "next";
import { SITE } from "@/data/site";

/**
 * Every public URL is built from SITE.url. Page paths gain a trailing slash.
 * Files (a dot in the last segment) do not. A hash stays after the page slash.
 */
export function absoluteUrl(path = "/"): string {
  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  const raw = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const last = raw.split("/").filter(Boolean).pop() ?? "";
  if (last.includes(".")) {
    const withLead = raw.startsWith("/") ? raw : `/${raw}`;
    return `${SITE.url}${withLead}${hash}`;
  }
  if (raw === "" || raw === "/") return `${SITE.url}/${hash}`;
  const withLead = raw.startsWith("/") ? raw : `/${raw}`;
  const withSlash = withLead.endsWith("/") ? withLead : `${withLead}/`;
  return `${SITE.url}${withSlash}${hash}`;
}

const OG_IMAGE = {
  url: absoluteUrl("/assets/img/og.jpg"),
  width: 1200,
  height: 630,
  alt: `${SITE.brand}, Melbourne builders based in Thornbury`,
};

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
  const url = path ? absoluteUrl(path) : undefined;
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

/**
 * Suburb landing titles. Short names pick up ", Melbourne" so the branded
 * title stays near 60 characters, and Thornbury does not repeat the home title.
 */
export function locationTitle(name: string) {
  const stem = `${name} Home Additions & Renovations`;
  if (`${stem} | ${SITE.brand}`.length < 55) return `${stem}, Melbourne`;
  return stem;
}

/** One description length for every suburb: the name is the only variable. */
export function locationDescription(name: string) {
  return `Home additions, renovations, kitchens, bathrooms and outdoor living in ${name}. Registered builder. The only office is in Thornbury. Free, itemised quote.`;
}

/** Project photography: suburb and the kind of work, plus a caption when there is one. */
export function projectAlt(project: { name: string; kind: string }, caption?: string) {
  const place = `${project.kind} in ${project.name}, Melbourne`;
  return caption ? `${caption} — ${place}` : place;
}

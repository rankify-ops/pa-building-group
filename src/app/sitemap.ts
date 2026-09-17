import type { MetadataRoute } from "next";
import { SERVICES, SITE, SUBURBS } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${SITE.url}${p}`;
  return [
    { url: url("/"), priority: 1 },
    { url: url("/services/"), priority: 0.9 },
    ...SERVICES.map((s) => ({ url: url(`/services/${s.slug}/`), priority: 0.9 })),
    { url: url("/projects/"), priority: 0.8 },
    { url: url("/about/"), priority: 0.7 },
    { url: url("/contact/"), priority: 0.8 },
    ...SUBURBS.map((s) => ({ url: url(`/locations/${s.slug}/`), priority: 0.6 })),
  ];
}

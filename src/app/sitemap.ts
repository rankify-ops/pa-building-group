import type { MetadataRoute } from "next";
import { SERVICES, SUBURBS } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/services/"), priority: 0.9 },
    ...SERVICES.map((s) => ({ url: absoluteUrl(`/services/${s.slug}/`), priority: 0.9 })),
    { url: absoluteUrl("/projects/"), priority: 0.8 },
    { url: absoluteUrl("/about/"), priority: 0.7 },
    { url: absoluteUrl("/contact/"), priority: 0.8 },
    { url: absoluteUrl("/privacy/"), priority: 0.3 },
    { url: absoluteUrl("/locations/"), priority: 0.7 },
    ...SUBURBS.map((s) => ({ url: absoluteUrl(`/locations/${s.slug}/`), priority: 0.6 })),
  ];
}

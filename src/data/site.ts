/*
 * Business details. Everything here came from the client:
 *   - contact, address, registrations: Paul Athinis's email signature
 *   - 40+ years and the service specialities: the business Facebook page
 * Anything not on that list is our copy, not a claim of theirs — see HANDOVER.md.
 */
import servicesJson from "./services.json";
import suburbsJson from "./suburbs.json";
import projectsJson from "./projects.json";

export const SITE = {
  brand: "PA Building Group",
  legal: "PA Building & Maintenance Services P/L",
  director: "Paul Athinis",
  city: "Melbourne",
  // Preview URL. At domain cutover change this, drop NEXT_PUBLIC_BASE_PATH from
  // the deploy workflow and add public/CNAME, all in the same commit.
  url: "https://rankify-ops.github.io/pa-building-group",
  mobile: { label: "0409 040 493", tel: "+61409040493" },
  office: { label: "03 9717 0650", tel: "+61397170650" },
  email: "paul@pabuilding.com.au",
  address: {
    street: "26/327 Mansfield St",
    suburb: "Thornbury",
    state: "VIC",
    postcode: "3071",
  },
  registrations: ["DB-U 44080", "CDB-U 51464"],
  regulator: "Building and Plumbing Commission",
  years: "40+",
  // Public by design — Web3Forms only sends to the inbox it was registered against.
  web3formsKey: "2742141c-cdc6-4e7b-be33-672d05ed3aff",
} as const;

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.suburb} ${SITE.address.state} ${SITE.address.postcode}`;

export type Service = {
  slug: string;
  nav: string;
  title: string;
  icon: string;
  blurb: string;
  local: string;
  h1: string;
  em: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  blocks: { image: string; tag: string; heading: string; paragraphs: string[]; bullets: string[] }[];
  why: { icon: string; heading: string; text: string }[];
  faq: { q: string; a: string }[];
};

export type Suburb = { name: string; slug: string; region: string; character: string };

export type ProjectSection = {
  anchor: string;
  tag: string;
  title: string;
  blurb: string;
  images: { image: string; caption: string }[];
};

export const SERVICES = servicesJson as Service[];
export const SUBURBS = suburbsJson as Suburb[];
export const PROJECT_SECTIONS = projectsJson as ProjectSection[];

export const PROJECT_NAME = "Ethel Street"; // TODO(client): confirm suburb and completion year

export function serviceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function suburbBySlug(slug: string) {
  return SUBURBS.find((s) => s.slug === slug);
}

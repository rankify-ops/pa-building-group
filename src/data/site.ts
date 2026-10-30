/*
 * Business details. Everything here came from the client:
 *   - contact, address, registrations: Paul Athinis's email signature
 *   - 43 years in the industry: Paul's renovations copy. Service specialities: the business Facebook page.
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
  // The only public origin. Canonicals, og:url, schema @id/url, breadcrumbs,
  // sitemap URLs and the robots.txt sitemap line all read this value.
  // The live domain. Production is Vercel, which serves at the root, so there
  // is no base path to set. Canonicals and the sitemap pointed at the old
  // GitHub Pages address after Pages was switched off, which made every
  // canonical a 404 - do not point this anywhere the public cannot reach.
  url: "https://pabuilding.com.au",
  mobile: { label: "0409 040 493", tel: "+61409040493" },
  office: { label: "03 9717 0650", tel: "+61397170650" },
  email: "paul@pabuilding.com.au",
  // Already used as schema sameAs. The footer links to this same profile.
  instagram: "https://www.instagram.com/pabuilding/",
  address: {
    street: "51/327 Mansfield St",
    suburb: "Thornbury",
    state: "VIC",
    postcode: "3071",
  },
  registrations: ["DB-U 44080", "CDB-U 51464"],
  regulator: "Building and Plumbing Commission",
  years: "43",
  // Public by design — Web3Forms only sends to the inbox it was registered against.
  web3formsKey: "2742141c-cdc6-4e7b-be33-672d05ed3aff",
} as const;

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.suburb} ${SITE.address.state} ${SITE.address.postcode}`;

/**
 * Suburbs named in copy and in the homepage LocalBusiness areaServed list.
 * Thornbury is the only office (see SITE.address). Doreen is one of these
 * service areas, the same as Camberwell and Kew — never a second address.
 * Do not add these to suburbs.json; that file generates location pages.
 */
export const SERVICE_AREAS = [
  "Thornbury",
  "Northcote",
  "Preston",
  "Reservoir",
  "Fairfield",
  "Alphington",
  "Ivanhoe",
  "Heidelberg",
  "Bundoora",
  "Greensborough",
  "Eltham",
  "Diamond Creek",
  "Doreen",
  "Mernda",
  "South Morang",
  "Mill Park",
  "Templestowe",
  "Doncaster",
  "Camberwell",
  "Kew",
  "Hawthorn",
  "Balwyn",
] as const;

/**
 * Paul's own service-area list, grouped by council exactly as he sent it
 * (30 Oct). Suburbs that also have a location page are linked; the rest are
 * plain text. `more` renders his "& more" where he wrote it.
 *
 * Kept verbatim, including the suburbs that appear under two councils
 * (Bundoora, Alphington, Kew, Hawthorn, Balwyn) — those are genuine boundary
 * overlaps, not mistakes to tidy away.
 */
export const SERVICE_AREA_GROUPS: { council: string; suburbs: string[]; more?: boolean }[] = [
  { council: "City of Whittlesea", suburbs: ["Doreen", "Mernda", "South Morang", "Mill Park", "Epping", "Wollert"] },
  { council: "Nillumbik Shire", suburbs: ["Eltham", "Diamond Creek", "Hurstbridge", "Research", "Kangaroo Ground"] },
  { council: "Banyule", suburbs: ["Heidelberg", "Ivanhoe", "Rosanna", "Greensborough", "Watsonia", "Montmorency", "Briar Hill", "Bundoora"] },
  { council: "Darebin City", suburbs: ["Alphington", "Bundoora", "Coburg", "Coburg North", "Fairfield", "Keon Park", "Kingsbury", "Macleod", "Northcote", "Preston", "Regent West", "Reservoir", "Thornbury"] },
  { council: "Yarra City", suburbs: ["Abbotsford", "Burnley", "Carlton North", "Clifton Hill", "Collingwood", "Cremorne", "Fitzroy", "Fitzroy North", "Princes Hill", "Richmond", "Alphington"] },
  { council: "Yarra Ranges", suburbs: ["Lilydale", "Coldstream", "Healesville", "Yarra Glen"] },
  { council: "Inner east", suburbs: ["Kew", "Hawthorn", "Camberwell", "Balwyn"] },
  { council: "Murrindindi Shire", suburbs: ["Alexandra", "Flowerdale", "Glenburn", "Kinglake", "Kinglake Central", "Kinglake West", "Marysville", "Molesworth", "Yarck", "Yea"], more: true },
  { council: "City of Boroondara", suburbs: ["Kew East", "Kew", "Hawthorn", "Balwyn", "Deepdene", "Mont Albert", "Ashburton", "Canterbury"], more: true },
];

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

export type ProjectImage = { image: string; caption: string; id?: string; span?: string };

export type ProjectGroup = {
  anchor: string;
  tag: string;
  title: string;
  blurb: string;
  images: ProjectImage[];
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  image: string;
  /** External listing, when the finished project is published. */
  listing?: string;
  groups: ProjectGroup[];
};

export const SERVICES = servicesJson as Service[];
export const SUBURBS = suburbsJson as Suburb[];
export const PROJECTS = projectsJson as Project[];

/** Featured project on the home page. The client asked for the suburb only. */
export const PROJECT_NAME = "Thornbury";

export function serviceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function suburbBySlug(slug: string) {
  return SUBURBS.find((s) => s.slug === slug);
}

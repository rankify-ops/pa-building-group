import { PROJECTS, SERVICES, SERVICE_AREAS, SITE, SUBURBS, type Project, type Service } from "@/data/site";

/** Stable id so service and project markup can point at the same business. */
export const BUSINESS_ID = `${SITE.url}/#business`;

/** Instagram profile supplied for sameAs. Not shown as a new link in the design. */
const INSTAGRAM = "https://www.instagram.com/pabuilding/";

/**
 * Every suburb already named on the site: the homepage service-area list,
 * the location pages, and the published projects. Nothing is added beyond that.
 */
export function areaServed() {
  const names: string[] = [];
  const add = (name: string) => {
    if (!names.includes(name)) names.push(name);
  };
  for (const name of SERVICE_AREAS) add(name);
  for (const suburb of SUBURBS) add(suburb.name);
  for (const project of PROJECTS) add(project.name);
  return names.map((name) => ({
    "@type": "City" as const,
    name,
    containedInPlace: { "@type": "City" as const, name: "Melbourne" },
  }));
}

export function absolutePhoto(file: string) {
  const dir = file.includes("/") ? "/assets/projects/" : "/assets/img/projects/";
  return `${SITE.url}${dir}${file}`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": BUSINESS_ID,
    name: SITE.brand,
    legalName: SITE.legal,
    description:
      `${SITE.years} years in Melbourne residential construction, from our office in Thornbury. Home additions and renovations across north-east Melbourne, plus kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts.`,
    url: `${SITE.url}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/assets/img/logo-dark.png`,
    },
    image: `${SITE.url}/assets/img/og.jpg`,
    telephone: [SITE.mobile.label, SITE.office.label],
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.suburb,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postcode,
      addressCountry: "AU",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.mobile.label,
        email: SITE.email,
        contactType: "quotes",
        name: SITE.director,
        areaServed: "AU",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.office.label,
        email: SITE.email,
        contactType: "customer service",
        name: "Office",
        areaServed: "AU",
        availableLanguage: "English",
      },
    ],
    sameAs: [INSTAGRAM],
    areaServed: areaServed(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Building services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.blurb,
          url: `${SITE.url}/services/${service.slug}/`,
        },
      })),
    },
    identifier: SITE.registrations.map((value) => ({
      "@type": "PropertyValue",
      name: "Victorian building practitioner registration",
      value,
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: `${SITE.url}/services/${service.slug}/`,
    areaServed: { "@type": "City", name: "Melbourne" },
    provider: { "@id": BUSINESS_ID },
  };
}

export function locationJsonLd(suburb: { name: string; slug: string }, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Home additions and renovations in ${suburb.name}`,
    serviceType: "Home additions, renovations and building services",
    description,
    url: `${SITE.url}/locations/${suburb.slug}/`,
    areaServed: {
      "@type": "City",
      name: suburb.name,
      containedInPlace: { "@type": "City", name: "Melbourne" },
    },
    provider: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbJsonLd(crumbs: [string, string?][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      ...(path ? { item: `${SITE.url}${path}` } : {}),
    })),
  };
}

function projectImageFiles(project: Project) {
  const files = [project.image, ...project.groups.flatMap((group) => group.images.map((image) => image.image))];
  return [...new Set(files)];
}

export function projectsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE.url}/projects/#page`,
    name: `Projects | ${SITE.brand}`,
    url: `${SITE.url}/projects/`,
    description:
      "Extensions, renovations, an addition and a new build in Smith's Gully, Thornbury, Kinglake, Coburg and Elwood.",
    isPartOf: { "@type": "WebSite", name: SITE.brand, url: `${SITE.url}/` },
    about: { "@id": BUSINESS_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: PROJECTS.length,
      itemListElement: PROJECTS.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE.url}/projects/#${project.slug}`,
        item: {
          "@type": "CreativeWork",
          "@id": `${SITE.url}/projects/#${project.slug}`,
          name: `${project.kind} in ${project.name}`,
          description: project.summary,
          url: `${SITE.url}/projects/#${project.slug}`,
          image: projectImageFiles(project).map(absolutePhoto),
          contentLocation: {
            "@type": "Place",
            name: `${project.name}, Melbourne`,
            address: {
              "@type": "PostalAddress",
              addressLocality: project.name,
              addressRegion: "VIC",
              addressCountry: "AU",
            },
          },
          creator: { "@id": BUSINESS_ID },
        },
      })),
    },
  };
}

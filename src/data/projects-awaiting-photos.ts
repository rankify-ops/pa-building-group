/**
 * Projects the client named that do not have photographs yet.
 *
 * This file is not imported by any page, so these jobs do not appear in the
 * projects list, the navigation, or the built site. When real photos arrive,
 * move the project into src/data/projects.json, add its images under
 * public/assets/img/projects/, and it will publish with the others.
 */
export const PROJECTS_AWAITING_PHOTOS = [
  {
    slug: "smiths-gully",
    name: "Smith's Gully",
    kind: "Extension with rammed earth walls",
    summary: "An extension built with rammed earth walls.",
  },
  {
    slug: "kinglake",
    name: "Kinglake",
    kind: "New build to lock-up",
    summary: "A new build taken through to lock-up.",
  },
  {
    slug: "coburg",
    name: "Coburg",
    kind: "Renovation and addition",
    summary: "A renovation and addition.",
  },
  {
    slug: "elwood",
    name: "Elwood",
    kind: "Extension and renovation",
    summary: "An extension and renovation.",
  },
  {
    slug: "north-melbourne",
    name: "North Melbourne",
    kind: "Renovation and addition",
    summary: "A renovation and addition.",
  },
  {
    slug: "badgers-creek",
    name: "Badgers Creek",
    kind: "Extension",
    summary: "An extension.",
  },
] as const;

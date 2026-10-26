/**
 * Projects that stay off the site.
 *
 * This file is not imported by any page, so these jobs do not appear in the
 * projects list, the navigation, or the built site.
 *
 * North Melbourne is held because the only image on file may be AI-generated,
 * pending Paul's confirmation. Badgers Creek has no photographs.
 *
 * To publish one, move it into src/data/projects.json and add real photos
 * under public/assets/projects/<slug>/.
 */
export const PROJECTS_AWAITING_PHOTOS = [
  {
    slug: "north-melbourne",
    name: "North Melbourne",
    kind: "Renovation and addition",
    summary: "A renovation and addition.",
    heldBecause: "The only image on file may be AI-generated. Waiting on Paul's confirmation before it is published.",
  },
  {
    slug: "badgers-creek",
    name: "Badgers Creek",
    kind: "Extension",
    summary: "An extension.",
    heldBecause: "No photographs yet.",
  },
] as const;

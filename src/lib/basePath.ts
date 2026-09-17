/*
 * GitHub Pages serves a project repo from /<repo>/, and the real domain serves
 * from /. Rather than remembering which one a given build is for, every asset
 * goes through asset() and every internal link through href(), both of which
 * read the same env var that next.config.ts reads.
 *
 * Internal links are plain <a> tags on purpose, not next/link: each navigation
 * is a full page load, so the site behaviour script (menu, reveal, forms) runs
 * fresh on every page instead of needing to re-bind after client routing.
 *
 * Preview build:  NEXT_PUBLIC_BASE_PATH=/pa-building-group npm run build
 * Production:     npm run build
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** For files under public/ — images, icons, the OG card. */
export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}

/** Internal page link. Pass the route with leading and trailing slash. */
export function href(path: string) {
  return `${BASE_PATH}${path}`;
}

/** A project photo under public/assets/img/projects/. */
export function photo(file: string) {
  return asset(`/assets/img/projects/${file}`);
}

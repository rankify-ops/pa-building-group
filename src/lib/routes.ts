import { href } from "./basePath";

/** usePathname() drops the base path; normalise to always end in "/". */
export function normalise(pathname: string | null) {
  const p = pathname || "/";
  return p.endsWith("/") ? p : `${p}/`;
}

/** Pages that carry an enquiry form with id="enquire". */
export function hasForm(pathname: string) {
  return pathname === "/" || pathname === "/contact/" ||
    /^\/(services|locations)\/[^/]+\/$/.test(pathname);
}

/** Where "Get a quote" should go from the current page. */
export function quoteHref(pathname: string) {
  return hasForm(pathname) ? "#enquire" : href("/contact/#enquire");
}

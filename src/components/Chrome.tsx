"use client";

import { usePathname } from "next/navigation";
import { ADDRESS_LINE, SERVICES, SITE } from "@/data/site";
import { asset, href } from "@/lib/basePath";
import { normalise, quoteHref } from "@/lib/routes";
import { ArrowIcon, PhoneIcon } from "./Icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="footer-brand">
          <img src={asset("/assets/img/logo.svg")} alt={SITE.brand} width={995} height={688} />
          <p>
            {SITE.years} years in {SITE.city} residential construction. Home additions and renovations, kitchens and
            bathrooms, outdoor living, property maintenance and pre-sale facelifts.
          </p>
          <p className="footer-areas">
            Office in Thornbury. We work across north-east Melbourne, including Doreen, and also in Camberwell and Kew.
          </p>
        </div>
        <div>
          <h2>Services</h2>
          <ul>
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}><a href={href(`/services/${s.slug}/`)}>{s.nav}</a></li>
            ))}
            <li><a href={href("/services/")}>All services</a></li>
          </ul>
        </div>
        <div>
          <h2>Company</h2>
          <ul>
            <li><a href={href("/about/")}>About</a></li>
            <li><a href={href("/projects/")}>Projects</a></li>
            <li><a href={href("/locations/")}>Locations</a></li>
            <li><a href={href("/contact/")}>Contact</a></li>
            <li><a href={href("/privacy/")}>Privacy</a></li>
          </ul>
        </div>
        <div>
          <h2>Contact</h2>
          <ul>
            <li><a href={`tel:${SITE.mobile.tel}`}>{SITE.mobile.label}</a></li>
            <li><a href={`tel:${SITE.office.tel}`}>{SITE.office.label}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.instagram} rel="noopener noreferrer">Instagram</a></li>
            <li>{ADDRESS_LINE}</li>
          </ul>
        </div>
      </div>
      <div className="wrap site-footer__base">
        <p>&copy; <span id="year">2026</span> {SITE.legal}</p>
        <p className="licence-line">{SITE.registrations.join("  ·  ")}</p>
        <p>Website by <a href="https://rankify.com.au" rel="noopener">Rankify</a></p>
      </div>
    </footer>
  );
}

/** Call and quote, floating on desktop, a full-width bar on a phone. */
export function Dock() {
  const path = normalise(usePathname());
  return (
    <div className="dock">
      <a className="dock__btn dock__btn--call" href={`tel:${SITE.mobile.tel}`}>
        <PhoneIcon /> Call Paul
      </a>
      <a className="dock__btn dock__btn--quote" href={quoteHref(path)}>
        Free quote <ArrowIcon />
      </a>
    </div>
  );
}

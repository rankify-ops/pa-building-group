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
          <img src={asset("/assets/img/logo.png")} alt={SITE.brand} width={1223} height={437} />
          <p>
            Over 40 years in {SITE.city} residential construction. Home additions and renovations, kitchens and
            bathrooms, outdoor living, property maintenance and pre-sale facelifts.
          </p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}><a href={href(`/services/${s.slug}/`)}>{s.nav}</a></li>
            ))}
            <li><a href={href("/services/")}>All services</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href={href("/about/")}>About</a></li>
            <li><a href={href("/projects/")}>Projects</a></li>
            <li><a href={href("/contact/")}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${SITE.mobile.tel}`}>{SITE.mobile.label}</a></li>
            <li><a href={`tel:${SITE.office.tel}`}>{SITE.office.label}</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
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

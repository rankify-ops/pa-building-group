"use client";

import { usePathname } from "next/navigation";
import { SERVICES, SITE } from "@/data/site";
import { asset, href } from "@/lib/basePath";
import { normalise, quoteHref } from "@/lib/routes";
import { ArrowIcon, PhoneIcon } from "./Icon";

/** Top-level pages after Services. Home is the logo. */
const PAGES: [string, string][] = [
  ["/projects/", "Projects"],
  ["/about/", "About"],
  ["/contact/", "Contact"],
];

function Brand({ swap = false }: { swap?: boolean }) {
  return (
    <a className="brandmark" href={href("/")} aria-label={`${SITE.brand} home`}>
      <img className="brandmark__light" src={asset("/assets/img/logo.png")} alt={SITE.brand} width={1223} height={437} />
      {/* Dark lockup for the light glass the header turns into once scrolled. */}
      {swap && (
        <img className="brandmark__dark" src={asset("/assets/img/logo-dark.png")} alt="" aria-hidden="true" width={1223} height={437} />
      )}
    </a>
  );
}

function Chevron() {
  return (
    <svg className="nav__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Header() {
  const path = normalise(usePathname());
  const onServices = path.startsWith("/services/") || path.startsWith("/locations/");
  const current = (p: string) => (path.startsWith(p) ? "page" : undefined);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header" id="siteHeader">
        <div className="wrap site-header__inner">
          <Brand swap />
          <nav className="nav" aria-label="Primary">
            <div className="nav__item nav__item--dd">
              <a className="nav__link" href={href("/services/")} aria-current={onServices ? "page" : undefined}>
                Services <Chevron />
              </a>
              <div className="dropdown">
                <div className="dropdown__panel">
                  <a className="dropdown__all" href={href("/services/")}>
                    All services <ArrowIcon size={13} />
                  </a>
                  {SERVICES.map((s) => (
                    <a key={s.slug} href={href(`/services/${s.slug}/`)} aria-current={path === `/services/${s.slug}/` ? "page" : undefined}>
                      {s.nav}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            {PAGES.map(([p, label]) => (
              <a key={p} className="nav__link" href={href(p)} aria-current={current(p)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-phone" href={`tel:${SITE.office.tel}`}>
              <PhoneIcon /> {SITE.office.label}
            </a>
            <button className="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navPanel" aria-label="Menu">
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className="navpanel" id="navPanel" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="wrap navpanel__top">
          <Brand />
        </div>
        <nav className="wrap navpanel__body" aria-label="Mobile">
          <a className="nav__link" style={{ "--i": 0 }} href={href("/services/")} aria-current={onServices ? "page" : undefined}>
            Services
          </a>
          {PAGES.map(([p, label], i) => (
            <a key={p} className="nav__link" style={{ "--i": i + 1 }} href={href(p)} aria-current={current(p)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="wrap navpanel__foot">
          <div className="navpanel__contact">
            <a href={`tel:${SITE.office.tel}`}><PhoneIcon size={16} /> {SITE.office.label}</a>
          </div>
          <a className="btn btn--accent btn--wide" href={quoteHref(path)}>
            Get a free quote <ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
}

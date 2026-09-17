"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { asset, href } from "@/lib/basePath";
import { normalise, quoteHref } from "@/lib/routes";
import { ArrowIcon, MailIcon, PhoneIcon } from "./Icon";

const LINKS: [string, string][] = [
  ["/", "Home"],
  ["/services/", "Services"],
  ["/projects/", "Projects"],
  ["/about/", "About"],
  ["/contact/", "Contact"],
];

function Brand() {
  return (
    <a className="brandmark" href={href("/")} aria-label={`${SITE.brand} home`}>
      <img src={asset("/assets/img/logo.png")} alt={SITE.brand} width={1223} height={437} />
    </a>
  );
}

export function Header() {
  const path = normalise(usePathname());
  const isCurrent = (p: string) =>
    p === "/" ? path === "/" : path.startsWith(p) || (p === "/services/" && path.startsWith("/locations/"));
  const quote = quoteHref(path);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="utility">
        <div className="wrap utility__inner">
          <span className="utility__licence">
            Registered building practitioner &nbsp;/&nbsp; {SITE.registrations.join("  /  ")}
          </span>
          <div className="utility__links">
            <a className="utility__item" href={`tel:${SITE.office.tel}`}>
              <PhoneIcon size={13} /> Office {SITE.office.label}
            </a>
            <a className="utility__item" href={`mailto:${SITE.email}`}>
              <MailIcon size={13} /> {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <header className="site-header" id="siteHeader">
        <div className="wrap site-header__inner">
          <Brand />
          <nav className="nav" aria-label="Primary">
            {LINKS.map(([p, label]) => (
              <a key={p} className="nav__link" href={href(p)} aria-current={isCurrent(p) ? "page" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a className="header-phone" href={`tel:${SITE.mobile.tel}`}>
              <PhoneIcon /> {SITE.mobile.label}
            </a>
            <a className="btn btn--accent" href={quote}>
              Get a quote <ArrowIcon />
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
          {LINKS.map(([p, label], i) => (
            <a key={p} className="nav__link" style={{ "--i": i }} href={href(p)} aria-current={isCurrent(p) ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="wrap navpanel__foot">
          <div className="navpanel__contact">
            <a href={`tel:${SITE.mobile.tel}`}><PhoneIcon size={16} /> {SITE.mobile.label}</a>
            <a href={`mailto:${SITE.email}`}><MailIcon size={16} /> {SITE.email}</a>
          </div>
          <a className="btn btn--accent btn--wide" href={quote}>
            Get a free quote <ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
}

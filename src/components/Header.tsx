"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { asset, href } from "@/lib/basePath";
import { normalise, quoteHref } from "@/lib/routes";
import { ArrowIcon, PhoneIcon } from "./Icon";

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
          {LINKS.map(([p, label], i) => (
            <a key={p} className="nav__link" style={{ "--i": i }} href={href(p)} aria-current={isCurrent(p) ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        <div className="wrap navpanel__foot">
          <div className="navpanel__contact">
            <a href={`tel:${SITE.office.tel}`}><PhoneIcon size={16} /> {SITE.office.label}</a>
          </div>
          <a className="btn btn--accent btn--wide" href={quote}>
            Get a free quote <ArrowIcon />
          </a>
        </div>
      </div>
    </>
  );
}

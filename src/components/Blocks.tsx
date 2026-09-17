import type { ReactNode } from "react";
import { ADDRESS_LINE, SERVICES, SITE, SUBURBS, type Service } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { ArrowIcon, Icon, MailIcon, PhoneIcon, PinIcon, Rich } from "./Icon";
import { EnquiryForm } from "./EnquiryForm";

/* ---------- Interior page hero ---------- */
export function PageHero({
  crumbs,
  title,
  lede,
  image,
  quote = "#enquire",
}: {
  crumbs: [string, string?][];
  title: ReactNode;
  lede: string;
  image: string;
  /** Where "Get a free quote" points; pass null for no buttons. */
  quote?: string | null;
}) {
  return (
    <section className="pagehero">
      <div className="pagehero__media">
        <img src={photo(image)} alt="" width={1158} height={864} fetchPriority="high" />
      </div>
      <div className="wrap">
        <div className="pagehero__inner">
          <ol className="crumbs">
            {crumbs.map(([label, path]) => (
              <li key={label}>{path ? <a href={href(path)}>{label}</a> : label}</li>
            ))}
          </ol>
          <h1>{title}</h1>
          <p className="pagehero__lede">{lede}</p>
          {quote !== null && (
            <div className="pagehero__cta">
              <a className="btn btn--light" href={quote}>Get a free quote <ArrowIcon /></a>
              <a className="btn btn--glass" href={`tel:${SITE.mobile.tel}`}><PhoneIcon /> {SITE.mobile.label}</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({
  eyebrow,
  title,
  lede,
  center,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  center?: boolean;
  action?: ReactNode;
}) {
  const inner = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h-xl">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </>
  );
  if (action) {
    return (
      <div className="section-head section-head--split reveal">
        <div style={{ maxWidth: 780 }}>{inner}</div>
        <div>{action}</div>
      </div>
    );
  }
  return <div className={`section-head reveal${center ? " section-head--center" : ""}`}>{inner}</div>;
}

/* ---------- Service cards ---------- */
export function ServiceCards({ services = SERVICES, suburb }: { services?: Service[]; suburb?: string }) {
  return (
    <div className="cards">
      {services.map((s, i) => (
        <a key={s.slug} className="card reveal" style={{ "--d": `${(i % 3) * 70}ms` }} href={href(`/services/${s.slug}/`)}>
          <span className="card__icon"><Icon name={s.icon} size={40} /></span>
          <h3>{s.title}</h3>
          <p>{suburb ? s.local.replace("{sub}", suburb) : s.blurb}</p>
          <span className="card__foot"><span className="link-arrow">Learn more <ArrowIcon size={13} /></span></span>
        </a>
      ))}
    </div>
  );
}

/* ---------- Numbered pillars ---------- */
export function Pillars({ items }: { items: { heading: string; text: string }[] }) {
  return (
    <div className="pillars">
      {items.map((p, i) => (
        <div key={p.heading} className="pillar reveal" style={{ "--d": `${i * 70}ms` }}>
          <div className="pillar__num">{String(i + 1).padStart(2, "0")}</div>
          <h3>{p.heading}</h3>
          <p>{p.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- FAQ with structured data ---------- */
export function Faq({ items, center }: { items: { q: string; a: string }[]; center?: boolean }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
    })),
  };
  return (
    <div className={`faq${center ? " faq--center" : ""}`}>
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div className="faq__a"><Rich html={f.a} /></div>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}

/* ---------- Registration and contact facts ---------- */
export function Credentials() {
  return (
    <section className="section section--cloud">
      <div className="wrap creds">
        <div className="reveal">
          <p className="eyebrow">Credentials</p>
          <h2 className="h-xl">Registered, and easy to check.</h2>
          <p className="lede" style={{ marginTop: 20 }}>
            Both registrations are with Victoria&rsquo;s {SITE.regulator}. You can look them up on the public
            register before you sign anything, and we&rsquo;d encourage you to.
          </p>
        </div>
        <ul className="creds__list reveal" style={{ "--d": "100ms" }}>
          <li><span className="k">Registered builder</span><span className="v">{SITE.registrations[0]}</span></li>
          <li><span className="k">Company registration</span><span className="v">{SITE.registrations[1]}</span></li>
          <li><span className="k">Regulator</span><span className="v">{SITE.regulator}</span></li>
          <li><span className="k">Director</span><span className="v">{SITE.director}</span></li>
          <li><span className="k">Office</span><span className="v">{ADDRESS_LINE}</span></li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- Suburb list ---------- */
export function Areas({ current }: { current?: string }) {
  return (
    <ul className="areas">
      {SUBURBS.map((s) => (
        <li key={s.slug}>
          <a href={href(`/locations/${s.slug}/`)} aria-current={s.slug === current ? "page" : undefined}>{s.name}</a>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Enquiry section: copy and contacts beside the form ---------- */
export function EnquirySection({ context, title, lede }: { context: string; title: ReactNode; lede: string }) {
  return (
    <section className="section section--cloud">
      <div className="wrap split" style={{ alignItems: "start" }}>
        <div className="reveal">
          <p className="eyebrow">Free quote</p>
          <h2 className="h-xl">{title}</h2>
          <p className="lede" style={{ marginTop: 20 }}>{lede}</p>
          <ul className="ticks">
            <li>No obligation, and no charge for the site visit</li>
            <li>An itemised quote in writing</li>
            <li>Paul runs the job he quotes</li>
          </ul>
          <div className="stack-cta">
            <a className="btn btn--solid" href={`tel:${SITE.mobile.tel}`}><PhoneIcon /> {SITE.mobile.label}</a>
            <a className="btn btn--ghost" href={`mailto:${SITE.email}`}><MailIcon /> Email Paul</a>
          </div>
        </div>
        <EnquiryForm context={context} />
      </div>
    </section>
  );
}

/* ---------- Closing CTA band ---------- */
export function CtaBand({ title, lede }: { title: ReactNode; lede: string }) {
  return (
    <section className="cta">
      <div className="wrap cta__inner">
        <div className="reveal">
          <p className="eyebrow">Get in touch</p>
          <h2>{title}</h2>
          <p className="lede">{lede}</p>
          <ul className="cta__contacts">
            <li><a href={`tel:${SITE.mobile.tel}`}><PhoneIcon size={18} /> {SITE.mobile.label} &nbsp;·&nbsp; Paul</a></li>
            <li><a href={`tel:${SITE.office.tel}`}><PhoneIcon size={18} /> {SITE.office.label} &nbsp;·&nbsp; Office</a></li>
            <li><a href={`mailto:${SITE.email}`}><MailIcon size={18} /> {SITE.email}</a></li>
            <li><span><PinIcon size={18} /> {ADDRESS_LINE}</span></li>
          </ul>
        </div>
        <div className="reveal" style={{ "--d": "100ms", display: "grid", gap: 12 }}>
          <a className="btn btn--accent btn--wide" href={href("/contact/#enquire")}>Request a free quote <ArrowIcon /></a>
          <a className="btn btn--glass btn--wide" href={`tel:${SITE.mobile.tel}`}><PhoneIcon /> Call Paul now</a>
        </div>
      </div>
    </section>
  );
}

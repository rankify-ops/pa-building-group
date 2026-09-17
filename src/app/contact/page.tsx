import type { Metadata } from "next";
import { ADDRESS_LINE, SITE } from "@/data/site";
import { href } from "@/lib/basePath";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/Icon";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Faq, PageHero, SectionHead } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Contact | Free Quotes for Home Renovations Melbourne",
  description: `Call Paul on ${SITE.mobile.label} or send an enquiry for a free site visit and itemised quote. PA Building Group, ${ADDRESS_LINE}.`,
  alternates: { canonical: `${SITE.url}/contact/` },
};

const FAQS = [
  { q: "How do I get a quote?", a: `Fill in the form on this page, call Paul on ${SITE.mobile.label}, or email ${SITE.email}. We'll arrange a site visit and come back with an itemised written quote. No charge and no obligation.` },
  { q: "What areas do you cover?", a: `We're based in ${SITE.address.suburb} and most of our work is across Melbourne's inner, northern and eastern suburbs. We travel further for the right project, so ask even if your suburb isn't on our list.` },
  { q: "How quickly can you start?", a: "It depends on the job and what's already in our programme. Small repairs can often be slotted in quickly; extensions depend on permits more than on our availability. We'll give you a realistic date rather than an optimistic one." },
  { q: "Do you charge for quotes?", a: "No. The site visit and the written quote are free. Detailed design and documentation, if you go that route, is paid work, and we'll tell you what it costs before you commit." },
  { q: "Do you take on small jobs?", a: `Yes. See <a href="/services/maintenance/">property maintenance</a>: a good share of our work is repairs and small carpentry.` },
  { q: "Are you registered?", a: `Yes. ${SITE.director} and the company are both registered with Victoria's ${SITE.regulator}: ${SITE.registrations.join(" and ")}.` },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Contact"]]}
        title={<>Get in <em>touch</em></>}
        lede="Tell us what you're planning. We'll come and look, and come back with a number in writing."
        image="kitchen-galley.jpg"
      />

      <section className="section section--tight">
        <div className="wrap">
          <div className="contact-grid reveal">
            <div className="contact-card">
              <PhoneIcon size={22} />
              <span className="k">Paul, mobile</span>
              <a className="v" href={`tel:${SITE.mobile.tel}`}>{SITE.mobile.label}</a>
              <small>Best for quotes and site visits</small>
            </div>
            <div className="contact-card">
              <PhoneIcon size={22} />
              <span className="k">Office</span>
              <a className="v" href={`tel:${SITE.office.tel}`}>{SITE.office.label}</a>
              <small>Business hours</small>
            </div>
            <div className="contact-card">
              <MailIcon size={22} />
              <span className="k">Email</span>
              <a className="v" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <small>We reply within one business day</small>
            </div>
            <div className="contact-card">
              <PinIcon size={22} />
              <span className="k">Office address</span>
              <span className="v">{SITE.address.street}</span>
              <small>{SITE.address.suburb} {SITE.address.state} {SITE.address.postcode}</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cloud" style={{ paddingTop: "clamp(48px, 6vw, 88px)" }}>
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div className="reveal">
            <p className="eyebrow">Free quote</p>
            <h2 className="h-xl">Request a quote in about a minute.</h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Four quick questions, then your details. Paul will come back to you with next steps and a time for
              the site visit.
            </p>
            <ul className="ticks">
              <li>No obligation, and no charge for the site visit</li>
              <li>An itemised quote in writing</li>
              <li>Registered builder, {SITE.registrations.join(" / ")}</li>
            </ul>
            <p className="body-copy" style={{ marginTop: 28 }}>
              Prefer to talk it through? <a className="link-arrow" href={`tel:${SITE.mobile.tel}`}>Call {SITE.mobile.label}</a>
            </p>
          </div>
          <EnquiryForm context="Contact page" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Common questions." />
          <Faq items={FAQS} />
          <p className="body-copy mt-lg">
            Looking for something specific? <a className="link-arrow" href={href("/services/")}>Browse our services</a>
          </p>
        </div>
      </section>
    </>
  );
}

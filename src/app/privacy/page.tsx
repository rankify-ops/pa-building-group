import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Thornbury Enquiry Form",
  description:
    `What the ${SITE.brand} enquiry form collects and why. We do not sell personal information, and you can ask us for access or deletion by phone or email.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="pagehero__inner">
            <p className="eyebrow">Privacy</p>
            <h1>Privacy <em>policy</em></h1>
            <p className="pagehero__lede">
              How {SITE.brand} handles personal information sent through the enquiry form on this website.
              Written in the style of the Australian Privacy Principles under the Privacy Act 1988 (Cth).
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap legal">
          <h2>Who we are</h2>
          <p className="body-copy">
            {SITE.brand}, {SITE.legal}. To ask about your information, email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
            <a href={`tel:${SITE.mobile.tel}`}>{SITE.mobile.label}</a> or{" "}
            <a href={`tel:${SITE.office.tel}`}>{SITE.office.label}</a>.
          </p>

          <h2>What the enquiry form collects</h2>
          <p className="body-copy">If you send the quote form, we receive:</p>
          <ul>
            <li>the kind of work you are planning</li>
            <li>the property type you choose</li>
            <li>how far along the job is</li>
            <li>your name</li>
            <li>your phone number</li>
            <li>your email address</li>
            <li>your suburb</li>
            <li>anything else you choose to write about the job</li>
          </ul>

          <h2>Why we collect it</h2>
          <p className="body-copy">
            We use those details so {SITE.director} can reply, arrange a site visit and prepare a quote.
            That is the only reason we ask for them.
          </p>

          <h2>We do not sell it</h2>
          <p className="body-copy">We do not sell your personal information.</p>

          <h2>Access or deletion</h2>
          <p className="body-copy">
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or call{" "}
            <a href={`tel:${SITE.mobile.tel}`}>{SITE.mobile.label}</a> or{" "}
            <a href={`tel:${SITE.office.tel}`}>{SITE.office.label}</a>, to ask for a copy of what you sent or to ask us to delete it.
          </p>
        </div>
      </section>
    </>
  );
}

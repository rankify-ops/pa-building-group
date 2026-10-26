import type { Metadata } from "next";
import { SERVICES, SITE } from "@/data/site";
import { href } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon, PhoneIcon } from "@/components/Icon";
import { SectionHead, ServiceCards } from "@/components/Blocks";

export const metadata: Metadata = pageMetadata({
  title: "Thanks, We'll Be in Touch | Thornbury, Melbourne",
  description: `Your enquiry is with ${SITE.brand} in Thornbury. Paul will be in touch to talk through your Melbourne project and book a site visit.`,
  path: "/thank-you/",
  index: false,
});

export default function ThankYouPage() {
  return (
    <>
      <section className="pagehero">
        <div className="wrap">
          <div className="pagehero__inner">
            <p className="eyebrow">Enquiry received</p>
            <h1>Thanks, <em>got it.</em></h1>
            <p className="pagehero__lede">
              Your enquiry is with Paul. He&rsquo;ll be in touch shortly to talk it through and book a site visit. If
              it&rsquo;s urgent, give him a call.
            </p>
            <div className="pagehero__cta">
              <a className="btn btn--light" href={`tel:${SITE.mobile.tel}`}><PhoneIcon /> {SITE.mobile.label}</a>
              <a className="btn btn--glass" href={href("/")}>Back to the site <ArrowIcon /></a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="While you wait" title="Have a look at what we do." />
          <ServiceCards services={SERVICES.slice(0, 6)} />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ADDRESS_LINE, SERVICES, SITE } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";
import { AreaGroups, Credentials, CtaBand, PageHero, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";

export const metadata: Metadata = pageMetadata({
  title: "About Our Melbourne Builders in Thornbury",
  description:
    `${SITE.brand}: ${SITE.years} years in Melbourne residential construction, led by director ${SITE.director}. Registered builder. Office at ${SITE.address.street}, Thornbury.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["About"]]}
        title={<>About <em>{SITE.brand}</em></>}
        lede={`${SITE.years} years of Melbourne residential construction, from a building company that would rather do a smaller number of jobs properly than a large number quickly.`}
        image="facade.jpg"
        alt="Thornbury period home with a restored weatherboard facade"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap split">
          {/* Paul's own words (30 Oct). Do not reword without asking him. */}
          <div className="split__copy reveal">
            <p className="eyebrow">Who we are</p>
            <h2 className="h-xl">A family business, three generations in.</h2>
            <p className="lede" style={{ marginTop: 24 }}>
              {SITE.brand} is a family business, built on more than {SITE.years} years in the construction industry
              and 3rd generation of builders and carpentry.
            </p>
            <p className="body-copy">
              Founded by {SITE.director}, our business has grown from decades of hands-on experience across high-end
              residential renovations, commercial carpentry working on many of the VSBA projects, joinery and
              insurance maintenance. Today, Paul works alongside his sons, Sam and Brody, bringing the next
              generation into the trade while keeping the same standards that have defined our work from the start.
            </p>
            <p className="body-copy">
              As a family business, we take a personal approach to every project. When you work with us, you deal
              directly with the people who own the business and stand behind the result. We treat your home as if it
              were our own: we turn up when we say we will, keep you informed, and finish the job properly.
            </p>
            <p className="body-copy">
              From bathroom and kitchen renovations to new builds, alfresco living, and pre-sale facelifts, we work
              with you and our interior designers to deliver a result that suits your lifestyle and your budget.
            </p>
            <p className="body-copy"><strong>Experience you can trust. Service that&rsquo;s personal.</strong></p>
            <div className="signature">
              <div className="signature__name">{SITE.director}</div>
              <div className="signature__role">Director</div>
            </div>
          </div>
          <div className="split__media reveal" style={{ "--d": "120ms" }}>
            <img src={photo("living-open-plan.jpg")} alt="Thornbury renovation: open-plan living and dining under a raked ceiling" width={1150} height={864} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead eyebrow="What we hold to" title="Four things we don't compromise on." />
          <Pillars
            items={[
              { heading: "Say the number", text: "An itemised quote up front, variations priced in writing before the work happens, and no surprises on the final invoice." },
              { heading: "Answer the phone", text: "You get a direct number for the person running your job. Not a switchboard, not a form." },
              { heading: "Finish it", text: "The defect list is closed out before we ask for final payment, and we come back afterwards for the small stuff." },
              { heading: "Respect the house", text: "Old buildings deserve better than being gutted. We keep what's worth keeping and are honest about what isn't." },
            ]}
          />
        </div>
      </section>

      <section className="section section--cloud">
        <div className="wrap">
          <SectionHead
            eyebrow="Where we work"
            title="Based in Thornbury and Doreen."
            lede="We're based in Thornbury & Doreen and service residential clients across metropolitan Melbourne, with most of our work in the north and north-east. Our main service areas include:"
          />
          <AreaGroups />
          <p className="lede" style={{ marginTop: "clamp(28px, 3vw, 40px)" }}>
            Not sure if we cover your area? Get in touch. If we can get there, we&rsquo;ll take the job.
          </p>
        </div>
      </section>

      <Credentials />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="What we do"
            title="Our services."
            action={<a className="link-arrow" href={href("/services/")}>All services</a>}
          />
          <ServiceCards services={SERVICES.slice(0, 6)} />
        </div>
      </section>

      <CtaBand title="Let's build something worth keeping." lede="Get in touch for a free site visit and an itemised written quote." />
    </>
  );
}

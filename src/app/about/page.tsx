import type { Metadata } from "next";
import { ADDRESS_LINE, SERVICES, SITE } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";
import { Credentials, CtaBand, PageHero, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";

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
          <div className="split__copy reveal">
            <p className="eyebrow">Our story</p>
            <h2 className="h-xl">{SITE.years} years in Melbourne housing.</h2>
            <p className="lede" style={{ marginTop: 24 }}>
              Trading as {SITE.legal}, {SITE.brand} has spent {SITE.years} years in Melbourne residential
              construction, led by director {SITE.director} from our office at {ADDRESS_LINE}.
            </p>
            <p className="body-copy">
              {SITE.years} years in the same city means very little is genuinely new to us. We have worked on Victorian
              terraces, Edwardian weatherboards, Californian bungalows, interwar brick and every era of post-war
              housing since. Each has its own rules and its own surprises, and we have learnt them the way everyone
              does: by opening walls.
            </p>
            <p className="body-copy">
              We are a hands-on outfit. The person who quotes your job is on site while it is being built, and is
              still the person who answers the phone a year later.
            </p>
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

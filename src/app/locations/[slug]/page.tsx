import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECT_NAME, SERVICES, SITE, SUBURBS, suburbBySlug } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { JsonLd } from "@/components/JsonLd";
import { Areas, EnquirySection, PageHero, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";
import { locationJsonLd } from "@/lib/schema";
import { locationDescription, locationTitle, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUBURBS.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sub = suburbBySlug((await params).slug);
  if (!sub) return {};
  return pageMetadata({
    title: locationTitle(sub.name),
    description: locationDescription(sub.name),
    path: `/locations/${sub.slug}/`,
  });
}

export default async function LocationPage({ params }: Props) {
  const sub = suburbBySlug((await params).slug);
  if (!sub) notFound();

  const description = locationDescription(sub.name);

  return (
    <>
      <JsonLd data={locationJsonLd(sub, description)} />
      <PageHero
        crumbs={[["Home", "/"], ["Locations", "/locations/"], [sub.name]]}
        title={<>Builder in <em>{sub.name}</em></>}
        lede={`Home additions, renovations and repairs across ${sub.name} and the surrounding ${sub.region}, from a registered builder with ${SITE.years} years in Melbourne housing.`}
        image="rear-extension.jpg"
        alt={`Rear extension of the kind we build for homes in ${sub.name}, Melbourne`}
      />

      <section className="section">
        <div className="wrap split">
          <div className="split__copy reveal">
            <p className="eyebrow">{SITE.brand} · {sub.name}</p>
            <h2 className="h-lg">Building into {sub.name}&rsquo;s housing stock.</h2>
            <p className="body-copy">
              {sub.name} is characterised by {sub.character}. Houses like these are why most of our work happens at
              the rear: the street frontage is worth keeping, and everything behind it usually needs rethinking.
            </p>
            <p className="body-copy">
              We take on additions, renovations, kitchens and bathrooms, outdoor living areas and ongoing
              maintenance across {sub.name}. Where a heritage or neighbourhood character overlay applies, we handle
              the planning application and council liaison rather than handing it back to you.
            </p>
            <p className="body-copy">
              Every job starts the same way: we look at the house, tell you honestly what&rsquo;s realistic for your
              budget, and put an itemised quote in writing.
            </p>
          </div>
          <div className="split__media reveal" style={{ "--d": "120ms" }}>
            <img src={photo("living-gable.jpg")} alt={`Raked-ceiling rear addition of the kind we build in ${sub.name}, Melbourne`} width={1155} height={864} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section--cloud">
        <div className="wrap">
          <SectionHead eyebrow="Our services" title={<>What we build in {sub.name}.</>} />
          <ServiceCards services={SERVICES.slice(0, 6)} suburb={sub.name} />
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead eyebrow="Why us" title={<>Why {sub.name} homeowners call us.</>} />
          <Pillars
            items={[
              { heading: "We know the area", text: `We work in ${sub.name} and across the ${sub.region}, so the councils, the overlays and the housing stock are all familiar.` },
              { heading: "Itemised quotes", text: "You see the cost of each part of the job before you commit to any of it." },
              { heading: "One team on site", text: "Every trade booked and sequenced by us. You're not coordinating your own renovation." },
              { heading: "We come back", text: "Defects closed out before final payment, and we still answer the phone next year." },
            ]}
          />
        </div>
      </section>

      <EnquirySection
        context={`${sub.name} page`}
        title={<>Planning something in {sub.name}?</>}
        lede={`Free site visit, itemised written quote, and an honest answer about what's worth doing. See the ${PROJECT_NAME} project for the kind of job we take on.`}
      />

      <section className="section section--tight">
        <div className="wrap">
          <SectionHead
            eyebrow="Nearby"
            title="Other suburbs we work in."
            action={<a className="link-arrow" href={href("/projects/")}>See our work</a>}
          />
          <div className="reveal"><Areas current={sub.slug} /></div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { SERVICES, SITE } from "@/data/site";
import { Areas, CtaBand, PageHero, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";
import { href } from "@/lib/basePath";

export const metadata: Metadata = {
  title: "Services | Additions, Renovations, Kitchens & Bathrooms Melbourne",
  description:
    "Home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance, pre-sale facelifts, heritage homes, granny flats and design and build across Melbourne.",
  alternates: { canonical: `${SITE.url}/services/` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Services"]]}
        title={<>Our <em>services</em></>}
        lede="Forty years of Melbourne residential construction: home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts."
        image="living-open-plan.jpg"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Everything we do"
            title="A defined list, done properly."
            lede="We would rather be good at a clear set of jobs than average at everything. If yours isn't on here, ask anyway, and we'll tell you straight if it's not for us."
          />
          <ServiceCards services={SERVICES} />
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead eyebrow="How we work" title="The same on every job, big or small." />
          <Pillars
            items={[
              { heading: "Itemised quotes", text: "You see what each part costs. Where something genuinely can't be priced until walls are open, we say so and put a realistic figure against it." },
              { heading: "One team, all trades", text: "Carpenters, plumbers, electricians, plasterers and tilers booked and sequenced by us. You manage nothing." },
              { heading: "A programme you can plan around", text: "Real dates, and a phone call if anything shifts. Not silence for three weeks." },
              { heading: "Defects closed out", text: "We finish the list before we ask for the final payment, not after, and small things after handover still get sorted." },
            ]}
          />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap">
          <SectionHead eyebrow="Service areas" title="Across Melbourne and surrounds." />
          <div className="reveal"><Areas /></div>
        </div>
      </section>

      <CtaBand title="Let's talk about your project." lede="A site visit and a written quote cost you nothing and commit you to nothing." />
    </>
  );
}

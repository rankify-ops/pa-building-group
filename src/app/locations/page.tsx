import type { Metadata } from "next";
import { ADDRESS_LINE, SITE } from "@/data/site";
import { href } from "@/lib/basePath";
import { AreaGroups, Areas, CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Home Additions Across Melbourne Suburbs",
  description:
    `Suburb pages for home additions and renovations across Melbourne. ${SITE.brand}, a registered builder. The office is at ${SITE.address.street}, Thornbury.`,
  path: "/locations/",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Locations"]]}
        title={<>Suburbs we <em>work in</em></>}
        lede={`Home additions, renovations and repairs across Melbourne, from our only office at ${ADDRESS_LINE}.`}
        image="rear-extension.jpg"
        alt="Rear extension of the kind we build for Melbourne homes"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Locations"
            title="The office is in Thornbury."
            lede="We service residential clients across metropolitan Melbourne, with most of our work in the north and north-east. Our main service areas include:"
          />
          <AreaGroups />
          <p className="lede" style={{ marginTop: "clamp(28px, 3vw, 40px)" }}>
            Not sure if we cover your area? Get in touch. If we can get there, we&rsquo;ll take the job.
          </p>
        </div>
      </section>

      <section className="section section--cloud section--tight">
        <div className="wrap">
          <SectionHead eyebrow="Suburb guides" title="What we see in each suburb." />
          <div className="reveal"><Areas /></div>
        </div>
      </section>

      <CtaBand
        title="Planning a job in your suburb?"
        lede={`A site visit and a written quote cost you nothing. Office at ${ADDRESS_LINE}.`}
      />
    </>
  );
}

import type { Metadata } from "next";
import { ADDRESS_LINE, SITE } from "@/data/site";
import { href } from "@/lib/basePath";
import { Areas, CtaBand, PageHero, SectionHead } from "@/components/Blocks";
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
            lede="Most of our work is across Melbourne's north-east, including Doreen, and we also take jobs in Camberwell, Kew, Hawthorn and Balwyn. If your suburb isn't listed, ask anyway."
          />
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

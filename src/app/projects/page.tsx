import type { Metadata } from "next";
import { PROJECT_NAME, PROJECT_SECTIONS, SITE } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Projects | Home Extensions & Renovations Melbourne",
  description:
    "Recent work by PA Building Group: a Melbourne period home with its facade and front rooms restored and the entire rear rebuilt, including kitchen, bathrooms and garden.",
  alternates: { canonical: `${SITE.url}/projects/` },
};

/** Gallery spans by photo count, so each section fills its rows cleanly. */
const LAYOUT: Record<number, string[]> = {
  1: ["g-12"],
  2: ["g-6", "g-6"],
  3: ["g-12", "g-6", "g-6"],
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Projects"]]}
        title={<>Our <em>projects</em></>}
        lede={`A closer look at ${PROJECT_NAME}: a Melbourne period home with its front rooms restored and the entire rear rebuilt.`}
        image="rear-extension.jpg"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Featured project"
            title={<>{PROJECT_NAME}, Melbourne.</>}
            lede="A weatherboard period home that had run out of room. We restored the street frontage and front rooms, demolished the rear, and rebuilt it as a single raked-ceiling space for cooking, eating and living, with a new kitchen, butler's pantry, two bathrooms, four bedrooms and the garden to go with it."
          />

          {PROJECT_SECTIONS.map((sec) => {
            const spans = LAYOUT[sec.images.length] ?? sec.images.map(() => "g-6");
            return (
              <article key={sec.anchor} className="projectblock" id={sec.anchor}>
                <div className="projectblock__head reveal">
                  <div>
                    <p className="eyebrow">{sec.tag}</p>
                    <h2 className="h-lg">{sec.title}</h2>
                  </div>
                  <p>{sec.blurb}</p>
                </div>
                <div className="gallery">
                  {sec.images.map((img, i) => (
                    <figure key={img.image} className={`${spans[i]} reveal`} style={{ "--d": `${i * 70}ms` }}>
                      <img src={photo(img.image)} alt={`${img.caption}, ${PROJECT_NAME}`} width={1158} height={864} loading="lazy" />
                      <figcaption>{img.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand title="Your place could be next." lede="Start with a free site visit and an itemised written quote." />
    </>
  );
}

import type { Metadata } from "next";
import { PROJECTS, SITE } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Projects | Extensions, Renovations & New Builds Melbourne",
  description:
    "PA Building Group projects in Melbourne. The Thornbury extension and renovation: a restored weatherboard period home with a new rear living pavilion.",
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
        lede="Extensions, renovations and additions across Melbourne. The Thornbury period home is photographed below."
        image="rear-extension.jpg"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Selected work"
            title="Thornbury."
            lede="A weatherboard period home. The street frontage and front rooms were restored, and the rear rebuilt as one raked-ceiling space for cooking, eating and living."
          />
          <div className="projects">
            {PROJECTS.map((project) => (
              <a key={project.slug} className="project project--wide reveal" href={`#${project.slug}`}>
                <div className="project__media">
                  <img src={photo(project.image)} alt="" width={1158} height={864} />
                </div>
                <div className="project__body">
                  <div className="project__meta">{project.kind}</div>
                  <div className="project__title">{project.name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {PROJECTS.map((project) => (
        <section key={project.slug} className="section" id={project.slug}>
          <div className="wrap">
            <SectionHead eyebrow={project.name} title={project.kind} lede={project.summary} />
            {project.groups.map((sec) => {
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
                        <img src={photo(img.image)} alt={`${img.caption}, ${project.name}`} width={1158} height={864} loading="lazy" />
                        <figcaption>{img.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <CtaBand title="Your place could be next." lede="Start with a free site visit and an itemised written quote." />
    </>
  );
}

import type { Metadata } from "next";
import { PROJECTS } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";
import { projectsJsonLd } from "@/lib/schema";
import { pageMetadata, projectAlt } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Melbourne Renovation & Extension Projects",
  description:
    "Thornbury office projects: Smith's Gully extension, Thornbury renovation and extension, Kinglake new build, Coburg renovation and addition, Elwood extension.",
  path: "/projects/",
});

/** Gallery spans by photo count, so each section fills its rows cleanly. */
const LAYOUT: Record<number, string[]> = {
  1: ["g-12"],
  2: ["g-6", "g-6"],
  3: ["g-12", "g-6", "g-6"],
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={projectsJsonLd()} />
      <PageHero
        crumbs={[["Home", "/"], ["Projects"]]}
        title={<>Our <em>projects</em></>}
        lede="Extensions, renovations, an addition and a new build across Melbourne."
        image="rear-extension.jpg"
        alt="Thornbury rear extension opening onto the garden"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Selected work"
            title="Five projects."
            lede="Smith's Gully, Thornbury, Kinglake, Coburg and Elwood."
          />
          <div className="projects">
            {PROJECTS.map((project, i) => (
              <a key={project.slug} className={`project reveal${i === 1 ? " project--wide" : ""}`} style={{ "--d": `${i * 50}ms` }} href={`#${project.slug}`}>
                <div className="project__media">
                  <img src={photo(project.image)} alt={projectAlt(project)} width={1158} height={864} />
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
                      <h3 className="h-lg">{sec.title}</h3>
                    </div>
                    <p>{sec.blurb}</p>
                  </div>
                  <div className="gallery">
                    {sec.images.map((img, i) => (
                      <figure key={img.image} className={`${img.span ?? spans[i]} reveal`} style={{ "--d": `${i * 70}ms` }}>
                        <img src={photo(img.image)} alt={projectAlt(project, img.caption)} width={1158} height={864} loading="lazy" />
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

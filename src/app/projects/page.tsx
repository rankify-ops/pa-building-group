import type { Metadata } from "next";
import { PROJECTS, SITE } from "@/data/site";
import { href, photo } from "@/lib/basePath";
import { CtaBand, PageHero, SectionHead } from "@/components/Blocks";

export const metadata: Metadata = {
  title: "Projects | Extensions, Renovations & New Builds Melbourne",
  description:
    "PA Building Group projects: Smith's Gully, Thornbury, Kinglake, Coburg, Elwood, North Melbourne and Badgers Creek. Extensions, renovations, additions and a new build to lock-up.",
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
        lede="Extensions, renovations, additions and new builds across Melbourne. Thornbury is photographed below. The other projects are listed while their photographs are still to come."
        image="rear-extension.jpg"
        quote={href("/contact/#enquire")}
      />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Selected work"
            title="Seven projects."
            lede="Smith's Gully, Thornbury, Kinglake, Coburg, Elwood, North Melbourne and Badgers Creek."
          />
          <div className="projects">
            {PROJECTS.map((project, i) => (
              <a
                key={project.slug}
                className={`project reveal${i === 1 ? " project--wide" : ""}`}
                style={{ "--d": `${i * 50}ms` }}
                href={project.slug === "thornbury" ? "#thornbury" : `#${project.slug}`}
              >
                <div className={`project__media${project.needsPhoto ? " project__media--empty" : ""}`}>
                  {project.image ? (
                    <img src={photo(project.image)} alt="" width={1158} height={864} loading="lazy" />
                  ) : (
                    <span className="project__await">Photographs to come</span>
                  )}
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

      {PROJECTS.map((project) =>
        project.groups.length > 0 ? (
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
        ) : (
          <section key={project.slug} className="section section--tight" id={project.slug}>
            <div className="wrap">
              <article className="projectblock">
                <div className="projectblock__head reveal">
                  <div>
                    <p className="eyebrow">{project.kind}</p>
                    <h2 className="h-lg">{project.name}</h2>
                  </div>
                  <p>{project.summary}</p>
                </div>
                <div className="project__media project__media--empty" style={{ minHeight: 200, borderRadius: 2 }}>
                  <span className="project__await">Photographs to come</span>
                </div>
              </article>
            </div>
          </section>
        ),
      )}

      <CtaBand title="Your place could be next." lede="Start with a free site visit and an itemised written quote." />
    </>
  );
}

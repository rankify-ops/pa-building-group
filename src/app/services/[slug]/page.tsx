import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, SITE, serviceBySlug } from "@/data/site";
import { photo } from "@/lib/basePath";
import { EnquirySection, Faq, PageHero, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `${SITE.url}/services/${s.slug}/` },
    openGraph: { title: s.metaTitle, description: s.metaDescription },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    areaServed: { "@type": "City", name: "Melbourne" },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: SITE.brand,
      telephone: SITE.office.tel,
      email: SITE.email,
      url: `${SITE.url}/`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[["Home", "/"], ["Services", "/services/"], [s.nav]]}
        title={<>{s.h1} <em>{s.em}</em></>}
        lede={s.lead}
        image={s.blocks[0].image}
      />

      {s.blocks.map((b, i) => (
        <section key={b.heading} className={`section${i % 2 ? " section--cloud" : ""}`}>
          <div className={`wrap split${i % 2 ? " split--flip" : ""}`}>
            <div className="split__copy reveal">
              <p className="eyebrow">{b.tag}</p>
              <h2 className="h-lg">{b.heading}</h2>
              {b.paragraphs.map((p) => <p key={p.slice(0, 24)} className="body-copy">{p}</p>)}
              <ul className="ticks">{b.bullets.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="split__media reveal" style={{ "--d": "120ms" }}>
              <img src={photo(b.image)} alt={`${b.heading}, ${SITE.brand}`} width={1158} height={864} loading="lazy" />
            </div>
          </div>
        </section>
      ))}

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead eyebrow="Why us" title="Why clients choose us for this work." />
          <Pillars items={s.why.map((w) => ({ heading: w.heading, text: w.text }))} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Questions we get asked." />
          <Faq items={s.faq} />
        </div>
      </section>

      <EnquirySection
        context={s.title}
        title={<>Get a quote for your {s.nav.toLowerCase()} project.</>}
        lede="Tell us what you're planning. Paul will come back to you, book a site visit and put an itemised quote in writing."
      />

      <section className="section section--tight">
        <div className="wrap">
          <SectionHead eyebrow="More services" title="What else we take on." />
          <ServiceCards services={others} />
        </div>
      </section>
    </>
  );
}

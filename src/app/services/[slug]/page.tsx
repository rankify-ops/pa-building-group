import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, serviceBySlug } from "@/data/site";
import { photo } from "@/lib/basePath";
import { JsonLd } from "@/components/JsonLd";
import { EnquirySection, Faq, PageHero, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";
import { ExtensionsLayout, RenovationsLayout } from "@/components/ServiceLayouts";
import { serviceJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  const description = s.metaDescription.includes("Thornbury")
    ? s.metaDescription
    : `${s.metaDescription} Office in Thornbury, Melbourne.`;
  return pageMetadata({
    title: s.metaTitle,
    description,
    path: `/services/${s.slug}/`,
  });
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();

  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  if (s.slug === "extensions" || s.slug === "renovations") {
    return (
      <>
        <JsonLd data={serviceJsonLd(s)} />
        {s.slug === "extensions" ? <ExtensionsLayout /> : <RenovationsLayout />}
      </>
    );
  }

  return (
    <>
      <JsonLd data={serviceJsonLd(s)} />
      <PageHero
        crumbs={[["Home", "/"], ["Services", "/services/"], [s.nav]]}
        title={<>{s.h1} <em>{s.em}</em></>}
        lede={s.lead}
        image={s.blocks[0].image}
        alt={`${s.blocks[0].heading} — ${s.title} in Thornbury, Melbourne`}
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
              <img src={photo(b.image)} alt={`${b.heading} — ${s.title} in Thornbury, Melbourne`} width={1158} height={864} loading="lazy" />
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

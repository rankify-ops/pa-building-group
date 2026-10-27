import { SERVICES, serviceBySlug } from "@/data/site";
import { photo } from "@/lib/basePath";
import { ArrowIcon } from "./Icon";
import { EnquirySection, Faq, PageHero, Pillars, SectionHead, ServiceCards } from "./Blocks";

const EXTEND = [
  {
    title: "Extend out",
    text: "A rear extension opens up the back of your home with more light, more living space and a real connection to the backyard. All for less than the cost of stamp duty and moving.",
  },
  {
    title: "Go up",
    text: "Short on yard? Build up. A second storey adds bedrooms, a parent retreat or a home office, without losing an inch of garden.",
  },
  {
    title: "Refresh within",
    text: "Love your period home but not the layout? We open up tired, closed-off rooms into bright, modern living spaces, while keeping the character that made you buy it.",
  },
];

/** Extensions page, following the client's layout: heading, three ticks, turnkey band. */
export function ExtensionsLayout() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Services", "/services/"], ["Extensions & Renovations"]]}
        eyebrow="Extensions & renovations"
        title={<>More space, <em>without the move</em></>}
        lede="Love where you live, just need more room? Extend, build up or open it up, without paying stamp duty and moving costs."
        image="rear-extension.jpg"
        alt="Thornbury rear extension with a raked ceiling opening to the garden"
        quote="#enquire"
      />

      <section className="section">
        <div className="wrap">
          <ul className="offer">
            {EXTEND.map((item) => (
              <li key={item.title} className="reveal">
                <h2 className="h-lg">{item.title}</h2>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="reveal">
            <p className="eyebrow">Turnkey, start to finish</p>
            <h2 className="h-xl">One team. First idea to keys in hand.</h2>
            <p className="lede" style={{ marginTop: 22 }}>
              We bring the whole team: designers, architects, draftspeople, engineers and surveyors, plus permits
              and approvals handled for you. One point of contact from first idea to handing you the keys.
            </p>
            <p className="body-copy turnkey__note">
              Already have your own architect? No problem, we&rsquo;ll build to their plans.
            </p>
            <div className="stack-cta">
              <a className="btn btn--light" href="#enquire">Get in touch <ArrowIcon /></a>
            </div>
          </div>
        </div>
      </section>

      <ServiceFaq slug="extensions" />

      <EnquirySection
        context="Extensions & renovations"
        title={<>Tell us about the space you need.</>}
        lede="A rear extension, a second storey, or opening up the rooms you already have. Paul will come and look, then put an itemised quote in writing."
      />
    </>
  );
}

const RENOVATIONS = {
  paragraphs: [
    "Whether your home needs a facelift or a full rethink, we’ll help you get there. Our in-house interior designers work with you from the start to plan a space that suits your lifestyle, your family and your budget.",
    "Open up the living areas, connect the inside to a new alfresco, or bring tired bathrooms, kitchens and laundries up to date. We design to your budget and build to a standard you’ll be proud of, so you get the best possible outcome for every dollar.",
  ],
  points: [
    "Interior design guidance from concept to completion",
    "Open-plan living and layout reconfiguration",
    "New alfresco and outdoor living spaces",
    "Bathroom, kitchen and laundry upgrades",
    "Custom built-in robes and storage",
  ],
};

const RENO_SECTIONS: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  intro: string;
  points: string[];
  closing?: string;
  image: string;
  alt: string;
}[] = [
  {
    eyebrow: "Home staging & pre-sale facelifts",
    title: "Sell sooner. Sell for more.",
    paragraphs: [
      "First impressions sell houses. We get your home ready for market fast with targeted repairs, a fresh facelift and professional styling. One team handles everything, on time for your sale campaign.",
      "We walk through your home with you, and your agent if you like, and focus on the work buyers notice and will pay for. Nothing more.",
    ],
    intro: "Our facelift services include:",
    points: [
      "Interior and exterior painting",
      "New flooring and carpet",
      "Kitchen and bathroom refreshes",
      "New lighting, tapware, door handles and fittings",
      "Repairs and patching",
      "Gardens, fences, decks and street appeal",
    ],
    closing:
      "Our interior designers then style each room so buyers can picture themselves living there. A well-presented home photographs better, attracts more buyers and gives you the best chance of a strong result.",
    image: "facade.jpg",
    alt: "Thornbury period home with a restored street facade",
  },
  {
    eyebrow: "Home flipping",
    title: "Buy it. Renovate it. Sell it for more.",
    paragraphs: [
      "Whether you’re an investor or buying your first renovation project, we help you turn a tired property into one buyers want. With 43 years in the building industry, we know where to spend to add value, and where not to.",
      "Once you’ve bought, we manage the whole renovation with one team, one contract and one point of contact. We work to a tight programme so you’re not paying holding costs any longer than you need to.",
    ],
    intro: "Our home flipping services include:",
    points: [
      "Kitchen, bathroom and laundry renovations",
      "Painting, flooring, lighting and fittings throughout",
      "Layout changes and open-plan living",
      "Structural repairs, restumping and rewiring",
      "Outdoor living, landscaping and street appeal",
      "Interior design and styling ready for sale",
      "Landscaping / paving",
    ],
    image: "kitchen-island.jpg",
    alt: "Thornbury kitchen renovation with a stone-topped island",
  },
];

function ServiceFaq({ slug, cloud }: { slug: string; cloud?: boolean }) {
  const service = serviceBySlug(slug);
  if (!service) return null;
  return (
    <section className={`section${cloud ? " section--cloud" : ""}`}>
      <div className="wrap">
        <SectionHead eyebrow="FAQ" title="Questions we get asked." />
        <Faq items={service.faq} />
      </div>
    </section>
  );
}

/** Renovations page: Paul's three sections, in his words. */
export function RenovationsLayout() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Services", "/services/"], ["Renovations"]]}
        eyebrow="Renovations"
        title={<>A fresh look <em>for the way you live now</em></>}
        lede={RENOVATIONS.paragraphs[0]}
        image="living-open-plan.jpg"
        alt="Thornbury renovation with open-plan living and dining"
        quote="#enquire"
      />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 980 }}>
          <p className="body-copy">{RENOVATIONS.paragraphs[1]}</p>
          <ul className="ticks ticks--cols">
            {RENOVATIONS.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {RENO_SECTIONS.map((section, i) => (
        <section key={section.eyebrow} className={`section${i === 0 ? " section--cloud" : ""}`}>
          <div className={`wrap split${i % 2 ? " split--flip" : ""}`}>
            <div className="split__copy reveal">
              <p className="eyebrow">{section.eyebrow}</p>
              <h2 className="h-lg">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="body-copy">{paragraph}</p>
              ))}
              <p className="body-copy includes__intro">{section.intro}</p>
              <ul className="includes">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              {section.closing ? <p className="body-copy includes__closing">{section.closing}</p> : null}
            </div>
            <div className="split__media reveal" style={{ "--d": "120ms" }}>
              <img src={photo(section.image)} alt={`${section.alt} — renovations in Thornbury, Melbourne`} width={1158} height={864} loading="lazy" />
            </div>
          </div>
        </section>
      ))}

      <ServiceFaq slug="renovations" cloud />

      <EnquirySection
        context="Renovations"
        title={<>Tell us about the house.</>}
        lede="A renovation, a pre-sale facelift, or a flip. Paul will walk it with you and say plainly what is worth doing."
      />
    </>
  );
}

type ConceptImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  span: string;
};

const GRANNY_FLATS: {
  id: string;
  eyebrow: string;
  name: string;
  summary: string;
  images: ConceptImage[];
}[] = [
  {
    id: "modern-timber",
    eyebrow: "Design 01",
    name: "Modern Timber Granny Flat",
    summary: "1 bedroom, 1 bathroom, open plan living. Total area 32 m², including the deck. 8.0 × 4.0 m.",
    images: [
      {
        src: "granny-flats/modern-timber-exterior.webp",
        alt: "Illustrative concept render of the Modern Timber granny flat",
        caption: "Render",
        width: 1024,
        height: 672,
        span: "g-12 is-sheet",
      },
      {
        src: "granny-flats/modern-timber-plan.webp",
        alt: "Floor plan of the Modern Timber granny flat, 8.0 by 4.0 metres",
        caption: "Floor plan",
        width: 1476,
        height: 834,
        span: "g-12 is-plan",
      },
    ],
  },
  {
    id: "contemporary",
    eyebrow: "Design 02",
    name: "Contemporary Granny Flat",
    summary: "1 bedroom, 1 bathroom, open plan living. Total area 34.5 m², including the covered deck. 7.2 × 4.8 m.",
    images: [
      {
        src: "granny-flats/contemporary-exterior.webp",
        alt: "Illustrative concept render of the Contemporary granny flat",
        caption: "Render",
        width: 1024,
        height: 672,
        span: "g-12 is-sheet",
      },
      {
        src: "granny-flats/contemporary-plan.webp",
        alt: "Floor plan of the Contemporary granny flat, 7.2 by 4.8 metres",
        caption: "Floor plan",
        width: 1440,
        height: 846,
        span: "g-12 is-plan",
      },
    ],
  },
  {
    id: "traditional",
    eyebrow: "Design 03",
    name: "Traditional Granny Flat",
    summary: "1 bedroom, 1 bathroom, laundry, open plan living. Total area 45 m², including the deck. 8.4 × 5.4 m.",
    images: [
      {
        src: "granny-flats/traditional-exterior.webp",
        alt: "Illustrative concept render of the Traditional granny flat",
        caption: "Render",
        width: 1024,
        height: 672,
        span: "g-12 is-sheet",
      },
      {
        src: "granny-flats/traditional-plan.webp",
        alt: "Floor plan of the Traditional granny flat, 8.4 by 5.4 metres",
        caption: "Floor plan",
        width: 1452,
        height: 876,
        span: "g-12 is-plan",
      },
    ],
  },
];

/** Granny flats page: Paul's updated concept sheets, 27 Oct 2026. */
export function GrannyFlatsLayout() {
  const service = serviceBySlug("granny-flats");
  if (!service) return null;
  const others = SERVICES.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Services", "/services/"], [service.nav]]}
        eyebrow="Illustrative concept"
        title={<>{service.h1} <em>{service.em}</em></>}
        lede={service.lead}
        image="granny-flats/modern-timber-exterior.webp"
        alt="Illustrative concept render of the Modern Timber granny flat"
      />

      <section className="section" id="concepts">
        <div className="wrap">
          <p className="eyebrow reveal">Illustrative concept</p>
          {GRANNY_FLATS.map((design) => (
            <article key={design.id} className="projectblock" id={design.id}>
              <div className="projectblock__head reveal">
                <div>
                  <p className="eyebrow">{design.eyebrow}</p>
                  <h3 className="h-lg">{design.name}</h3>
                </div>
                <p>{design.summary}</p>
              </div>
              <div className="gallery">
                {design.images.map((img, i) => (
                  <figure key={img.src} className={`${img.span} reveal`} style={{ "--d": `${i * 70}ms` }}>
                    <img
                      src={photo(img.src)}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                    />
                    <figcaption>{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead eyebrow="Why us" title="Why clients choose us for this work." />
          <Pillars items={service.why.map((item) => ({ heading: item.heading, text: item.text }))} />
        </div>
      </section>

      <ServiceFaq slug="granny-flats" />

      <EnquirySection
        context={service.title}
        title={<>Get a quote for your {service.nav.toLowerCase()} project.</>}
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

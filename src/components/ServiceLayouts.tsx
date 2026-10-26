import { SITE } from "@/data/site";
import { photo } from "@/lib/basePath";
import { ArrowIcon } from "./Icon";
import { EnquirySection, PageHero } from "./Blocks";

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
              and approvals handled for you. One point of contact from the first idea to handing you the keys.
            </p>
            <p className="body-copy turnkey__note">
              Already have your own architect? No problem. We&rsquo;ll build to their plans.
            </p>
            <div className="stack-cta">
              <a className="btn btn--light" href="#enquire">Get in touch <ArrowIcon /></a>
            </div>
          </div>
        </div>
      </section>

      <EnquirySection
        context="Extensions & renovations"
        title={<>Tell us about the space you need.</>}
        lede="A rear extension, a second storey, or opening up the rooms you already have. Paul will come and look, then put an itemised quote in writing."
      />
    </>
  );
}

const RENO_SECTIONS: {
  eyebrow: string;
  title: string;
  lede: string;
  points: string[];
  image: string;
  alt: string;
}[] = [
  {
    eyebrow: "Renovations",
    title: "A fresh look for the way you live now",
    lede: "The house can stay. The way it works doesn't have to. We renovate around how you live now, from a single room through to the whole plan, with design guidance and the building work handled by one team.",
    points: [
      "Interior design guidance",
      "Open-plan and layout changes",
      "Alfresco areas",
      "Bathrooms, kitchens and laundries",
      "Built-in robes and storage",
    ],
    image: "living-open-plan.jpg",
    alt: "Renovated open-plan living and dining",
  },
  {
    eyebrow: "Home staging & pre-sale facelifts",
    title: "Sell sooner. Sell for more.",
    lede: "A focused facelift before you list, timed around your campaign. The work is the kind buyers notice on the first walk-through, finished before the first inspection.",
    points: [
      "Painting",
      "Flooring and carpet",
      "Kitchen and bathroom refresh",
      "Lighting, tapware and handles",
      "Repairs and patching",
      "Gardens, fences, decks and street appeal",
    ],
    image: "facade.jpg",
    alt: "Restored street facade of a Melbourne home",
  },
  {
    eyebrow: "Home flipping",
    title: "Buy it. Renovate it. Sell it for more.",
    lede: "Forty-three years in the building industry, put to work on homes bought to be improved and resold. The job runs from the structure through to the styling, so the finished house is ready for the market.",
    points: [
      "Kitchens, bathrooms and laundries",
      "Painting, flooring and lighting",
      "Layout changes",
      "Structural work, restumping and rewiring",
      "Outdoor living and landscaping",
      "Interior design and styling",
      "Landscaping and paving",
    ],
    image: "kitchen-island.jpg",
    alt: "Renovated kitchen with a stone-topped island",
  },
];

/** Renovations page: three sections, each with its own heading and tick list. */
export function RenovationsLayout() {
  return (
    <>
      <PageHero
        crumbs={[["Home", "/"], ["Services", "/services/"], ["Renovations"]]}
        eyebrow="Renovations"
        title={<>A fresh look <em>for the way you live now</em></>}
        lede={RENO_SECTIONS[0].lede}
        image="living-open-plan.jpg"
        quote="#enquire"
      />

      <section className="section">
        <div className="wrap" style={{ maxWidth: 980 }}>
          <ul className="ticks ticks--cols">
            {RENO_SECTIONS[0].points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {RENO_SECTIONS.slice(1).map((section, i) => (
        <section key={section.eyebrow} className={`section${i === 0 ? " section--cloud" : ""}`}>
          <div className={`wrap split${i % 2 ? " split--flip" : ""}`}>
            <div className="split__copy reveal">
              <p className="eyebrow">{section.eyebrow}</p>
              <h2 className="h-lg">{section.title}</h2>
              <p className="body-copy">{section.lede}</p>
              <ul className="ticks">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="split__media reveal" style={{ "--d": "120ms" }}>
              <img src={photo(section.image)} alt={`${section.alt}, ${SITE.brand}`} width={1158} height={864} loading="lazy" />
            </div>
          </div>
        </section>
      ))}

      <EnquirySection
        context="Renovations"
        title={<>Tell us about the house.</>}
        lede="A renovation, a pre-sale facelift, or a flip. Paul will walk it with you and say plainly what is worth doing."
      />
    </>
  );
}

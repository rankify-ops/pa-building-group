import type { Metadata } from "next";
import { ADDRESS_LINE, PROJECT_NAME, SERVICE_AREAS, SERVICES, SITE } from "@/data/site";
import { asset, href, photo } from "@/lib/basePath";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon, ClockIcon, PinIcon, ShieldIcon } from "@/components/Icon";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HERO_PLACEHOLDER } from "@/data/heroPlaceholder";
import { Credentials, CtaBand, Faq, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";

export const metadata: Metadata = pageMetadata({
  title: "Home Additions & Renovations in Thornbury, Melbourne",
  description:
    `Home additions, renovations, kitchens, bathrooms and outdoor living in Thornbury and north-east Melbourne. Office at ${ADDRESS_LINE}. Call ${SITE.mobile.label} for a free itemised quote.`,
  path: "/",
});

const serviceNames = SERVICES.map((service) => service.nav);
const serviceList = `${serviceNames.slice(0, -1).join(", ")} and ${serviceNames[serviceNames.length - 1]}`;

const HOME_FAQS = [
  {
    q: "What services do you offer?",
    a: `We take on ${serviceList}. Most of the work is home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts. If yours isn't on the list, ask anyway, and we'll tell you straight if it isn't for us. See <a href="/services/">all services</a>.`,
  },
  {
    q: "Which areas of Melbourne do you work in?",
    a: `Our only office is at ${ADDRESS_LINE}. Most of our jobs are in Melbourne's north-east, from Northcote and Preston out through Eltham, Greensborough and Doreen. We also work in Camberwell, Kew, Hawthorn and Balwyn. Published projects include Smith's Gully, Thornbury, Kinglake, Coburg and Elwood. If your suburb isn't listed, ask anyway.`,
  },
  {
    q: "How long does a renovation or extension take?",
    a: "It depends on the job and what's already in the programme. Small repairs can often be slotted in quickly. Extensions depend on permits more than on our availability: most rear extensions run several months on site once permits are in hand, and the permit stage itself depends on the council and whether a heritage overlay applies. We give you a realistic date and a build programme before we start, rather than an optimistic one.",
  },
  {
    q: "How does the process work?",
    a: "Four steps. Tell us the idea, by phone or the form. We come and look, take measurements and send an itemised written quote, with no charge and no obligation. We then build it: programme locked in, trades booked, permits managed, and a number that gets answered. At handover there is a final walk-through, the defect list is closed out, and we still pick up the phone afterwards.",
  },
  {
    q: "Are you a registered builder?",
    a: `Yes. ${SITE.director} and the company are both registered with Victoria's ${SITE.regulator}: ${SITE.registrations.join(" and ")}. You can look them up on the public register before you sign anything.`,
  },
  {
    q: "How do quotes work?",
    a: `Call Paul on ${SITE.mobile.label}, email ${SITE.email}, or send the form. We'll arrange a site visit and come back with an itemised written quote. The visit and the quote are free, and there's no obligation. Detailed design and documentation, if you go that route, is paid work, and we'll tell you what it costs before you commit.`,
  },
  {
    q: "Do you take on small jobs?",
    a: `Yes. A good share of the work is repairs and small carpentry, alongside full additions and renovations. See <a href="/services/maintenance/">property maintenance</a>. Jobs range from one bathroom to the whole back half of the house.`,
  },
  {
    q: "Where is the office, and who do I talk to?",
    a: `${SITE.brand}, trading as ${SITE.legal}, has one office at ${ADDRESS_LINE}. ${SITE.director} is the director, and the person who prices the job is the person running it. Call ${SITE.mobile.label} for quotes and site visits, or the office on ${SITE.office.label}. Email ${SITE.email}.`,
  },
];

const FEATURED: { image: string; title: string; alt: string; anchor: string; wide?: boolean }[] = [
  { image: "rear-extension.jpg", title: "Rear extension", alt: "Thornbury rear extension with a raked-ceiling pavilion opening to the garden", anchor: "extension", wide: true },
  { image: "kitchen-island.jpg", title: "Kitchen & butler's pantry", alt: "Thornbury kitchen renovation with a fluted island and butler's pantry", anchor: "kitchen" },
  { image: "living-gable.jpg", title: "Open-plan living", alt: "Thornbury open-plan living in a rear extension, under a raked ceiling", anchor: "living" },
  { image: "bathroom-main.jpg", title: "Main bathroom", alt: "Thornbury main bathroom renovation with terrazzo and a glazed shower", anchor: "bathrooms" },
  { image: "facade.jpg", title: "Restored facade", alt: "Thornbury period home with a restored weatherboard facade", anchor: "heritage" },
];

export default function Home() {
  return (
    <>

      <section className="hero">
        <div className="hero__media" style={{ backgroundImage: `url(${HERO_PLACEHOLDER})` }}>
          <img
            src={asset("/assets/img/hero.jpg")}
            alt="Thornbury extension: open-plan living and dining under a raked ceiling, opening onto the garden"
            width={1600}
            height={1000}
            fetchPriority="high"
          />
        </div>
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Melbourne renovation builders</p>
            <h1>
              {SITE.years} years of
              <em>Melbourne homes.</em>
            </h1>
            <p className="hero__lede">
              Home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property
              maintenance and pre-sale facelifts. {SITE.years} years of residential building, and the same team from
              first quote to final handover.
            </p>
            <div className="hero__cta">
              <a className="btn btn--light" href="#enquire">Get a free quote <ArrowIcon /></a>
              <a className="btn btn--glass" href={href("/projects/")}>View our work <ArrowIcon /></a>
            </div>
            <ul className="hero__proof">
              <li><ShieldIcon /> Registered builder</li>
              <li><ClockIcon /> {SITE.years} years in Melbourne</li>
              <li><PinIcon /> Based in {SITE.address.suburb}</li>
            </ul>
          </div>
          <EnquiryForm context="Home page" variant="dark" />
        </div>
      </section>

      <aside className="licence-strip">
        <div className="wrap">
          <span>Registered building practitioner</span>
          <span>{SITE.registrations.join("  /  ")}</span>
        </div>
      </aside>

      <section className="statbar" aria-label="At a glance">
        <div className="wrap">
          <div className="statbar__grid">
            <div className="statbar__item"><div className="statbar__figure">{SITE.years}</div><div className="statbar__label">Years in Melbourne<br />residential building</div></div>
            <div className="statbar__item"><div className="statbar__figure">DB-U</div><div className="statbar__label">Registered<br />domestic builder</div></div>
            <div className="statbar__item"><div className="statbar__figure">{SERVICES.length}</div><div className="statbar__label">Services under<br />one roof</div></div>
            <div className="statbar__item"><div className="statbar__figure">1</div><div className="statbar__label">Point of contact,<br />quote to handover</div></div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="wrap split">
          <div className="split__copy reveal">
            <p className="eyebrow">Who we are</p>
            <h2 className="h-xl">A builder you can hand the whole job to.</h2>
            <p className="lede" style={{ marginTop: 24 }}>
              {SITE.brand} has spent {SITE.years} years in Melbourne residential construction. Most of what we do
              is older housing stock: Victorian and Edwardian homes, Californian bungalows, interwar brick, and the
              post-war houses that followed.
            </p>
            <p className="body-copy">
              We restore what gives a house its character and rebuild everything behind it. One team manages
              every trade, the quote is itemised in writing, and the person who prices your job is the person
              running it.
            </p>
            <div className="signature">
              <div className="signature__name">{SITE.director}</div>
              <div className="signature__role">Director</div>
            </div>
          </div>
          <div className="split__media reveal" style={{ "--d": "120ms" }}>
            <div className="media-stack">
              <div className="media-stack__main">
                <img src={photo("formal-lounge.jpg")} alt="Thornbury period renovation: restored front lounge with leadlight windows and a ceiling rose" width={1155} height={864} loading="lazy" />
              </div>
              <div className="media-stack__inset">
                <img src={photo("kitchen-island.jpg")} alt="Thornbury kitchen renovation with a fluted island and stone benchtop" width={1153} height={864} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cloud" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="What we do"
            title="From one bathroom to the whole back half of the house."
            action={<a className="link-arrow" href={href("/services/")}>All {SERVICES.length} services <ArrowIcon size={13} /></a>}
          />
          <ServiceCards services={SERVICES.slice(0, 6)} />
        </div>
      </section>

      <section className="section" id="projects">
        <div className="wrap">
          <SectionHead
            eyebrow="Recent work"
            title={<>{PROJECT_NAME}: a period home that finally works.</>}
            lede="Weatherboard facade and front rooms restored. The rear demolished and rebuilt as a raked-ceiling living, dining and kitchen space that opens straight onto the garden."
            action={<a className="link-arrow" href={href("/projects/")}>See all projects <ArrowIcon size={13} /></a>}
          />
          <div className="projects">
            {FEATURED.map((p, i) => (
              <a key={p.image} className={`project reveal${p.wide ? " project--wide" : ""}`} style={{ "--d": `${i * 60}ms` }} href={href(`/projects/#${p.anchor}`)}>
                <div className="project__media">
                  <img src={photo(p.image)} alt={p.alt} width={1158} height={864} loading="lazy" />
                </div>
                <div className="project__body">
                  <div className="project__meta">{PROJECT_NAME}</div>
                  <div className="project__title">{p.title}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="quoteband">
        <div className="quoteband__media">
          <img src={photo("backyard.jpg")} alt="Thornbury outdoor living: bluestone paved terrace and lawn after the rear extension" width={1157} height={864} loading="lazy" />
        </div>
        <div className="wrap">
          <div className="quoteband__inner reveal">
            <p className="quoteband__text">
              Keep what gives a house its character. Rebuild everything behind it properly.
            </p>
            <span className="quoteband__cite">{SITE.brand} &nbsp;·&nbsp; {SITE.address.suburb}, Melbourne</span>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="wrap">
          <SectionHead
            eyebrow="Why us"
            title="The difference is in how the job is run."
            lede="Renovations go wrong for boring reasons: vague quotes, nobody coordinating trades, and nobody answering the phone. Here is how we work instead."
          />
          <Pillars
            items={[
              { heading: "An itemised quote", text: "You see what every part of the job costs before anything is committed, and variations are priced in writing before they happen." },
              { heading: "A programme you can plan around", text: "Real dates, permits and inspections handled, and a phone call if anything moves." },
              { heading: "Every trade coordinated", text: "Carpenters, plumbers, electricians, plasterers and tilers are booked and sequenced by us. You manage nothing." },
              { heading: "We come back", text: "The defect list is closed out before final payment, and we still pick up the phone after handover." },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="Four steps, no mystery." />
          <div className="process">
            {[
              ["Tell us the idea", "Call or send the form. A rough sketch, a Pinterest board, or just a feeling that the kitchen is too small are all fine starting points."],
              ["We come and look", "A proper site visit, measurements, and an itemised written quote. No charge, no obligation, no sales pitch."],
              ["We build it", "Programme locked in, trades booked, permits managed. Regular updates, and a number that gets answered."],
              ["Handover and after", "Final walk-through, defects closed out, warranties handed over, and we still pick up the phone next year."],
            ].map(([h, p], i) => (
              <div key={h} className="process__step reveal">
                <div className="process__num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Credentials />

      <section className="section section--tight" id="service-areas">
        <div className="wrap">
          <SectionHead
            eyebrow="Service areas"
            title="The office is in Thornbury."
            lede={`Most of our jobs are in Melbourne's north-east, from Northcote and Preston out through Eltham, Greensborough and Doreen. We also work in Camberwell, Kew, Hawthorn and Balwyn. Our only office is at ${ADDRESS_LINE}. If your suburb isn't listed, ask anyway.`}
          />
          <ul className="areas areas--text reveal">
            {SERVICE_AREAS.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--cloud">
        <div className="wrap">
          <SectionHead eyebrow="FAQ" title="Questions we get asked." />
          <Faq items={HOME_FAQS} />
        </div>
      </section>

      <CtaBand
        title="Thinking about the back of your house?"
        lede={`Send through what you've got and Paul will tell you honestly whether it's worth doing. Office at ${ADDRESS_LINE}.`}
      />
    </>
  );
}

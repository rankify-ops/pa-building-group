import { ADDRESS_LINE, PROJECT_NAME, SERVICES, SITE } from "@/data/site";
import { asset, href, photo } from "@/lib/basePath";
import { ArrowIcon, ClockIcon, PinIcon, ShieldIcon } from "@/components/Icon";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Areas, Credentials, CtaBand, Pillars, SectionHead, ServiceCards } from "@/components/Blocks";

const schema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: SITE.brand,
  legalName: SITE.legal,
  description:
    "Over 40 years in Melbourne residential construction: home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts.",
  url: `${SITE.url}/`,
  logo: `${SITE.url}/assets/img/logo-dark.png`,
  image: `${SITE.url}/assets/img/og.jpg`,
  telephone: SITE.office.tel,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.suburb,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.postcode,
    addressCountry: "AU",
  },
  areaServed: { "@type": "City", name: "Melbourne" },
};

const FEATURED: { image: string; title: string; anchor: string; wide?: boolean }[] = [
  { image: "rear-extension.jpg", title: "Rear extension", anchor: "extension", wide: true },
  { image: "kitchen-island.jpg", title: "Kitchen & butler's pantry", anchor: "kitchen" },
  { image: "living-gable.jpg", title: "Open-plan living", anchor: "living" },
  { image: "bathroom-main.jpg", title: "Main bathroom", anchor: "bathrooms" },
  { image: "facade.jpg", title: "Restored facade", anchor: "heritage" },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero">
        <div className="hero__media">
          <img
            src={asset("/assets/img/hero.jpg")}
            alt="Open-plan living and dining under a raked ceiling, opening onto the garden of a Melbourne home"
            width={1600}
            height={1000}
            fetchPriority="high"
          />
        </div>
        <div className="wrap hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">Melbourne renovation builders</p>
            <h1>
              Forty years of
              <em>Melbourne homes.</em>
            </h1>
            <p className="hero__lede">
              Home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property
              maintenance and pre-sale facelifts. Four decades of residential building, and the same team from
              first quote to final handover.
            </p>
            <div className="hero__cta">
              <a className="btn btn--light" href="#enquire">Get a free quote <ArrowIcon /></a>
              <a className="btn btn--glass" href={href("/projects/")}>View our work <ArrowIcon /></a>
            </div>
            <ul className="hero__proof">
              <li><ShieldIcon /> Registered builder</li>
              <li><ClockIcon /> 40+ years in Melbourne</li>
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
            <div className="statbar__item"><div className="statbar__figure">40+</div><div className="statbar__label">Years in Melbourne<br />residential building</div></div>
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
              {SITE.brand} has spent over forty years in Melbourne residential construction. Most of what we do
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
                <img src={photo("formal-lounge.jpg")} alt="Restored front lounge with leadlight windows and a ceiling rose" width={1155} height={864} loading="lazy" />
              </div>
              <div className="media-stack__inset">
                <img src={photo("kitchen-island.jpg")} alt="New kitchen with a fluted island and stone benchtop" width={1153} height={864} loading="lazy" />
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
            action={<a className="link-arrow" href={href("/projects/")}>See the full project <ArrowIcon size={13} /></a>}
          />
          <div className="projects">
            {FEATURED.map((p, i) => (
              <a key={p.image} className={`project reveal${p.wide ? " project--wide" : ""}`} style={{ "--d": `${i * 60}ms` }} href={href(`/projects/#${p.anchor}`)}>
                <div className="project__media">
                  <img src={photo(p.image)} alt={p.title} width={1158} height={864} loading="lazy" />
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
          <img src={photo("backyard.jpg")} alt="" width={1157} height={864} loading="lazy" />
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

      <section className="section section--tight">
        <div className="wrap">
          <SectionHead
            eyebrow="Where we build"
            title="Based in Thornbury, building across Melbourne."
            lede="Most of our work is in the inner, northern and eastern suburbs, but we travel for the right project. If your suburb isn't listed, ask anyway."
          />
          <div className="reveal"><Areas /></div>
        </div>
      </section>

      <CtaBand
        title="Thinking about the back of your house?"
        lede={`Send through what you've got and Paul will tell you honestly whether it's worth doing. Office at ${ADDRESS_LINE}.`}
      />
    </>
  );
}

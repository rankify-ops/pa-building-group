#!/usr/bin/env python3
"""PA Building Group — services index, projects, about, contact, locations, sitemap."""
import json, datetime
from build import (
    BRAND, LEGAL, PHONE, PHONE_HREF, EMAIL, SITE_URL, CITY, STATE, SLOGAN, YEAR,
    SERVICES, svg, head, nav, footer, cta, quote_form, faq_block, service_grid, write,
)
from pages import (
    PROJECT, PROJ_LOC, SUBURBS, SUBURB_LINKS, reviews_section,
    proj_card, content_block, why_grid,
)
from pages2 import phero, BAND


# ===========================================================================
# SERVICES INDEX
# ===========================================================================
def build_services():
    body = (nav(0) + phero([("Home", "index.html"), "Services"], "Our", "Services",
            "Forty years of {city} residential construction &mdash; home additions and renovations, kitchen and "
            "bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts.".replace("{city}", CITY))
    + f'''
<section class="sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Everything We Do</div>
      <h2 class="sec-t fade">What we take on</h2>
      <p class="sec-sub fade">We&rsquo;d rather be good at a defined list than average at everything. If your job isn&rsquo;t on here, ask anyway &mdash; we&rsquo;ll tell you straight if it&rsquo;s not for us.</p>
    </div>
    {service_grid(0)}
  </div>
</section>

<section class="sec why-sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">How We Work</div>
      <h2 class="sec-t fade">The same on every job, big or small</h2>
    </div>
    {why_grid([
      ("doc","Itemised quotes","You see what each part costs. Where something genuinely can&rsquo;t be priced until walls are open, we say so and put a realistic figure against it."),
      ("team","One team, all trades","Carpenters, plumbers, electricians, plasterers and tilers booked and sequenced by us. You manage nothing."),
      ("clock","A programme you can plan around","Real dates, and a phone call if anything shifts. Not silence for three weeks."),
      ("shield","Licensed, insured, certified","Permits, engineering, inspections and compliance documentation handled and handed over."),
      ("check","Defects closed out","We finish the list before we ask for the final payment, not after."),
      ("maintain","We come back","Small stuff after handover gets sorted. That&rsquo;s the whole reason clients call us again."),
    ])}
  </div>
</section>

<section class="sec" id="areas" {BAND}>
  <div class="ctr">
    <div class="sec-tag fade">Service Areas</div>
    <h2 class="sec-t fade">Across {CITY} and surrounds</h2>
    <p class="sec-sub fade">Mostly the inner, eastern and northern suburbs &mdash; but we&rsquo;ll travel for the right project.</p>
    <div class="atags fade">{"".join(f'<a href="locations/{s}.html" class="atag">{n}</a>' for n, s in SUBURB_LINKS)}</div>
  </div>
</section>
'''
    + quote_form("Services Enquiry", "Not sure which<br>one you need?",
                 "Describe the problem rather than the solution &mdash; working out the right approach is our job, not yours.", 0,
                 image="living-open-plan.jpg")
    + cta("Let&rsquo;s talk about your project",
          "A site visit and a written quote cost you nothing and commit you to nothing.", 0, quote_href="#quote-form"))

    write("services.html", head(
        f"Our Services | Extensions, Renovations &amp; Fit-Outs {CITY} | {BRAND}",
        f"Everything {BRAND} takes on across {CITY} — home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance, pre-sale facelifts, heritage homes, granny flats and design and build.",
        "services.html", 0) + body + footer(0, quote_href="#quote-form"))


# ===========================================================================
# PROJECTS
# ===========================================================================
PROJECT_SECTIONS = [
 ("heritage", "Heritage", "The facade stayed exactly where it was",
  "Weatherboards repaired, leadlight retained, the picket fence and front garden reinstated. From the footpath the house reads as it always did &mdash; which is the point.",
  [("facade.jpg", "Restored Facade"), ("formal-lounge.jpg", "Front Lounge"), ("bedroom-leadlight.jpg", "Front Bedroom")]),
 ("extension", "Extension", "A new rear pavilion, resolved against the original roof",
  "The old lean-to came off and a raked-ceiling pavilion went on. High-level glazing along the gable pulls light deep into the plan, and the whole rear wall opens to the garden.",
  [("rear-extension.jpg", "Rear Elevation"), ("living-gable.jpg", "Gable Glazing"), ("build-progress-1.jpg", "Under Construction")]),
 ("living", "Living", "One room for cooking, eating and everything else",
  "Kitchen, dining and living share a single volume under the rake, with the ceiling dropping as it meets the original house so the junction reads deliberately.",
  [("living-open-plan.jpg", "Living &amp; Dining"), ("dining-living.jpg", "Dining Zone"), ("build-progress-3.jpg", "Before Fit-Out")]),
 ("kitchen", "Kitchen", "Fluted island, stone tops and a pantry that hides the mess",
  "A single stone-topped island with fluted joinery, a window splashback instead of tiles, and a butler&rsquo;s pantry behind holding the second sink and everything that lives on the bench.",
  [("kitchen-island.jpg", "Island &amp; Stone"), ("kitchen-galley.jpg", "Window Splashback"), ("butlers-pantry.jpg", "Butler&rsquo;s Pantry")]),
 ("bathrooms", "Bathrooms", "Terrazzo, fluted glass and vertical tile",
  "Main bathroom with a fully glazed bath-shower recess, terrazzo to dado height and vertical stack tile above. The ensuite runs the same palette with a double vanity.",
  [("bathroom-main.jpg", "Main Bathroom"), ("ensuite.jpg", "Ensuite")]),
 ("bedrooms", "Bedrooms", "Four bedrooms, all with proper storage",
  "Original front bedrooms kept their leadlight and ceiling height. The new ones got built-in robes, so nothing has to live on a chair.",
  [("bedroom-robes.jpg", "Built-In Robes"), ("bedroom-guest.jpg", "Guest Bedroom"), ("build-progress-2.jpg", "Frame Stage")]),
 ("garden", "Outdoor", "Bluestone, lawn and a level change that works",
  "Bluestone paving off the living room, a raised lawn behind a low retaining wall, and stepping stones through to the studio at the rear.",
  [("backyard.jpg", "Paved Terrace")]),
]

def build_projects():
    secs = []
    for i, (anchor, tag, title, blurb, imgs) in enumerate(PROJECT_SECTIONS):
        cards = "".join(proj_card(img, t) for img, t in imgs)
        band = BAND if i % 2 == 1 else ""
        secs.append(f'''
<section class="sec" id="{anchor}" {band}>
  <div class="ctr">
    <div class="sec-tag fade">{tag}</div>
    <h2 class="sec-t fade">{title}</h2>
    <p class="sec-sub fade">{blurb}</p>
    <div class="proj-grid" style="margin-top:28px">{cards}</div>
  </div>
</section>''')

    body = (nav(0) + phero([("Home", "index.html"), "Projects"], "Our", "Projects",
            f"A closer look at {PROJECT} &mdash; a {CITY} period home with its front rooms restored and the entire rear rebuilt. Click any image to open it full size.")
    + f'''
<section class="sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Featured Project</div>
      <h2 class="sec-t fade">{PROJECT}, {PROJ_LOC}</h2>
      <p class="sec-sub fade">A weatherboard period home that had run out of room. We restored the street frontage and front rooms, demolished the rear, and rebuilt it as a single raked-ceiling volume for cooking, eating and living &mdash; plus a new kitchen, butler&rsquo;s pantry, two bathrooms, four bedrooms and the garden to go with it.</p>
      <div class="note fade" style="max-width:620px;margin:20px auto 0;text-align:left">
        <strong>Placeholder:</strong> confirm the project name, suburb and completion date with the client, and
        add the other completed jobs they want featured here.
      </div>
    </div>
  </div>
</section>'''
    + "".join(secs)
    + reviews_section()
    + quote_form("Projects Enquiry", "Want something<br>like this?",
                 "Tell us what you&rsquo;re picturing and we&rsquo;ll tell you what it takes to get there.", 0,
                 image="rear-extension.jpg")
    + cta("Your place could be next",
          "We&rsquo;d love to add your project to this page. Start with a free site visit and a written quote.", 0, quote_href="#quote-form"))

    write("projects.html", head(
        f"Our Projects | Extensions &amp; Renovations {CITY} | {BRAND}",
        f"Recent work by {BRAND} — a {CITY} period home with a restored facade and a fully rebuilt rear extension, kitchen, bathrooms and garden.",
        "projects.html", 0) + body + footer(0, quote_href="#quote-form"))


# ===========================================================================
# ABOUT
# ===========================================================================
def build_about():
    schema = json.dumps({
        "@context": "https://schema.org", "@type": "AboutPage",
        "mainEntity": {"@type": "HomeAndConstructionBusiness", "name": BRAND, "legalName": LEGAL,
                       "url": f"{SITE_URL}/", "telephone": PHONE, "email": EMAIL, "slogan": SLOGAN,
                       "areaServed": {"@type": "State", "name": "Victoria"},
                       "address": {"@type": "PostalAddress", "addressLocality": CITY,
                                   "addressRegion": STATE, "addressCountry": "AU"}}
    }, indent=2)

    body = (nav(0) + phero([("Home", "index.html"), "About"], "About", BRAND,
            "Over forty years of residential construction across {city} &mdash; a building company that would rather do a smaller number of jobs properly than a large number quickly.".replace("{city}", CITY),
            quote_href="contact.html#quote-form")
    + f'''
<section class="sec">
  <div class="ctr">
    {content_block("build-progress-1.jpg", "Our Story", "Forty years in {city} housing".format(city=CITY),
      ["Trading as {legal}, {brand} has spent over forty years in {city} residential construction &mdash; home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts.".format(legal=LEGAL, brand=BRAND, city=CITY),
       "Four decades in the same city means very little is genuinely new to us. We&rsquo;ve worked on Victorian terraces, Edwardian weatherboards, Californian bungalows, interwar brick and every era of post-war housing since. Each has its own rules and its own surprises, and we&rsquo;ve learnt them the way everyone does: by opening walls.",
       "We&rsquo;re a hands-on outfit. The person who quotes your job is on site while it&rsquo;s being built, and is still the person who answers the phone a year later. That&rsquo;s deliberate, and it&rsquo;s the main reason our work comes from referrals."])}
    <div class="note fade">
      <strong>Still to confirm with the client:</strong> builder registration number, insurance details,
      number of staff, any HIA / Master Builders membership, and the director&rsquo;s name and background.
      The forty years and the service list come from their Facebook page.
    </div>
  </div>
</section>

<section class="sec why-sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Our Values</div>
      <h2 class="sec-t fade">What we hold to</h2>
    </div>
    {why_grid([
      ("doc","Say the number","An itemised quote up front, variations priced in writing before the work happens, and no surprises on the final invoice."),
      ("chat","Answer the phone","You get a direct number for the person running your job. Not a switchboard, not a form."),
      ("check","Finish it","The defect list gets closed out before we ask for final payment. We come back afterwards for the small stuff."),
      ("heritage","Respect the house","Old buildings deserve better than being gutted. We keep what&rsquo;s worth keeping and are honest about what isn&rsquo;t."),
    ])}
  </div>
</section>

<section class="sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Credentials</div>
      <h2 class="sec-t fade">Licensed, insured, accountable</h2>
      <p class="sec-sub fade">PLACEHOLDER &mdash; replace each card below with the client&rsquo;s actual registration and membership details.</p>
    </div>
    <div class="cinfo">
      <div class="cinfo-card fade">
        <div class="cinfo-ico">{svg("shield")}</div>
        <h4>Registered Builder</h4>
        <p>Registered with the Victorian Building Authority.<br><em>Registration number to be confirmed.</em></p>
      </div>
      <div class="cinfo-card fade">
        <div class="cinfo-ico">{svg("doc")}</div>
        <h4>Fully Insured</h4>
        <p>Public liability and domestic building insurance on qualifying work.<br><em>Policy details to be confirmed.</em></p>
      </div>
      <div class="cinfo-card fade">
        <div class="cinfo-ico">{svg("star")}</div>
        <h4>Industry Membership</h4>
        <p>HIA / Master Builders Victoria membership.<br><em>To be confirmed with the client.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="sec" {BAND}>
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">What We Do</div>
      <h2 class="sec-t fade">Our services</h2>
    </div>
    {service_grid(0)}
  </div>
</section>
'''
    + cta("Let&rsquo;s build something worth keeping",
          "Get in touch for a free site visit and an itemised written quote.", 0))

    write("about.html", head(
        f"About Us | {CITY} Renovation &amp; Extension Builders | {BRAND}",
        f"Meet {BRAND} — over 40 years in {CITY} residential construction. Home additions, renovations, kitchens and bathrooms, outdoor living and property maintenance.",
        "about.html", 0, schema) + body + footer(0))


# ===========================================================================
# CONTACT
# ===========================================================================
def build_contact():
    schema = json.dumps({
        "@context": "https://schema.org", "@type": "ContactPage",
        "mainEntity": {"@type": "HomeAndConstructionBusiness", "name": BRAND,
                       "telephone": PHONE, "email": EMAIL, "url": f"{SITE_URL}/",
                       "address": {"@type": "PostalAddress", "addressLocality": CITY,
                                   "addressRegion": STATE, "addressCountry": "AU"}}
    }, indent=2)

    faqs = [
      ("How do I get a quote?",
       f"Fill in the form on this page, call {PHONE}, or email {EMAIL}. We&rsquo;ll arrange a site visit and come back with an itemised written quote. No charge and no obligation."),
      ("What areas do you cover?",
       f"Most of our work is in {CITY}&rsquo;s inner, eastern and northern suburbs. We travel further for the right project &mdash; ask even if your suburb isn&rsquo;t on our list."),
      ("How quickly can you start?",
       "It depends on the job and what&rsquo;s already in our programme. Small repairs can often be slotted in quickly; extensions depend on permits more than on our availability. We&rsquo;ll give you a realistic date rather than an optimistic one."),
      ("Do you charge for quotes?",
       "No. The site visit and the written quote are free. Detailed design and documentation, if you go that route, is paid work &mdash; we&rsquo;ll tell you what it costs before you commit."),
      ("Do you take on small jobs?",
       "Yes. See the <a href=\"maintenance.html\">maintenance and repairs</a> page &mdash; a good chunk of our work is repairs and small carpentry for people we&rsquo;ve built for before."),
      ("What should I have ready before I call?",
       "Nothing, honestly. A rough description is plenty. If you already have plans, photos or a builder&rsquo;s report, send them through &mdash; it means we can be more useful on the first call."),
    ]

    body = (nav(0, quote_href="#quote-form") + phero([("Home", "index.html"), "Contact"], "Get In", "Touch",
            "Tell us what you&rsquo;re planning. We&rsquo;ll come and look, and come back with a number in writing.")
    + f'''
<section class="sec">
  <div class="ctr">
    <!-- TODO (Rankify): replace phone, email and any office address with the client's real details -->
    <div class="note fade" style="max-width:620px;margin:0 auto 8px;text-align:center">
      <strong>Placeholder details.</strong> Phone and email below are placeholders &mdash; swap them for the
      client&rsquo;s real contact details across the site before launch.
    </div>
    <div class="cinfo">
      <div class="cinfo-card fade">
        <div class="cinfo-ico">{svg("phone")}</div>
        <h4>Call Us</h4>
        <a href="tel:{PHONE_HREF}">{PHONE}</a>
        <p>Business hours, {CITY} time</p>
      </div>
      <div class="cinfo-card fade">
        <div class="cinfo-ico">{svg("mail")}</div>
        <h4>Email Us</h4>
        <a href="mailto:{EMAIL}">{EMAIL}</a>
        <p>We reply within one business day</p>
      </div>
      <div class="cinfo-card fade">
        <div class="cinfo-ico">{svg("pin")}</div>
        <h4>Where We Work</h4>
        <p>{CITY}, {STATE}</p>
        <p>Inner, eastern &amp; northern suburbs</p>
      </div>
    </div>
  </div>
</section>
'''
    + quote_form("Contact Enquiry", "Request a quote<br>in about a minute",
                 "Four quick questions, then your details. We&rsquo;ll be back to you with next steps and a time for the site visit.", 0,
                 image="kitchen-island.jpg")
    + faq_block("FAQ", "Common questions", "", faqs)
    + cta("Prefer to just call?",
          f"We&rsquo;d rather have a two-minute conversation than a two-week email chain.", 0, quote_href="#quote-form"))

    write("contact.html", head(
        f"Contact {BRAND} | {CITY} Renovation &amp; Extension Builders",
        f"Contact {BRAND} for a free site visit and itemised written quote on extensions, renovations, kitchens, bathrooms and fit-outs across {CITY}.",
        "contact.html", 0, schema) + body + footer(0, quote_href="#quote-form"))


# ===========================================================================
# THANK YOU
# ===========================================================================
def build_thankyou():
    body = f'''{nav(0)}
<section class="phero">
  <div class="phero-inner">
    <div class="ctr">
      <div style="font-size:3rem;margin-bottom:12px" aria-hidden="true">&#9989;</div>
      <h1>Thanks &mdash; <span class="em">got it</span></h1>
      <p>Your enquiry has landed. We&rsquo;ll be in touch shortly with next steps and a time for the site visit. If it&rsquo;s urgent, give us a call and we&rsquo;ll pick up.</p>
      <div class="phero-btns">
        <a href="tel:{PHONE_HREF}" class="btn-p">&#128222; {PHONE}</a>
        <a href="index.html" class="btn-glass">Back to the site</a>
      </div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">While You Wait</div>
      <h2 class="sec-t fade">Have a look at what we do</h2>
    </div>
    {service_grid(0)}
    <div style="text-align:center;margin-top:40px" class="fade">
      <a href="projects.html" class="btn-dark">See our recent work &rarr;</a>
    </div>
  </div>
</section>
'''
    write("thank-you.html", head(
        f"Thanks &mdash; we&rsquo;ll be in touch | {BRAND}",
        "Your enquiry has been received. We'll be in touch shortly.",
        "thank-you.html", 0).replace('<meta name="robots" content="index, follow">',
                                     '<meta name="robots" content="noindex, follow">')
        + body + footer(0))


# ===========================================================================
# 404
# ===========================================================================
def build_404():
    body = f'''{nav(0)}
<section class="phero">
  <div class="phero-inner">
    <div class="ctr">
      <h1>Page <span class="em">not found</span></h1>
      <p>That link doesn&rsquo;t go anywhere. It may have moved, or it may never have existed. Try one of these instead.</p>
      <div class="phero-btns">
        <a href="index.html" class="btn-p">Back to home</a>
        <a href="contact.html" class="btn-glass">Contact us</a>
      </div>
    </div>
  </div>
</section>
<section class="sec"><div class="ctr">{service_grid(0)}</div></section>
'''
    write("404.html", head(f"Page not found | {BRAND}", "The page you were looking for doesn't exist.",
                           "404.html", 0).replace('<meta name="robots" content="index, follow">',
                                                  '<meta name="robots" content="noindex, nofollow">')
          + body + footer(0))


# ===========================================================================
# LOCATION PAGES
# ===========================================================================
def build_locations():
    for name, slug, region, character in SUBURBS:
        title = f"Builder {name} | Extensions &amp; Renovations | {BRAND}"
        desc = (f"Renovation and extension builder in {name}. Period home extensions, kitchens, "
                f"bathrooms and fit-outs across {CITY}'s {region}. Free itemised quote.")
        schema = json.dumps({
            "@context": "https://schema.org", "@type": "Service",
            "name": f"Builder {name}",
            "serviceType": "Home extensions, renovations and building services",
            "description": desc,
            "areaServed": {"@type": "City", "name": name,
                           "containedInPlace": {"@type": "City", "name": CITY}},
            "provider": {"@type": "HomeAndConstructionBusiness", "name": BRAND, "legalName": LEGAL,
                         "telephone": PHONE, "email": EMAIL, "url": f"{SITE_URL}/",
                         "address": {"@type": "PostalAddress", "addressLocality": CITY,
                                     "addressRegion": STATE, "addressCountry": "AU"}}
        }, indent=2)

        body = (nav(1) + phero([("Home", "index.html"), "Locations", name], "Builder in", name,
                f"Renovation and extension builders working across {name} and the surrounding {region}. "
                f"We know the housing stock here &mdash; {character} &mdash; and what it takes to build into it.", 1)
        + f'''
<section class="sec">
  <div class="ctr">
    <div class="content-g fade">
      <div class="content-body">
        <div class="sec-tag">{BRAND} &bull; {name}</div>
        <h2>Building into {name}&rsquo;s housing stock</h2>
        <p>{name} is characterised by {character}. Houses like these are why we do most of our work at the rear &mdash; the street frontage is worth keeping, and everything behind it usually needs rethinking.</p>
        <p>We take on rear extensions, whole-home renovations, kitchens and bathrooms, and second dwellings across {name}. Where a heritage or neighbourhood character overlay applies, we handle the planning application, the heritage advice and the council liaison rather than handing it back to you.</p>
        <p>Every job starts the same way: we come and look at the house, we tell you honestly what&rsquo;s realistic for your budget, and we put an itemised quote in writing. If we think you&rsquo;d be better off spending less, we&rsquo;ll say so.</p>
        <ul class="tlist">
          <li>Rear and second-storey extensions</li>
          <li>Whole-home and room-by-room renovations</li>
          <li>Kitchens, bathrooms, ensuites and laundries</li>
          <li>Heritage overlay work and period restoration</li>
          <li>Granny flats, studios and home offices</li>
          <li>Commercial fit-outs and lease make-goods</li>
          <li>Ongoing maintenance, carpentry and repairs</li>
        </ul>
      </div>
      <div class="content-img"><img src="../images/projects/rear-extension.jpg" alt="Rear extension on a period home near {name}, {CITY}" loading="lazy" width="1158" height="864"></div>
    </div>
  </div>
</section>

<section class="sec" {BAND}>
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Our Services</div>
      <h2 class="sec-t fade">What we build in {name}</h2>
      <p class="sec-sub fade">The same standard on every job, whether it&rsquo;s a full rear addition or a rotten set of steps.</p>
    </div>
    {service_grid(1, localise=name)}
  </div>
</section>

<section class="sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Recent Work</div>
      <h2 class="sec-t fade">A period home, rebuilt from the hallway back</h2>
      <p class="sec-sub fade">The kind of project we take on in {name} &mdash; facade restored, rear demolished and rebuilt as one raked-ceiling living space.</p>
    </div>
    <div class="proj-grid">
      {proj_card("rear-extension.jpg", "Rear Extension", link="projects.html#extension", depth=1)}
      {proj_card("kitchen-island.jpg", "Kitchen &amp; Pantry", link="projects.html#kitchen", depth=1)}
      {proj_card("bathroom-main.jpg", "Main Bathroom", link="projects.html#bathrooms", depth=1)}
    </div>
  </div>
</section>

<section class="sec why-sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Why Us</div>
      <h2 class="sec-t fade">Why {name} homeowners call us</h2>
    </div>
    {why_grid([
      ("pin","We know the area","We work in {n} and the surrounding {r} regularly &mdash; the councils, the overlays and the housing stock are all familiar.".format(n=name, r=region)),
      ("doc","Itemised quotes","You see the cost of each part of the job before you commit to any of it."),
      ("team","One team on site","Every trade booked and sequenced by us. You&rsquo;re not coordinating your own renovation."),
      ("check","We come back","Defects closed out before final payment, and we still answer the phone next year."),
    ])}
  </div>
</section>
'''
        + quote_form(f"{name} Enquiry", f"Get a quote for<br>your {name} project",
                     "Four quick questions and we&rsquo;ll come back with next steps and a time for the site visit.", 1,
                     image="living-open-plan.jpg")
        + f'''
<section class="sec" {BAND}>
  <div class="ctr">
    <div class="sec-tag fade">Nearby</div>
    <h2 class="sec-t fade">Other suburbs we work in</h2>
    <div class="atags fade">{"".join(f'<a href="{s}.html" class="atag">{n}</a>' for n, s in SUBURB_LINKS if s != slug)}</div>
  </div>
</section>'''
        + cta(f"Planning something in {name}?",
              "Free site visit, itemised written quote, and an honest answer about what&rsquo;s worth doing.", 1, quote_href="#quote-form"))

        write(f"locations/{slug}.html",
              head(title, desc, f"locations/{slug}.html", 1, schema) + body + footer(1, quote_href="#quote-form"))


# ===========================================================================
# SITEMAP + ROBOTS
# ===========================================================================
def build_sitemap():
    today = datetime.date.today().isoformat()
    urls = [("", "1.0"), ("services.html", "0.9"), ("projects.html", "0.8"),
            ("about.html", "0.7"), ("contact.html", "0.8")]
    urls += [(s.slug, "0.9") for s in SERVICES]
    urls += [(f"locations/{s}.html", "0.6") for _, s in SUBURB_LINKS]
    entries = "\n".join(
        f"  <url><loc>{SITE_URL}/{u}</loc><lastmod>{today}</lastmod><priority>{p}</priority></url>"
        for u, p in urls)
    write("sitemap.xml",
          '<?xml version="1.0" encoding="UTF-8"?>\n'
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + entries + "\n</urlset>\n")
    write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE_URL}/sitemap.xml\n")

#!/usr/bin/env python3
"""
PA Building Group — page content.

    python pages.py      # regenerates every .html file in the repo

Shared chrome (nav, footer, quote form, icons) lives in build.py.
Everything marked PLACEHOLDER needs the client's real words before launch.
"""
import json
from build import (
    BRAND, LEGAL, PHONE, PHONE_HREF, EMAIL, SITE_URL, CITY, STATE, SLOGAN, YEAR,
    SERVICES, svg, head, nav, footer, cta, quote_form, faq_block, service_grid, write,
)

PROJECT  = "Ethel Street"        # TODO (Rankify): confirm the suburb with the client
PROJ_LOC = "Melbourne, VIC"

# ---------------------------------------------------------------------------
# Service areas
# ---------------------------------------------------------------------------
SUBURBS = [
    # (name, slug, region, one-line character note used in the location page copy)
    ("Brunswick",      "brunswick",      "inner north", "terrace rows, workers&rsquo; cottages and warehouse conversions off Sydney Road"),
    ("Northcote",      "northcote",      "inner north", "Californian bungalows and Edwardian weatherboards on tight, deep blocks"),
    ("Thornbury",      "thornbury",      "inner north", "interwar brick and weatherboard homes with generous back yards"),
    ("Preston",        "preston",        "north",       "post-war brick veneers and bungalows with room to extend"),
    ("Coburg",         "coburg",         "north",       "solid interwar brick homes and a growing number of rear additions"),
    ("Reservoir",      "reservoir",      "north",       "large post-war blocks that suit second dwellings and big extensions"),
    ("Fitzroy",        "fitzroy",        "inner city",  "Victorian terraces, heritage overlays and very little room to move"),
    ("Collingwood",    "collingwood",    "inner city",  "narrow terraces and former industrial buildings turned homes"),
    ("Carlton",        "carlton",        "inner city",  "double-fronted Victorians under some of Melbourne&rsquo;s strictest overlays"),
    ("Richmond",       "richmond",       "inner east",  "single-fronted cottages where every millimetre of the rear counts"),
    ("Hawthorn",       "hawthorn",       "inner east",  "Edwardian and Federation homes on established, leafy streets"),
    ("Kew",            "kew",            "inner east",  "large period homes, heritage overlays and serious renovation budgets"),
    ("Camberwell",     "camberwell",     "east",        "Californian bungalows and Edwardians on wide, established blocks"),
    ("Balwyn",         "balwyn",         "east",        "interwar brick homes with deep rear yards made for extensions"),
    ("Box Hill",       "box-hill",       "east",        "a mix of post-war homes and newer builds across a fast-changing suburb"),
    ("Doncaster",      "doncaster",      "east",        "sloping sites and split-level homes that reward careful planning"),
    ("Ringwood",       "ringwood",       "outer east",  "post-war brick veneers on generous, often sloping blocks"),
    ("Eltham",         "eltham",         "north east",  "mud brick, timber and bushfire-overlay sites among the gums"),
    ("Ivanhoe",        "ivanhoe",        "north east",  "Federation and interwar homes on established streets above the Yarra"),
    ("Heidelberg",     "heidelberg",     "north east",  "solid interwar homes and post-war brick veneers with room at the rear"),
    ("Essendon",       "essendon",       "north west",  "grand Edwardians and Californian bungalows under heritage controls"),
    ("Moonee Ponds",   "moonee-ponds",   "north west",  "Victorian and Edwardian homes on tree-lined, tightly-held streets"),
    ("Ascot Vale",     "ascot-vale",     "north west",  "Edwardian weatherboards and brick homes on narrow, deep allotments"),
    ("Yarraville",     "yarraville",     "inner west",  "workers&rsquo; cottages and Californian bungalows around the village"),
    ("Footscray",      "footscray",      "inner west",  "Victorian and Edwardian cottages in a rapidly renovating pocket"),
    ("Williamstown",   "williamstown",   "west",        "coastal heritage homes where salt air and overlays both matter"),
    ("South Yarra",    "south-yarra",    "inner south", "terraces and apartments where access and noise rules shape the build"),
    ("Prahran",        "prahran",        "inner south", "single-fronted Victorians squeezed between neighbours on both sides"),
    ("Armadale",       "armadale",       "inner south", "period homes with high expectations on finish and detail"),
    ("Malvern",        "malvern",        "south east",  "large Edwardian and interwar homes on wide, established blocks"),
    ("Caulfield",      "caulfield",      "south east",  "interwar brick homes and a steady run of rear extensions"),
    ("Brighton",       "brighton",       "bayside",     "substantial period homes and coastal rebuilds on premium blocks"),
]
SUBURB_LINKS = [(n, s) for n, s, _, _ in SUBURBS]


# ---------------------------------------------------------------------------
# Reusable blocks
# ---------------------------------------------------------------------------
PLACEHOLDER_REVIEW = ("Client review goes here &mdash; pulled from the Google Business Profile "
                      "once it&rsquo;s connected.")

def reviews_section():
    def card(i):
        return ('<div class="rcard"><div class="rs">&#9733;&#9733;&#9733;&#9733;&#9733;</div>'
                f'<p class="rt">&ldquo;{PLACEHOLDER_REVIEW}&rdquo;</p>'
                '<div class="ra"><div class="rav">?</div><div>'
                '<div class="ran">Client name</div><div class="ral">Suburb, VIC</div>'
                '</div></div></div>')
    track = "".join(card(i) for i in range(12))
    google_svg = (
        '<svg width="20" height="20" viewBox="0 0 48 48" style="flex-shrink:0" aria-hidden="true">'
        '<path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.6-.4-3.9z"/>'
        '<path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.8 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>'
        '<path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.8-3.4-11.4-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"/>'
        '<path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.2-2.6-.4-3.9z"/></svg>')
    return f'''
<section class="rev-sec" id="reviews">
  <div class="rev-header">
    <div class="sec-tag fade">Reviews</div>
    <h2 class="sec-t fade">What clients say</h2>
    <!-- PLACEHOLDER: connect the client's Google Business Profile, then replace
         these dummy cards and the badge rating with the real thing. -->
    <div class="note fade" style="max-width:620px">
      <strong>Placeholder section.</strong> The cards below are dummy text so you can see the layout &mdash;
      swap in real Google reviews once the client&rsquo;s Business Profile is connected.
    </div>
    <div class="gbadge-link fade" style="margin-top:18px">
      <div class="gbadge">{google_svg}<span class="gs">&#9733;&#9733;&#9733;&#9733;&#9733;</span><span class="gv">&mdash;</span><span class="gc">Google Reviews</span></div>
    </div>
  </div>
  <div class="marquee-row right" aria-hidden="true"><div class="marquee-track">{track}</div></div>
</section>'''


def proj_card(img, title, loc=None, link=None, depth=0, alt=None):
    p = "../" * depth
    loc = loc or PROJ_LOC
    alt = alt or f"{title} — {PROJECT}, {loc}"
    if link:
        return (f'<a href="{p}{link}" class="proj-card fade">'
                f'<img src="{p}images/projects/{img}" alt="{alt}" loading="lazy" width="1158" height="864">'
                f'<div class="proj-card-overlay"><h3>{title}</h3><p>{loc}</p></div></a>')
    return (f'<div class="proj-card fade">'
            f'<img src="{p}images/projects/{img}" alt="{alt}" loading="lazy" width="1158" height="864">'
            f'<div class="proj-card-overlay"><h3>{title}</h3><p>{loc}</p></div></div>')


def content_block(img, tag, h, paras, bullets=None, reverse=False, depth=0, heading="h2"):
    p = "../" * depth
    rev = " rev" if reverse else ""
    ps = "".join(f"<p>{x}</p>" for x in paras)
    bl = ""
    if bullets:
        bl = '<ul class="tlist">' + "".join(f"<li>{b}</li>" for b in bullets) + "</ul>"
    return f'''
<div class="content-g{rev} fade">
  <div class="content-img"><img src="{p}images/projects/{img}" alt="{h} &mdash; {BRAND}, {CITY}" loading="lazy" width="1158" height="864"></div>
  <div class="content-body">
    <div class="sec-tag">{tag}</div>
    <{heading}>{h}</{heading}>
    {ps}
    {bl}
  </div>
</div>'''


def why_grid(cards):
    out = []
    for icon, h, p in cards:
        out.append(f'<div class="wcard fade"><div class="wico">{svg(icon)}</div><div><h4>{h}</h4><p>{p}</p></div></div>')
    return '<div class="why-g">' + "".join(out) + '</div>'


# ---------------------------------------------------------------------------
# HOME
# ---------------------------------------------------------------------------
def build_home():
    schema = f'''{{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "{BRAND}",
  "legalName": "{LEGAL}",
  "description": "{CITY} renovation and extension builders specialising in period homes, rear extensions, kitchens and bathrooms.",
  "url": "{SITE_URL}/",
  "logo": "{SITE_URL}/images/logo-dark.png",
  "image": "{SITE_URL}/images/og.jpg",
  "telephone": "{PHONE}",
  "email": "{EMAIL}",
  "slogan": "{SLOGAN}",
  "address": {{"@type": "PostalAddress", "addressLocality": "{CITY}", "addressRegion": "{STATE}", "addressCountry": "AU"}},
  "areaServed": {{"@type": "State", "name": "Victoria", "containedInPlace": {{"@type": "Country", "name": "Australia"}}}},
  "knowsAbout": ["Home extensions", "Renovations", "Kitchens", "Bathrooms", "Heritage homes", "Granny flats", "Commercial fit-outs", "Building maintenance"]
}}'''

    projects = "".join([
        proj_card("rear-extension.jpg", "Rear Extension", link="projects.html#extension"),
        proj_card("kitchen-island.jpg", "Kitchen &amp; Butler&rsquo;s Pantry", link="projects.html#kitchen"),
        proj_card("living-gable.jpg", "Open-Plan Living", link="projects.html#living"),
        proj_card("bathroom-main.jpg", "Main Bathroom", link="projects.html#bathrooms"),
        proj_card("facade.jpg", "Restored Facade", link="projects.html#heritage"),
        proj_card("backyard.jpg", "Paving &amp; Garden", link="projects.html#garden"),
    ])
    areas = "".join(f'<a href="locations/{s}.html" class="atag">{n}</a>' for n, s in SUBURB_LINKS)

    body = f'''{nav(0, quote_href="#quote-form")}

<section class="hero">
  <div class="hero-bg"><img src="images/hero.jpg" alt="Rear extension with raked ceiling and full-height glazing on a {CITY} period home" width="1600" height="1000" fetchpriority="high"></div>
  <div class="hero-inner">
    <div class="ctr">
      <div class="hero-content">
        <div class="hero-tag"><span class="dot"></span>Taking on new projects across {CITY}</div>
        <h1>Keep the <span class="em">character</span>.<br>Gain the space.</h1>
        <p class="hero-sub">{BRAND} are {CITY} renovation and extension builders. We restore what gives a house its character at the front and rebuild everything behind it &mdash; light, height, and a floor plan that suits how you actually live.</p>
        <div class="hero-btns">
          <a href="#quote-form" class="btn-p">Get a Free Quote &rarr;</a>
          <a href="tel:{PHONE_HREF}" class="btn-glass">&#128222; {PHONE}</a>
        </div>
      </div>
      <!-- TODO (Rankify): confirm these four claims with the client before launch -->
      <div class="hero-cards">
        <div class="hero-glass"><div class="hg-icon">{svg("design")}</div><div><div class="hg-val">End&#8209;to&#8209;end</div><div class="hg-label">Design to handover</div></div></div>
        <div class="hero-glass"><div class="hg-icon">{svg("doc")}</div><div><div class="hg-val">Fixed price</div><div class="hg-label">Written contracts</div></div></div>
        <div class="hero-glass"><div class="hg-icon">{svg("team")}</div><div><div class="hg-val">One team</div><div class="hg-label">Every trade managed</div></div></div>
        <div class="hero-glass"><div class="hg-icon">{svg("pin")}</div><div><div class="hg-val">Local</div><div class="hg-label">{CITY} &amp; suburbs</div></div></div>
      </div>
    </div>
  </div>
</section>

<section class="benefits">
  <div class="ctr">
    <div class="benefits-grid">
      <div class="ben-item"><div class="ben-ico">{svg("shield")}</div><h4>Licensed &amp; Insured</h4><p>Registered builder with full public liability and domestic building insurance</p></div>
      <div class="ben-item"><div class="ben-ico">{svg("heritage")}</div><h4>Period Home Specialists</h4><p>Heritage overlays, restumping, leadlight and lath-and-plaster hold no surprises</p></div>
      <div class="ben-item"><div class="ben-ico">{svg("team")}</div><h4>One Point of Contact</h4><p>Whoever quotes your job runs your job. No hand-offs, no chasing</p></div>
      <div class="ben-item"><div class="ben-ico">{svg("doc")}</div><h4>Itemised Quotes</h4><p>You see what every line costs before a tool comes out of the ute</p></div>
    </div>
  </div>
</section>

<section class="sec" id="services">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">What We Do</div>
      <h2 class="sec-t fade">From one bathroom to the whole back half of the house</h2>
      <p class="sec-sub fade">Most of our work is residential &mdash; extensions, renovations and period homes. We also take on commercial fit-outs and ongoing maintenance for the clients we already build for.</p>
    </div>
    {service_grid(0)}
  </div>
</section>

<section class="sec" id="projects" style="background:var(--g50);border-top:1px solid var(--g200);border-bottom:1px solid var(--g200)">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Recent Work</div>
      <h2 class="sec-t fade">{PROJECT} &mdash; a period home that finally works</h2>
      <p class="sec-sub fade">Weatherboard facade and front rooms restored; the rear demolished and rebuilt as a raked-ceiling living, dining and kitchen space that opens straight onto the garden.</p>
    </div>
    <div class="proj-grid">{projects}</div>
    <div style="text-align:center;margin-top:40px" class="fade">
      <a href="projects.html" class="btn-dark">See the full project &rarr;</a>
    </div>
  </div>
</section>

{reviews_section()}

<section class="pullq">
  <div class="ctr">
    <div class="pullq-in fade">
      <div class="pullq-mark" aria-hidden="true">&ldquo;</div>
      <!-- PLACEHOLDER: replace with a real quote from the client -->
      <blockquote>Anyone can knock out a wall. The job is making the new part feel like it was always meant to be there.</blockquote>
      <div class="pullq-rule"></div>
      <div class="pullq-name">Director name</div>
      <div class="pullq-role">{BRAND}</div>
    </div>
  </div>
</section>

<section class="sec" id="why">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Why Us</div>
      <h2 class="sec-t fade">The difference is in how the job is run</h2>
      <p class="sec-sub fade">Renovations go wrong for boring reasons &mdash; vague quotes, nobody coordinating trades, and nobody answering the phone. Here&rsquo;s how we work instead.</p>
    </div>
    <div class="compare-grid fade">
      <div class="compare-col compare-us">
        <div class="compare-header"><div class="compare-icon">&#10003;</div><h3>With {BRAND}</h3></div>
        <ul class="compare-list">
          <li><span class="compare-check">&#10003;</span>An itemised written quote before anything is committed</li>
          <li><span class="compare-check">&#10003;</span>A build programme with dates you can plan around</li>
          <li><span class="compare-check">&#10003;</span>Every trade booked and coordinated by us</li>
          <li><span class="compare-check">&#10003;</span>Site swept and made secure at the end of each day</li>
          <li><span class="compare-check">&#10003;</span>Variations priced in writing before the work happens</li>
          <li><span class="compare-check">&#10003;</span>Permits, inspections and council liaison handled</li>
          <li><span class="compare-check">&#10003;</span>We come back after handover to sort the small stuff</li>
        </ul>
      </div>
      <div class="compare-col compare-them">
        <div class="compare-header"><div class="compare-icon">&times;</div><h3>What people tell us went wrong last time</h3></div>
        <ul class="compare-list">
          <li><span class="compare-x">&times;</span>A one-page quote with a lump sum and no detail</li>
          <li><span class="compare-x">&times;</span>&ldquo;A few weeks&rdquo; that turns into a few months</li>
          <li><span class="compare-x">&times;</span>Chasing your own plumber and sparky</li>
          <li><span class="compare-x">&times;</span>Rubble in the driveway for the whole build</li>
          <li><span class="compare-x">&times;</span>Extras that only appear on the final invoice</li>
          <li><span class="compare-x">&times;</span>Permit paperwork left in your lap</li>
          <li><span class="compare-x">&times;</span>Unanswered calls the moment the job is finished</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="process" style="background:var(--g50);border-top:1px solid var(--g200);border-bottom:1px solid var(--g200)">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">How It Works</div>
      <h2 class="sec-t fade">Four steps, no mystery</h2>
      <p class="sec-sub fade">From the first phone call to the day you get your house back.</p>
    </div>
    <div class="proc">
      <div class="pstep fade"><div class="pnum">1</div><h4>Tell us the idea</h4><p>Call or send the form. A rough sketch, a Pinterest board, or just a feeling that the kitchen is too small &mdash; all fine.</p></div>
      <div class="pstep fade"><div class="pnum">2</div><h4>We come and look</h4><p>A proper site visit, measurements, and an itemised written quote. No charge, no obligation, no sales pitch.</p></div>
      <div class="pstep fade"><div class="pnum">3</div><h4>We build it</h4><p>Programme locked in, trades booked, permits managed. You get regular updates and a number that gets answered.</p></div>
      <div class="pstep fade"><div class="pnum">4</div><h4>Handover &amp; after</h4><p>Final walk-through, defect list closed out, warranties handed over &mdash; and we still pick up the phone next year.</p></div>
    </div>
  </div>
</section>

<section class="sec" id="areas">
  <div class="ctr">
    <div class="sec-tag fade">Service Areas</div>
    <h2 class="sec-t fade">Where we work across {CITY}</h2>
    <p class="sec-sub fade">Most of our jobs are in the inner, eastern and northern suburbs, but we&rsquo;ll travel for the right project. If your suburb isn&rsquo;t listed, ask anyway.</p>
    <div class="atags fade">{areas}</div>
  </div>
</section>

{quote_form("General Enquiry", "Get a quote<br>in about a minute", "Four quick questions and we&rsquo;ll come back to you with next steps and a time for the site visit.", 0, image="dining-living.jpg")}

{cta("Thinking about the back of your house?", "Send through what you&rsquo;ve got and we&rsquo;ll tell you honestly whether it&rsquo;s worth doing.", 0, quote_href="#quote-form")}
'''
    write("index.html",
          head(f"{BRAND} | Renovation &amp; Extension Builders {CITY}",
               f"{CITY} renovation and extension builders. Period home extensions, kitchens, bathrooms, granny flats and commercial fit-outs. Free written quotes.",
               "", 0, schema) + body + footer(0, quote_href="#quote-form"))

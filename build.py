#!/usr/bin/env python3
"""
PA Building Group — static site generator.

Assembles plain HTML/CSS/JS pages (GitHub Pages friendly) from shared partials
so the nav, footer and quote form never drift between pages.

    python build.py

Every file it writes is committed to the repo — the build step is a convenience,
not a deploy requirement.
"""
import os, re, html

# ---------------------------------------------------------------------------
# Brand / contact.  TODO (Rankify): replace the placeholders once the client
# confirms.  These flow into every page, assets/site.js has its own copy.
# ---------------------------------------------------------------------------
BRAND       = "PA Building Group"
LEGAL       = "PA Building and Maintenance Services P/L"
PHONE       = "0400 000 000"                       # TODO placeholder
PHONE_HREF  = "0400000000"                         # TODO placeholder
EMAIL       = "hello@pabuildinggroup.com.au"       # TODO placeholder
SITE_URL    = "https://rankify-ops.github.io/pa-building-group"
CITY        = "Melbourne"
STATE       = "VIC"
SLOGAN      = "Keep the character. Gain the space."
YEAR        = 2026

ROOT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------------------
# Icons
# ---------------------------------------------------------------------------
I = {
 "extension":  '<path d="M3 21V10.5L9 6l6 4.5V21M9 21v-5.25h3V21M15 21V13h6v8M18 16.5h.01M18 19h.01M3 21h18"/>',
 "reno":       '<path d="M11.42 15.17l-5.59-5.59a2.002 2.002 0 010-2.83l5.59-5.59a2.002 2.002 0 012.83 0l5.59 5.59a2.002 2.002 0 010 2.83l-5.59 5.59a2.002 2.002 0 01-2.83 0zM4.5 21h15"/>',
 "kitchen":    '<path d="M4 3h16v18H4zM4 9h16M9 3v6M8 13h3M8 17h3M15.5 12.5v5"/>',
 "heritage":   '<path d="M3 21h18M5 21V9l7-6 7 6v12M9.5 21v-6a2.5 2.5 0 015 0v6M9 12h.01M15 12h.01"/>',
 "granny":     '<path d="M3 10 12 3l9 7M5 10v10h14V10M9 20v-6h6v6M3 22h18"/>',
 "design":     '<path d="M4 20 20 4M4 20h6M4 20v-6M14.5 3.5l6 6M3 9l3-3M9 3 6 6M15 21l3-3M21 15l-3 3"/>',
 "commercial": '<path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21"/>',
 "maintain":   '<path d="M11.42 15.17 6.5 20.09a2.12 2.12 0 1 1-3-3l4.92-4.92M14.7 9.3a4.5 4.5 0 0 1 6-6l-3.2 3.2.9 3 3 .9 3.2-3.2M14.7 9.3 9.3 14.7"/>',
 "check":      '<path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
 "clock":      '<path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
 "shield":     '<path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
 "star":       '<path d="M12 2 15 9l7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7Z"/>',
 "team":       '<path d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772 3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
 "doc":        '<path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5A3.375 3.375 0 0010.125 2.25H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
 "phone":      '<path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>',
 "mail":       '<path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>',
 "pin":        '<path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>',
 "chat":       '<path d="M21 12c0 4-4 7-9 7-1.5 0-3-.3-4.2-.8L3 20l1.2-3.6C3.4 15.4 3 13.7 3 12c0-4 4-7 9-7s9 3 9 7Z"/>',
 "cal":        '<path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>',
 "bolt":       '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
 "house":      '<path d="M3 10 12 3l9 7M5 10v10h14V10M9 20v-6h6v6M3 22h18"/>',
 "townhouse":  '<path d="M2 21h20M4 21V9l4.5-3.5L13 9v12M13 21V11.5l3.5-2.5L20 11.5V21M6.5 21v-4.5h4V21M15.5 21v-3.5h3V21M7 12h3"/>',
 "help":       '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
 "ruler":      '<path d="M3 7h18v10H3zM7 7v4M11 7v6M15 7v4M19 7v6"/>',
 "leaf":       '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
 "outdoor":    '<path d="M2 21h20M5 21V10M19 21V10M3 10h18M7 10V6.5M11 10V6.5M15 10V6.5M9 17h6M10 17v4M14 17v4"/>',
 "presale":    '<path d="M2.25 18 9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-5.94-2.28m5.94 2.28-2.28 5.941"/>',
}
def svg(key, cls=""):
    return f'<svg viewBox="0 0 24 24"{cls}>{I[key]}</svg>'

# ---------------------------------------------------------------------------
# Services
# ---------------------------------------------------------------------------
class S:
    def __init__(self, slug, nav, title, icon, blurb, local):
        self.slug, self.nav, self.title = slug, nav, title
        self.icon, self.blurb, self.local = icon, blurb, local

SERVICES = [
 S("extensions.html", "Extensions &amp; Additions", "Extensions &amp; Additions", "extension",
   "Rear extensions, second storeys and reconfigured floor plans that add the space your family actually needs.",
   "Rear and second-storey extensions that open up {sub} homes without losing what makes them worth keeping."),
 S("renovations.html", "Home Renovations", "Home Renovations", "reno",
   "Whole-home and room-by-room renovations &mdash; structural changes, new joinery, fresh services throughout.",
   "Full and partial home renovations for {sub} houses, from a single room through to a whole-of-house rebuild."),
 S("kitchens-bathrooms.html", "Kitchens &amp; Bathrooms", "Kitchen &amp; Bathroom Upgrades", "kitchen",
   "The two rooms that make or break a house. Custom joinery, stone, tiling and waterproofing done properly.",
   "New kitchens, bathrooms, ensuites and laundries for {sub} homes &mdash; waterproofed and tiled to standard."),
 S("outdoor-living.html", "Outdoor Living Areas", "Outdoor Living Areas", "outdoor",
   "Decks, pergolas, alfresco areas and outdoor kitchens &mdash; the part of the house everyone actually wants to be in.",
   "Decking, pergolas and alfresco areas built for {sub} back yards and the way Melbourne weather actually behaves."),
 S("maintenance.html", "Property Maintenance", "Property Maintenance &amp; Repairs", "maintain",
   "Carpentry, make-goods, defect rectification and the ongoing repairs that keep a property in good order.",
   "Ongoing property maintenance, carpentry and repair work across {sub} and the surrounding suburbs."),
 S("presale.html", "Pre-Sale Facelifts", "Pre-Sale Facelifts", "presale",
   "Targeted work before you list &mdash; spend on the things that move the price, skip the things that don't.",
   "Pre-sale preparation for {sub} vendors, timed around your campaign and agent's advice."),
 S("heritage.html", "Heritage &amp; Period Homes", "Heritage &amp; Period Homes", "heritage",
   "Victorian, Edwardian and interwar homes restored at the front, opened right up at the back.",
   "Heritage-overlay work in {sub} &mdash; restoration at the street, contemporary living behind it."),
 S("granny-flats.html", "Granny Flats &amp; Studios", "Granny Flats &amp; Studios", "granny",
   "Self-contained second dwellings, home offices and backyard studios built to the same standard as the house.",
   "Backyard studios, home offices and self-contained second dwellings on {sub} blocks."),
 S("design-build.html", "Design &amp; Build", "Design &amp; Build", "design",
   "One contract from concept sketch to handover &mdash; design, documentation, permits and construction.",
   "A single point of responsibility for {sub} projects &mdash; design, permits and build under one contract."),
 # TODO (Rankify): their Facebook positions them as *residential* builders and
 # doesn't mention commercial work. Confirm they still want this page.
 S("commercial.html", "Commercial Fit-Outs", "Commercial Fit-Outs", "commercial",
   "Shopfronts, offices, cafes and clinics fitted out around your trading hours, not ours.",
   "Retail, office and hospitality fit-outs for {sub} businesses, staged around your trading hours."),
]

NAV_PAGES = [("projects.html","Projects"), ("about.html","About"), ("contact.html","Contact")]

# ---------------------------------------------------------------------------
# Partials
# ---------------------------------------------------------------------------
def head(title, desc, canonical, depth=0, schema=None, og_title=None):
    p = "../" * depth
    og_title = og_title or title
    schema_block = f'\n<script type="application/ld+json">\n{schema}\n</script>' if schema else ""
    return f'''<!DOCTYPE html>
<html lang="en-AU">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{SITE_URL}/{canonical}">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_AU">
<meta property="og:url" content="{SITE_URL}/{canonical}">
<meta property="og:image" content="{SITE_URL}/images/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#106efe">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300..800&display=swap" rel="stylesheet">
<link rel="icon" type="image/x-icon" href="{p}favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="{p}images/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="192x192" href="{p}images/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="{p}images/apple-touch-icon.png">
<link rel="stylesheet" href="{p}assets/site.css">{schema_block}
</head>
<body>'''

def nav(depth=0, quote_href=None):
    p = "../" * depth
    q = quote_href or (f"{p}contact.html#quote-form")
    dd = "".join(f'<a href="{p}{s.slug}">{s.nav}</a>' for s in SERVICES)
    mdd = "".join(f'<li><a href="{p}{s.slug}">{s.nav}</a></li>' for s in SERVICES)
    other = "".join(f'<li><a href="{p}{h}">{t}</a></li>' for h, t in NAV_PAGES)
    return f'''
<nav class="nav" id="nav">
  <div class="nav-in">
    <a href="{p}index.html" class="logo" aria-label="{BRAND} home">
      <img src="{p}images/logo.png" alt="{BRAND}" class="logo-light" width="1842" height="449">
      <img src="{p}images/logo-dark.png" alt="" aria-hidden="true" class="logo-dark" width="1842" height="449">
    </a>
    <ul class="nav-l">
      <li class="has-dd"><a href="{p}services.html">Services <span class="chev">&#9662;</span></a>
        <div class="dropdown">
          <a href="{p}services.html" class="dd-feat">All Services</a>
          <div class="dd-sep"></div>
          {dd}
        </div>
      </li>
      {"".join(f'<li><a href="{p}{h}">{t}</a></li>' for h, t in NAV_PAGES)}
    </ul>
    <div class="nav-r">
      <a href="tel:{PHONE_HREF}" class="nav-ph">&#128222; {PHONE}</a>
      <a href="{q}" class="nav-cta">Free Quote</a>
    </div>
    <button class="mob-tog" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</nav>

<aside class="mdrawer" id="mdrawer">
  <div class="mdrawer-top">
    <div class="mdrawer-logo"><a href="{p}index.html"><img src="{p}images/logo.png" alt="{BRAND}"></a></div>
    <button class="mdrawer-close" type="button" aria-label="Close menu">&times;</button>
  </div>
  <ul class="mdrawer-list">
    <li><a href="{p}index.html">Home</a></li>
    <li class="mdd">
      <button class="mdd-tog" type="button">Services <span class="mdd-chev">&#9662;</span></button>
      <ul class="mdd-sub">
        <li><a href="{p}services.html" class="dd-feat-mob">All Services</a></li>
        {mdd}
      </ul>
    </li>
    {other}
  </ul>
  <div class="mdrawer-cta">
    <a href="tel:{PHONE_HREF}" class="mc-call">&#128222; {PHONE}</a>
    <a href="{q}" class="mc-quote">Get a Free Quote &rarr;</a>
  </div>
</aside>'''

def footer(depth=0, quote_href=None):
    p = "../" * depth
    q = quote_href or f"{p}contact.html#quote-form"
    svcs = "".join(f'<li><a href="{p}{s.slug}">{s.nav}</a></li>' for s in SERVICES)
    return f'''
<footer class="foot">
  <div class="ctr">
    <div class="foot-g">
      <div class="foot-brand">
        <a href="{p}index.html" class="logo"><img src="{p}images/logo.png" alt="{BRAND}"></a>
        <p>Over 40 years in {CITY} residential construction &mdash; home additions and renovations, kitchen and bathroom upgrades, outdoor living areas, property maintenance and pre-sale facelifts.</p>
        <div class="foot-accred">
          <span class="foot-badge">40+ years</span>
          <span class="foot-badge">Licensed &amp; insured</span>
          <span class="foot-badge">{CITY} &amp; suburbs</span>
        </div>
      </div>
      <div><h4>Services</h4><ul class="foot-l">{svcs}</ul></div>
      <div><h4>Company</h4><ul class="foot-l">
        <li><a href="{p}about.html">About Us</a></li>
        <li><a href="{p}projects.html">Projects</a></li>
        <li><a href="{p}services.html">All Services</a></li>
        <li><a href="{p}contact.html">Contact</a></li>
      </ul></div>
      <div><h4>Contact</h4><ul class="foot-l">
        <li><a href="tel:{PHONE_HREF}">{PHONE}</a></li>
        <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
        <li><a href="{q}">Request a quote</a></li>
        <li><a>{CITY}, {STATE}</a></li>
      </ul></div>
    </div>
    <div class="foot-b">
      <span>&copy; {YEAR} {LEGAL}. All rights reserved.</span>
      <span>Website by <a href="https://rankify.com.au" rel="noopener">Rankify</a></span>
    </div>
  </div>
</footer>

<div class="sticky"><a href="tel:{PHONE_HREF}" class="sc">&#128222; Call</a><a href="{q}" class="sq">Free Quote</a></div>
<script src="{p}assets/site.js"></script>
</body>
</html>
'''

def cta(title, text, depth=0, quote_href=None):
    p = "../" * depth
    q = quote_href or f"{p}contact.html#quote-form"
    return f'''
<section class="cta-strip">
  <div class="ctr">
    <h2 class="fade">{title}</h2>
    <p class="fade">{text}</p>
    <div class="cta-strip-btns fade">
      <a href="{q}" class="btn-p">Get Your Free Quote &rarr;</a>
      <a href="tel:{PHONE_HREF}" class="btn-glass">&#128222; {PHONE}</a>
    </div>
  </div>
</section>'''

def qform_markup(context, form_id="quote-form", extra_class="", head_tag="Free Quote",
                 head_title="Get a Free Quote"):
    """The multi-step form card on its own — used both inside the hero and inside
    the full form section further down the page."""
    opts = [
        ("Extension / Addition", "extension", "Extension"),
        ("Home Renovation", "reno", "Renovation"),
        ("Kitchen / Bathroom", "kitchen", "Kitchen/Bath"),
        ("Outdoor Living", "outdoor", "Outdoor Living"),
        ("Property Maintenance", "maintain", "Maintenance"),
        ("Something else", "help", "Something else"),
    ]
    obs = "".join(
        f'<button type="button" class="ob" data-v="{v}"><div class="oico">{svg(ic)}</div><div class="olbl">{lbl}</div></button>'
        for v, ic, lbl in opts)
    cls = f"qform {extra_class}".strip()
    return f'''<div class="{cls}" data-context="{context}" id="{form_id}">
        <div class="qform-head"><div class="qh-tag">{head_tag}</div><h3>{head_title}</h3></div>
        <div class="fsteps"><div class="fstep active"></div><div class="fstep"></div><div class="fstep"></div><div class="fstep"></div></div>

        <div class="fslide active" data-s="1" data-field="Service Type">
          <h3>What are you planning?</h3><p class="fsub">Pick the closest match &mdash; we'll sort the detail on the call.</p>
          <div class="og" style="grid-template-columns:1fr 1fr 1fr">{obs}</div>
          <div class="fnav"><button type="button" class="fn">Next &rarr;</button></div>
        </div>

        <div class="fslide" data-s="2" data-field="Property Type">
          <h3>What sort of property?</h3><p class="fsub">This tells us what we're likely to find behind the walls.</p>
          <div class="og og-3">
            <button type="button" class="ob" data-v="House"><div class="oico">{svg("house")}</div><div class="olbl">House</div></button>
            <button type="button" class="ob" data-v="Town House"><div class="oico">{svg("townhouse")}</div><div class="olbl">Town House</div></button>
            <button type="button" class="ob" data-v="Heritage Home"><div class="oico">{svg("heritage")}</div><div class="olbl">Heritage Home</div></button>
          </div>
          <div class="fnav"><button type="button" class="fb">&larr; Back</button><button type="button" class="fn">Next &rarr;</button></div>
        </div>

        <div class="fslide" data-s="3" data-field="Stage">
          <h3>Where are you up to?</h3><p class="fsub">There's no wrong answer &mdash; plenty of people start at the first one.</p>
          <div class="og">
            <button type="button" class="ob" data-v="Just an idea so far"><div class="oico">{svg("chat")}</div><div class="olbl">Just an idea</div></button>
            <button type="button" class="ob" data-v="Have concept plans"><div class="oico">{svg("ruler")}</div><div class="olbl">Have plans</div></button>
            <button type="button" class="ob" data-v="Permit approved, ready to build"><div class="oico">{svg("doc")}</div><div class="olbl">Permit approved</div></button>
            <button type="button" class="ob" data-v="Needs doing now"><div class="oico">{svg("bolt")}</div><div class="olbl">Needs doing now</div></button>
          </div>
          <div class="fnav"><button type="button" class="fb">&larr; Back</button><button type="button" class="fn">Next &rarr;</button></div>
        </div>

        <div class="fslide" data-s="4" data-field="Contact">
          <h3>Last step &mdash; how do we reach you?</h3><p class="fsub">We'll come back to you with next steps and a time for the site visit.</p>
          <input type="text" class="finp" placeholder="Your name" aria-label="Your name" autocomplete="name">
          <input type="tel" class="finp" placeholder="Phone number" aria-label="Phone number" autocomplete="tel">
          <input type="email" class="finp" placeholder="Email address" aria-label="Email address" autocomplete="email">
          <input type="text" class="finp" placeholder="Suburb" aria-label="Suburb" autocomplete="address-level2">
          <textarea class="finp" placeholder="Tell us about the project (optional)" aria-label="Tell us about the project" data-optional></textarea>
          <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
          <div class="fnav"><button type="button" class="fb">&larr; Back</button><button type="button" class="fn" data-action="submit">Send My Enquiry &rarr;</button></div>
        </div>

        <div class="fslide" data-s="5">
          <div style="text-align:center;padding:28px 0">
            <div style="font-size:2.2rem;margin-bottom:10px">&#9989;</div>
            <h3 style="margin-bottom:6px">Got it &mdash; thanks!</h3>
            <p class="fsub" style="margin:0">Your enquiry is on its way. Need us sooner? Call <a href="tel:{PHONE_HREF}" style="color:var(--accent);font-weight:700">{PHONE}</a>.</p>
          </div>
        </div>
      </div>'''


def hero_quote_form(context="Hero Enquiry", form_id="quote-form"):
    """Compact version of the form card, sized to sit in the right of the hero."""
    return f'''<div class="hero-form">
        {qform_markup(context, form_id, extra_class="qform-hero",
                      head_tag="Free Quote &bull; No obligation",
                      head_title="Get a quote in about a minute")}
      </div>'''


def quote_form(context, heading, sub, depth=0, image=None, form_id="quote-form"):
    p = "../" * depth
    img = f'<div class="form-img"><img src="{p}images/projects/{image}" alt="Recent {BRAND} project" loading="lazy" width="1158" height="864"></div>' if image else ""
    return f'''
<section class="sec form-sec" id="quote">
  <div class="ctr">
    <div class="form-g">
      <div class="form-info fade">
        <div class="sec-tag">Free Quote</div>
        <h2 class="sec-t">{heading}</h2>
        <p class="sec-sub">{sub}</p>
        <div class="fperks">
          <div class="fperk"><div class="fpd">&#10003;</div>No obligation &mdash; completely free</div>
          <div class="fperk"><div class="fpd">&#10003;</div>Itemised, written pricing</div>
          <div class="fperk"><div class="fpd">&#10003;</div>We come to you for the site visit</div>
          <div class="fperk"><div class="fpd">&#10003;</div>One team managing every trade</div>
        </div>
        {img}
      </div>
      {qform_markup(context, form_id, extra_class="fade")}
    </div>
  </div>
</section>'''

def faq_block(tag, title, sub, items):
    qs = "".join(
        f'<details class="faq fade"><summary>{q}</summary><div class="faq-body"><p>{a}</p></div></details>'
        for q, a in items)
    subline = f'<p class="sec-sub fade">{sub}</p>' if sub else ""
    schema = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{"@type":"Question","name":re.sub("<[^>]+>","",q),
                        "acceptedAnswer":{"@type":"Answer","text":re.sub("<[^>]+>","",a)}} for q,a in items]
    }
    import json
    return f'''
<section class="sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">{tag}</div>
      <h2 class="sec-t fade">{title}</h2>
      {subline}
    </div>
    <div class="faqs">{qs}</div>
  </div>
</section>
<script type="application/ld+json">{json.dumps(schema)}</script>'''

def service_grid(depth=0, subset=None, localise=None):
    """Card grid of services. `localise` inserts a suburb name into each blurb."""
    p = "../" * depth
    items = subset or SERVICES
    cards = []
    for s in items:
        blurb = s.local.format(sub=localise) if localise else s.blurb
        cards.append(f'''      <a href="{p}{s.slug}" class="fg-card fade">
        <div class="fg-ico">{svg(s.icon)}</div>
        <h4>{s.nav}</h4>
        <p>{blurb}</p>
        <span class="fg-link">Learn more &rarr;</span>
      </a>''')
    return '<div class="fg">\n' + "\n".join(cards) + '\n    </div>'

def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print(f"  {path}")

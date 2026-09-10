#!/usr/bin/env python3
"""PA Building Group — service, inner and location pages."""
import json
from build import (
    BRAND, LEGAL, PHONE, PHONE_HREF, EMAIL, SITE_URL, CITY, STATE, SLOGAN, YEAR,
    SERVICES, svg, head, nav, footer, cta, quote_form, faq_block, service_grid, write,
)
from pages import (
    PROJECT, PROJ_LOC, SUBURBS, SUBURB_LINKS, reviews_section,
    proj_card, content_block, why_grid,
)

def phero(crumbs, h1, em, lead, depth=0, quote_href=None):
    p = "../" * depth
    q = quote_href or "#quote-form"
    parts = []
    for c in crumbs:
        if isinstance(c, tuple):
            label, href = c
            parts.append(f'<a href="{p}{href}">{label}</a>')
        else:
            parts.append(c)
    crumb = ' <span class="sep">/</span> '.join(parts)
    return f'''
<section class="phero">
  <div class="phero-inner">
    <div class="ctr">
      <div class="crumb">{crumb}</div>
      <h1>{h1} <span class="em">{em}</span></h1>
      <p>{lead}</p>
      <div class="phero-btns">
        <a href="{q}" class="btn-p">Get a Free Quote &rarr;</a>
        <a href="tel:{PHONE_HREF}" class="btn-glass">&#128222; {PHONE}</a>
      </div>
    </div>
  </div>
</section>'''

BAND = 'style="background:var(--g50);border-top:1px solid var(--g200);border-bottom:1px solid var(--g200)"'

# ===========================================================================
# SERVICE PAGE CONTENT
# ===========================================================================
SERVICE_PAGES = {
"extensions.html": dict(
  h1="Home", em="Extensions",
  title=f"Home Extensions {CITY} | Rear &amp; Second-Storey Additions | {BRAND}",
  desc=f"Rear and second-storey home extensions across {CITY}. Period-sensitive additions, open-plan living, permits managed. Free itemised quote.",
  lead="More room without moving suburb. We design and build rear extensions, second storeys and reconfigured floor plans that add real living space &mdash; and look like they belong.",
  blocks=[
    ("rear-extension.jpg", "Rear Extensions", "Open up the back of the house",
     ["The single best value change you can make to an older home is usually at the back. Take out the dark lean-to, lift the ceiling, put the glazing where the north light is, and the whole house starts working differently.",
      "We handle the structural side properly &mdash; new footings, steel where it's needed, and a roof form that resolves against the original. The result reads as one building, not a house with a box stuck on it."],
     ["New footings, steel and structural framing", "Raked and cathedral ceilings", "Full-height glazing and stacking or bifold doors",
      "Roof forms detailed to resolve against the original", "Services re-run and upgraded through the new section"]),
    ("living-gable.jpg", "Second Storeys", "Build up when you can't build out",
     ["On a narrow block, or where you'd rather keep the garden, the only direction left is up. A second storey adds bedrooms and a bathroom without touching your outdoor space.",
      "The engineering matters here more than anywhere. We start with a structural assessment of what's already under the house, and we're straight with you if the existing footings won't take it."],
     ["Structural assessment before anything is promised", "Restumping and footing upgrades where required",
      "New staircase integrated into the existing plan", "Bedrooms, ensuites and retreats upstairs", "Staged so you can often stay living downstairs"]),
    ("dining-living.jpg", "Additions", "Reworking the plan you already have",
     ["Not every job needs a bigger footprint. Sometimes the space is there and it's just in the wrong shape &mdash; a wall in the middle of what should be one room, a laundry where the pantry should go.",
      "We'll walk the house with you and tell you honestly whether you need to extend at all. It's a shorter build and a smaller bill when the answer is no."],
     ["Removing load-bearing walls with proper structural support", "Reconfigured kitchen, living and dining zones",
      "New windows and skylights for light and cross-ventilation", "Storage, joinery and mudrooms built in", "Heating, cooling and electrical brought up to date"]),
  ],
  why=[("doc","Priced before you commit","You get an itemised quote covering structure, services, finishes and the allowances &mdash; not a lump sum with a shrug."),
       ("shield","Permits handled","Building permits, engineering, energy ratings and council liaison are ours to sort, not yours."),
       ("heritage","Sensitive to what's there","We match sightlines, floor levels and roof pitches so the addition doesn't fight the original house."),
       ("team","One team on site","Chippies, plumbers, sparkies, plasterers and tilers all booked and sequenced by us.")],
  faq=[("How much does a home extension cost in Melbourne?",
        "It depends far more on what's inside the extension than its size &mdash; a bathroom and kitchen cost multiples of a bedroom of the same footprint. Site access, whether restumping is needed and the glazing spec all move the number too. We give you an itemised written quote after a site visit so you can see exactly where the money goes."),
       ("How long does a rear extension take?",
        "Most rear extensions run several months on site once permits are in hand, and the permit stage itself can take a while depending on your council and whether a heritage overlay applies. We give you a build programme with dates before we start."),
       ("Do I need a permit for an extension?",
        "Almost always, yes &mdash; anything structural, anything that changes the building footprint, and anything under a heritage overlay needs a building permit and often a planning permit as well. We manage the applications, the engineering and the inspections."),
       ("Can we live in the house during the build?",
        "For a rear extension, usually yes. We seal off the work zone, keep a functioning kitchen and bathroom available where we can, and stage the job around that. For whole-of-house work it's often easier to move out for part of it &mdash; we'll be upfront about which one you're looking at."),
       ("What if the existing house needs work before you can extend?",
        "It often does &mdash; old stumps, no damp course, wiring that predates the RCD. We assess this before quoting so it's in the price rather than appearing as a variation halfway through.")],
),

"renovations.html": dict(
  h1="Home", em="Renovations",
  title=f"Home Renovations {CITY} | Whole-House &amp; Room Renovations | {BRAND}",
  desc=f"Whole-home and room-by-room renovations across {CITY}. Structural changes, new joinery, upgraded services. Registered builder, itemised quotes.",
  lead="From one tired room to the whole house stripped back to frame. We renovate {city} homes with the structure, services and finishes all handled by the one team.".replace("{city}", CITY),
  blocks=[
    ("living-open-plan.jpg", "Whole-Home", "Whole-house renovations",
     ["When a house needs everything &mdash; rewiring, replumbing, new floors, new joinery, walls moved &mdash; doing it in one go is almost always cheaper and far less disruptive than three separate jobs over five years.",
      "We strip back, fix what's hiding behind the plaster, and rebuild. You get one contract, one programme and one person to call."],
     ["Full rewire and replumb", "Structural changes and wall removals", "New flooring, plaster, cornice and paint throughout",
      "Kitchen, bathroom and laundry replaced", "Insulation, heating and cooling brought up to standard"]),
    ("formal-lounge.jpg", "Room by Room", "One room at a time",
     ["Not everyone wants to move out for six months. Plenty of our work is a single room done properly &mdash; a living room opened up, a spare bedroom turned into a study, a laundry that finally fits a dryer.",
      "Same standard, same trades, smaller footprint. And if it goes well, we're there for the next room."],
     ["Living and dining reconfigurations", "Study and home-office conversions", "Laundry and mudroom rebuilds",
      "Built-in joinery, shelving and storage", "Restored cornice, ceiling roses and skirting"]),
    ("build-progress-1.jpg", "Behind The Plaster", "The bit nobody photographs",
     ["Renovation budgets blow out in the wall cavity, not the showroom. Old wiring, rotten bearers, no sarking, drains that were never right.",
      "We open things up early and tell you what we've found before we go further, with a written price for the fix. Nasty surprises are much easier to deal with in week two than week ten."],
     ["Early investigation before finishes are ordered", "Written variations before any extra work starts",
      "Restumping, bearer and joist replacement", "Damp, drainage and subfloor ventilation fixed", "Old wiring and plumbing replaced, not patched"]),
  ],
  why=[("doc","No vague allowances","Where something genuinely can't be priced until walls are open, we say so upfront and put a realistic figure against it."),
       ("team","All trades under one roof","You're not project-managing your own renovation on top of your actual job."),
       ("clock","A programme, not a guess","Dates you can plan around, and a call if anything moves."),
       ("check","Finished properly","Defect list closed out before we ask for the final payment.")],
  faq=[("Is it cheaper to renovate or knock down and rebuild?",
        "It depends on how much of the existing house is worth keeping. If the structure is sound and you love the front rooms, renovating and extending usually wins. If the whole thing is failing, a rebuild can cost less than fixing it. We'll give you an honest read after a site visit &mdash; we'd rather tell you not to renovate than take on a job that shouldn't happen."),
       ("Do you do renovations on heritage-listed homes?",
        "Yes. Period homes are a large part of what we do. Heritage overlays restrict what you can change at the street frontage but usually leave the rear far more open than people expect. See our <a href=\"heritage.html\">heritage and period homes</a> page."),
       ("Can I supply my own fixtures and appliances?",
        "Yes, and plenty of clients do. We'll tell you what needs to be on site by when, and flag anything that will cause a problem with the install before you buy it."),
       ("How much disruption should I expect?",
        "More than you're hoping for and less than you're fearing. We seal work zones with dust barriers, keep access clear, and sweep the site at the end of every day. For big jobs we'll be straight with you about which weeks are genuinely unpleasant."),
       ("Do you offer a warranty?",
        "Yes &mdash; domestic building work in Victoria carries statutory warranty periods, and we're covered by domestic building insurance on qualifying jobs. Manufacturer warranties on fixtures and appliances are handed over at completion.")],
),

"kitchens-bathrooms.html": dict(
  h1="Kitchens &amp;", em="Bathrooms",
  title=f"Kitchen &amp; Bathroom Renovations {CITY} | {BRAND}",
  desc=f"Kitchen and bathroom renovations across {CITY}. Custom joinery, stone benchtops, waterproofing and tiling to standard. Free itemised quote.",
  lead="The two rooms that decide how a house feels to live in &mdash; and the two where shortcuts show up fastest. Custom joinery, proper waterproofing, and tiling that still looks right in ten years.",
  blocks=[
    ("kitchen-island.jpg", "Kitchens", "Kitchens built around how you cook",
     ["A good kitchen is a plan problem before it's a finishes problem. Where the fridge opens, how far the bin is from the sink, whether two people can be in there at once &mdash; that's what you notice daily, not the splashback.",
      "We work through the layout first, then the joinery, stone and appliances. Custom cabinetry means it fits your walls, not a standard module with a filler panel."],
     ["Custom cabinetry made to your dimensions", "Stone, timber and engineered benchtops",
      "Integrated and freestanding appliance layouts", "Butler's pantries and appliance garages", "New power, water, gas and rangehood ducting"]),
    ("butlers-pantry.jpg", "Butler&rsquo;s Pantries", "The room that keeps the kitchen clean",
     ["A butler's pantry is the single most requested addition we get. It takes the mess, the small appliances and the second sink out of the room you actually entertain in.",
      "Even a narrow galley behind the main run makes a difference &mdash; it doesn't need to be big, it needs to be planned."],
     ["Second sink and dishwasher plumbing", "Full-height storage and open shelving",
      "Bench space for appliances that live out", "Concealed access from the main kitchen", "Ventilation and dedicated circuits"]),
    ("bathroom-main.jpg", "Bathrooms", "Bathrooms that stay watertight",
     ["Waterproofing is the part you never see and the only part that will ruin your house if it's wrong. We do it to standard, we document it, and we don't tile until it's right.",
      "Above that: floor-to-ceiling tiling, wall-hung vanities, niches set out to the tile grid, and falls that actually drain."],
     ["Waterproofing to AS 3740, documented", "Floor-to-ceiling tiling with set-out planned to the grid",
      "Wall-hung vanities, niches and shaving cabinets", "Underfloor heating and heated towel rails", "Accessible and step-free shower options"]),
  ],
  why=[("ruler","Set out before it's built","Tile set-outs, joinery runs and fixture heights drawn up first &mdash; so nothing lands half a tile off."),
       ("shield","Waterproofing done right","Certified, documented, and never rushed to keep a tiler on schedule."),
       ("kitchen","Custom, not flat-pack","Cabinetry made to your dimensions, in the finish you chose."),
       ("clock","Tight timelines respected","Bathrooms and kitchens are staged so you're without them for as short a time as possible.")],
  faq=[("How long will I be without my kitchen?",
        "For a straightforward kitchen replacement, expect a few weeks from demolition to functional. We can usually set up a temporary bench, sink and fridge elsewhere in the house so you're not eating takeaway the whole time."),
       ("How long does a bathroom renovation take?",
        "A full bathroom strip-out and rebuild typically runs a few weeks on site. Waterproofing has mandatory curing time between coats and before tiling &mdash; that's not a step worth compressing, and any builder who offers to is telling you something."),
       ("Do I need a permit for a kitchen or bathroom?",
        "Cosmetic replacement in the same layout usually doesn't need a building permit, but plumbing and electrical work must be done by licensed trades and certified. Move a wall or change the drainage and you're into permit territory &mdash; we'll tell you which side of the line your job sits on."),
       ("Can you make a bathroom accessible?",
        "Yes &mdash; step-free showers, wider doorways, grab rail noggings built into the wall framing, and vanities at accessible heights. It's much cheaper to build the framing for future grab rails now than to retrofit later."),
       ("Do you handle the tiling and stone yourself?",
        "We use the same tilers and stonemasons on every job rather than whoever is cheapest that month. It's the main reason the finish is consistent.")],
),

"outdoor-living.html": dict(
  h1="Outdoor", em="Living Areas",
  title=f"Outdoor Living Areas {CITY} | Decks, Pergolas &amp; Alfresco | {BRAND}",
  desc=f"Decking, pergolas, alfresco areas and outdoor kitchens across {CITY}. Built to handle Melbourne weather. Free itemised quote.",
  lead="Decks, pergolas, alfresco areas and outdoor kitchens. The part of the house everyone ends up in &mdash; built to survive a Melbourne summer and a Melbourne winter.",
  blocks=[
    ("backyard.jpg", "Decks &amp; Paving", "Getting the levels right first",
     ["Most outdoor areas fail on levels and drainage rather than on materials. Water needs somewhere to go, the deck needs to meet the door threshold properly, and the step down to the lawn needs to be a step you don't trip on.",
      "We set out the levels before anything is ordered, so the finished area drains away from the house and reads as one continuous floor with the inside."],
     ["Levels set out against door thresholds and drainage falls",
      "Hardwood, composite and merbau decking", "Bluestone, granite and porcelain paving",
      "Retaining walls and level changes", "Subfloor framing and footings sized for the span"]),
    ("rear-extension.jpg", "Pergolas &amp; Alfresco", "Shade in February, shelter in July",
     ["An uncovered deck in Melbourne gets used about four weekends a year. Roofed or louvred, it gets used most of them.",
      "We build pergolas, verandahs and fully roofed alfresco areas that tie into the existing roofline rather than looking bolted on &mdash; including the permits, because anything attached to the house and over a certain size needs one."],
     ["Pergolas, verandahs and roofed alfresco areas",
      "Operable louvre and retractable roof systems", "Roof lines detailed to match the house",
      "Outdoor heating, lighting and ceiling fans wired in", "Permits and setback compliance handled"]),
    ("build-progress-2.jpg", "Outdoor Kitchens", "Cooking outside without carrying everything out",
     ["An outdoor kitchen is the difference between entertaining outside and running back and forth to the fridge all afternoon. Even a modest run of bench, sink and BBQ changes how the space gets used.",
      "The trick is specifying materials that survive being rained on &mdash; marine-grade cabinetry, stone that won't stain, and drainage under everything."],
     ["Built-in BBQ, bench and storage runs", "Weatherproof cabinetry and stone tops",
      "Sink, water and drainage connections", "Screening and privacy from neighbours",
      "Power, lighting and weatherproof outlets"]),
  ],
  why=[("outdoor","Built for the weather","Materials and detailing chosen to survive UV, driving rain and a hundred years of Melbourne doing all four seasons in a day."),
       ("ruler","Levels planned first","Falls, thresholds and drainage set out before materials are ordered &mdash; not adjusted afterwards."),
       ("doc","Permits sorted","Anything attached to the house or over the size threshold needs a permit. We handle the application."),
       ("team","One team, inside and out","If the deck ties into an extension or new doors, the same crew does both &mdash; so the junction actually lines up.")],
  faq=[("Do I need a permit for a deck or pergola?",
        "It depends on height, size and how close it sits to a boundary. Low freestanding decks often don't need one; anything raised, roofed, attached to the house or near a boundary usually does. We assess yours before quoting and handle the application if it's required."),
       ("What decking material lasts longest in Melbourne?",
        "Hardwoods like spotted gum and merbau look best and last decades if they're oiled; composite costs more up front and needs almost nothing afterwards. The right answer depends on how much maintenance you're realistically going to do. We'll give you an honest comparison rather than pushing the higher-margin option."),
       ("Can you roof an existing deck?",
        "Usually yes, provided the existing structure can carry the additional load and the roof line can be resolved against the house. We check the footings and framing first &mdash; sometimes they need upgrading, and it's better to know that before the roof is on order."),
       ("How long does an outdoor area take to build?",
        "A straightforward deck is a couple of weeks. A roofed alfresco with an outdoor kitchen, power and drainage takes considerably longer, plus permit time beforehand. We give you a programme with dates before we start."),
       ("Will it match the rest of the house?",
        "That's the intention. We match roof pitch, fascia detail and materials so the outdoor area reads as part of the house. It's the difference between an addition and an afterthought.")],
),

"presale.html": dict(
  h1="Pre-Sale", em="Facelifts",
  title=f"Pre-Sale Renovations &amp; Facelifts {CITY} | {BRAND}",
  desc=f"Pre-sale property preparation across {CITY}. Targeted renovation work before you list — spend where it moves the price, timed around your campaign.",
  lead="Targeted work before you list. Spend on the things that move the price, skip the things that don&rsquo;t, and be finished before the first inspection.",
  blocks=[
    ("formal-lounge.jpg", "Where To Spend", "Not everything is worth doing",
     ["The point of a pre-sale facelift is return, not perfection. Paint, floors, a tidy kitchen and a presentable facade almost always pay for themselves. A full bathroom rebuild eight weeks before auction usually doesn't.",
      "We'll walk the property with you and your agent's feedback in hand, and tell you plainly which jobs are worth the money and which ones buyers won't notice. We've talked plenty of people out of spending more than they needed to."],
     ["Walk-through and honest scope recommendation",
      "Priced by job so you can pick and choose", "Advice on what buyers actually notice",
      "Coordination with your agent's campaign dates", "Staged so the highest-impact work happens first"]),
    ("kitchen-galley.jpg", "The Usual List", "The work that shifts a price",
     ["Most pre-sale jobs are a version of the same list: fresh paint throughout, floors sanded or replaced, kitchen benchtops and handles updated, a bathroom refresh rather than a rebuild, and every small defect fixed.",
      "Individually none of it is dramatic. Together it's the difference between a property that shows well and one buyers walk through mentally deducting from."],
     ["Full interior and exterior repaint", "Floor sanding, polishing or replacement",
      "Kitchen benchtop, door and handle updates", "Bathroom refresh &mdash; regrout, reseal, new fixtures",
      "Door, window, gutter and trim repairs"]),
    ("facade.jpg", "Street Appeal", "The first ten seconds",
     ["Buyers form an opinion before they reach the front door. A tired facade, a sagging fence and an overgrown front garden cost more in perceived value than they cost to fix.",
      "Facade paint, a rendered or repaired front fence, tidy paths and a cleaned-up entry are usually the cheapest points of leverage on the whole job."],
     ["Facade repair, render and repaint", "Front fence, gate and letterbox",
      "Path, driveway and entry tidy-up", "Roof, gutter and downpipe repairs",
      "Landscaping and garden clean-up coordinated"]),
  ],
  why=[("presale","Spend where it returns","We'll tell you what to skip. A shorter scope that sells the house is a better outcome than a bigger invoice."),
       ("clock","Finished before the campaign","We work back from your first inspection date, not forward from our start date."),
       ("doc","Priced job by job","Itemised so you can drop a line item if the budget needs to shrink."),
       ("team","One crew, fast","Painters, floor sanders, carpenters and tilers sequenced tightly &mdash; pre-sale work lives or dies on the timeline.")],
  faq=[("How long before listing should I start?",
        "Talk to us as early as you can, even if it's just a walk-through. The work itself is usually a few weeks, but the earlier we scope it the more options you have &mdash; and the less likely you are to be paying for rush work."),
       ("What gives the best return before selling?",
        "Paint, floors and street appeal, almost every time, followed by anything that's visibly broken. Kitchens and bathrooms are more nuanced &mdash; a refresh often pays, a full rebuild frequently doesn't. We'll give you a view specific to your property rather than a generic list."),
       ("Can you work to my auction date?",
        "Yes, and it's how we plan these jobs. Tell us your first inspection date and we work backwards from it. If the date doesn't allow the full scope, we'll tell you what to cut rather than promise something we can't finish."),
       ("Will you talk to my agent?",
        "Happily. Agents usually have a clear view of what's holding a property back in your specific market, and it makes the scope much sharper. Send us their feedback with your enquiry."),
       ("Do you do this for investment properties between tenants?",
        "Yes &mdash; between-tenancy make-goods and refreshes are closely related work. See <a href=\"maintenance.html\">property maintenance</a> for the ongoing side of it.")],
),

"heritage.html": dict(
  h1="Heritage &amp;", em="Period Homes",
  title=f"Heritage &amp; Period Home Builders {CITY} | {BRAND}",
  desc=f"Heritage and period home renovation across {CITY}. Victorian, Edwardian and interwar homes &mdash; overlays, restoration and sympathetic rear extensions.",
  lead="Victorian, Edwardian, Californian bungalow, interwar brick. Restored where it faces the street, opened right up where nobody can see it.",
  blocks=[
    ("facade.jpg", "Restoration", "The front of the house",
     ["Heritage overlays exist because the streetscape is worth protecting, and honestly, it usually is. Weatherboard profiles, verandah fretwork, leadlight, tuckpointing and original window joinery &mdash; all of it can be repaired rather than replaced more often than people assume.",
      "We work with heritage advisors and council where the overlay requires it, and we do the paperwork rather than handing it to you in a folder."],
     ["Weatherboard, render and brickwork repair", "Verandah, fretwork and cast-iron restoration",
      "Leadlight and original window joinery repair", "Heritage-appropriate colour and finish schedules", "Heritage advisor and council liaison handled"]),
    ("formal-lounge.jpg", "Front Rooms", "Original detail, modern comfort",
     ["Ceiling roses, deep skirting, picture rails and open fireplaces are the reason you bought the house. They're also usually sitting above no insulation, single glazing and 1960s wiring.",
      "We keep the detail and fix everything behind it &mdash; so the front rooms feel like the period they came from and cost what a modern house costs to heat."],
     ["Cornice, ceiling rose and skirting repair or matching", "Insulation retrofitted to walls, floors and ceilings",
      "Full rewiring without butchering the plaster", "Original fireplaces made safe or reinstated", "Double glazing options that suit overlay requirements"]),
    ("living-gable.jpg", "The Rear", "Where you're allowed to be modern",
     ["Most heritage overlays care about what's visible from the street. Behind the original roofline you generally have far more freedom than people expect &mdash; which is why the best period-home renovations look untouched from the footpath and completely contemporary from the garden.",
      "That contrast, done deliberately, is the whole point. Done accidentally, it's a mess. We plan the junction between old and new carefully."],
     ["Contemporary rear additions behind the original roofline",
      "Clear junctions between original and new fabric", "Floor levels resolved between old and new",
      "Raked ceilings and glazing where the overlay allows", "Planning permit applications prepared and lodged"]),
  ],
  why=[("heritage","We know what's behind the walls","Lath and plaster, balloon framing, no damp course, stumps that turned to compost twenty years ago. None of it surprises us."),
       ("doc","Overlay work documented","Planning and building permit applications, heritage advisor reports and council correspondence handled end to end."),
       ("check","Repair before replace","Original joinery, leadlight and detail repaired where it can be. Replaced in matching profile where it can't."),
       ("team","Trades who've done it before","Plasterers who can run a matching cornice and carpenters who can replicate a weatherboard profile.")],
  faq=[("Can I extend a heritage-listed home?",
        "In most cases yes. Heritage overlays typically protect the streetscape &mdash; the facade, the roof form and what's visible from the footpath. Rear additions behind the original roofline are often approved, sometimes with conditions on height and materials. We'll assess your specific overlay before you spend money on design."),
       ("How long does a heritage planning permit take?",
        "Longer than a standard building permit, and it varies a lot by council. It's the single most common cause of delay on period-home projects, so we start the application early and keep you posted rather than leaving you guessing."),
       ("Do I have to use original materials?",
        "For visible restoration work, generally you need to match the original profile and material &mdash; the same weatherboard profile, matching brick, appropriate mortar. Behind the scenes and at the rear, modern materials are usually fine. The overlay wording is specific and we read it properly before quoting."),
       ("My house isn't heritage listed but it's old. Does that change anything?",
        "It changes the paperwork, not the building. An 1890s cottage without an overlay still has the same stumps, the same lath and plaster and the same wiring. The construction approach is identical, you just have more design freedom."),
       ("Can you match existing cornice and skirting?",
        "Yes &mdash; run in place, custom moulded, or sourced from salvage depending on the profile. We'd rather spend a day matching a profile than have a new room that reads as obviously new.")],
),

"granny-flats.html": dict(
  h1="Granny Flats &amp;", em="Studios",
  title=f"Granny Flats &amp; Backyard Studios {CITY} | {BRAND}",
  desc=f"Custom granny flats, backyard studios and home offices across {CITY}. Self-contained second dwellings built to the same standard as the house.",
  lead="A second dwelling for family, a studio for working from home, or a self-contained unit that earns its keep. Built properly &mdash; not a shed with a bathroom in it.",
  blocks=[
    ("build-progress-1.jpg", "Second Dwellings", "Self-contained and independent",
     ["A well-built granny flat gives an older parent or an adult child somewhere genuinely independent to live, on a block you already own. Kitchen, bathroom, living space, its own entry.",
      "The rules around second dwellings vary by council and by zone, and the answer depends on your block size, setbacks and overlays. We'll check yours before you get attached to a plan."],
     ["Full kitchen, bathroom and laundry", "Separate entry and private outdoor space",
      "Independently metered services where required", "Accessible layouts and step-free entry", "Council requirements checked before design starts"]),
    ("bedroom-guest.jpg", "Studios &amp; Offices", "Twenty steps to work",
     ["A backyard studio is the cheapest square metres you'll ever add to a property, and the difference between working at the kitchen table and having a door you can shut is not small.",
      "Insulated, lined, heated, wired for real work, and finished to the same standard as the house &mdash; because you'll be in it every day."],
     ["Insulated, lined and climate controlled", "Data, power and lighting designed for actual work",
      "Acoustic separation from the house and neighbours", "Built-in desks, storage and shelving", "Optional bathroom or kitchenette"]),
    ("backyard.jpg", "Siting", "Getting it in the right spot",
     ["Where the building sits determines whether your back yard still works. Too central and you've lost the garden; too far back and you've lost the sun.",
      "We look at setbacks, overshadowing, drainage, tree protection zones and the route for materials to get in &mdash; before drawing anything."],
     ["Setback, overshadowing and overlooking assessed", "Drainage and stormwater connections planned",
      "Tree protection zones respected", "Access route for materials worked out early", "Landscaping and paving to tie it back to the house"]),
  ],
  why=[("doc","Rules checked first","We confirm what your block actually allows before anyone pays for a design that can't be built."),
       ("house","Built like a house","Same framing, insulation, waterproofing and finish standard as the main dwelling. Not a kit."),
       ("team","One contract","Slab, frame, services, fit-out and landscaping all managed by us."),
       ("leaf","Sited to keep your garden","Placement worked out around sun, drainage and what's left of the back yard.")],
  faq=[("Do I need a permit for a granny flat in Victoria?",
        "Usually yes &mdash; a building permit at minimum, and often a planning permit depending on your council, zone and any overlays. Requirements around second dwellings have shifted in recent years, so we check your specific address rather than working from general rules."),
       ("How big can a granny flat be?",
        "That's set by your council, your zone and your block's setback and site coverage rules rather than by one statewide number. We assess your title and planning controls before design so you know your actual envelope."),
       ("Can I rent it out?",
        "Depends on how it's approved and on your council's position on second dwellings. Some approvals restrict occupancy to a household member. Worth confirming before you build a business case on it &mdash; we'll flag what your approval pathway allows."),
       ("How long does a granny flat take to build?",
        "Several months on site for a full self-contained dwelling, plus the approval time beforehand. A simple uninsulated studio is faster; anything with a kitchen and bathroom takes real time because of the services and waterproofing."),
       ("Can you connect it to the existing services?",
        "Usually yes &mdash; power, water and sewer can generally be extended from the main dwelling, though capacity has to be checked. Separate metering is possible and is sometimes required.")],
),

"design-build.html": dict(
  h1="Design &amp;", em="Build",
  title=f"Design &amp; Build Builders {CITY} | One Contract, Concept To Handover | {BRAND}",
  desc=f"Design and build service across {CITY}. Concept design, documentation, permits and construction under one contract with one point of responsibility.",
  lead="One contract from the first sketch to the day you get the keys back. Design, documentation, permits and construction &mdash; with nobody to point at but us.",
  blocks=[
    ("dining-living.jpg", "Concept", "Start with what you actually need",
     ["Most people come to us with a rough idea and a budget they're not sure is realistic. That's the right time to talk &mdash; before there are drawings that can't be built for the money.",
      "We start with the brief and the budget in the same conversation, sketch options, and get to a concept that works on both counts."],
     ["Brief and budget discussed together, not separately", "Concept sketches and options",
      "Early feasibility on planning and site constraints", "Realistic cost ranges before documentation starts", "No design work billed into a scheme you can't build"]),
    ("living-open-plan.jpg", "Documentation", "Drawings that can be built from",
     ["A set of pretty renders is not a set of construction documents. What actually prevents variations is detail &mdash; junctions resolved, structure coordinated, fixture positions decided.",
      "Because we're going to build it, we document it the way we want to receive it."],
     ["Full working drawings and specifications", "Structural engineering coordinated",
      "Energy rating and compliance documentation", "Finishes, fixtures and joinery scheduled", "Building and planning permit applications lodged"]),
    ("rear-extension.jpg", "Build", "Same team, straight through",
     ["The handover between designer and builder is where most projects lose money and time. Removing it removes the argument about who owns a problem.",
      "The person who drew it is still on the job when it's being built, and the price you signed is the price that was designed to."],
     ["No design-to-build handover gap", "One contract and one point of responsibility",
      "Programme and cost tracked against the original scheme", "Variations priced in writing before work proceeds", "Defect close-out and handover documentation"]),
  ],
  why=[("design","One responsibility","No arguing between the architect and the builder about whose problem a detail is."),
       ("doc","Budget in from day one","The design is developed against a real number rather than costed after the fact."),
       ("clock","Faster to site","Permits and procurement start while design is still finishing, not after it."),
       ("check","Buildable detail","Documented by people who have to build it, which changes what gets drawn.")],
  faq=[("What's the difference between design and build, and hiring an architect?",
        "With design and build you have one contract and one company responsible for both the design and the construction. With a traditional route you engage a designer, then tender the drawings to builders. Traditional can give you more design exploration; design and build gives you cost certainty earlier and no gap for problems to fall into."),
       ("Can you work with plans I already have?",
        "Absolutely, and we often do. If you've already got drawings, send them through &mdash; we'll price them as documented and flag anything that will cause trouble on site before you commit."),
       ("Do you charge for the concept stage?",
        "The initial consultation and quote are free. Detailed design and documentation is paid work &mdash; we'll set out exactly what it covers and what it costs before you commit to it."),
       ("Who handles the permits?",
        "We do. Building permits, planning permits where required, engineering, energy rating and inspection bookings are all part of the service."),
       ("What if the design comes in over budget?",
        "We'd rather find that out at concept stage than at tender, which is the point of pricing as we design. If it does happen, we come back to you with options for what to change rather than quietly substituting cheaper finishes.")],
),

"commercial.html": dict(
  h1="Commercial", em="Fit-Outs",
  title=f"Commercial Fit-Outs {CITY} | Shop, Office &amp; Hospitality | {BRAND}",
  desc=f"Commercial fit-outs across {CITY}. Shopfronts, offices, cafes and clinics built around your trading hours. Make-goods and defect rectification.",
  lead="Shopfronts, offices, cafes and clinics. Built around your trading hours, your landlord&rsquo;s rules and your opening date &mdash; not ours.",
  blocks=[
    ("kitchen-galley.jpg", "Retail &amp; Hospitality", "Open on the day you said you would",
     ["Every day past your opening date is rent you're paying for a room you can't trade from. That's the number that matters, and it's the one we programme against.",
      "We work nights and weekends where the lease or the centre requires it, and we sequence the trades so the certifier isn't waiting on the sparky."],
     ["Shopfronts, glazing and signage", "Commercial kitchens and back-of-house",
      "Counters, joinery and display fit-out", "Out-of-hours and staged works", "Certification and compliance sign-off coordinated"]),
    ("living-open-plan.jpg", "Office &amp; Professional", "Workplaces and clinics",
     ["Partitioning, meeting rooms, reception joinery, data and power. For clinics and consulting suites there's a further layer &mdash; hygiene surfaces, accessible amenities and privacy requirements.",
      "We work to the landlord's fit-out guide and handle the approvals that come with it."],
     ["Partitioning, ceilings and acoustic treatment", "Reception and meeting room joinery",
      "Data, power and comms rough-in", "Accessible amenities and DDA compliance", "Landlord fit-out guide compliance and approvals"]),
    ("build-progress-2.jpg", "Make-Goods", "Handing the space back clean",
     ["Lease make-goods are a cost most tenants forget until the exit clause lands on the desk. Done late, they're expensive and rushed.",
      "We price the make-good against the actual lease wording, not a guess, and get the space back to condition on schedule."],
     ["Make-good scoped against the lease terms", "Strip-out and disposal",
      "Reinstatement of base building condition", "Defect rectification", "Programmed to your lease end date"]),
  ],
  why=[("clock","Programmed to your opening","We work back from your trading date, not forward from ours."),
       ("commercial","Landlord requirements handled","Fit-out guides, approvals, induction and building management liaison."),
       ("team","Out of hours where needed","Night and weekend works so trade isn't interrupted."),
       ("doc","Compliance documented","Certification, essential safety measures and handover documentation in order.")],
  faq=[("Do you work outside business hours?",
        "Yes. Shopping centres and many CBD buildings require it, and for occupied tenancies it's often the only way to keep trading. We price it in from the start rather than adding it later."),
       ("Can you work to the landlord's fit-out guide?",
        "Yes &mdash; send it through with the enquiry. Fit-out guides drive a lot of the cost and programme, so we'd rather read yours before quoting than discover a requirement mid-build."),
       ("Do you handle make-goods at end of lease?",
        "Yes, and the earlier you talk to us the better. A make-good scoped six months out costs considerably less than one scoped six weeks out."),
       ("Can you build a commercial kitchen?",
        "Yes &mdash; including exhaust canopies, grease arrestors, floor wastes, hygienic wall and floor finishes, and the coordination with health department requirements."),
       ("Will the fit-out be certified?",
        "Yes. Building permits, occupancy or final inspection, essential safety measures and the handover documentation are all part of the job.")],
),

"maintenance.html": dict(
  h1="Building Maintenance &amp;", em="Repairs",
  title=f"Building Maintenance &amp; Repairs {CITY} | {BRAND}",
  desc=f"Building maintenance, carpentry and repair work across {CITY}. Defect rectification, make-goods, decks, doors, rot repair and ongoing property upkeep.",
  lead="The jobs too small for a builder and too big for a handyman. Carpentry, repairs, defect rectification and the ongoing upkeep that stops small problems becoming expensive ones.",
  blocks=[
    ("facade.jpg", "Repairs", "Fix it before it gets worse",
     ["Rotten weatherboards, doors that won't latch, decking that's gone spongy, a sagging gutter that's been quietly wetting a wall for two winters.",
      "None of it is glamorous and all of it gets worse and more expensive if you leave it. We take on this work properly rather than treating it as filler between big jobs."],
     ["Weatherboard, fascia and trim replacement", "Rot, termite and water damage repair",
      "Door and window adjustment or replacement", "Decking, stairs, balustrade and handrail repair", "Gutter, downpipe and stormwater rectification"]),
    ("backyard.jpg", "Outdoor", "Decks, fences and paving",
     ["Outdoor structures cop the weather and go first. Decks, pergolas, fences, gates and paving all need attention long before the house does.",
      "New builds and repairs both &mdash; and we'll tell you honestly when a deck is past repairing."],
     ["New decks, pergolas and privacy screens", "Deck resurfacing, restumping and re-oiling",
      "Fencing, gates and retaining", "Paving, steps and paths", "Shed and outbuilding repairs"]),
    ("build-progress-3.jpg", "Ongoing", "Property maintenance programmes",
     ["For owners with multiple properties, or a house that's now a rental, a scheduled maintenance run is far cheaper than reactive call-outs.",
      "We keep a record of what's been done and what's coming up, so nothing gets forgotten between tenancies."],
     ["Scheduled maintenance visits", "Condition reports with photos",
      "Between-tenancy make-goods and repairs", "Defect rectification on recent builds", "One trade contact for a portfolio of properties"]),
  ],
  why=[("maintain","Small jobs taken seriously","We turn up for the small work, which is the whole reason clients keep calling."),
       ("doc","Priced before we start","Even a half-day job gets a number in writing first."),
       ("check","Fixed once","We repair the cause, not just the symptom &mdash; otherwise you're calling again next winter."),
       ("team","Licensed trades","Plumbing and electrical work goes to licensed trades and gets certified, not bodged.")],
  faq=[("Is there a minimum job size?",
        "No fixed minimum, though for very small jobs we'll usually suggest bundling a few things into one visit so you're not paying a call-out for a single hinge."),
       ("Do you do emergency repairs?",
        "We take urgent repair work &mdash; storm damage, a failed door, water getting in. Call and we'll tell you honestly how quickly we can get someone there rather than promising a time we can't hold."),
       ("Can you fix defects from another builder's work?",
        "Yes, and we do it regularly. We'll document what we find, which is often useful if you're in a dispute with the original builder."),
       ("Do you do maintenance for rental properties?",
        "Yes &mdash; including between-tenancy make-goods and scheduled maintenance runs for owners with more than one property."),
       ("Can you quote from photos?",
        "For simple repairs, often yes, and it saves everyone a trip. For anything structural or water-related we'll want to see it in person before putting a number on it.")],
),
}


def build_service_pages():
    for s in SERVICES:
        c = SERVICE_PAGES[s.slug]
        others = [x for x in SERVICES if x.slug != s.slug][:6]
        blocks = []
        for i, (img, tag, h, paras, bullets) in enumerate(c["blocks"]):
            band = BAND if i % 2 == 1 else ""
            blocks.append(f'<section class="sec" {band}><div class="ctr">'
                          + content_block(img, tag, h, paras, bullets, reverse=(i % 2 == 1))
                          + '</div></section>')
        schema = json.dumps({
            "@context": "https://schema.org", "@type": "Service",
            "name": s.title.replace("&amp;", "&"),
            "serviceType": s.title.replace("&amp;", "&"),
            "description": c["desc"],
            "areaServed": {"@type": "City", "name": CITY},
            "provider": {"@type": "HomeAndConstructionBusiness", "name": BRAND,
                         "telephone": PHONE, "email": EMAIL, "url": f"{SITE_URL}/",
                         "address": {"@type": "PostalAddress", "addressLocality": CITY,
                                     "addressRegion": STATE, "addressCountry": "AU"}}
        }, indent=2)

        body = (nav(0) + phero([("Home", "index.html"), ("Services", "services.html"), s.nav],
                               c["h1"], c["em"], c["lead"])
                + "".join(blocks)
                + f'''
<section class="sec why-sec">
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">Why Us</div>
      <h2 class="sec-t fade">Why clients choose us for this work</h2>
    </div>
    {why_grid(c["why"])}
  </div>
</section>'''
                + faq_block("FAQ", "Frequently asked questions", "", c["faq"])
                + f'''
<section class="sec" {BAND}>
  <div class="ctr">
    <div class="sec-c">
      <div class="sec-tag fade">More Services</div>
      <h2 class="sec-t fade">What else we take on</h2>
    </div>
    {service_grid(0, subset=others)}
  </div>
</section>'''
                + quote_form(s.title.replace("&amp;", "&"),
                             f"Get a quote for<br>your {s.nav.replace('&amp;','&').lower()} project",
                             "Four quick questions and we&rsquo;ll come back with next steps and a time for the site visit.",
                             0, image=c["blocks"][0][0])
                + cta("Want a number on it?",
                      "Send us what you&rsquo;ve got &mdash; sketch, plans or just a description &mdash; and we&rsquo;ll come back with an honest read.",
                      0, quote_href="#quote-form"))
        write(s.slug, head(c["title"], c["desc"], s.slug, 0, schema) + body + footer(0, quote_href="#quote-form"))

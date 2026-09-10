# PA Building Group

Static marketing site for **PA Building Group** (PA Building and Maintenance Services P/L) —
Melbourne renovation and extension builders.

Plain HTML/CSS/JS, served from GitHub Pages. No framework, no build step required to deploy.

## Structure

```
index.html                 Home
services.html              Services index
extensions.html            ─┐
renovations.html            │
kitchens-bathrooms.html     │
outdoor-living.html         │
maintenance.html            ├─ 10 service pages
presale.html                │
heritage.html               │
granny-flats.html           │
design-build.html           │
commercial.html            ─┘
projects.html              Featured project gallery
about.html                 About
contact.html               Contact + quote form
thank-you.html             Form success page (noindex)
404.html                   Not found (noindex)
locations/*.html           32 suburb landing pages
assets/site.css            All styles
assets/site.js             Nav, drawer, fade-in, multi-step quote form, lightbox
images/                    Logos, favicons, project photography
sitemap.xml  robots.txt
```

## Regenerating the HTML

The HTML is generated from Python templates so the nav, footer and quote form
never drift between 49 pages. **The generated `.html` files are committed** — the
build step is a convenience, not a deploy requirement.

```bash
python make.py     # rewrites every .html file
python check.py    # link, anchor and asset integrity check
```

| File | Contains |
| --- | --- |
| `build.py` | Brand constants, icons, service list, shared partials (head/nav/footer/CTA/quote form) |
| `pages.py` | Home page, suburb data, shared content blocks |
| `pages2.py` | The 10 service pages and their copy |
| `pages3.py` | Services index, projects, about, contact, thank-you, 404, locations, sitemap |
| `make.py` | Runs all of the above |
| `check.py` | Verifies internal links, `#anchors` and image references |

Edit the Python, run `python make.py`, commit both the source and the output.

## Local preview

```bash
python -m http.server 8099
```

---

## ⚠ Before this goes live — placeholders to replace

Everything below is placeholder content. Search the repo for `TODO` and `PLACEHOLDER`.

**Contact details** — set in `build.py` (`PHONE`, `PHONE_HREF`, `EMAIL`) *and*
`assets/site.js` (`CONFIG`), then re-run `python make.py`:

- Phone: `0400 000 000`
- Email: `hello@pabuildinggroup.com.au`

**Form endpoint** — ✅ connected. `assets/site.js` → `CONFIG.web3FormsKey` holds
the Web3Forms access key; submissions go to whichever inbox that key was
registered against, with the subject `Website enquiry — <page context>` and the
visitor's email as reply-to. If the key is ever cleared, the form falls back to a
"call us instead" message rather than silently dropping enquiries.

**Reviews** — the reviews marquee on the home and projects pages is dummy text with
a visible placeholder notice. Connect the client's Google Business Profile and
replace `PLACEHOLDER_REVIEW` in `pages.py`, plus the `—` rating in the badge.

**Claims to verify with the client** before publishing:

- Builder registration number (VBA) — currently "to be confirmed" on `about.html`
- Insurance details (public liability, domestic building insurance)
- HIA / Master Builders membership
- Team size and the director's name (the pull quote on the home page is still
  placeholder copy)
- Three of the four hero stat cards on `index.html` — "40+ years" is theirs,
  the other three are ours
- Whether they still want the **Commercial Fit-Outs** page: their Facebook
  positions them as *residential* builders and doesn't mention commercial work
- Project name, suburb and completion date for the featured project — currently
  "Ethel Street, Melbourne, VIC"

**Domain** — no CNAME yet. `SITE_URL` in `build.py` points at
`https://rankify-ops.github.io/pa-building-group`. When a domain is registered,
update `SITE_URL`, re-run `make.py`, and add a `CNAME` file.

## Known-good facts (from the client's Facebook page)

These are the only business claims on the site that came from the client rather
than from us:

- Over 40 years' experience in Melbourne residential construction
- Specialises in home additions & renovations, bathroom & kitchen upgrades,
  outdoor living areas, property maintenance, and pre-sale facelifts

The service list, home page hero and About story are all built on these.

## Brand

| | |
| --- | --- |
| Blue | `#0a57ff` (sampled from the supplied logo) |
| Ink | `#08090c` |
| Type | Archivo, variable 300–800 |

### Type scale

One family, one scale. Every `font-size` in `site.css` is a token defined in
`:root` — if you need a size that isn't there, use the nearest one rather than
adding another. Four literal sizes remain on purpose: the `×` and `+` glyphs,
the decorative quote mark, and the pull quote's own clamp.

| Token | Size | Used for |
| --- | --- | --- |
| `--fs-micro` | .68rem | stat sub-labels, footer badges, chevrons |
| `--fs-label` | .74rem | uppercase eyebrows, breadcrumbs |
| `--fs-xs` | .8rem | helper text under form headings |
| `--fs-sm` | .875rem | nav, card body, footer links, buttons |
| `--fs-body` | .95rem | body copy |
| `--fs-md` | 1rem | drawer links, list headings |
| `--fs-lead` | 1.05rem | hero sub, page-hero leads |
| `--fs-h4` | 1.15rem | card titles |
| `--fs-h3` | 1.3rem | form headings |
| `--fs-h2s` | 1.55rem | in-body section headings |
| `--fs-h2` | clamp(1.7–2.3rem) | section headings |
| `--fs-h1s` | clamp(2.2–3.2rem) | sub-page H1 |
| `--fs-h1` | clamp(2.6–3.7rem) | home hero H1 |

Tracking is tokenised too: `--ls-tight` for headings, `--ls-caps` for uppercase
micro-labels (in `em`, so it tracks the size).

`images/logo.png` is the reverse lockup (white wordmark, for dark backgrounds);
`images/logo-dark.png` is the standard lockup. Both were built from the client's
supplied artwork with the white background knocked out.

---

Website by [Rankify](https://rankify.com.au).

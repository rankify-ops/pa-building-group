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
heritage.html               ├─ 8 service pages
granny-flats.html           │
design-build.html           │
commercial.html             │
maintenance.html           ─┘
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
never drift between 47 pages. **The generated `.html` files are committed** — the
build step is a convenience, not a deploy requirement.

```bash
python make.py     # rewrites every .html file
python check.py    # link, anchor and asset integrity check
```

| File | Contains |
| --- | --- |
| `build.py` | Brand constants, icons, service list, shared partials (head/nav/footer/CTA/quote form) |
| `pages.py` | Home page, suburb data, shared content blocks |
| `pages2.py` | The 8 service pages and their copy |
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

**Form endpoint** — `assets/site.js` → `CONFIG.web3FormsKey` is empty. Until a
Web3Forms key registered to the client's own inbox is added, the form deliberately
shows a "call us instead" message rather than silently dropping enquiries.

**Reviews** — the reviews marquee on the home and projects pages is dummy text with
a visible placeholder notice. Connect the client's Google Business Profile and
replace `PLACEHOLDER_REVIEW` in `pages.py`, plus the `—` rating in the badge.

**Claims to verify with the client** before publishing:

- Builder registration number (VBA) — currently "to be confirmed" on `about.html`
- Insurance details (public liability, domestic building insurance)
- HIA / Master Builders membership
- Years in business, team size, director's name (the pull quote on the home page
  and the whole "Our Story" block on `about.html` are placeholder copy)
- The four hero stat cards on `index.html`
- Project name, suburb and completion date for the featured project — currently
  "Ethel Street, Melbourne, VIC"

**Domain** — no CNAME yet. `SITE_URL` in `build.py` points at
`https://rankify-ops.github.io/pa-building-group`. When a domain is registered,
update `SITE_URL`, re-run `make.py`, and add a `CNAME` file.

## Brand

| | |
| --- | --- |
| Blue | `#0a57ff` (sampled from the supplied logo) |
| Ink | `#08090c` |
| Type | Inter 400–800 |

`images/logo.png` is the reverse lockup (white wordmark, for dark backgrounds);
`images/logo-dark.png` is the standard lockup. Both were built from the client's
supplied artwork with the white background knocked out.

---

Website by [Rankify](https://rankify.com.au).

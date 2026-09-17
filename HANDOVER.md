# PA Building Group website

Next.js (App Router) static export, the same stack, design system and black / white / silver
palette as the Santa'lana Builders build. PA's logo blue is kept only for the main quote buttons
and selected states. The home hero photo is mirrored in CSS (`.hero__media img`) so the kitchen
isn't hidden behind the quote card. Rebuilt on 17 Sep 2026 from the
earlier plain-HTML site; all of that site's copy and photography carried over.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export in out/
```

Every push to `main` deploys to https://rankify-ops.github.io/pa-building-group/ through
`.github/workflows/deploy.yml` (basePath `/pa-building-group`). At domain cutover, change
`SITE.url` in `src/data/site.ts`, remove `NEXT_PUBLIC_BASE_PATH` from the workflow, and add
`public/CNAME`, all in the same commit. His email domain suggests `pabuilding.com.au`.

Building locally with the base path in Git Bash needs `MSYS_NO_PATHCONV=1`, otherwise
`/pa-building-group` is rewritten into a Windows path.

## Where things live

| File | Purpose |
|---|---|
| `src/data/site.ts` | Business details (phone, email, address, registrations, Web3Forms key) and types. **Change contact details here only.** |
| `src/data/services.json` | The 10 service pages: copy, content blocks, why-us points, FAQs. |
| `src/data/suburbs.json` | The 32 suburb landing pages. |
| `src/data/projects.json` | Sections and captions for the projects page. |
| `src/data/icons.json` | Line icons used on service cards. |
| `src/app/page.tsx` | Home page. |
| `src/app/services/[slug]/page.tsx` | Template for every service page. |
| `src/app/locations/[slug]/page.tsx` | Template for every suburb page. |
| `src/app/{services,projects,about,contact,thank-you}/page.tsx` | The other pages. |
| `src/components/` | Header (utility strip, nav, mobile menu), footer and dock, enquiry form, shared section blocks. |
| `src/app/site.css` | The whole design system. Tokens at the top under `:root`. |
| `src/lib/site-behaviour.js` | Mobile menu, sticky header, dock, scroll reveal, stepped form and Web3Forms submit. |

Internal links are plain `<a>` tags through `href()` rather than `next/link`, so every navigation
is a full page load and `site-behaviour.js` runs fresh on each page.

## Enquiry forms

Four steps: service, property type (House / Town House / Heritage Home), stage, contact details.
Submissions post to Web3Forms and land on `/thank-you/`. The subject line names the page the lead
came from, for example `Website enquiry — Kew page: Outdoor living area`. If the post fails, the
visitor is shown Paul's mobile and email instead of a silent failure.

## Where the content came from

* **Contact details and registrations**: Paul Athinis's email signature. Mobile 0409 040 493,
  office 03 9717 0650, paul@pabuilding.com.au, 26/327 Mansfield St Thornbury, DB-U 44080 and
  CDB-U 51464, Building and Plumbing Commission.
* **40+ years and the specialities** (additions and renovations, kitchens and bathrooms, outdoor
  living, property maintenance, pre-sale facelifts): the business Facebook page.
* **Photography**: the Ethel Street job supplied in the client folder.
* Everything else is our copy.

## Before this goes live

1. **Commercial Fit-Outs page.** Both of Paul's registrations are *domestic* builder categories
   (DB-U and CDB-U), and his Facebook describes the business as residential. Advertising commercial
   building work without a commercial registration is a compliance risk in Victoria. Confirm with
   Paul whether he wants this page; to remove it, delete the `commercial` entry from
   `src/data/services.json`.
2. **Claims to confirm**: "Licensed & insured" wording, whether he is an HIA or Master Builders
   member (not currently claimed), and the three process-style stats on the home page stat bar.
3. **Featured project**: confirm the suburb and completion year for Ethel Street
   (`PROJECT_NAME` in `src/data/site.ts`), and ask for photos of other completed jobs.
4. **Reviews**: deliberately left out rather than filled with placeholder cards. Once Paul's
   Google Business Profile is connected, a reviews band between projects and the quote band on the
   home page is the right slot.
5. **Send a real test enquiry** from the live site and confirm it arrives in the inbox the
   Web3Forms key is registered to.

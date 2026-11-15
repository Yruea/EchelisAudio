# Echelis Audio: Phase 0 audit

Audited 2026-11-14 against the live site (`https://www.echelisaudio.com`, production deploy of `main`) and the repo at branch `redesign/instrument`.

## Summary: what matters most

| # | Finding | Severity |
|---|---|---|
| 1 | **Early-access signups are silently discarded.** The form shows "You're on the list" but nothing is stored or sent. Same for the contact form. | Critical: this is the site's one business goal |
| 2 | The site is a client-rendered SPA. Without JavaScript the page is an empty `<div id="root">`. Crawlers and link previews that don't run JS see only the `<head>`. | High |
| 3 | No Open Graph or Twitter tags, no canonical, no sitemap, no robots.txt, no structured data. Every page shares one title and description. | High |
| 4 | The reported malformed meta tags do **not** exist in the site. See section 2. | No bug |
| 5 | Mobile LCP is 3.5 s (target < 2.5 s). The hero image is lazy-loaded and only discoverable after the JS bundle runs. | Medium |
| 6 | Primary button colour fails WCAG AA (4.28:1). One icon link has no accessible name. No `prefers-reduced-motion` handling anywhere. | Medium |
| 7 | Roughly 20 unused dependencies, 50 unused UI components, and dead pages (cart, checkout, sign-in, account) for a store that does not exist yet. | Medium (maintenance and bundle weight) |

## 1. Stack and build

- **Framework:** React 18 + React Router 6, built with Vite 8. Tailwind 3 with shadcn/ui components.
- **Rendering mode:** CSR only. `index.html` ships an empty `#root`; all content is rendered in the browser. Nothing is visible with JS disabled. This is why fetching the site returns "almost nothing but meta tags".
- **Hosting:** Vercel, static output from `vite build`. `vercel.json` rewrites all non-file paths to `/index.html`, so unknown URLs return HTTP 200 with a client-side "not found" screen (a soft 404).
- **Origin:** the code is an export from Base44 (an app builder). `@base44/vite-plugin` still runs in the build and injects a page-view tracking script into `<head>`; with no app ID configured it does nothing.
- **Backend:** none. See section 7.
- **Bundle:** one JS file, 489 kB (147 kB gzip), and one CSS file, 74 kB (13 kB gzip). No code splitting. Lighthouse estimates 65 kB of unused JS on the home page.
- **Dependencies:** 70+ runtime dependencies. Not imported anywhere in `src/`: `three`, `jspdf`, `html2canvas`, `moment`, `lodash`, `react-leaflet`, `react-quill-new`, `@stripe/stripe-js`, `@stripe/react-stripe-js`, `canvas-confetti`, `@hello-pangea/dnd`, `react-markdown`, `date-fns`, `zod`, `nitro`. Tree-shaking keeps most out of the bundle, but they slow installs and widen the security surface.
- **Leftover files:** `style.css` and `HomePage` (old static site), `export-report.json`, `src/assets/other/%23n`, and `IEM_Basic_List.md` at the repo root.
- **CI:** `.github/workflows/deno.yml` runs `deno lint` on a non-Deno project and fails on every push (140 lint problems). It gives no useful signal. The project's own ESLint config is not run in CI.
- **Docs:** `README.md` and `AGENTS.md` contain broken links (`docs.db.com`, `app.db.com`) from a past find-and-replace of "base44" to "db".

## 2. Reported critical bug: malformed meta tags

**Finding: the live HTML is well-formed. There is nothing to fix at the source, so I made no commit for this item.**

The raw response from `https://www.echelisaudio.com/` (fetched with `curl`) contains:

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#0A0A0B" />
<meta name="description" content="EchelisAudio — precision-built in-ear monitors ..." />
```

There are no `<meta-description>`-style tags, no `---` delimiters, and `charset` is present. The repo has no front-matter, template or layout layer that could produce them: `index.html` is a plain file that Vite passes through.

**Likely root cause of the report:** the tool used to fetch the page converted the HTML to Markdown and wrote the head metadata as a YAML front-matter block (`---`, `meta-description: ...`, `meta-theme-color: ...`). That is the fetcher's output format, not what the server sends. The "almost nothing but meta tags" part of the report is real, and is the CSR issue in section 1.

If you saw these tags somewhere else (view-source in a browser, a validator, Search Console), tell me where and I will re-check.

## 3. SEO and sharing

| Item | State |
|---|---|
| Title / description | Present, but identical on every route. No per-page titles. Still says "Angosta One". |
| Canonical | Missing |
| Open Graph / Twitter cards | Missing entirely (0 tags). Shared links show no image or summary. |
| Favicon set | Present: `favicon.ico` (48), PNG 32/48/512, apple-touch-icon, `manifest.json`. To be replaced by the new wordmark. |
| `robots.txt` | Missing (404) |
| `sitemap.xml` | Missing (404) |
| Structured data | None. Needs `Organization` and `Product` (pre-order / coming soon). |
| Soft 404s | Unknown URLs return HTTP 200 |
| Indexability | Google renders JS, but with delay; other crawlers and social scrapers see an empty body. |

Lighthouse's SEO score is 100, but it only checks basics (title, description, crawlable links). It does not catch the gaps above.

## 4. Performance

Lighthouse 13 against production, home page, single run each:

| | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| Mobile | 90 | 93 | 100 | 100 | **3.5 s** | 0 | 30 ms | 1.7 s |
| Desktop | 98 | 96 | 100 | 100 | 1.1 s | 0 | 0 ms | 0.7 s |

- **LCP (mobile) misses the 2.5 s bar.** The LCP element is the hero image. It is `loading="lazy"`, has no `fetchpriority`, and its URL only exists after the bundle executes, so the browser cannot start it early.
- **INP:** not measurable in a lab run. TBT is low, so no sign of a problem.
- **Render-blocking:** the Google Fonts stylesheet and the CSS file block first paint (estimated 840 ms on mobile).
- **Fonts:** loaded from Google Fonts at runtime, not self-hosted, subsetted or preloaded.
- **Images:** four product renders hot-linked from `media.base44.com`, a third-party host we don't control. No `width`/`height` attributes. The header logo is hot-linked from `static.wixstatic.com`.
- **Bundle:** single 147 kB gzip chunk for all 20 routes.

Single runs vary by a few points; treat these as a baseline, not exact figures.

## 5. Accessibility

- **Contrast fail:** white text on the primary blue `#577DA8` is 4.28:1 (AA needs 4.5:1). Affects every primary button and the announcement bar.
- **Unnamed link:** the "Reserve a spot" link in the announcement bar has no accessible text at mobile width.
- **Focus states:** only the browser default outline at 50% opacity; several inputs replace it with a 1px ring. Not reliably visible.
- **Skip link:** none.
- **Reduced motion:** no `prefers-reduced-motion` handling. Scroll reveals and the exploded-view animation always run.
- **Landmarks:** `header`, `main`, `footer` and two `nav` elements are present. One `h1` per page. All images have `alt` attributes.
- **Not tested:** screen-reader passes and full keyboard walkthroughs of every page. Worth doing on the rebuilt site, not this one.

## 6. Content and information architecture

20 routes for a pre-launch company with one unreleased product:

| Route | Purpose | Verdict |
|---|---|---|
| `/` | Landing, signup | Keep, rebuild |
| `/shop` | Catalog of one product, five empty categories | Remove until there is a catalog |
| `/product/angosta-one-founders-edition` | Product page | Becomes `/angostura-uno` |
| `/engineering` ("How it works") | Philosophy and exploded view | Fold into home and product page |
| `/journal`, `/journal/:slug` | Three posts, hard-coded in `data.js` | Keep; move to files (Markdown) |
| `/about` | Team and story | Keep |
| `/contact` | Form (non-functional) plus email | Fold into footer or About |
| `/faq` | Product FAQ | Fold into product page |
| `/cart`, `/checkout` | Empty placeholders | Remove |
| `/signin`, `/account`, `/forgot-password`, `/reset-password` | Auth screens with no backend | Remove |
| `/shipping-returns`, `/warranty` | Policies for a product not on sale | Remove until orders open |
| `/privacy`, `/terms`, `/accessibility` | Legal | Keep privacy (required once we collect emails) and terms; review the text |

Content concerns:
- **Invented specifics.** The product page shows "84% reserved" and "Detachable · MMCX". The FAQ and journal make tuning and design claims. None are confirmed. All of this needs review against the "never invent specs" rule and replacement with `[[SPEC]]` placeholders.
- **Naming.** Site says "Angosta One" and "EchelisAudio"; the brief sets "Angostura Uno" and "Echelis" / "Echelis Audio".
- **Imagery.** The four renders are AI-generated concept images, labelled "concept render". They will not match the real product.

Your proposed sitemap (`/`, `/angostura-uno`, `/journal`, `/about`, `/thanks`) matches what the audit supports. I would add `/privacy` and a real 404.

## 7. Early-access flow

**It does not work.** I confirmed this from the code and on the live site without submitting the form.

- `WaitlistForm.jsx` calls `db.entities.WaitlistEntry.create(...)`.
- `db` is `globalThis.__B44_DB__ || localDb`. On the live site `globalThis.__B44_DB__` is `undefined` (checked in the browser), so the fallback stub is used. Its `create` is `async () => ({})`: it resolves successfully and does nothing.
- Result: the visitor sees "You're on the list. We'll be in touch before anyone else." No request leaves the browser. Nothing is stored. No confirmation email is sent.
- The contact form (`ContactMessage.create`) fails the same way.
- Entity schemas exist in `base44/entities/`, but the deployed site is not connected to a Base44 backend (no app ID in the build).
- Validation is one regex. No honeypot, rate limit, duplicate handling or consent text.

Anyone who signed up through the live site so far has been lost. I can't tell how many; Vercel Web Analytics may show page views but not submissions.

## Open questions

1. **Signups are being lost today.** Do you want an interim fix on the current site before the redesign ships? Options are in Phase 2 (a form service, a Vercel function with a database, or reconnecting Base44). The quickest stopgap is a hosted form service, which needs you to create an account.
2. Where did you see the malformed meta tags? (Section 2.)
3. PR #9 (futuristic fonts) is still open. The redesign replaces that typography, so I suggest closing it unmerged.
4. Rendering: to meet "readable with JS disabled" and the SEO bar, the rebuild needs static pre-rendering. Staying on Vite with a prerender step is possible; moving to a framework built for it (Astro, or Next.js on Vercel) is cleaner. I will propose one in Phase 1 unless you have a preference.
5. May I remove the Base44 plugin, the unused dependencies, the dead pages and the failing Deno workflow as part of the rebuild?
6. Is the "84% reserved" figure based on anything real?

## Placeholders

None introduced in this phase. Content that should become `[[SPEC]]` or copy placeholders is listed in section 6.

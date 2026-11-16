# Echelis Audio: Phase 2 build report (placeholder 3D)

Branch `redesign/instrument`. Not merged. The live site is unchanged.

## Decisions carried in from Phase 1

- **Wordmark:** B ("Three bars"). Final files in `docs/brand/`.
- **Type:** Geist + Geist Mono, self-hosted, Latin subset, preloaded, `font-display: swap`.
- **Accent:** amber `#FFB000` is the single accent token. The orange → amber → phosphor gradient is used in one place only: the frequency line, where low-to-high colour maps to low-to-high frequency. This keeps the "one signal, ≤ 5% of the screen" rule.
- **Headline:** "Built in the open."

## What was built

| Route | Content |
|---|---|
| `/` | Hero → pinned exploded-view sequence → spec sheet → why Echelis → team → early access |
| `/angosta-one` | Spec grid, part-by-part design notes, FAQ, early access |
| `/journal`, `/journal/[slug]` | Lab-note format, Markdown content collection, one proposed entry |
| `/about` | Mission, team roster (placeholders), contact, early access |
| `/privacy`, `/thanks`, 404 | Plain pages; 404 returns a real 404 status |

Removed on this branch, as approved: the Base44 plugin and client, React, Tailwind, about 70 dependencies, the cart / checkout / sign-in / account / shop / policy pages, and the failing Deno workflow. A small CI workflow now runs `npm run check` and `npm run build`.

`vercel.json` redirects every old URL to its new home.

## Scroll sequence

One pinned section, seven viewports tall:

| Progress | What happens |
|---|---|
| 0 – 10% | Hero. Model makes one full turn; hero copy fades out |
| 10 – 22% | Model separates along one axis into five parts |
| 22 – 82% | Five detents. One part lit, the rest dimmed; its callout and a leader line appear |
| 82 – 94% | Reassembles |
| 94 – 100% | End card: "That is the whole thing." and the signup CTA |

The spec sheet follows the sequence, and the full signup form is the last section, per the approved sitemap. The end card links to it.

**Fallbacks.** With JavaScript off, reduced motion on, or no WebGL, the section is not pinned: a static hero, then a static exploded line diagram with all five callouts listed. See `docs/phase2/static-fallback-home-1440.png`.

**Placeholder model.** Five groups of primitives (open bowl, disc, cylinder, three small blocks, a board). Shapes, proportions and the number of driver blocks are stand-ins, not specs.

## Libraries and weight

| Library | Used | Reason |
|---|---|---|
| Three.js | Yes, 134 kB gzip, lazy | Loaded only after the first pointer, touch, scroll or key event, so it never competes with first paint. The poster shows until then. |
| React Three Fiber | No | Would add React (about 45 kB gzip) for one canvas. |
| GSAP + ScrollTrigger | No | The sequence needs one scroll-progress value and a pinned section. `position: sticky` plus about 100 lines of code does it. |
| Lenis | No | The controller already eases toward the scroll position, which gives the weighted feel without taking over native scrolling. |

Everything outside the 3D chunk: 13 kB of CSS (inlined) and under 4 kB of JavaScript.

**Mobile.** Measured, then simplified: pixel ratio capped at 1.5, half the geometry segments, no clear-coat, no antialiasing, no idle drift, and rendering stops once scrolling settles. The model scales to fit the screen width when exploded.

## Lighthouse (local production build, single runs)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Home, mobile | 100 | 100 | 96 | 100 | 0.6 s | 0 | 10 ms |
| Home, desktop | 100 | 100 | 96 | 100 | 0.2 s | 0 | 0 ms |
| Angosta One, mobile | 99 | 100 | 96 | 100 | 0.6 s | 0 | 140 ms |
| Journal, mobile | 100 | 100 | 96 | 100 | 0.7 s | 0 | 0 ms |
| About, mobile | 100 | 100 | 96 | 100 | 0.6 s | 0 | 10 ms |

Caveats:

- **Best practices 96** is one failure: `/_vercel/insights/script.js` returns 404 on a local server. That file only exists on Vercel, so this should clear on a deployed preview. Not yet verified there.
- **These runs do not include the 3D.** Lighthouse does not interact with the page, so Three.js never loads during the test. An earlier run with the 3D loading eagerly scored 77 on mobile (TBT 1.1 s) in headless Chrome, which renders in software. Real phones have a GPU, but the 3D's cost on a mid-range device is unmeasured. That needs a real-device test.
- Local runs have no network latency. Expect LCP to be higher on the deployed site.

## Checks done

- With JS disabled the raw HTML contains the headline, copy, callouts, spec sheet and a working form `action`.
- Canonical, Open Graph, Twitter card, sitemap, robots.txt and JSON-LD (Organization, Product, FAQPage, BlogPosting) are present.
- Signup form: an invalid address shows an inline error and returns focus; a real test submission (`phase2-test@echelisaudio.com`) got a 200 from Formspree and showed the success state.
- 375px: no horizontal overflow; the sequence runs and the model fits.
- `npm run check`: 0 errors. `npm run build`: passes.

Not done: a full keyboard walkthrough of every page, a screen-reader pass, and Safari / Firefox testing.

## Form backend options

The form currently posts to Formspree, which you chose for the stopgap.

| Option | For | Against |
|---|---|---|
| **Formspree** (current) | Already working; no server code; spam filtering; CSV export | Free plan has a monthly submission cap; the list lives in a third party; no automatic confirmation email on the free plan |
| **Email platform form** (Buttondown, Mailchimp, ConvertKit) | Signups land directly in the tool that will send the updates; double opt-in and unsubscribe handled | Another account; their form endpoints vary in how well they work without JS |
| **Vercel function + database** (e.g. Postgres) | You own the data; no caps; custom confirmation email | Server code to write and maintain; spam protection and email sending are on us |

Recommendation: keep Formspree until you choose the tool you will send updates from, then move the form to that tool.

## Open questions

1. **Journal entry 001** tells the story of the broken signup form. Publish, edit or drop?
2. **Team:** six names and roles.
3. **Old journal posts** (three) were not carried over: they contain tuning and cable claims that are not confirmed. Rewrite or leave out?
4. **Schema:** the Product markup has no price or availability, because schema.org's "PreOrder" means orders are being taken. Confirm that is right.
5. **Preview access:** Vercel previews are behind a login, so I have not seen this build deployed.
6. **`hello@echelisaudio.com`:** the domain still has no MX records as far as I can see. The address appears in the footer, the privacy page and form errors.

Placeholders are listed in `docs/PLACEHOLDERS.md`.

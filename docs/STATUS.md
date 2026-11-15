# Echelis Audio site: status after launch

Launched 2026-11-15. This is the hand-off: what was checked, what was not, and what is left.

## Quality bar from the brief

| Requirement | State | Evidence |
|---|---|---|
| Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best practices ≥ 95, SEO 100 | Met | Production, home page, one run: 100 / 100 / 100 / 100 |
| LCP < 2.5 s; static poster first, 3D lazy | Met in the lab | 1.3 s mobile (Lighthouse throttling). The poster is the LCP element; the 3D loads on first interaction |
| CLS < 0.05 | Met | 0 |
| Fonts subsetted, preloaded, `font-display: swap` | Met | Self-hosted Latin subsets of Geist and Geist Mono |
| Readable with JS disabled | Met | Headline, copy, callouts, spec sheet and a working form `action` are in the raw HTML |
| WCAG AA contrast, including muted labels | Met | Token contrast table in `DIRECTION.md`; Lighthouse accessibility 100 |
| Visible focus states, full keyboard navigation | Met on the home page | See "Keyboard walkthrough" below |
| WebGL fallback | Partly verified | The static layout was checked with reduced motion on. It uses the same code path as "no WebGL", but an actual WebGL failure was not simulated |
| No console errors | Met | Production home page, desktop and phone width |
| No layout shift when 3D loads | Met | The canvas is absolutely positioned over the poster |

Lighthouse does not interact with the page, so none of these numbers include the cost of the 3D.

## Keyboard walkthrough (production home page, Chrome)

- Tab order: skip link → logo → nav → header CTA → hero CTA → "Full product page" → "About Echelis" → email field → submit → privacy link → footer links.
- Every stop shows a 2px amber focus outline and is scrolled into view.
- The pinned 3D sequence has no focusable controls. Tabbing from the hero CTA moves straight to the spec sheet. Keyboard users reach the sequence by scrolling (arrow keys, space, page down). Its five callouts are ordinary list items in the page, so a screen reader reads them in order whether or not the 3D runs.
- The end-card button is only focusable while the end card is showing.

## Not tested

- **A real phone.** Layout was checked in an emulated 375 × 812 viewport. How smoothly the 3D runs on a mid-range device is unknown. If it stutters, the fallback is a pre-rendered image sequence on phones.
- **Safari and Firefox.** Everything was checked in Chrome only.
- **A screen reader.** The structure is in place (landmarks, one `h1` per page, labelled form, hidden decorative canvas), but no pass with VoiceOver or NVDA was done.
- **Keyboard walkthroughs of the other pages.** They use the same components as the home page.

## Left for the owner

1. Open the site on your phone and scroll the home page. Report stutter or anything cut off.
2. Review the draft copy: the five callout lines and design notes, the FAQ answers, "Why Echelis", the About mission. All of it is listed in `PLACEHOLDERS.md`.
3. Have the Privacy page reviewed. It is a plain-language draft with no legal review.
4. Fill in specs as they are decided (`src/data/site.ts`). Open rows show "To be confirmed".
5. Request indexing of `https://www.echelisaudio.com/` in Google Search Console.
6. Formspree's free plan has a monthly submission cap. Watch it as signups grow.

## When real CAD exists

1. Name each component as listed in `PHASE3-3D-BRIEF.md`, section 5.
2. Run the Fusion script in `tools/fusion/EchelisExport/` (Utilities → Scripts and Add-Ins). It writes a STEP file, one STL per part and a report. **The script is untested**: it was written before any design existed, so run it on a simple test design first.
3. Hand over the export folder. The meshes replace the concept model through the same Blender and Meshopt steps as `tools/3d/build_concept.py`. That conversion script does not exist yet; it needs a real export to be written against.
4. Remove the "Concept model" note from `src/components/Stage.astro` and re-render the hero poster.

## Housekeeping

- Merged branches are still on GitHub (`redesign/instrument`, `stopgap/forms`, the favicon branches and others). They can be deleted.
- `IEM_Basic_List.md` in the repo root is an internal planning document. If the repository is public, consider whether it should be.
- Rollback: the last old-site commit is tagged `pre-redesign`; Vercel's Instant Rollback also works.

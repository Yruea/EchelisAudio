# AGENTS.md

## Project

The Echelis Audio website: a static Astro site deployed on Vercel. See `README.md` for setup and `docs/` for the audit, creative direction and placeholders.

## Rules

- **Never invent product specs** (driver configuration, frequency response, impedance, sensitivity, price, ship dates). Unknown values stay `null` in `src/data/site.ts` with a `[[SPEC: ...]]` placeholder id. List new placeholders in `docs/PLACEHOLDERS.md`.
- Never show stock, reservation or signup numbers unless they come from a real source.
- Product name is **Angosta One**. Brand in running text is "Echelis" or "Echelis Audio"; the wordmark is all caps.
- All styling goes through the design tokens in `src/styles/global.css`. No hard-coded colours, sizes or durations in components.
- The accent colour covers at most 5% of any screen. The three-colour gradient is used only on the frequency line.
- Pages must be readable with JavaScript disabled, and motion must respect `prefers-reduced-motion`.

## Key files

- `src/data/site.ts`: product facts, specs, callouts, FAQ, team.
- `src/styles/global.css`: design tokens and base styles.
- `src/components/Stage.astro`, `src/scripts/stage-scroll.ts`, `src/scripts/stage-3d.ts`: hero and exploded-view sequence.
- `src/content/journal/`: journal entries (Markdown).
- `vercel.json`: redirects from the old site's URLs.

## Checks

Run `npm run check` and `npm run build` before finishing a change.

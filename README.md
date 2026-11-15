# Echelis Audio website

Static site for [echelisaudio.com](https://www.echelisaudio.com), built with [Astro](https://astro.build) and deployed on Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type and template checks
npm run build    # static output in dist/
npm run preview  # serve dist/
```

## Structure

| Path | What |
|---|---|
| `src/pages/` | Routes: `/`, `/angostura-uno`, `/journal`, `/about`, `/privacy`, `/thanks`, 404 |
| `src/data/site.ts` | Product facts, specs, callouts, FAQ, team |
| `src/content/journal/` | Journal entries in Markdown |
| `src/styles/global.css` | Design tokens and base styles |
| `src/scripts/` | Scroll controller and the lazy-loaded 3D stage |
| `public/` | Fonts, favicons, Open Graph image |
| `docs/` | Audit, creative direction, brand files, placeholders |

## Forms

The early-access form posts to Formspree (endpoint in `src/data/site.ts`). It works without JavaScript and submits in place with it.

## Deploy

Vercel builds every push. `main` is production; other branches get preview builds. Rollback: Vercel → Deployments → previous deployment → Instant Rollback. The last commit of the old site is tagged `pre-redesign`.

# Echelis Audio: Phase 3 brief, 3D assets

Status: **for approval. No modelling or sourcing has started.**

The goal is to replace the placeholder primitives in the home page sequence with a real model of the Angosta One, exported from your Fusion CAD, within a 2–3 MB budget.

## 1. What the web model has to do

- Read as a real product in the hero, lit like studio photography.
- Separate along one axis into the five called-out parts, each its own object.
- Hold up when one part is lit and the rest are dimmed.
- Load after first interaction without a visible jump from the poster image.

It does **not** need to be dimensionally exact, and it should not be: see "What to keep private" in section 5.

## 2. Part list

One earpiece only (I suggest the right side). The left is not needed for the site.

Triangle counts are targets for the desktop model. "Callout" is the label it belongs to in the sequence.

| # | Part | Callout | Detail level | Target triangles |
|---|---|---|---|---|
| 1 | Shell body | 01 Shell | High. Largest surface, closest to camera. Smooth, no visible faceting on the silhouette. Inner cavity modelled simply (it is seen when exploded). | 25,000 |
| 2 | Faceplate | 02 Faceplate | Medium geometry, high surface detail. The wordmark is a texture, not geometry. | 6,000 |
| 3 | Nozzle | 03 Nozzle | Medium. Lip for the ear tip and the bore openings must be visible. | 6,000 |
| 4 | Nozzle filter | 03 Nozzle | Low. A disc; the mesh pattern is a texture. | 200 |
| 5 | Dynamic driver | 04 Drivers | Medium. Recognisable as a small round speaker: can, rim, vent hole. | 8,000 |
| 6 | Balanced armature | 04 Drivers | Low. A small metal box with a spout. | 2,000 |
| 7 | Piezo driver | 04 Drivers | Low. A thin disc. | 2,000 |
| 8 | Crossover | 05 Crossover | Medium. A small board, or a wired cluster, with a few components. | 5,000 |
| 9 | Connector socket | 01 Shell | Low. Sits in the shell; shows where the cable attaches. | 2,000 |
| 10 | Sound tubes | 04 Drivers | Low. Optional; they explain how sound gets from the drivers to the nozzle. | 4,000 |
| 11 | Ear tip | none | Medium. Optional, hero only; makes the object instantly recognisable as an earphone. | 8,000 |
| | **Total** | | | **about 68,000** |

Left out on purpose: internal wiring, dampers, adhesive, the cable. They add clutter and nothing a newcomer can read.

**Mobile model:** the same parts simplified to about 25,000 triangles in total, generated automatically from the desktop model. Whether mobile gets the real-time model at all, or a pre-rendered image sequence, is decided by measuring on a real phone (see section 7).

## 3. Materials

| Part | Material | Approach |
|---|---|---|
| Shell | Resin | PBR values only. If the resin is translucent, true see-through rendering costs an extra render pass; I would use it on desktop and a cheaper look on mobile. |
| Faceplate | Depends on your finish | PBR values, plus **one texture set** (1024 px, compressed) for the laser-marked wordmark: roughness and a slight normal. |
| Nozzle | Resin or metal | PBR values only. |
| Nozzle filter | Metal mesh | One small tiling texture with transparency. |
| Drivers | Metal cans | PBR values only. |
| Crossover | Board and components | PBR values; flat colours per component. |
| Ear tip | Silicone | PBR values only. |

So: **pure PBR values almost everywhere, and two small textures** (faceplate marking, filter mesh). No baked lighting, no large image maps.

Lighting stays procedural (the current studio environment costs zero bytes). If reflections on a metal faceplate look flat, a small HDR environment (about 100–200 kB) is the upgrade.

Open, because the specs are open: shell material, faceplate finish, nozzle material. Until they are decided I would model with neutral placeholders and label the hero "concept".

## 4. Pipeline

| Step | Who | What |
|---|---|---|
| 1. Prepare the design | **You, in Fusion** | See the checklist in section 5. |
| 2. Export | **You, in Fusion** | STEP of the whole assembly (the precise master), plus a mesh export (OBJ or FBX) at high refinement as a fallback. A script can do this in one click: see section 6. |
| 3. Convert and clean | Me | Tessellate, fix normals, split or merge objects to match the part list, set each part's pivot. |
| 4. UVs | Me | Only for the faceplate and the filter. Everything else needs none. |
| 5. Decimate | Me | Down to the triangle targets; a second pass for the mobile model. |
| 6. Materials | Me | Assign PBR values; make the two textures. |
| 7. Export glTF/GLB | Me | One `.glb` with named nodes per part. |
| 8. Compress | Me | Mesh compression, quantisation, and KTX2 texture compression. |
| 9. Integrate | Me | Swap the placeholder for the model in `stage-3d.ts`; render the hero poster still from the same model. |
| 10. Review | **You** | On the preview build, desktop and phone. |

**Tooling on this machine.** Fusion appears to be installed. **Blender is not installed.** Steps 3–6 need it, or a scripted equivalent. Options: you install Blender (free) and I drive it from scripts, or I do the conversion with command-line tools only. The second is workable for clean CAD but I have not tested it on your files, so I would try it on the first export and tell you if Blender is needed.

**Compression: Meshopt, not Draco.** Both shrink geometry a lot. Meshopt's decoder is much smaller and faster to start than Draco's, and it also compresses the animation-free node data we have. Draco can produce slightly smaller files for very dense meshes, which ours are not. I would confirm with a side-by-side on the real model.

## 5. What you need to do in Fusion

- [ ] **One component per part**, named to match the list: `shell`, `faceplate`, `nozzle`, `nozzle_filter`, `driver_dd`, `driver_ba`, `driver_piezo`, `crossover`, `socket`, `tubes`, `eartip`.
- [ ] **Split the nozzle from the shell** as its own body, even though they print as one piece. If that is awkward in your design, tell me and I will cut it in the mesh.
- [ ] **Orientation:** origin at the centre of the shell, faceplate facing +Z, nozzle pointing roughly −Z. The explode axis is Z.
- [ ] **Units:** millimetres.
- [ ] **Remove** construction geometry, sketches, hidden bodies and anything not on the part list.
- [ ] **Driver models:** if you have vendor CAD for the drivers, include it. If not, simple stand-ins of the right outer size are fine and I will add surface detail.
- [ ] **Export:** STEP of the assembly, plus OBJ or FBX at high refinement.
- [ ] **Tell me the real size** of the shell (longest dimension), so scale is right.

### What to keep private

A web model can be downloaded by anyone. Before export, decide how much of the inside you want public. My suggestion: exact outer shell, **simplified internals**. Drop exact tube lengths and bore diameters, driver positions to the tenth of a millimetre, and crossover values. The site only needs the idea of each part.

## 6. Working together on the model

Three ways to iterate, in order of effort:

| Option | How it works | Verdict |
|---|---|---|
| **A. Manual hand-off** | You export from Fusion and drop the files in a folder in the repo. I rebuild the web model. | Works today. Fine if the design changes rarely. |
| **B. One-click export script** | I write a small Fusion script (Python, run from Utilities → Scripts and Add-Ins) that exports every named component to the agreed folder in the agreed formats. You run it after any change; I rebuild. | **Recommended.** Removes the error-prone steps, costs you one click. |
| **C. Live connection to Fusion** | I operate Fusion directly on your machine. | Possible in principle, but slow and brittle, and I have not verified a reliable connector for it. I would not start here. |

With B, the loop is: you change the CAD → run the script → tell me → I rebuild and push → you look at the preview.

## 7. Budget and acceptance

| Item | Budget |
|---|---|
| Hero model, compressed `.glb`, desktop | ≤ 2.0 MB target, 3.0 MB hard limit |
| Mobile model | ≤ 0.8 MB |
| Textures (inside the totals above) | ≤ 300 kB |
| Hero poster still | ≤ 60 kB (AVIF with WebP fallback) |
| Model loader code added to the 3D chunk | Small; measured and reported |

At about 68,000 triangles with Meshopt, geometry should land well under 1 MB, which leaves room. That is an estimate until the real mesh exists.

Done means:

- [ ] All eleven parts present as separately named nodes; the five callouts point at the right ones.
- [ ] File sizes within budget.
- [ ] No layout shift when the model replaces the poster.
- [ ] Lighthouse bars from the Phase 2 report still hold.
- [ ] **Measured on a real mid-range phone**: the sequence scrolls smoothly, or mobile switches to a pre-rendered image sequence. This was not measured in Phase 2.
- [ ] You have approved the look on the preview, on desktop and phone.

## 8. Questions for you

1. **Does CAD exist yet?** If the Fusion design is not far enough along, I can build a believable concept model from reference dimensions instead, clearly labelled "concept", and swap in the real one later.
2. **Blender:** will you install it, or should I try the command-line route first?
3. **Collaboration:** option A, B or C?
4. **Internals:** how much of the inside may be public?
5. **Crossover:** is it a small circuit board, or components wired point to point? The model should match.
6. **Connector socket:** the spec sheet says the connector is undecided. Should the model show a generic recessed socket, or leave it out until it is decided?
7. **Ear tip and tubes:** include these two optional parts?
8. **Which side:** right earpiece?

## 9. Concept model (built 2026-11-14)

No CAD exists yet, so the site currently uses a **concept model**, labelled as such on the page.

- **Source:** `tools/3d/build_concept.py`, run headless in Blender 4.5 LTS. It builds all eleven parts, exports the GLB and renders previews and the hero poster.
- **Output:** `public/models/angosta-one-concept.glb`, about 19,000 triangles, 119 kB with Meshopt compression (`npx @gltf-transform/cli meshopt in.glb out.glb`).
- **Poster:** `public/img/hero-poster.avif` (8 kB) and `.webp` (14 kB), rendered from the same model.
- **Proportions** are typical of a universal in-ear monitor, with the 10 mm dynamic driver and roughly 6 mm nozzle from `IEM_Basic_List.md`. They are not specifications.
- **Previews:** `docs/phase3/`.

To rebuild after editing the script:

```bash
blender -b --python tools/3d/build_concept.py -- <output folder>
```

Still open from section 7: a separate simplified mobile model (the 19,000-triangle model is already below the 25,000 mobile target, so one may not be needed) and the real-phone performance test.

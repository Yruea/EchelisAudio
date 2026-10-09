# IEM Basic List — Echelis Audio

A long-term foundation document for developing in-ear monitors (IEMs). It covers driver technologies, structural components, the basics of wiring and cables, and materials science, and ends with a phased to-do list.

## Current product target

| Item | Decision |
|---|---|
| **Driver config** | **1 DD + 1 BA + 1 Piezo (PZT)** |
| **Roles** | DD = bass / lower mids · BA = mids / upper mids · Piezo = treble / air |
| **Stage** | Functional **prototype**, not industrial production yet |
| **Prototype build budget** | **Under $300 total** for parts + assembly of a working pair (or small batch of shells/parts) |
| **Future goal** | Same architecture scaled to industrial QC, materials, and manufacturing partners |

Prototype quality will be lower than a retail product (3D-printed shells, hand-soldered crossovers, off-the-shelf drivers). That is expected. The goal now is a **working, measurable, listenable unit** that proves the 1DD + 1BA + 1 Piezo concept under budget.

---

## 1. How an IEM works

An IEM is a small acoustic system. One or more **transducers (drivers)** turn an electrical signal into pressure waves. Those waves travel through **sound tubes, bores, and acoustic filters** into a **sealed ear canal**. Because the canal is sealed, the system acts as a pressure chamber. This is why IEMs can reproduce deep bass from tiny drivers, and why the **seal, the fit, and venting** matter as much as the driver itself.

Key concepts to learn early:
- **Frequency response (FR)**: loudness vs. frequency, usually measured on an IEC 60318-4 (711) coupler or a GRAS RA0045 coupler.
- **Target curves**: Harman IE 2019, diffuse-field, and "in-house" targets. Most of the industry tunes toward a Harman-like target with variations.
- **Impedance and sensitivity**: these decide how easy the IEM is to drive, and how the source's output impedance changes the sound (this matters a lot when a BA is in the mix).
- **THD (total harmonic distortion)** and **channel matching**: quality-control metrics (relaxed for prototype; tighten later).
- **Ear-canal resonance (~2–3 kHz) and the 8 kHz notch**: these come from canal and insertion depth and shape the tuning.

---

## 2. Chosen architecture: 1 DD + 1 BA + 1 Piezo

### 2.0 Why this setup
- **DD** moves real air for bass and body (cheap and proven).
- **BA** fills the midrange with clarity that a single small DD often loses when crossed over.
- **Piezo** extends treble / "air" without the cost of EST or MEMS.
- The combo is used in budget–mid Chi-Fi hybrids and is realistic under a **$300 prototype budget**.
- Main engineering risks: **crossover / level matching**, **piezo harshness**, and **phase / bore routing** between three different transducer types.

### 2.1 Dynamic Driver (DD) — bass / lower mids
- **How it works**: A voice coil sits in a magnetic gap and is attached to a diaphragm. Current through the coil creates a force (Lorentz force) that moves the diaphragm like a piston.
- **Prototype pick**: **10 mm DD** (most common, easy to source). PET/PEN or LCP diaphragm is fine; avoid exotic Be/DLC for V1.
- **Budget ballpark**: ~$2–15 per driver from Alibaba / 1688 / Taobao samples; better units higher.
- **Needs**: rear volume + vent (prevents driver flex), front mesh optional.
- **Role in our IEM**: low-pass roughly into the midrange (exact crossover TBD by measurement).

### 2.2 Balanced Armature (BA) — mids / upper mids
- **How it works**: A tiny armature (reed) sits balanced between magnets inside a coil. The signal magnetizes the armature, which pivots and moves a diaphragm through a drive pin. Sealed metal can with a spout.
- **Prototype pick**: one midrange or full-range BA (Bellsing / generic Knowles-style clone first to save money; Knowles/Sonion later if needed).
- **Budget ballpark**: ~$5–25 for a clone; Knowles mid units are more.
- **Needs**: sound tube + acoustic damper; usually a high-pass (and sometimes band-pass) via R/C.
- **Role in our IEM**: carry vocals and instruments; sit between DD and piezo.

### 2.3 Piezoelectric (PZT) — treble / super-tweeter
- **How it works**: A piezo ceramic or bimorph element deforms when voltage is applied and drives a thin diaphragm / film. Often a flat disc or rectangular plate.
- **Prototype pick**: small piezo tweeter disc / film unit sold for IEMs (common in 1DD+1BA+1PZT Chi-Fi designs).
- **Budget ballpark**: ~$1–8 per unit.
- **Strengths**: very cheap, thin, can extend highs above where many BAs roll off.
- **Weaknesses**: capacitive (impedance falls as frequency rises), can sound sharp/harsh, uneven response; **must be high-passed and often resistor-padded**, and usually needs acoustic damping / mesh.
- **Role in our IEM**: only the top octave(s); keep level conservative so it adds air, not sizzle.

### 2.4 How the three work together (electrical + acoustic)
```
Source → 2-pin socket
           ├─ DD   (low-pass / full-ish with acoustic LP from tube + vent)
           ├─ BA   (band-pass: HP + acoustic damper; optional series R for level)
           └─ PZT  (high-pass + series R for level; mesh/damper to tame peaks)
                    → tubes / bores → nozzle → eartip → ear
```
- Start simple: **first-order** passive parts (caps + resistors). Inductors only if needed later.
- Prefer a **2-bore or 3-bore nozzle** so DD / BA / piezo don't share one uncontrolled path.
- Measure each driver alone, then combine. Tune piezo last (easiest to ruin the FR).

### 2.5 Prototype BOM budget (target: under $300)

Rough guidance for **one working prototype pair** (two shells). Adjust after real quotes.

| Category | Estimate (USD) | Notes |
|---|---|---|
| Drivers (2× DD, 2× BA, 2× PZT) + a few spares | $40–90 | Buy extras; you will break some |
| Crossover parts (R, C, tiny PCB or point-to-point) | $5–15 | MLCC + metal film resistors |
| Shells (resin print, ~2–6 shells) | $20–60 | Resin cost + failed prints |
| Tubes, dampers, meshes, glue | $15–30 | Knowles-style dampers + silicone tube |
| 2-pin sockets + OFC/SPC cable (3.5 mm) | $15–40 | Stock cable is fine for V1 |
| Eartips (silicone assortment) | $10–20 | Seal matters more than brand |
| Misc (solder, wire, heat-shrink, nozzle filters) | $10–20 | |
| **Contingency** | $30–50 | Remakes, shipping, wrong parts |
| **Total target** | **<$300** | Keep tooling / CNC / EST / planar out of V1 |

**Out of scope for the $300 prototype budget** (buy later or share as shop gear): Formlabs-level printer if you already have one, GRAS coupler, CNC metal shells, Knowles EST, custom OCC cables. If the printer / measurement rig must come from the same $300, prioritize **drivers + shells + a cheap coupler clone** and defer cosmetics.

---

## 3. Other driver technologies (reference — not for V1)

Keep these for long-term options. Do **not** add them to the first prototype.

### 3.1 Hybrid (DD + BA only)
Industry default architecture. Our design is a hybrid **plus** piezo (sometimes called a "tribrid" in marketing even without EST).

### 3.2 Electrostatic (EST)
Sonion EST + energizer. Airy treble, costly and complex. Possible future upgrade path **instead of** or **alongside** piezo.

### 3.3 Planar Magnetic
Full-range or micro-planar tweeter. Needs more power / larger shell. Future R&D only.

### 3.4 Bone Conduction (BCD)
Tactile / spatial effect. Hard to measure; skip for V1.

### 3.5 MEMS (xMEMS, USound, etc.)
Consistent silicon tweeters; often need drive considerations. Watch as a future piezo replacement.

### 3.6 AMT / Ribbon / magnetostatic
Rare in IEMs; experimental.

### 3.7 Active / wireless
TWS, DSP EQ, ANC — product-line later, not this prototype.

### 3.8 Common industry configs (context)
| Configuration | Example use |
|---|---|
| 1DD | Budget to flagship; most coherent |
| 1DD + 1BA / 2BA | Most common budget hybrid |
| **1DD + 1BA + 1 Piezo** | **Our V1 target**; budget–mid Chi-Fi pattern |
| 1DD + 4BA | Mid-tier hybrid |
| DD + BA + EST | High-end "tribrid" |
| Planar 1-driver | Budget–mid planar trend |
| All-BA | Stage monitors, customs |

---

## 4. Crossovers and acoustic tuning

### 4.1 Electrical (for our 3-way)
- **DD**: often near full-range with a soft electrical low-pass, or no series L at first; acoustic LP from tube length / volume does a lot.
- **BA**: series capacitor (high-pass) + series resistor for level matching; damper in tube for peaks.
- **Piezo**: series capacitor (higher HP than BA) + series resistor (critical — piezos are loud/harsh if undamped electrically). Piezo looks like a capacitor; watch impedance at high frequency.
- Mount on a tiny PCB or point-to-point solder for the prototype. Industrial later: proper PCB + QC.

### 4.2 Acoustic
- **Sound tubes**: length / diameter = quarter-wave tuning.
- **Dampers**: Knowles BF-style / clones (680 Ω, 1500 Ω, 2200 Ω, 4700 Ω, etc.).
- **Mesh / foam**: nozzle and piezo face.
- **Bores**: aim for **2-bore or 3-bore** (DD separate; BA and piezo can share carefully if space is tight).
- **DD vent**: required. Mesh-covered pin vent is enough for V1.
- **Front / rear volume**: print a few shell variants and measure.

---

## 5. Wiring and cables (basics for V1)

### 5.1 Internal
- Thin enameled copper or SPC magnet wire.
- Route away from tubes; strain-relieve at the socket.
- Label polarity on DD / BA / piezo before sealing the shell.

### 5.2 Connectors
- **Prototype standard: 0.78 mm 2-pin** (cheap, common, detachable).
- MMCX optional later; proprietary plugs later still.

### 5.3 Cable / plugs
- Stock **OFC or SPC**, 3.5 mm TRS, for V1.
- 4.4 mm balanced / modular plugs: industrial product phase.

### 5.4 Conductor reality check
Focus on **durability, low microphonics, ergonomics**. Do not burn budget on exotic metals for the prototype.

---

## 6. Structural components of an IEM

| # | Component | Overview | V1 approach |
|---|---|---|---|
| 1 | **Shell / body** | Holds drivers, tubes, crossover | Resin SLA/DLP print; universal shape |
| 2 | **Faceplate** | Outer cover / branding | Same resin or simple printed plate; art later |
| 3 | **Nozzle** | Tip mount + sound exit | Printed with shell; ~5.5–6.5 mm OD |
| 4 | **Nozzle filter** | Wax / debris + tuning | Cheap mesh |
| 5 | **Sound tubes** | Driver → nozzle paths | Silicone tube or printed channels |
| 6 | **Acoustic dampers** | Tame BA / piezo peaks | Buy a damper kit |
| 7 | **Driver mounts / chambers** | Position DD / BA / PZT | Designed into the print |
| 8 | **Vent** | DD pressure relief + bass | Pin vent + mesh |
| 9 | **Crossover** | Passive split / levels | Hand-soldered R/C |
| 10 | **Internal wiring** | Drivers ↔ socket | Magnet wire |
| 11 | **Connector socket** | Cable attach | Recessed 0.78 mm 2-pin |
| 12 | **Cable** | Detachable | Stock OFC/SPC 3.5 mm |
| 13 | **Eartips** | Seal + comfort | Silicone assortment |
| 14 | **Adhesives** | Seal paths / bond faceplate | UV resin / CA / epoxy |
| 15 | **Strain relief** | Cable / socket durability | Heat-shrink / careful glue |
| 16 | **Accessories** | Case, tips, tools | Minimal for prototype |

---

## 7. Materials science (prototype vs future industrial)

### 7.1 Shells
| Material | Process | When |
|---|---|---|
| **Standard UV resin** | Budget SLA/DLP | **V1 prototype** |
| **Biocompatible / medical resin** | Formlabs BioMed, Dreve, etc. | When skin-contact compliance matters |
| **Aluminum / stainless / titanium** | CNC / SLM | Industrial / flagship |
| **PC / ABS** | Injection mold | Scale production (tooling cost) |
| **Ceramic / premium faceplates** | Later cosmetics | Post-prototype |

V1 priority: **printability, seal, fit**. Resonance / damping refinements come after FR works.

### 7.2 Diaphragm / driver materials (relevant to our three)
- **DD**: PET/PEN/LCP — good enough; high E/ρ coatings are industrial upgrades.
- **BA**: sealed supplier unit — you don't pick the diaphragm; you pick the model.
- **Piezo**: ceramic bimorph + film — brittle; mount carefully so shell stress doesn't crack it.

### 7.3 Magnets / tips / damping
- Neodymium N42–N52 on the DD is standard.
- Silicone tips Shore A ~30–50; foam optional for isolation tests.
- Mesh / felt / acoustic ohms dampers for BA and piezo peaks.

---

## 8. Tools, equipment, and suppliers

**Must-have for a useful prototype**
- Soldering iron (fine tip), flux, tweezers, microscope or strong loupe
- Resin printer access (own or shared) + UV cure
- CAD (Fusion 360 / Onshape free tiers)
- Measurement: at least a **cheap IEC-711-style coupler clone** + interface + **REW** (free). MiniDSP EARS is ok for relative checks only.

**Sourcing**
- DD / BA / piezo: Alibaba, 1688, Taobao, Bellsing distributors; Knowles/Sonion when budget allows
- Dampers / tubes / 2-pin: IEM DIY vendors / AliExpress
- Cable: stock detachable OFC 2-pin

**Defer until industrial**
- GRAS / B&K lab gear, CNC metal shells, custom faceplate artisans, EST/MEMS, injection molds

---

## 9. Phased to-do list (aligned to 1DD + 1BA + 1 Piezo, <$300)

### Phase 0 — Align and research (now)
- [ ] Lock design brief: **1DD + 1BA + 1 Piezo**, prototype under **$300**, industrial quality later.
- [ ] Study FR, Harman IE 2019, and how coupler / eartip / seal change measurements.
- [ ] Tear down / measure reviews of similar **DD+BA+piezo** IEMs (squig.link, Crinacle-style databases).
- [ ] Assign roles: drivers/sourcing, CAD/shells, electrical crossover, measurement/listening.

### Phase 1 — Bench and budget
- [ ] Write a live BOM spreadsheet with quotes; hard cap **$300** for the first working pair + spares.
- [ ] Confirm access to printer, soldering, and a measurement path (even if crude).
- [ ] Order **damper kit**, tube, 2-pin sockets, tip assortment early (shipping eats time).

### Phase 2 — Source drivers and characterize alone
- [ ] Order 10 mm DD samples (2–3 variants if budget allows).
- [ ] Order 1× mid/full-range BA type (clones ok for V1).
- [ ] Order piezo IEM tweeter units + spares.
- [ ] Mount each driver in a temporary jig / open shell; measure FR and impedance separately.
- [ ] Pick one of each based on sensitivity match and usable range (not marketing claims).

### Phase 3 — Shell + acoustics V1
- [ ] CAD universal shell with DD chamber + vent, BA tube path, piezo mount, 2-pin recess.
- [ ] Print 2–4 shell iterations; fix fit and nozzle geometry first.
- [ ] Implement 2- or 3-bore nozzle; add meshes/dampers.
- [ ] Confirm no driver flex on insert/remove.

### Phase 4 — Crossover V1 (three-way)
- [ ] Start with simple R/C: BA HP, piezo HP + pad, DD mostly acoustic LP.
- [ ] Match levels so piezo is subtle; BA not shouty; DD not bloated.
- [ ] Measure combined FR; iterate values and dampers.
- [ ] Check impedance curve vs cheap phone / dongle (output-Z sensitivity).

### Phase 5 — Listen, document, freeze prototype
- [ ] Listening notes vs a known reference headphone/IEM.
- [ ] Log every part number, resistor/cap value, tube length, damper color, and FR plot.
- [ ] Freeze **"Prototype Rev A"** even if imperfect — baseline for industrial upgrade.

### Phase 6 — Toward industrial (after Rev A works)
- [ ] Revisit BA supplier (Knowles/Sonion vs clone), DD diaphragm grade, piezo quality.
- [ ] Proper PCB crossover, channel matching targets (e.g. ±1–2 dB), biocompatible resin or metal.
- [ ] Cable / packaging / QC / compliance (ISO 10993, RoHS/REACH).
- [ ] Cost model for production MOQ (separate from the $300 prototype budget).
- [ ] Optional future drivers: EST, MEMS, planar — only if piezo can't meet the treble goal.

---

## 10. Glossary (quick reference)
- **BA**: balanced armature. **DD**: dynamic driver. **PZT / Piezo**: piezoelectric tweeter. **EST**: electrostatic. **BCD**: bone conduction.
- **FR**: frequency response. **THD**: total harmonic distortion. **Fs**: driver resonant frequency.
- **Driver flex**: crinkle from DD pressure on insert/remove (venting issue).
- **Output impedance (source)**: amp Z_out; keep low vs IEM impedance for neutral FR.
- **Acoustic ohm**: damper resistance unit.
- **Universal vs custom (CIEM)**: generic shell vs ear-molded. V1 = universal.
- **Prototype vs industrial**: hand-built, budget parts, learning FR vs QC, molds, and certified materials.

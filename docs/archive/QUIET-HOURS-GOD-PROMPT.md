# Always Answering — God Prompt (v3 · "business comes in when you can't answer" + cinematic 3D + scoreboard + honest wage anchor)

Paste everything between the `=== BEGIN ===` / `=== END ===` markers into a fresh Claude Code session at
the repo root, **or** say: *"Read QUIET-HOURS-GOD-PROMPT.md and execute it in full."*

**The angle (locked with Pavneet):** the pain is NOT "night." It's **"business comes in when you can't
answer"** — on a ladder, driving, cutting grass, in a basement, with a client, at lunch, at dinner, on the
weekend. The promise: **Your business keeps moving even when your hands are full.**

- **Title / tagline:** *Your Business, Always Answering* (alt: *The Front Desk That Never Blinks*).
- **Hero:** *Never miss the job because you missed the call.*
- **Subheadline:** *Handbuilt AI agents answer calls, capture leads, send quotes, follow up, and handle
  admin while you're working, driving, sleeping, or busy with customers.*
- **Cinematic device:** one compressed day/week of "unavailable moments" scrolls past (morning: phone rings
  while you load the truck · afternoon: quote request while you're on a job · evening: lead texts during
  dinner · weekend: invoice auto-chases) — each **pours into the vessel** and gets caught. It resolves on a
  **live scoreboard** proving what got handled, then the earned calm.
- Keeps the beautiful "Quiet Hours" cinematic mood (warm glass vessel, golden light) — just widens the
  message from *while you sleep* to *any time you're unavailable*.

Rebuilds the native `/quiet-hours` route (recommend renaming the slug — §11). Same vessel + pour/fill +
pricing; new spine, scoreboard, and honesty layer.

---

`=== BEGIN GOD PROMPT ===`

You are upgrading a Next.js 14 App Router site (`aibuiltbyhand.com`, brand **Handbuilt**, solo founder
Pavneet, Surrey/Delta BC). Build a **best-in-class WebGL film** whose single idea is: *business comes in
when you can't answer — and Handbuilt AI agents catch all of it while your hands are full.* It sells the
AI-worker offering (especially the $2.5k–$7.5k tiers) with honest, high-craft persuasion. Match the
hand-built reference's craft; use the copy + structure below. Fabricate nothing.

## 0. Ground truth — read first
- Reference (for the *look/craft* to beat, not the copy): `The Quiet Hours.html` at repo root (794KB
  minified bundle; render it to see the vessel + fill + scroll-narrative quality target).
- Files you replace/upgrade (they exist): `app/quiet-hours/page.tsx` (server, `robots:index=false`),
  `components/quiet-hours/QuietHoursClient.tsx` (copy hardcoded), `components/quiet-hours/VesselScene.tsx`
  (R3F: drei MeshTransmissionMaterial + LatheGeometry + Bloom/Vignette/Noise).
- Reuse the system: tokens in `app/globals.css` + `tailwind.config.ts` (amber `#E88A00`, ink `#191716`,
  paper `#FAF7F2`); fonts via next/font in `app/layout.tsx` (Archivo `--font-display`, Inter
  `--font-inter`, IBM Plex Mono `--font-mono`) — ADD Fraunces (§3); SEO via `lib/seo.ts` (`serviceSchema,
  faqSchema, breadcrumbSchema, organizationSchema, landingMetadata`, …) + `JsonLd`. Deps installed:
  `three ^0.169`, `@react-three/fiber ^8.18`, `@react-three/drei ^9.122`,
  `@react-three/postprocessing ^2.19`, `framer-motion ^11`. For the scoreboard count-up, install
  `@number-flow/react` (~6KB) or animate with framer-motion.
- Build = `prisma migrate deploy && next build`. Run `npm run lint` + `npm run build` before "done".
  **Do not commit, deploy, or push.** Stop at clean build + verification screenshots + contrast report.

## 1. THE SPINE — one architecture decision fixes contrast, collision, AND SEO
All text is **real DOM on a Conversion Layer floating above a `position:fixed` WebGL canvas.** The canvas
renders ONLY atmosphere (studio, vessel, light, liquid, scoreboard particles) — never a headline glyph.
```
app/<route>/page.tsx        → server. Indexable metadata (§8) + <JsonLd/> + <AlwaysAnswering/>.
lib/data/alwaysAnswering.ts → NEW. All acts + pricing + wage + scoreboard constants as typed data (source
                              of truth for BOTH the DOM and the schema). Move copy out of the client.
components/experience/AlwaysAnswering.tsx → Conversion Layer: real <section>s (SSR), scroll controller,
                                            nav rail, clock, chrome. NOT the canvas.
components/experience/VesselScene.tsx     → the fixed canvas (aria-hidden). Reads scroll; drives
                                            light/day, fill, camera. Renders no text.
```
- The real `<section>`s are the source of truth for scroll (IntersectionObserver / scroll-progress hook);
  the Three.js scene reacts to them. Must read as a normal long-form page with WebGL off, JS off, or a bot.
- Canvas `position:fixed; inset:0; z-index:0; aria-hidden="true"`, Conversion Layer above.
- `prefers-reduced-motion` / no-WebGL → static **poster** (golden-hour vessel) + full text article. Lazy-
  load Canvas via `next/dynamic` `ssr:false` after first paint.

## 2. DESIGN TOKENS — scope ALL to a `.experience` wrapper; never touch the global palette
Setting = a dim maker's **studio**; the *window light* tells the time as one day/week compresses past. The
background is a controlled grade (dark→warm) — the vessel is always the hero; light does the storytelling.

**Light/grade arc (4 scroll keyframes). Interpolate in OKLCH, not sRGB.** A moody midday "grind" trough so
golden hour is *earned*.
```
0%   (I · cold start)        bg #06080D→#0A0E14   window light cold blue, low, raking. Cool, dim.
~38% (II–III · the grind)    bg #04060B→#080B11   emotional trough; the ONLY warmth is amber liquid in the vessel.
~66% (V · the turn/proof)    bg #171310→#3A2A1B   warm horizon ignites; amber spreads across the studio.
100% (VII · golden calm)     bg #F4E9D6→#EAD8BD + low warm god-ray #F4A24C   full golden light. Resolved.
```
Surfaces: `--ink-void:#05070C --ink-night:#0A0E14 --ink-panel:#101620 --ink-hairline:#1C2430`
`--dawn-surface:#EFE2CC --dawn-hairline:#D8C6A8`
Amber family (three roles): `--amber-signal:#F4A24C` (CTAs, active nav dot, the one amber word, clock,
scoreboard numbers) · `--amber-primary:#E8933A` (kickers, links, accents — AA on `#0A0E14` ≈ 6.4:1) ·
`--amber-settled:#B86A24` (hero "caught/handled" color) · `--amber-liquid-top:#E29A3D
--amber-liquid-base:#7A4419 --amber-deep:#5A3212`.
Text — **kill the cool blue-greys (`#9FB1C8/#9AA4B2/#7E8696`) — that warm/cool clash is the bug. Warm only:**
`/* dark acts */ --text-hi:#F6EFE6 --text-mid:#CDC2B0 --text-low:#8A8072`
`/* golden acts */ --text-hi-dawn:#1A130A --text-mid-dawn:#4A3B28 --text-low-dawn:#6E5C42`

### Contrast guarantee — belt AND suspenders (both mandatory)
**(A) Adaptive token flip:** scroll controller writes `--ink`/`--ink-mid` on `<html>`, flips at ~62%
(where bg L\* crosses ~55), cross-faded ~400ms. **(B) Persistent scrim behind every text block (this is
what guarantees AA):**
```css
.act-copy{background:radial-gradient(120% 90% at 20% 40%, rgba(6,8,13,.72) 0%, rgba(6,8,13,.35) 45%, transparent 72%); backdrop-filter:blur(2px) saturate(.9);}
/* golden acts swap plate to rgba(244,233,214,.78)→transparent via the token flip */
```
Measure contrast against the scrim, not the scene. Tune so `--ink` on scrim ≥ **4.5:1 at every scroll
position**; verify ~62% mid-transition and Act VII text over the lit vessel. Enforce in CI (§10.3).

## 3. TYPOGRAPHY
- **Add Fraunces** (variable, free, next/font/google, `--font-fraunces`) for **act headlines only** — warm,
  authored, expensive; sells the bespoke tier. Archivo = UI/prices; Inter = body; IBM Plex Mono =
  kickers/clock/labels. Three families max on screen.
- Display = Fraunces `opsz` high, wght 340–430, `SOFT 0 WONK 0`, lh .98, tracking -0.018em. Accent word =
  Fraunces *Italic*. UI/prices = Archivo 500–700 tabular-nums. Body = Inter. Kickers/clock = Plex Mono 500.
- Scale: `--fs-display:clamp(2.75rem,6.4vw,6.25rem)  --fs-lede:clamp(1.06rem,1.5vw,1.375rem)` (max 42ch)
  `--fs-kicker:.75rem  --fs-clock:.8125rem  --fs-price:clamp(1.75rem,3vw,2.5rem)  --fs-score:clamp(2rem,4vw,3.5rem)`
- Mono kickers uppercase `letter-spacing .28em` → `.18em` <480px; pad `·` with thin spaces; `--amber-primary`
  on dark, `--amber-settled` on golden.
- **Headline: cream base + exactly ONE amber-italic word per act** (`--amber-signal` dark / `--amber-settled`
  golden): I → *job* · II → *can't* · III → *caught* · IV → *Handbuilt* · V → *working* · VI → *honest* ·
  VII → *always*.

## 4. THE ACTS — copy is FINAL, reproduce verbatim
Global chrome (fixed): logo "**Handbuilt**" (H mark, top-left); **SOUND** toggle + cream "**Start a build
→**" (top-right); a live **clock** that advances with scroll labelled "**ALWAYS ANSWERING**"; left **nav
rail I–VII** with an amber active dot (click to jump).

**Composition rule (fixes collision): vessel OFF-CENTER, alternating.** 12-col grid. Odd acts (I,III,V,VII)
vessel right / text left; even acts (II,IV,VI) vessel left / text right. On reveal beats the vessel may
drift center but text drops to a lower-third band on its scrim. **Hard rule: ≥48px gutter between text-box
and vessel-box; never intersect** (canvas may radially mask its alpha under the active text column).

- **ACT I · THE PROMISE** — H: "Never miss the *job* because you missed the call."
  Lede (subheadline, verbatim): "Handbuilt AI agents answer calls, capture leads, send quotes, follow up,
  and handle admin while you're working, driving, sleeping, or busy with customers." Small line under CTA:
  "Your business keeps moving even when your hands are full." (Vessel: empty, cold blue rim-light.)
- **ACT II · WHEN YOU CAN'T ANSWER** — H: "Business comes in when you *can't* answer."
  Lede: "You can't be on a ladder and on the phone. So the calls, quotes, and leads that arrive while
  you're busy just… slip." Render 4 real `--ink-panel` "moment" cards (each with a timestamp + scenario +
  the missed thing), which visibly **pour into the vessel** as they pass:
  - "7:12 AM · loading the truck" → *the phone rings — a new customer*
  - "1:40 PM · under a sink, hands full" → *a quote request comes in*
  - "6:30 PM · dinner with family" → *a lead texts "you free this week?"*
  - "Sat 9:20 AM · your day off" → *an unpaid invoice needs chasing*
  Micro-line: "Every one of these was a job — going to whoever answered first."
- **ACT III · THE CATCH** — H: "Pour it in. Watch it get *caught*."
  Lede: "Tell us what keeps slipping. The right worker catches it — every time, while your hands stay
  full." Button: "Pour it in". Pains (real buttons): "I miss calls while I'm on a job" / "People ask for
  quotes and I forget to reply" / "My invoices sit unpaid for weeks" / "Leads go cold before I follow up".
  Workers: **Receptionist** "Catches calls" · **Quote** "Catches estimates" · **Follow-Up** "Catches
  leads" · **Invoice** "Catches payments" · **Custom** "Catches the rest". Result strip: "✦ ROUTED TO —" +
  CTA "Start this build →". **Plus the honest payback input (§7).**
- **ACT IV · THE STUDIO** — H: "Not generated. *Handbuilt.*"
  Lede: "No template farm. No reseller. One builder shapes each worker — wireframe to glass to filled —
  around your actual business."
- **ACT V · THE PROOF (SCOREBOARD)** — kicker "WHAT A CAUGHT WEEK LOOKS LIKE" — H: "While you were busy,
  it was *working*." Lede: "You never stopped. Neither did it. Here's a week it caught for you while your
  hands were full:" Then an animated **scoreboard** (count-up, `@number-flow/react` or framer-motion) on a
  clean panel, reading from editable constants (label it clearly as an example — see §7 honesty):
  **12 inquiries caught · 5 quotes sent · 3 jobs booked · 2 invoices followed up.** (Vessel: full, meniscus
  settled, first golden light — the scoreboard is "what the filled vessel did.")
- **ACT VI · WHAT YOU CAN HAND OVER** — H: "Filled vessel, *honest* prices." Three real pricing cards
  (middle dark-highlighted, amber "MOST BUSINESSES START HERE" badge + amber CTA):
  - **AI STARTER — $1,000 CAD+** — "One AI worker, live in days — receptionist, quote intake, or review
    replies." Bullets: "1 AI worker, fully installed" / "Wired into your existing tools" / "Live in ~5
    business days". **Wage anchor row (§7):** "A part-time receptionist: ~$2,000/mo, every month. This:
    $1,000 once — it never clocks out." CTA "Get this built".
  - **AI BUSINESS — $2,500 – $5,000** (badge) — "2–4 connected workers in one workflow, with a simple owner
    dashboard." Bullets: "2–4 connected workers" / "Receptionist + quote + follow-up" / "Owner dashboard &
    reporting". CTA "Plan my system".
  - **CUSTOM AI APP — $7,500 CAD+** — "A full app or internal platform you own — MVP, client portal, custom
    flows." Bullets: "Custom build — you own it" / "SaaS MVP or client portal" / "Built around your
    process". CTA "Get this built".
  - Footnote: "Optional Care Plan from $250/mo — monitoring, updates, and improvements. Prices in CAD."
- **ACT VII · ALWAYS ANSWERING** — H: "Your business, *always* answering."
  Lede: "Phone down, hands free — and nothing slipped. Tell me what keeps landing on you while you're busy,
  and you'll get a clear build plan and a fixed CAD price, usually within a day." CTAs: "Start a build" +
  "Watch it again". Footer: "Built by **Pavneet** in Surrey/Delta, BC · real builder, no agency handoff" /
  "© 2026 Handbuilt". **Money act — must be pixel-legible: golden token flip + warm scrim, `--text-hi-dawn`
  headline, `--amber-settled` accent word, primary CTA `--amber-signal` with a solid dark-ink label.**

## 5. THE VESSEL + STUDIO — best-in-class cinematic 3D (this is the "wow"; spend the effort here)
Setting: a dim maker's **studio** — vessel on a subtle surface; an off-frame "window" throws the key light.
Imply the studio with light, shadow, and haze — not props. All buildable with installed drei/postprocessing.

**Glass shell** (keep drei `MeshTransmissionMaterial`): `transmission 1.0`, `roughness 0.06–0.10` (a hair
kills CG mirror-sheen), `ior 1.5`, `thickness ≈ 0.9× inner radius`, warm `attenuationColor #E8B98A` with a
long `attenuationDistance` (glass stays clear; the *liquid* colors it). **No clearcoat.** `chromaticAberration
~0.02`, low `anisotropicBlur`, `samples 8–10`, optional `iridescence 0.15` on the rim only. Silhouette:
Lathe ≥ **128 radial segments**, smooth normals; narrow neck, rounded shoulder, stable base. **Fresnel
rim-light** so it separates from `#06080D` in the dark.

**Liquid = a SEPARATE inner mesh** (legibility + metaphor): `transmission 0.85`, `roughness 0.18`, vertical
gradient `--amber-liquid-top→--amber-liquid-base` (world-Y), a **defined meniscus** (separate thin ellipse,
lit brighter, faint fresnel rim — the crisp line that makes "the level" read), animated in Y by scroll, faint
`emissive #5A3212, emissiveIntensity 0.12` glowing from within during the midday trough.

**Lighting — the biggest cheap→premium lever:** dim **studio HDRI** via drei `Environment`
(`envMapIntensity 0.6–0.8`) + `Lightformer`s shaping a **soft window-strip reflection** (never a bare white
dot); **1–2 `RectAreaLight`s** (softboxes) + one low warm key whose **color temp + angle shift with scroll**
(cold-blue low → neutral overhead → warm low golden). **Volumetric golden-hour god-rays** rake across past
~66% (drei volumetric `SpotLight` / god-ray pass) — the signature reveal. **Contact shadow** (drei
`ContactShadows`/`AccumulativeShadows`) grounds the vessel; **caustics** (drei `Caustics` or projected
texture) cast a warm amber pool once the liquid has body.

**Atmosphere & film finish:** **dust motes** in the light (drei `Sparkles`/fine Points), dialed up in the
god-ray; **depth of field** (subtle bokeh) keeps the vessel tack-sharp, background falls off — pull focus on
the Act III catch and Act VII CTA. Renderer `ACESFilmicToneMapping` (or **AgX**), `exposure 0.95`. **Bloom**
a whisper on meniscus + rim only (`threshold 0.9, strength 0.25, radius 0.4`). Faint **film grain** (`Noise`
~0.04 soft) + gentle **vignette** + whisper of chromatic aberration at edges.

## 6. MOTION + CAMERA (one director's cut)
- One scrubbed scroll timeline drives: light/grade keyframes, liquid fill + meniscus, clock, nav dot, vessel
  A/B sway, token flip, god-ray, DOF. Transform/opacity only; respect reduced-motion.
- **Scroll-driven camera rig** (not static): slow dolly — gentle crane-up + slight parallax as the day
  resolves; soft push-in on the Act VII CTA. Ease heavily; never nauseating.
- **The pour/catch signature:** in Act II each "moment" card sends a thin **stream/droplet of amber** into
  the vessel mouth; in Act III the chosen pain does the same on click — the liquid **ripples on impact** and
  the level **ticks up**. This is the moment the film exists to earn — make it tactile.
- Per-act staggered entrance (kicker→headline→lede→cards, ~60–90ms). Clock + nav read the same scroll value.

## 7. HONEST WAGE ANCHOR + PERSUASION (no dark patterns — the honest math IS the weapon)
This audience detects manipulation; it kills trust. Use true numbers, contrast, and loss-framing only. Put
all figures in `lib/data/alwaysAnswering.ts` as editable constants with a source comment.
```ts
// Sources (verify before editing): BC receptionist ~$21–23/hr, ~$42–48k/yr
//   ca.indeed.com/career/receptionist/salaries/British-Columbia ; salaryexpert.com (Vancouver)
// Human answering services $800–2,400/mo; capped plans $235–290/mo (nextiva.com, wishup.co)
// AI-only competitors bill $29–300/mo RECURRING (dialzara.com, getnextphone.com)
export const WAGE = { partTimeReceptionistMonthly:2000, fullTimeAnnual:45000, answeringServiceMonthlyLow:235, starterOneTime:1000, careMonthly:250 }
// Scoreboard = an ILLUSTRATIVE example week, clearly labelled — not a specific-customer claim.
export const SCORE = { inquiries:12, quotes:5, jobs:3, invoices:2 }
```
Levers (all honest): **Anchoring** — Act VI puts `$1,000 once` beside `~$2,000/mo, every month`.
**Loss aversion** — Act II frames missed items as money already leaving. **Payback (personalized) — Act III
input:** "What's one job worth to you? `$[____]`" → "Then this pays for itself the first time it catches
one." (uses THEIR number; computes nothing fake). **Ownership** — "A hire quits, gets sick, takes vacation.
You *own* this one." **Proof** — the Act V scoreboard, labelled as an example.
- **Honesty guardrails:** never imply "$0/month forever" (say "$1,000 to build + your own low running cost,
  or $250/mo managed"); label the scoreboard as illustrative; keep prices CAD and in sync with site data.
- **Forbidden:** fake countdowns/scarcity, invented ROI/savings totals, made-up liability numbers, fake
  testimonials or customer counts, manufactured fear.

## 8. SEO / GEO — parallel semantic layer
- **Un-noindex** the route → indexable. `landingMetadata` from `lib/seo.ts`. Title e.g. "AI Front Desk for
  Service Businesses — Handbuilt in BC | Always Answering"; description = what/for-whom/where/price band in
  one crawlable sentence. Target keywords: "AI receptionist / AI front desk for service businesses / never
  miss a call / BC".
- 7 real `<section aria-labelledby>` with real `<h1>`(I)/`<h2>` + `<p>` ledes; Act VI pricing = real
  `<ul>`/`<dl>`; Act V scoreboard = real text; Act VII CTA = real `<a href>`.
- JSON-LD via `JsonLd` + `lib/seo.ts`: `serviceSchema` (provider Handbuilt; `areaServed` Surrey, Delta,
  Metro Vancouver BC); `Offer`/`PriceSpecification` per tier; `faqSchema` (Act III pains → Q&A — top
  citation block for ChatGPT/Perplexity); `organizationSchema`/`ProfessionalService`; `breadcrumbSchema`;
  `VideoObject` if a capture is recorded.
- One concise crawlable **summary paragraph** near the top (Act I lede or SR-only `<p>`): what Handbuilt
  makes, for whom, where, price band. `<noscript>` degrades to the full SSR article.

## 9. Accessibility & performance
WCAG AA everywhere (§2); semantic landmarks; keyboard nav for nav rail, Act III controls, payback input, all
CTAs; visible focus; `aria-hidden` canvas. Lazy-mount Canvas after first paint; cap DPR ~1.5; reduce
samples/particles/DOF on mobile; no-WebGL → poster + article. Targets: LCP < 2.5s (LCP = DOM text), no CLS,
60fps scrub / graceful throttle.

## 10. Verification — evidence required before "done"
1. `npm run lint` + `npm run build` clean (paste build tail). 2. Playwright screenshots at scroll
0/15/40/62/80/100% @ 1440×900 AND 390×844. 3. **Contrast assertion** in CI: sample headline + lede vs the
composited scrim at 5% increments; assert ≥4.5:1; fail if any below. 4. Confirm readable text with JS
disabled (SSR) and reduced-motion (poster). 5. Validate JSON-LD (no errors).

## 11. Routing (recommended)
Rename the route to a keyword-rich slug — **`/ai-front-desk`** (or `/always-answering`) — since the old
`/quiet-hours` was noindexed with no inbound links (add a `301` from `/quiet-hours` just in case). Build it
native + **indexable** and wire it as the flagship "experience" from the homepage hero ("See it work ▸") +
nav. Keep the current fast homepage at `/` for now; promoting to root is a one-line swap (render the
component from `app/page.tsx`, move the metadata) — mark it `// PROMOTE-TO-HOME:`.

## 12. Guardrails
Reproduce §4 copy verbatim; no fabricated stats/testimonials/counts; wage + scoreboard numbers are editable
constants labelled illustrative (§7). Prices CAD, match §4, in sync with site pricing data. Scope new
tokens/fonts to the route; don't touch the global palette or homepage. **Do not commit, deploy, or push** —
stop at clean build + screenshots + contrast report and summarize changes for review.

`=== END GOD PROMPT ===`

---

## Side note (not part of the prompt): live homepage copy bug
The homepage hero pill reads **"BUILT IN BC · INSTALLED, NOT ADVISED"** — that scans as *don't install this*.
Fix to **"INSTALLED, NOT JUST ADVICE"** or **"REAL WORKERS, NOT ADVICE"**. Quick separate edit.

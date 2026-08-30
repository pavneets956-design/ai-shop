# The Missed Call, Caught — God Prompt (v4 · phone-on-the-bench cinematic · NO VESSEL)

Paste everything between the `=== BEGIN ===` / `=== END ===` markers into a fresh Claude Code / design
session (Fable 5) at the repo root, **or** say: *"Read MISSED-CALL-CAUGHT-GOD-PROMPT.md and execute it in
full."*

**The concept (locked with Pavneet, replaces the killed glass-vessel idea):** trades buyers don't think "my
leads pour into a vessel." They think *my phone is ringing and I can't pick up.* So the hero is **one worn
work phone on a workbench, shot like a product film** — and the single moment the whole page exists to earn
is **a missed call reversed in the last half-second.** The call starts to slip to *Missed / Voicemail*, then
warm amber floods in and the AI catches it. Stakes + reversal — NOT a card-into-lane sorting animation (that
generic AI-automation/Kanban look is explicitly forbidden). Worker lanes + a live dashboard survive only as
the calm **aftermath/proof**, never the hero.

- **Title / tagline:** *Your Business, Always Answering.* **Hero:** *Never miss the job because you missed the call.*
- **Message (unchanged):** business comes in when you can't answer — on a ladder, driving, at dinner, on the
  weekend — and Handbuilt AI agents catch all of it while your hands are full.
- **Structure:** one protagonist (the phone) → one reversal (missed → caught) → then the proof.

Rebuilds the native experience route (recommend renaming the slug — §11). New spine, new 3D, same locked
copy/pricing/honesty/SEO.

---

`=== BEGIN GOD PROMPT ===`

You are upgrading a Next.js 14 App Router site (`aibuiltbyhand.com`, brand **Handbuilt**, solo founder
Pavneet, Surrey/Delta BC). Build a **best-in-class WebGL film** whose single idea is: *the job you'd have
missed, caught in the last half-second.* It sells the AI-worker offering (especially the $2.5k–$7.5k tiers)
with honest, high-craft persuasion. Use the copy + structure below. **Fabricate nothing. Build no glass
vessel, no liquid, no pouring, no Kanban/pipeline card-sorting.**

## 0. Ground truth — read first
- Files you replace/upgrade (they exist, they currently hold the OLD vessel concept — replace it):
  `app/quiet-hours/page.tsx` (server, `robots:index=false`), `components/quiet-hours/QuietHoursClient.tsx`,
  `components/quiet-hours/VesselScene.tsx`.
- Reuse the system: tokens in `app/globals.css` + `tailwind.config.ts` (amber `#E88A00`, ink `#191716`,
  paper `#FAF7F2`); fonts via next/font in `app/layout.tsx` (Archivo `--font-display`, Inter `--font-inter`,
  IBM Plex Mono `--font-mono`) — ADD Fraunces (§3); SEO via `lib/seo.ts` (`serviceSchema, faqSchema,
  breadcrumbSchema, organizationSchema, landingMetadata`, …) + `JsonLd`.
- Deps installed: `three ^0.169`, `@react-three/fiber ^8.18`, `@react-three/drei ^9.122`,
  `@react-three/postprocessing ^2.19`, `framer-motion ^11`. **`@number-flow/react` is NOT installed** — do
  the scoreboard count-up with framer-motion; add no new dep.
- Build = `prisma migrate deploy && next build`. Run `npm run lint` + `npm run build` before "done".
  **Do not commit, deploy, or push.** Stop at clean build + verification screenshots + contrast report.

## 1. THE SPINE — one architecture decision fixes contrast, collision, AND SEO
All text is **real DOM on a Conversion Layer floating above a `position:fixed` WebGL canvas.** The canvas
renders ONLY the phone, bench, light, and atmosphere — never a headline glyph.
```
app/<route>/page.tsx        → server. Indexable metadata (§8) + <JsonLd/> + <MissedCallCaught/>.
lib/data/alwaysAnswering.ts → NEW. All acts + pricing + wage + dashboard constants as typed data (source of
                              truth for BOTH the DOM and the schema). Move copy out of the client.
components/experience/MissedCallCaught.tsx → Conversion Layer: real <section>s (SSR), scroll controller,
                                             nav rail, clock, chrome. NOT the canvas.
components/experience/PhoneScene.tsx        → the fixed canvas (aria-hidden). Reads scroll; drives the ring,
                                             the slip, the amber catch, light temp, camera. Renders no headline text.
```
- The real `<section>`s are the source of truth for scroll (IntersectionObserver / scroll-progress hook);
  the Three.js scene reacts. Must read as a normal long-form page with WebGL off, JS off, or a bot.
- Canvas `position:fixed; inset:0; z-index:0; aria-hidden="true"`, Conversion Layer above.
- `prefers-reduced-motion` / no-WebGL → static **poster** (the phone mid-catch, warm) + full text article.
  Lazy-load Canvas via `next/dynamic` `ssr:false` after first paint.

## 2. DESIGN TOKENS — scope ALL to a `.experience` wrapper; never touch the global palette
Setting = a dim maker's workbench in near-black negative space; the phone is the only lit object. **The
light temperature tells the story** — cold and neglected → the warm amber "catch" → resolved golden calm.

**Grade arc (4 scroll keyframes; interpolate in OKLCH, not sRGB):**
```
0%   (I · cold bench)     bg #06080D→#0A0E14   key light cold blue, low. Phone dark, silent.
~40% (II · the slip)      bg #04060B→#080B11   emotional trough; screen cooling toward "Missed". Only glow = the ringing screen.
~60% (III · the catch)    bg #171310→#3A2A1B   AMBER FLOODS IN — the reversal. Warm key ignites; screen flips to "answering".
100% (VII · golden calm)  bg #F4E9D6→#EAD8BD + low warm god-ray #F4A24C   full golden light, screen reads "Job booked".
```
Surfaces: `--ink-void:#05070C --ink-night:#0A0E14 --ink-panel:#101620 --ink-hairline:#1C2430`
`--dawn-surface:#EFE2CC --dawn-hairline:#D8C6A8`
Amber (three roles): `--amber-signal:#F4A24C` (CTAs, active nav dot, the one amber word, clock, dashboard
numbers, the CATCH flood) · `--amber-primary:#E8933A` (kickers, links, accents — AA on `#0A0E14` ≈ 6.4:1) ·
`--amber-settled:#B86A24` (golden-act accents).
Text — **warm only; kill cool blue-greys (`#9FB1C8/#9AA4B2/#7E8696`) — that warm/cool clash is a bug:**
`/* dark acts */ --text-hi:#F6EFE6 --text-mid:#CDC2B0 --text-low:#8A8072`
`/* golden acts */ --text-hi-dawn:#1A130A --text-mid-dawn:#4A3B28 --text-low-dawn:#6E5C42`

### Contrast guarantee — belt AND suspenders (both mandatory)
**(A) Adaptive token flip:** scroll controller writes `--ink`/`--ink-mid` on `<html>`, flips at ~62% (where
bg L\* crosses ~55), cross-faded ~400ms. **(B) Persistent scrim behind every text block (this is what
guarantees AA):**
```css
.act-copy{background:radial-gradient(120% 90% at 20% 40%, rgba(6,8,13,.72) 0%, rgba(6,8,13,.35) 45%, transparent 72%); backdrop-filter:blur(2px) saturate(.9);}
/* golden acts swap plate to rgba(244,233,214,.78)→transparent via the token flip */
```
Measure contrast against the scrim, not the scene. Tune so `--ink` on scrim ≥ **4.5:1 at every scroll
position**; verify ~62% mid-transition and Act VII text over the lit phone. Enforce in CI (§10.3).

## 3. TYPOGRAPHY
- **Add Fraunces** (variable, free, next/font/google, `--font-fraunces`) for **act headlines only** — warm,
  authored, expensive; sells the bespoke tier. Archivo = UI/prices; Inter = body; IBM Plex Mono =
  kickers/clock/labels/the on-screen phone transcript. Three families max on screen.
- Display = Fraunces `opsz` high, wght 340–430, lh .98, tracking -0.018em. Accent word = Fraunces *Italic*.
  UI/prices = Archivo 500–700 tabular-nums. Body = Inter. Kickers/clock/transcript = Plex Mono 500.
- Scale: `--fs-display:clamp(2.75rem,6.4vw,6.25rem)  --fs-lede:clamp(1.06rem,1.5vw,1.375rem)` (max 42ch)
  `--fs-kicker:.75rem  --fs-clock:.8125rem  --fs-price:clamp(1.75rem,3vw,2.5rem)  --fs-score:clamp(2rem,4vw,3.5rem)`
- Mono kickers uppercase `letter-spacing .28em` → `.18em` <480px; `--amber-primary` on dark, `--amber-settled` on golden.
- **Headline: cream base + exactly ONE amber-italic word per act** (`--amber-signal` dark / `--amber-settled`
  golden): I → *job* · II → *can't* · III → *caught* · IV → *Handbuilt* · V → *working* · VI → *honest* ·
  VII → *always*.

## 4. THE ACTS — copy is FINAL, reproduce verbatim
Global chrome (fixed): logo "**Handbuilt**" (H mark, top-left); **SOUND** toggle + cream "**Start a build
→**" (top-right); a live **clock** that advances with scroll labelled "**ALWAYS ANSWERING**"; left **nav
rail I–VII** with an amber active dot (click to jump).

**Composition rule (fixes collision): phone OFF-CENTER, alternating.** 12-col grid. Odd acts (I,III,V,VII)
phone right / text left; even acts (II,IV,VI) phone left / text right. On reveal beats the phone may drift
center but text drops to a lower-third band on its scrim. **Hard rule: ≥48px gutter between text-box and
phone-box; never intersect.**

- **ACT I · THE PROMISE** — H: "Never miss the *job* because you missed the call."
  Lede (verbatim): "Handbuilt AI agents answer calls, capture leads, send quotes, follow up, and handle
  admin while you're working, driving, sleeping, or busy with customers." Small line under CTA: "Your
  business keeps moving even when your hands are full." (Scene: phone dark on the bench, cold blue rim,
  silent.)
- **ACT II · THE CALL YOU CAN'T TAKE** — H: "Business comes in when you *can't* answer."
  Lede: "You can't be on a ladder and on the phone. So the calls, quotes, and leads that arrive while you're
  busy just… slip." Scene beat: the phone **RINGS** — real caller ("New customer · incoming") — no one
  picks up (hands full; **never show a person**); the screen cools and tips toward "**Missed · Voicemail**."
  Render the missed moments as the phone's own **timestamped missed-call/notification log** (NOT floating
  cards):
  - "7:12 AM · loading the truck" → *missed call — a new customer*
  - "1:40 PM · hands full under a sink" → *a quote request*
  - "6:30 PM · dinner with family" → *"you free this week?"*
  - "Sat 9:20 AM · your day off" → *an unpaid invoice*
  Micro-line: "Every one of these was a job — going to whoever answered first."
- **ACT III · CAUGHT** — H: "Watch it get *caught*." **This is the signature reversal — spend the effort.**
  Lede: "Tell us what keeps slipping. The right worker catches it — every time, while your hands stay full."
  Interaction: the same ringing call, one beat from "Missed" — then warm **amber floods the phone** and the
  AI intercepts: on-screen "**Handbuilt Receptionist — answering…**" + a live **transcript** ripples out
  ("Thanks for calling — I can get that booked for you…"). The call flips **Missed → Answered → "Job booked."**
  Pain buttons (real): "I miss calls while I'm on a job" / "People ask for quotes and I forget to reply" /
  "My invoices sit unpaid for weeks" / "Leads go cold before I follow up" — clicking one re-runs the catch
  on the phone with that worker. Workers: **Receptionist** "Catches calls" · **Quote** "Catches estimates"
  · **Follow-Up** "Catches leads" · **Invoice** "Catches payments" · **Custom** "Catches the rest". Result
  strip: "✦ ROUTED TO —" + CTA "Start this build →". **Plus the honest payback input (§7).**
- **ACT IV · THE STUDIO** — H: "Not generated. *Handbuilt.*"
  Lede: "No template farm. No reseller. One builder shapes each worker — wireframe to working — around your
  actual business."
- **ACT V · THE PROOF (THE CAUGHT WEEK)** — kicker "WHAT A CAUGHT WEEK LOOKS LIKE" — H: "While you were
  busy, it was *working*." Lede: "You never stopped. Neither did it. Here's a week it caught for you while
  your hands were full:" Scene: camera pulls back; more pings land on the **same phone** — a text, a quote
  request, an invoice — each tagged by its worker and flipped to caught. A live **dashboard** (framer-motion
  count-up) on a clean panel reads from editable constants (**label it clearly as an example** — §7):
  **12 inquiries caught · 5 quotes sent · 3 jobs booked · 2 invoices followed up.**
- **ACT VI · WHAT YOU CAN HAND OVER** — H: "Answered calls, *honest* prices." Three real pricing cards
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
  and you'll get a clear build plan and a fixed CAD price, usually within a day." Scene: the phone rests,
  warm, screen reading "**Job booked**" — calm, golden key. CTAs: "Start a build" + "Watch it again".
  Footer: "Built by **Pavneet** in Surrey/Delta, BC · real builder, no agency handoff" / "© 2026 Handbuilt".
  **Money act — must be pixel-legible: golden token flip + warm scrim, `--text-hi-dawn` headline,
  `--amber-settled` accent word, primary CTA `--amber-signal` with a solid dark-ink label.**

## 5. THE PHONE + BENCH — best-in-class cinematic 3D (this is the "wow"; spend the effort here)
Setting: a dim maker's **workbench** in near-black negative space. **The phone is the only hero.** No van,
no tool pile, no floating card swarm. Imply the bench with light, shadow, and haze — not props. All
buildable with installed drei/postprocessing.

**The phone.** A single worn work phone lying on the bench, shot like a **product film** — shallow DOF, the
phone tack-sharp, everything else falling to bokeh. Model = a rounded-box glass slab (bevelled edges, subtle
micro-roughness so it isn't CG-glossy), thin metal frame (brushed, low anisotropy), a faint scuff/oil map on
the glass so it reads *used, real, a working phone* — not a showroom render. **The screen is the storyteller:**
a dedicated emissive plane driven by an animated **CanvasTexture** (or offscreen 2D canvas) that renders the
call UI so it can change state — *incoming call → cooling toward Missed/Voicemail → amber "answering" +
scrolling transcript → "Job booked."* Screen light spills onto the bench and frame (the primary light source
in the cold acts). Keep the on-screen strings also as **real DOM** in the Conversion Layer (SR-only or
visually paired) so the transcript is crawlable (§8).

**Lighting — the biggest cheap→premium lever:** dim **studio HDRI** via drei `Environment`
(`envMapIntensity 0.5–0.7`) + `Lightformer`s shaping a **soft window-strip reflection** on the glass (never a
bare white dot). **1–2 `RectAreaLight`s** (softboxes) + one low key whose **color temp + intensity shift with
scroll**: cold blue and low in I–II → the **amber CATCH flood at ~60%** (warm key ignites fast, like a light
being switched on) → warm golden low key by VII. **Contact shadow** (drei `ContactShadows`) grounds the phone
on the bench. When the amber floods, a warm **caustic/pool** of light spreads on the bench around the phone.

**The catch (signature).** At ~55–62% scroll the screen is one tick from "Missed" — then: warm amber sweeps
across the phone, the screen snaps from cold to warm "answering," a soft **bloom** blooms off the screen and
frame, dust motes light up, and the transcript types out. Make it feel like relief — the reversal is the
emotional payoff the whole film builds to. **Pull focus** onto the phone here and again on the Act VII CTA.

**Pull-back (Act V).** Camera dollies back; 2–3 more notification pings appear ON the screen (stacked, each
tagged Receptionist/Quote/Follow-Up/Invoice and flipping to a small amber ✓); the dashboard panel (Conversion
Layer DOM, not baked into the canvas) tallies the counts. Calm, ordered, resolved — the aftermath, not a
sorting machine.

**Atmosphere & film finish:** **dust motes** in the key light (drei `Sparkles`/fine Points), dialed up in the
catch; **depth of field** (subtle bokeh) keeps the phone sharp, background falls off. Renderer
`ACESFilmicToneMapping` (or **AgX**), `exposure ~0.95`. **Bloom** a whisper — screen glow + the amber catch
only (`threshold 0.9, strength 0.25, radius 0.4`). Faint **film grain** (`Noise ~0.04 soft`) + gentle
**vignette** + a whisper of chromatic aberration at the edges. Cap DPR ~1.5; reduce samples/particles/DOF on
mobile.

## 6. MOTION + CAMERA (one director's cut)
- One scrubbed scroll timeline drives: light temp/grade keyframes, the **ring → slip → amber catch**, the
  screen UI states, clock, nav dot, camera dolly, token flip, DOF pull-focus. Transform/opacity only; respect
  reduced-motion.
- **Scroll-driven camera rig** (not static): slow product-film move — gentle orbit/dolly around the phone,
  slight parallax; soft push-in on the catch and on the Act VII CTA. Ease heavily; never nauseating.
- **The catch signature:** the missed-call reversal in Act III (previewed as the slip in Act II). Make the
  amber flood + screen flip tactile — this is the moment the film exists to earn.
- Per-act staggered entrance (kicker→headline→lede→controls, ~60–90ms). Clock + nav read the same scroll value.
- Reduced motion → static poster of the phone mid-catch (warm, screen "answering") + full article.

## 7. HONEST WAGE ANCHOR + PERSUASION (no dark patterns — the honest math IS the weapon)
This audience detects manipulation; it kills trust. True numbers, contrast, and loss-framing only. Put all
figures in `lib/data/alwaysAnswering.ts` as editable constants with a source comment.
```ts
// Sources (verify before editing): BC receptionist ~$21–23/hr, ~$42–48k/yr
//   ca.indeed.com/career/receptionist/salaries/British-Columbia ; salaryexpert.com (Vancouver)
// Human answering services $800–2,400/mo; capped plans $235–290/mo (nextiva.com, wishup.co)
// AI-only competitors bill $29–300/mo RECURRING (dialzara.com, getnextphone.com)
export const WAGE = { partTimeReceptionistMonthly:2000, fullTimeAnnual:45000, answeringServiceMonthlyLow:235, starterOneTime:1000, careMonthly:250 }
// Dashboard = an ILLUSTRATIVE example week, clearly labelled — not a specific-customer claim.
export const SCORE = { inquiries:12, quotes:5, jobs:3, invoices:2 }
```
Levers (all honest): **Anchoring** — Act VI puts `$1,000 once` beside `~$2,000/mo, every month`. **Loss
aversion** — Act II frames missed items as money already leaving (the call literally slipping to voicemail).
**Payback (personalized) — Act III input:** "What's one job worth to you? `$[____]`" → "Then this pays for
itself the first time it catches one." (uses THEIR number; computes nothing fake). **Ownership** — "A hire
quits, gets sick, takes vacation. You *own* this one." **Proof** — the Act V dashboard, labelled an example.
- **Honesty guardrails:** never imply "$0/month forever" (say "$1,000 to build + your own low running cost,
  or $250/mo managed"); label the dashboard as illustrative; keep prices CAD and in sync with site data.
- **Forbidden:** fake countdowns/scarcity, invented ROI/savings totals, made-up liability numbers, fake
  testimonials or customer counts, manufactured fear.

## 8. SEO / GEO — parallel semantic layer
- **Un-noindex** the route → indexable. `landingMetadata` from `lib/seo.ts`. Title e.g. "AI Front Desk for
  Service Businesses — Handbuilt in BC | Always Answering"; description = what/for-whom/where/price band in
  one crawlable sentence. Keywords: "AI receptionist / AI front desk for service businesses / never miss a
  call / BC".
- 7 real `<section aria-labelledby>` with real `<h1>`(I)/`<h2>` + `<p>` ledes; the phone transcript rendered
  as real text; Act VI pricing = real `<ul>`/`<dl>`; Act V dashboard = real text; Act VII CTA = real `<a href>`.
- JSON-LD via `JsonLd` + `lib/seo.ts`: `serviceSchema` (provider Handbuilt; `areaServed` Surrey, Delta, Metro
  Vancouver BC); `Offer`/`PriceSpecification` per tier; `faqSchema` (Act III pains → Q&A — top citation block
  for ChatGPT/Perplexity); `organizationSchema`/`ProfessionalService`; `breadcrumbSchema`.
- One concise crawlable **summary paragraph** near the top: what Handbuilt makes, for whom, where, price band.
  `<noscript>` degrades to the full SSR article.

## 9. Accessibility & performance
WCAG AA everywhere (§2); semantic landmarks; keyboard nav for nav rail, Act III controls, payback input, all
CTAs; visible focus; `aria-hidden` canvas. Lazy-mount Canvas after first paint; cap DPR ~1.5; reduce
samples/particles/DOF on mobile; no-WebGL → poster + article. Targets: LCP < 2.5s (LCP = DOM text), no CLS,
60fps scrub / graceful throttle.

## 10. Verification — evidence required before "done"
1. `npm run lint` + `npm run build` clean (paste build tail). 2. Playwright screenshots at scroll
0/25/50/62/80/100% @ 1440×900 AND 390×844 (62% = the catch). 3. **Contrast assertion** in CI: sample headline
+ lede vs the composited scrim at 5% increments; assert ≥4.5:1; fail if any below. 4. Confirm readable text
with JS disabled (SSR) and reduced-motion (poster). 5. Validate JSON-LD (no errors).

## 11. Routing (recommended)
Rename the route to a keyword-rich slug — **`/ai-front-desk`** — since the old `/quiet-hours` was noindexed
with no inbound links (add a `301` from `/quiet-hours`). Build it native + **indexable** and wire it as the
flagship "experience" from the homepage hero ("See it work ▸") + nav. Keep the current fast homepage at `/`
for now.

## 12. Guardrails
Reproduce §4 copy verbatim; **no vessel/liquid/pouring, no Kanban card-sorting as the hero**; no fabricated
stats/testimonials/counts; wage + dashboard numbers are editable constants labelled illustrative (§7). Prices
CAD, match §4, in sync with site pricing data. Scope new tokens/fonts to the route; don't touch the global
palette or homepage. **Do not commit, deploy, or push** — stop at clean build + screenshots + contrast report
and summarize changes for review.

`=== END GOD PROMPT ===`

---

## Side note (not part of the prompt): live homepage copy bug
The homepage hero pill reads **"INSTALLED, NOT ADVISED"** (`components/home/HomepageNew.tsx:381`) — it scans
as *don't install this*. Fix to **"INSTALLED, NOT JUST ADVICE"**. Quick separate one-line edit.

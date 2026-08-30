# 05 — Design system, responsive layout, performance-of-design

**Agent:** A5 · **Date:** 2026-08-30 · **Mode:** read-only. Source + existing local build artefacts + the wave's production baseline (screenshots & Lighthouse). No app started, no browser driven.
**Repo state read (re-verified this pass):** branch `feat/site-transformation-2026-08-30`, HEAD `e7cda0f`; `origin/main` = `3031d36`; `git rev-list --count origin/main..HEAD` = **37**.

> **Provenance note.** An earlier pass of this report was written against `fix/dead-social-link` @ `e732d98`. HEAD `e7cda0f` is a merge of `origin/main` into that branch and its tree is **byte-identical**: `git rev-parse e732d98^{tree} HEAD^{tree}` both return `1c53107f9ad87e87157a93ca711bbd3b0427ed5d`, and `git diff --name-only e732d98..HEAD` returns 0 files. Every source finding below therefore still describes the current working tree; the branch label in the old header was the only stale fact. ⚠️ Tracked files were clean when this audit began; by the time it finished, **`components/Footer.tsx` and `lib/data/site.ts` had been modified by another agent in this wave** (dead-social-link guards, founder name, narrowed `serviceArea`, an MX/DKIM note dated 2026-08-30). Neither is a design-token file and neither affects any finding here — recorded only so the next reader knows this "read-only" wave has uncommitted code changes in it.

> ✅ **RESOLVED — which homepage is live.** The earlier pass could not determine this and left it as a P0 unknown. The wave's **production** baseline settles it: `baseline/screenshots/home__1440.png` shows the **Molten Forge** page in production — Quicksand display ("Missed calls, late quotes, invoice chasing — handled."), red-gradient CTA with glow, pink radial hero wash, iOS phone mock with orbiting notification badges, and a **3-link private nav** (WORKERS / PRICING / FAQ + "Book a fit check"). The working tree's `app/page.tsx:6-17` imports `components/marketing/*` (the Verseo rebuild: Inter, `--v-*` tokens, global Navbar/Footer). So **production = [main] Molten Forge; the working tree = a homepage that has never shipped.** Findings are tagged **[HEAD]** (working tree) or **[main]** (live) where they differ.

> **Cross-check that makes the production baseline usable as working-tree evidence.** `git diff --stat origin/main..HEAD` touches only 6 design-relevant files — `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `components/Footer.tsx`, `components/Navbar.tsx`, `tailwind.config.ts` (234 files total across the branch). **`components/LandingTemplate.tsx` is NOT among them**, so it is identical in production and in the working tree. That makes `baseline/screenshots/ai-receptionist__*.png` direct visual evidence for the ~200 working-tree routes built on T2 — used in §5.1.

> **Design-consultation status — disclosed, not silently skipped.** Standing policy is to run a Fable art-direction consult before finalising a design recommendation. It was launched and **failed**: `rate_limit / HTTP 429 — "You've reached your Fable 5 limit"` (request `req_011CeZMeXxxoL98mUyr4vTrP`). §7 is therefore **my** art direction, unreviewed by Fable. It should be re-run before the direction is locked; §7.0 is the block to hand it.

---

## 1. Token inventory

### 1.1 Colour — three vocabularies for one palette (+ one dark skin)

**A. Tailwind theme** — `tailwind.config.ts:12-49`

| Token | Hex | Notes |
|---|---|---|
| `paper` / `paper-2` / `paper-card` | `#FBFBFD` / `#F5F5F7` / `#FFFFFF` | page, soft surface, card |
| `ink` / `ink-hover` / `ink-soft` | `#1D1D1F` / `#2A2A2E` / `#6E6E73` | text, ink hover, muted |
| `clay` / `clay-dark` / `clay-soft` | `#E0362C` / `#B8221A` / `#FFE9E7` | **primary red** (name kept from clay era) |
| `amber` / `amber-dark` / `amber-soft` | `#E0362C` / `#B8221A` / `#FFE9E7` | **byte-identical duplicate of `clay`** (`:33-37`) |
| `muted` / `muted-light` | `#6E6E73` / `#A1A1A6` | `muted` == `ink-soft` |
| `line` / `line-strong` | `#D2D2D7` / `#C7C7CC` | borders |
| `success` / `danger` | `#2F6B4F` / `#B42318` | |
| `obsidian` (4 shades) | `#FBFBFD`/`#F5F5F7`/`#F5F5F7`/`#D2D2D7` | legacy alias (`:44`) |
| `electric`, `violet.glow`, `cyan.glow`, `gold.soft` | `#E0362C`, `#E0362C`, `#FF6961`, `#FF6961` | legacy aliases (`:45-48`) — `cyan`/`gold` are a **third red** |

**B. Legacy CSS variables** — `app/globals.css:6-27`: `--bg --surface --surface-soft --border --border-strong --clay --clay-dark --amber --amber-dark --ink --muted --muted-light --success --danger --primary --primary-hover --accent --accent-soft --red-grad` (19 vars, same hexes as A, `--red-grad` marked RETIRED at `:24-27`).

**C. Verseo `--v-*` layer** — `app/globals.css:38-97` (the system the HEAD homepage, Navbar and Footer actually use):

| Var | Value |
|---|---|
| `--v-surface` / `--v-field` / `--v-recess` | `#ffffff` / `#f6f6f6` / `#f9f9f9` |
| `--v-ink` / `--v-ink-2` / `--v-ink-invert` | `#1d1d1f` / `#3a3a3d` / `#1d1d1f` |
| `--v-muted` / `--v-muted-light` | `#686868` / `#8a8a8f` |
| `--v-on-dark` / `--v-on-dark-muted` | `#f4f4f6` / `#a1a1a6` |
| `--v-accent` / `--v-accent-press` / `--v-accent-on-dark` / `--v-accent-wash` | `#e0362c` / `#b8221a` / `#ff7a70` / `#ffe9e7` |
| `--v-hairline` / `--v-hairline-strong` | `rgba(29,29,31,.08)` / `.14` |
| `--v-shadow-card` / `--v-shadow-lift` | 4-layer ≤6% shadows (`:75-84`) |
| `--v-r-control` / `--v-r-card` / `--v-r-panel` / `--v-r-pill` | `4px` / `12px` / `16px` / `999px` |
| `--v-container` / `--v-measure` / `--v-gutter` / `--v-nav-h` | `1344px` / `680px` / `24px` / `72px` |
| `--v-dur-fast` / `--v-dur` / `--v-dur-slow` / `--v-ease` | `120ms` / `200ms` / `420ms` / `cubic-bezier(.22,1,.36,1)` |

**D. Creators dark skin** — `app/globals.css:758-770`: `--cr-bg #0b0b0d`, `--cr-surface #141418`, `--cr-surface-2 #1c1c22`, `--cr-text #f4f4f6`, `--cr-muted #8a8a93`, `--cr-red #ff453a`, `--cr-red-deep #e0362c`.

**Net:** the same near-black is spelled `ink`, `--ink`, `--v-ink`, `--v-ink-invert`, `--primary`; **seven distinct "muted grey" hexes** are live (`#6E6E73`, `#686868`, `#8A8A8F`, `#A1A1A6`, `#8A8A93`, `#3A3A3D`, plus `#8E8E93` hard-coded in `MoltenForge.tsx:474,501,540,567` [main]); **four reds** (`#E0362C`, `#B8221A`, `#FF6961`, `#FF453A`/`#FF7A70`). The `--v-*` text colours have **no Tailwind utility**, so the newest components set them with inline `style={{ color: "var(--v-ink)" }}` — 30× `var(--v-ink)`, 8× `--v-ink-2`, 6× `--v-muted` (e.g. `components/Navbar.tsx:67,80,93`, `components/Footer.tsx:48,58,202,216`, `components/marketing/HomeSections.tsx:57,79,147,209`).

### 1.2 Fonts actually loaded

| Branch | Families | Weights | Source |
|---|---|---|---|
| **[HEAD]** | **2** — Inter (variable, all weights), JetBrains Mono | Mono 400/500/700 | `app/layout.tsx:2,27-33` |
| **[main]** | **5** — Inter, Archivo, IBM Plex Mono, Quicksand, JetBrains Mono | Archivo 500/600/700/800 · Plex 400/500/600 · Quicksand 400/500/600/700 · JBMono 400/500/700 (**≈15 font files**) | `origin/main:app/layout.tsx:2,13-38` |
| `/ai-front-desk` route only | +Fraunces | — | `app/ai-front-desk/page.tsx:12-14`; consumed at `components/experience/experience.css:312` |

`font-display` resolves to Inter at HEAD (`tailwind.config.ts:51-55`; aliases `--font-display`, `--font-quicksand`, `--font-mono` at `globals.css:99-104`). The comment at `tailwind.config.ts:57` ("Quicksand tops out at 700") is stale. No `<link>` to Google Fonts anywhere; all via `next/font`.

Weight-class tally (app+components tsx): **`font-light` 299** (!), `font-semibold` 162, `font-bold` 52, `font-medium` 45, `font-extrabold` 7. `font-light` is concentrated in `app/agent/*` (≈230), `app/dashboard/page.tsx` (35), `components/PricingPlans.tsx` (15), `app/cart/page.tsx` (12) — 300-weight Inter at `text-sm` is the single biggest perceptual "washed-out" driver even where the hex passes.

### 1.3 Type scales — three in use

1. **Tailwind default** (`text-xs … text-6xl`): `text-sm` 206, `text-xs` 105, `text-lg` 40, `text-2xl` 37, `text-xl` 36, `text-4xl` 28, `text-3xl` 14, `text-5xl` 8, `text-6xl` 2.
2. **"Doc 2" named scale** `tailwind.config.ts:58-72` (`hero` 64/0.95/700 … `tiny-label` 11): `text-small` 48, `text-tiny-label` 33, `text-body` 22, `text-section-sm` 11, `text-card-title` 10, `text-hero-sm` 4, `text-body-lg` 3. Used almost exclusively by the tools system and Showroom.
3. **Verseo `.v-*`** `globals.css:459-512` (`v-h1` clamp 38–60/600, `v-h2` clamp 30–48, `v-h3` 24/500, `v-lead` 18, `v-body` 17/1.55, `v-small` 15, `v-micro` 12, `v-label` 11): `v-micro` 31, `v-small` 19, `v-body` 9, `v-h2` 7, `v-h3` 5, `v-lead` 3, `v-h1` 2.

Plus 40 raw `clamp(` and ad-hoc `text-[15px]`/`text-[17px]`/`text-[13px]`/`text-[12px]`/`text-[10px]` throughout (`Navbar.tsx:66,79`, `Footer.tsx:47,63,91,201`, `CreatorStudio.tsx:412,419`).

### 1.4 Spacing, radius, shadow, container

- **Section rhythm:** `.section-pad` 56/72/96 (`globals.css:313-315`, used 2×), `.v-section` 72/96/120 (`:373-386`, 13×), and raw utilities: **`pt-32` ×25** (128px, non-responsive), `py-12` ×23, `py-20` ×15, `py-16` ×9, `py-28` ×4, `py-24` ×4, `py-32` ×3, `py-44` ×1.
- **Containers (7 widths):** `--v-container` 1344 (`v-container` 21×), `max-w-container` 1180 (11×) + `max-w-[1180px]` (8×, CreatorStudio), `max-w-[1200px]` 4×, `max-w-7xl` 12×, `max-w-6xl/5xl/4xl` in hubs, `max-w-3xl` 32× (768px content column on old templates).
- **Radius:** Tailwind tokens `card` 24 / `card-sm` 18 / `btn` 14 / `input` 14 / `phone` 44 (`tailwind.config.ts:79-85`) vs `--v-r-*` 4/12/16 (`globals.css:87-90`). Usage: `rounded-full` 97, `rounded-lg` 86, `rounded-2xl` 25, `rounded` 21, `rounded-card-sm` 19, `rounded-xl` 16, `rounded-card` 15, `rounded-[var(--v-r-control)]` 13, `rounded-3xl` 9, plus `rounded-[4px] [2px] [10px] [9px] [46px] [36px]` — **25 distinct radius classes**.
- **Shadow:** Tailwind `card`/`glow`/`phone`/`glow-violet`/`glow-cyan` (`:146-152`) vs `--v-shadow-card`/`--v-shadow-lift`. `shadow-card` 19×, `shadow-sm` 2, `shadow-lg` 1.
- **Control heights conflict:** Tailwind `height.btn` 56 / `input` 52 (`:86-91`) vs `.btn-primary` **48px** (`globals.css:200`) vs Navbar CTA `!h-10` = 40px (`Navbar.tsx:98`).

### 1.5 Raw values bypassing tokens

| Pattern | Count | Top files |
|---|---|---|
| `*-[#hex]` / `-[rgb(|rgba(|var(]` / `[color:…]` / `[background:…]` arbitrary values | **140 in 20 files** *(corrected this pass; the earlier "98 in 16" undercounted)* | Union of three patterns, re-counted with ripgrep: `-[#hex` **30** in 14 files; `-[rgb(/rgba(/var(` **43** in 6 files (`Footer` 3, `Navbar` 4, `HomeSections` 7, `Interactive` 3, `primitives` 1, `ForgeExperience` 25); `[color:|[background:|[--var:` **68** in 2 files (`creators/CreatorStudio.tsx` **66**, `Footer.tsx` 2 at `:174,177`). Top files overall: `CreatorStudio` 66, `ForgeExperience` 26, `agent/settings` 9, `HomeSections` 7, `Showroom` 6 |
| 6-digit hex literals in TSX (inline styles / SVG) | **521 in 28 files** | `home/MoltenForge.tsx` 200 [main homepage], `home/stage/StageObjects.tsx` 92, `ConsultationCall.tsx` 43, `experience/PhoneScene.tsx` 36, `home/stage/HandVisual.tsx` 29, `home/HomepageNew.tsx` 29, `home/stage/HandStage.tsx` 22, `forge/ForgeScene.tsx` 14, `Logo.tsx` 9, `Showroom.tsx` 8, `app/global-error.tsx` 6, `marketing/primitives.tsx` 3 (`:167-169` macOS traffic-light hexes) |
| Hex in CSS files | `home/LiveAIHome.module.css` 90 (31 distinct), `experience/experience.css` 45 (26 distinct), `forge/forge.css` 7 | |
| `style={{ … }}` inline objects in `MoltenForge.tsx` | **235** | the [main] homepage is essentially untokenised |

**Dead but present at HEAD** (zero importers, verified): `components/home/MoltenForge.tsx` (910 lines), `HomepageNew.tsx`, `LiveAIHome.tsx` + `.module.css`, `HeroFlowField.tsx`, `HeroWorkerPreview.tsx`, `home/stage/{HandStage,HandVisual,StageObjects}.tsx`. Dead classes still shipped in `globals.css`: `.text-gradient-brand` (= `text-ink`, `:275-282`, yet still applied 10× in 9 files), `.spec-frame` no-op (`:247-254`), `.site-glow { display:none }` still rendered from `app/layout.tsx:145`, `.shimmer-text`, `.tilt-card`, `.border-glow`; and 12 Tailwind keyframes (`tailwind.config.ts:92-145`) of which only `animate-spin` is used in a live component.

---

## 2. Grey-text audit (computed WCAG ratios)

Method: relative-luminance contrast; alpha classes blended over the stated background. AA = 4.5:1 for text < 24px regular (18.66px bold), 3:1 for large text and UI marks.

### 2.1 Solid tokens

| Token | on `#FFF` | on `paper #FBFBFD` | on `paper-2 #F5F5F7` | on `--v-recess #F9F9F9` | Verdict |
|---|---|---|---|---|---|
| `ink #1D1D1F` | 16.83 | 16.28 | 15.46 | 15.99 | ✓ |
| `--v-ink-2 #3A3A3D` | 11.34 | 10.97 | 10.41 | 10.77 | ✓ |
| `--v-muted #686868` | 5.57 | 5.39 | 5.12 | 5.29 | ✓ (used by `v-lead/v-small/v-micro/v-label`, footer links) |
| `muted` / `ink-soft #6E6E73` | 5.07 | 4.91 | **4.66** | 4.82 | ✓ marginal — `.eyebrow` sets this at **11px uppercase** on `paper-2` (`globals.css:286-289`) |
| `--v-muted-light #8A8A8F` | **3.44** | 3.32 | 3.16 | 3.26 | ✗ text; OK as mark (only used as marks — `CallTimeline.tsx:49`, `HomeSections.tsx:83,290`) |
| `muted-light #A1A1A6` | **2.57** | 2.49 | 2.36 | 2.44 | ✗ — used as **text** in `app/error.tsx:79` (text-xs), `components/showroom/Showroom.tsx:360,498,537,539,554` (11px uppercase labels on `/demo`), placeholder `components/tools/ui.tsx:59` |
| `clay #E0362C` | **4.44** | 4.29 | 4.07 | 4.21 | ✗ for <18px text; OK as ≥3:1 mark. `text-clay` as glyph `app/tools/page.tsx:44` only |
| `clay-dark #B8221A` | 6.40 | 6.19 | 5.88 | 6.08 | ✓ (tools eyebrows `ToolShell.tsx:64`, `tools/page.tsx:26`) |
| `success #2F6B4F` | 6.29 | 6.09 | 5.78 | 5.98 | ✓ |

### 2.2 Alpha ink classes (the real offenders — 200+ occurrences)

| Class | Blended on white | Ratio white | Ratio on `paper-2` | Occurrences | Where it is body/secondary copy |
|---|---|---|---|---|---|
| `text-ink/20` | `#D2D2D2` | 1.51 | 1.50 | 6 | icons only (`LandingHub.tsx:59`, `LandingTemplate.tsx:282`) |
| `text-ink/30` | `#BBBBBC` | 1.92 | 1.90 | 4 | `LandingTemplate.tsx:208` X icon |
| `text-ink/35` | `#B0B0B1` | 2.17 | 2.15 | 4 | placeholders `.field` (`globals.css:322`) |
| **`text-ink/40`** | `#A5A5A5` | **2.46** | 2.43 | **44** | `LandingTemplate.tsx:56` breadcrumb (text-sm), `:105,:119,:241` uppercase labels (text-xs), `:249-252` price meta (text-sm/xs); `ServicePackages.tsx:36,38,44` (text-xs/sm — on `/pricing`); `DemoPageTemplate.tsx:48` hint; `SolutionFinder` 4; `app/shop/page.tsx` 4; `BuildRequestForm.tsx` 3; `FAQSection.tsx:24` icon |
| `text-ink/45` | `#99999A` | **2.85** | 2.78 | 7 | `app/pricing/page.tsx:47` (text-sm paragraph) |
| `text-ink/50` | `#8E8E8F` | **3.27** | 3.21 | 7 | `ServicePackages.tsx:31` tagline (text-sm), `LandingTemplate.tsx:193` |
| **`text-ink/55`** | `#838384` | **3.79** | 3.72 | **22** | `components/SectionHeading.tsx:28` subtitle (16–18px, every old-template section), `LandingHub.tsx:62` card body (text-sm), `LandingTemplate.tsx:207` comparison column (text-sm), `IndustryStrip.tsx:28` chips |
| **`text-ink/60`** | `#777779` | **4.47** | 4.35 | **35** | `FAQSection.tsx:39` **FAQ answers** (text-sm), `DemoPageTemplate.tsx:42`, `LandingHub.tsx:37`, `LandingTemplate.tsx:315`, `app/pricing/page.tsx:40`, `app/faq/page.tsx:50`, `app/shop/page.tsx:39`, `ServicePackages.tsx:41` — all hero/lead paragraphs |
| `text-ink/65` | `#6C6C6D` | 5.25 | 5.03 | 6 | `app/about/page.tsx:33`, `LandingHub.tsx:37` |
| `text-ink/70` | `#616162` | 6.19 | 5.94 | 20 | ✓ |
| `text-ink/75` / `/80` | `#565657` / `#4A4A4C` | 7.33 / 8.84 | 7.05 / 8.38 | 13 / 35 | ✓ |

**On the ink band (`#1D1D1F`)**: `--v-on-dark #F4F4F6` 15.32 ✓ · `--v-on-dark-muted #A1A1A6` 6.54 ✓ · `--v-accent-on-dark #FF7A70` 6.63 ✓ · `text-white/70` 8.77 ✓ · `--v-accent #E0362C` **3.79** (marks only ✓; never text). **Creators**: `--cr-muted #8A8A93` on `--cr-bg` 5.75 ✓, on `--cr-surface-2` 4.96 ✓ marginal — but set at **10px/11px mono uppercase** (`CreatorStudio.tsx:412,419`), below any readable floor regardless of ratio. **[main] Molten Forge** hard-codes `#8E8E93` (3.65 on white ✗) for phone-UI secondary text (`MoltenForge.tsx:474,501,540,567`) and a `#FF6961→#E0362C` gradient CTA whose white label sits at ≈3.0 on the light end ✗.

**Washed-out offender list (severity order):** (1) `text-ink/40` at 12–14px ×44 — 2.46:1; (2) `text-ink/55` on `SectionHeading` subtitles + hub card bodies ×22 — 3.79:1; (3) `text-ink/60` FAQ answers and lead paragraphs ×35 — 4.47:1 (fails by a hair, reads grey); (4) `muted-light #A1A1A6` labels on `/demo` and `error.tsx` — 2.57:1; (5) `font-light` ×299 stacked on the above; (6) `--v-lead`/`v-small` at `#686868` used for *substantive* hero copy (`Hero.tsx:60`, `Footer.tsx:57,94`) — passes AA but contradicts the system's own rule (`globals.css:45-46`) that substantive copy is ink.

---

## 3. Motion audit

### 3.1 Two Reveal components

| | `components/Reveal.tsx` (framer) | `components/marketing/Reveal.tsx` (IO + CSS) |
|---|---|---|
| Mechanism | `motion[as]` `initial="hidden"` `{opacity:0,y:24}` → `whileInView` `{once:true, margin:"-80px"}`, **duration 0.6s** + per-instance delay (`:6-30`) | adds `is-in` to `.v-reveal` (`globals.css:718-737`): opacity 0 / translateY 14px → visible, **420ms** (`--v-dur-slow`) |
| SSR first paint | framer serialises `initial` → **`opacity:0` in the HTML**; content invisible until hydration + 0.6s + delay | `.v-reveal{opacity:0}` in CSS; `shown` starts false whenever `IntersectionObserver` exists (`:30`) → **also invisible in SSR HTML** until hydration; visible only if IO is absent |
| Reduced motion | **none** — no `useReducedMotion`, no `MotionConfig`; the global `@media (prefers-reduced-motion)` rule at `globals.css:846-854` only shortens CSS animations/transitions and does **not** affect framer's JS-driven inline styles | ✓ `globals.css:731-737` forces visible, no transition |
| Usage | **23 files / ≈150 instances**: `LandingTemplate.tsx` 19, `app/use-cases/[slug]` 17, `app/shop` 16, `CreatorStudio` 13, `ForgeExperience` 10, `app/about` 8, `LandingHub` 7, `app/solutions` 7, `app/pricing` 7, `DemoPageTemplate` 6, `app/faq` 6, `SectionHeading` 3 (so every old-template H2/subtitle), `ServicePackages` 2… | `HomeSections.tsx` 15, `WorkflowStory.tsx` 2 (HEAD homepage only) |

**Above-the-fold content hidden by opacity [HEAD]:** every old-template page wraps breadcrumb, eyebrow, **H1**, lead and CTAs in staggered framer Reveals — `LandingTemplate.tsx:55-95` (delays 0 / .05 / .08 / .12 / .16 s → H1 completes ≈0.68 s after hydration, CTA ≈0.76 s), `LandingHub.tsx:28-38`, `DemoPageTemplate.tsx:33-46`, `app/pricing/page.tsx:31-55`, `app/about/page.tsx:23-39`, `app/faq/page.tsx:41-53`, `app/shop/page.tsx:29-43`, `CreatorStudio.tsx:161-214`. That is ~210 of the site's routes. The HEAD homepage `Hero.tsx` is **not** wrapped (H1 paints immediately ✓) but sections 2–11 sit at `opacity:0` in the server HTML. `viewport.margin:"-80px"` also means any element whose top lands within 80px of the fold never reveals until the user scrolls.

**Durations observed:** CSS `duration-200` ×9, `duration-300` ×6, `duration-500` ×1; framer: 0.9 s ×2, 0.6 s ×2 (Reveal), 0.4 s ×2, 0.35 s ×2, 1.6, 1.2 (`Showroom.tsx:570`), 1.1 (`:516`), 1.0, 0.85, 0.3, 0.22, 0.2 → **10 of 16 framer transitions exceed 300 ms**; `.v-reveal` 420 ms; `.border-glow` 0.4 s (`globals.css:266`); `.tilt-card` 0.5 s (`:741`); `.glass-card` 200 ms ✓.

**Other motion sources:** `MagneticButton.tsx` (framer springs following the cursor; **43 usages in 10 files**; no reduced-motion, meaningless on touch, drags framer into every page bundle it touches); `FAQSection.tsx:29-37` height/opacity 0.3 s (no reduced-motion); `SolutionFinder.tsx` 8 `motion.*`; `Showroom.tsx` 11 (`useReducedMotion` ✓ at `:33`); `tools/ui.tsx:278-288` (✓); Tailwind keyframes `fade-in/slide-up 0.6s`, `float 9–14s`, `pulse-glow 4s`, `spin 28–60s`, `grid-pan 30s`, `shimmer`, `marquee 40s`, `aurora 18s`, `border-beam 6s` (`tailwind.config.ts:92-145`) — unused except `animate-spin`; `globals.css` `vRingBar 1.1s`, `vLivePulse 1.6s` (both with reduced-motion fallback ✓ `:677-685`), `crPlayhead 9s`, `crPulse 1.8s` (✓ `:846-853`).

**[main] Molten Forge homepage:** 460 vh sticky scroll-jack track (`MoltenForge.tsx:660-661`), `mfOrbit` 35 s orbit (`:221`), `mfLiveIn` replays on every segment change (`:223`), `mfColorShift` 6 s (`:224`), `mfEmber`/`mfWave` infinite; reduced-motion handled for orbit/wave/ember/liveIn at `:249-253` but the scroll-jack itself is not disabled.

### 3.2 three.js

- Imported only by `components/experience/PhoneScene.tsx:11-21` (route `/ai-front-desk`) and `components/forge/ForgeScene.tsx:14-25` (route `/forge`), both behind `next/dynamic(..., { ssr:false })` (`MissedCallCaught.tsx:61`, `ForgeExperience.tsx:28`). **The homepage does not load three.js on either branch.**
- Build evidence (`.next/BUILD_ID 0F1XcbvyMjOp0rvivXLDL`, existing local build, raw uncompressed sizes): three chunks `b536a0f1…js` **684 KB** and `106.edc…js` **198 KB** (both contain `WebGLRenderer`) are lazy — referenced by **no** route entry in `app-build-manifest.json`. Homepage `/page` = 6 JS files, 337 KB raw, of which **15 KB** is route-own; shared `/layout` = 368 KB raw (`fd9d1056` 169 KB react-dom, `2117` 122 KB, `8642` 35 KB incl. next-auth `SessionProvider` from `components/Providers.tsx:3-6`, `2972` 26 KB, `layout` 12 KB). Old-template routes carry ~120–170 KB extra: `/pricing` 128 KB, `/about` 123 KB, `/demo` 155 KB, `/creators` 121 KB, `/tools/missed-call-revenue-calculator` 173 KB vs `/tools` **0 KB** route-own — the framer + MagneticButton + Reveal stack is the delta. These routes (`/ai-front-desk`, `/forge`) are "retired via redirects" per memory but their page files, CSS (849 + 173 lines) and the three dependency tree are still in the build.

---

## 4. Template audit

### 4.1 Distinct page shells at HEAD (10) + 1 on main

| # | Template | Routes | Header / footer | Container | Section/heading/eyebrow | Motion | Card | Notes |
|---|---|---|---|---|---|---|---|---|
| T1 | **Homepage (Verseo)** `app/page.tsx:128-144` | `/` | global `Navbar.tsx` + `Footer.tsx` via `app/layout.tsx:149-156` | `v-container` 1344 | `.v-section`, `primitives.SectionHeading` (`v-h2`+`v-lead`), `.v-label` callout | IO Reveal | `v-card` / `v-card-flat` / `Recess` / `WindowChrome` | `Hero`, `LiveCalcStrip`, `Interactive`, `WorkflowStory`, `HomeSections` |
| T2 | **LandingTemplate** `components/LandingTemplate.tsx` | 19 route files ≈ 200 pages (`services/industries/locations/how-to/compare/resources/creators/[slug]` + 11 static landers) | global | `max-w-3xl` (768) / `max-w-5xl` | `py-12` stacks, `pt-32` hero, `.eyebrow` pill, `font-display text-2xl sm:text-3xl` | framer Reveal ×19, `MagneticButton` | `glass-card`, `bg-brand-gradient` icon tiles | comparison as `grid-cols-3` (`:192,200`) |
| T3 | **LandingHub** `components/LandingHub.tsx` | 6 hubs | global | `max-w-4xl` / `max-w-6xl` | `pt-32`, `.eyebrow` | framer ×7, Magnetic | `glass-card` grid | |
| T4 | **Bespoke static pages** in T2 vocabulary | `/pricing` `/about` `/faq` `/shop` `/solutions` `/use-cases(+[slug])` `/create` `/privacy` `/terms` `/account` `error` `not-found` | global | `max-w-3xl` hero, `max-w-7xl` body | `pt-32`, `.eyebrow`, `components/SectionHeading.tsx` (framer, `text-3xl sm:text-4xl md:text-5xl`, `text-ink/55` subtitle), `.text-gradient-brand` | framer Reveal 3–16 per page, Magnetic | `glass-card`, `ServicePackages`, `PhoneReceptionistPlan`, `WhyAIShop`, `HowItWorks`, `FAQSection` | H1 `text-4xl sm:text-6xl` |
| T5 | **DemoPageTemplate** | `/demo/{assistant,lead,nudge,quote}` | global | `max-w-3xl` | `pt-32 pb-24`, centred | framer ×6 | `glass` | |
| T6 | **Showroom** `components/showroom/Showroom.tsx` (621 lines) | `/demo` | global | own | own hero `text-hero-sm sm:text-[44px]` | framer ×11 (reduced ✓) | phone mock `w-[332px]` | `muted-light` labels |
| T7 | **Tools** `components/tools/ToolShell.tsx` + `app/tools/page.tsx` | `/tools` + 5 tools | global | `max-w-container` 1180 | Doc-2 scale (`text-hero-sm`, `text-section-sm`, `text-body`, `text-small`, `text-tiny-label font-mono uppercase text-clay-dark`), `bg-paper-2/60` header band, native `<details>` FAQ (`:139`), `bg-ink` closing band | none (server) | `rounded-card border-line` | **cleanest, lightest, best-contrast shell on the site** |
| T8 | **Creators dark hub** `components/creators/CreatorStudio.tsx` | `/creators` | **own** sticky header `:127` + own footer `:401`; global chrome suppressed by `ChromeGate.tsx:16` | `max-w-[1180px]` | `--cr-*`, 66 arbitrary `[color:var(--cr-…)]` | framer ×13 | `.cr-clip` | `text-[10px]`/`[11px]` mono |
| T9 | **Retired experiences** | `/ai-front-desk`, `/forge` | own (ChromeGate `:7`) | own | own CSS files, Fraunces | framer + three | — | still built |
| T10 | **App screens** | `/agent/*`, `/dashboard`, `/cart`, `/login` | global | — | `text-5xl font-light` H1 (`cart:34`, `dashboard:41`), `font-light` ×250, raw hex | — | — | `agent/*` has no auth (memory) |
| T0 | **[main] Molten Forge** `components/home/MoltenForge.tsx` | `/` on `origin/main` | **own** header `:588`; global chrome hidden by main's `ChromeGate` `HIDDEN_EXACT=["/", "/creators"]` | own | 235 inline styles, Quicksand | 460 vh scroll-jack | own | the page in `docs/design/screenshots/before/PROD-1440-fold.jpeg` |

**Duplicated primitives:** 2× `Reveal`, 2× `SectionHeading` (`components/SectionHeading.tsx` vs `marketing/primitives.tsx:108`), 4× eyebrow styles (`.eyebrow` pill 16 files / `.v-label` 3 files / tools mono / creators mono), 4× card (`glass-card` 14 files / `v-card` 4 / `rounded-card border-line` tools / `.cr-clip`), 3× FAQ (`FAQSection.tsx` framer / `marketing/Interactive.tsx` FaqSection / `ToolShell.tsx:139` `<details>`), 2× button wrappers (`btn-primary` 31 files vs `MagneticButton` 10 files wrapping the same class), 3× footer/header sources, 7 container widths, 3 type scales.

### 4.2 What one template system should look like

Keep the **Verseo `--v-*` system as the base** (newest, contrast-audited at `globals.css:45-63`, hairline-via-shadow, 4px controls, reduced-motion-safe Reveal) and fold the two strongest things from the tools shell into it (server-rendered `<details>` FAQ; the Doc-2 *names* for the type scale). Concretely:

- **Keep:** `Navbar.tsx`, `Footer.tsx`, `marketing/primitives.tsx` (`SectionLabel`, `PegIcon`, `SectionHeading`, `Recess`, `WindowChrome`), `marketing/Reveal.tsx` (with the SSR fix in §7), `.btn-primary/secondary/ghost/invert`, `.v-card*`, `.v-range`, `.v-link`, `tools/ui.tsx` fields, `ToolShell.tsx` structure.
- **Merge into one `PageShell`** (hero → sections → related → FAQ → final CTA, all data-driven): `LandingTemplate.tsx`, `LandingHub.tsx`, `DemoPageTemplate.tsx`, and the bespoke heroes in `app/{pricing,about,faq,shop,solutions,use-cases,create,privacy,terms}/page.tsx`. Hero variants: `copy+visual` (home), `copy-only` (landers), `copy+tool` (tools).
- **Delete/retire:** `components/Reveal.tsx` (framer), `components/SectionHeading.tsx`, `MagneticButton.tsx`, `GlowBackground.tsx` (the "faint red radial wash" retired in the Verseo rationale but still on 13 pages), `FAQSection.tsx` (replace with `<details>`), `ServicePackages.tsx` (replace with `HomeSections.PricingSection` extracted), `WhyAIShop.tsx`/`HowItWorks.tsx` (fold into sections), the entire `components/home/*` tree, `components/experience/*` + `components/forge/*` + their routes (after confirming redirects), Tailwind legacy colour aliases and unused keyframes.
- **Creators:** keep the dark skin as a *theme* (`data-theme="studio"` overriding the same `--v-*` names) rather than a parallel `--cr-*` vocabulary with its own header/footer.

---

## 5. Responsive risks (from source; viewports 320 / 375 / 390 / 768 / 1024 / 1280 / 1440)

| Sev | Risk | Evidence | Viewports hit |
|---|---|---|---|
| **P1** | Comparison table is a 3-column CSS grid with `p-4` cells, `text-sm`, no min-width, no scroll container | `components/LandingTemplate.tsx:192-212` (`grid grid-cols-3`) | 320/375/390 → ≈64 px text columns, one-word lines; 768 cramped |
| **P1** | 128 px hero top padding on 25 pages at every width, no responsive step | `pt-32` in `LandingTemplate.tsx:52`, `LandingHub.tsx:25`, `DemoPageTemplate.tsx:29`, `app/{pricing:28,about:20,faq:38,shop:26,solutions,use-cases,create,privacy,terms,account,cart,dashboard,error,not-found}` | 320–390: H1 starts ≈200 px below the top (72 header + 128) |
| **P1** | Old-template H1 jumps `text-4xl → sm:text-6xl` (36 → 60 px at 640) with no clamp; 8-word H1s at 60 px inside `max-w-3xl` wrap to 4–5 lines | `app/shop/page.tsx:33`, `app/pricing/page.tsx:35`, `app/about/page.tsx:27`, `app/solutions/page.tsx:32`; `LandingTemplate.tsx:79` (`text-3xl sm:text-5xl`) | 640–767 worst; 320 gets 36 px (fine); 768 60 px |
| **P2** | Section stacking on the HEAD homepage: `.v-section` 120 px + `Recess mt-12` + inner `-mt-12 pb-12` + next `.v-section` 120 px → ≈250 px of air between a card row and the next heading | `HomeSections.tsx:24-36`, `:238-250`; `globals.css:373-386`; `FinalCta` `lg:pt-[120px]` (`:412`) | 1024–1440 (matches the owner's "excessive whitespace") |
| **P2** | Old-template content column is `max-w-3xl` (768 px) centred → ≈47 % of a 1440 viewport is empty margin | `LandingTemplate.tsx:54,102,116,134` and T4 pages | 1280/1440 |
| **P2** | `body { overflow-x:hidden }` hides horizontal overflow instead of preventing it | `globals.css:121` | all — masks the table/grid bugs above |
| **P2** | Navbar CTA is 40 px tall; footer icon links 36 px; footer link rows ≈24 px tall on a 34 px pitch; legal links 12 px with no padding; breadcrumb links unpadded `text-sm` | `Navbar.tsx:98` (`!h-10`), `Footer.tsx:215` (`h-9 w-9`), `:201` (`py-0.5`), `:174-179`, `LandingTemplate.tsx:56-63` | touch (320–768) — below the 44 px target the spec itself sets (`HOMEPAGE-BUILD-SPEC.md §15`) |
| **P2** | Desktop nav only from `lg` (1024); at exactly 1024 the 5 links + brand + CTA ≈ 900 px in a 944 px container (`gap-7`, 15 px) — no room for font fallback | `Navbar.tsx:74,88`; labels `lib/data/site.ts:50-56` | 1024 |
| **P3** | Fixed pixel boxes: phone mock `w-[332px]` (has `max-w-full` ✓) and island `w-[100px] h-[26px]`; `dt w-[62px]` label column; CreatorStudio H1 `text-[40px] sm:text-[58px]` fixed | `Showroom.tsx:385,390`, `WorkflowStory.tsx:151`, `CreatorStudio.tsx:167` | 320 |
| **P3** | `whitespace-nowrap` on buttons/chips — `btn-secondary` label "Add the care plan…" cannot wrap | `ServicePackages.tsx:86`, `SolutionFinder.tsx:232`, `IndustryStrip.tsx:28`, `CreatorStudio.tsx:359` | 320–375 |
| **P3** | Images: **`next/image` is imported in 0 files**; raw `<img>` without `width`/`height` in `components/ProductCard.tsx:37-40` and `app/cart/page.tsx:44-47` (external Unsplash fallback) → CLS on `/shop`, `/products`, `/cart` | | all |
| **P3** | Tables in `/agent/*` without a scroll wrapper (`app/agent/contacts/page.tsx:251`, `app/agent/leads/page.tsx:321`); `/dashboard:153` and `tools/ui.tsx:338` are wrapped ✓ | | 320–768 |
| **P3** | Sticky: `ToolShell.tsx:152` aside pins at `lg:top-header` (72 px) with 0 px gap under the 72 px sticky header — touches; `HomeSections.tsx:131` uses `+32px` ✓; both `lg`-only ✓. Mobile nav sheet has no `max-h`/`overflow-y` while body scroll is locked (`Navbar.tsx:29-36,119-157`) — fine at 5 links, breaks if links grow | | 1024+ / ≤768 |
| ✓ | HEAD hero H1 uses `clamp(34px,5vw,52px)` (`Hero.tsx:51`), `.v-h1/.v-h2` are clamped (`globals.css:461-475`), `.v-range` is 44 px (`:520-524`), `scroll-padding-top: 88px` (`:113`), how-it-works sticky is `lg`-only | | |

Screenshot cross-check (existing, not re-taken): `docs/design/screenshots/after/V2-1440-fold.jpeg` shows the HEAD hero with ≈110 px of dead space above the eyebrow and the timeline card correctly beside the copy; `after/V2-390-fold.jpeg` shows the hero copy + both CTAs inside the first 700 px with the visual pushed below the fold (acceptable); `before/PROD-1440-fold.jpeg` shows the [main] Molten Forge page: Quicksand H1 at ~90 px, red-gradient CTA, pink radial wash, orbiting badges over the phone.

---

### 5.1 Production baseline screenshots — visual confirmation of the source findings

Viewed with the Read tool from `research/transformation-2026-08-30/baseline/screenshots/` (121 PNGs at 320/375/390/768/1024/1280/1440). These are **production**, i.e. `[main]`; per the cross-check in the header, the `ai-receptionist` shots are still valid for the working tree because `LandingTemplate.tsx` is identical on both sides.

| Evidence | What the pixels show | Confirms |
|---|---|---|
| `home__1440.png` | Hero copy column ends at ≈590 px; phone mock occupies ≈910–1170 px; a ≈320 px dead gutter sits between them and ≈270 px of empty page to the right of the phone. H1 wraps to **5 lines** because the copy column is narrow while half the viewport is unused. | §5 "content column centred → ~47 % empty margin"; the owner's "excessive whitespace" |
| `home__1440.png` | `— handled.` is set in **coral at display size** (~90 px) and is the single most brand-owning element on the page; the red-gradient CTA carries a soft red glow shadow. | Drives the §7.0 correction: confining coral to ≤20 px marks was **too timid** |
| `home__390.png` | The header does **not** collapse to a hamburger: logo on row 1, WORKERS/PRICING/FAQ on row 2, "Book a fit check" on row 3 — the chrome eats ≈135 px before any content. The eyebrow wraps mid-token to a dangling `DELTA, BC`. | New defect (D15); §5 "mobile wrapping" |
| `ai-receptionist__1440.png` | Breadcrumb at y≈211, H1 at y≈325, CTA at y≈598, next section at y≈720. Content is a centred ≈720 px column on a 1440 px viewport — **both** side margins empty. Everything is centre-weighted; no left rail, no annotation. | §5 rows 2/4/5 (`pt-32`, `max-w-3xl`); the "not everything centered" anti-tell |
| `ai-receptionist__1440.png` | Lead paragraph renders visibly grey against near-black H1; the `AI BUILD` eyebrow pill is small grey caps on a light tint. | §2.1 `muted #6E6E73` @ 11 px on `paper-2` = **4.66:1**; §2.2 `text-ink/60` leads = **4.47:1** |
| `home__1440.png` vs `ai-receptionist__1440.png` | **Two different headers on the same production site**: 3 private links + "Book a fit check" on `/`, versus 5 global links + Account + "Start a build" on the lander. | §4.1 "3 header/footer sources"; `[main] ChromeGate HIDDEN_EXACT = ["/", "/creators"]` (`01-repo-architecture.md:10`) |

**Baseline Lighthouse** (`baseline/lighthouse/`, production): home mobile **P89 / A96 / BP100 / SEO100, LCP 3.7 s**; `/ai-receptionist` mobile **P82, LCP 4.1 s**. The lander being 7 points slower with a 0.4 s worse LCP is consistent with §3.2's measurement that T2 routes ship ~120–170 KB of extra framer/Magnetic/Reveal JS that the server-rendered tools shell does not.

---

## 6. Asset audit

**`public/` — 7 files total** (`find public -type f`):

| File | Bytes | Note |
|---|---|---|
| `form-templates/imm-5645.pdf` | **1,495,618** | >200 KB — used by the never-shipped form-filler; not referenced by a live route |
| `v2/index.html` | **624,485** | >200 KB — static `/v2` showpiece |
| `demo/receptionist-call.mp3` | 158,732 | |
| `founder.jpg` | 43,949 | 560×560 JPEG, **untracked**, **referenced by no TS/TSX file** |
| `logo.png` | 14,458 | 512×512 RGB PNG — favicon fallback + `apple` icon (`app/layout.tsx:97-103`) + JSON-LD `logo` (`lib/seo.ts:38-39`) |
| `logo-mark.svg` | 961 | primary icon |
| `ac88d15…txt` | 33 | verification file |

**OG image:** `lib/seo.ts:20-25` `DEFAULT_OG_IMAGE.url = ${site.url}/opengraph-image.png`; the file is the app-router convention `app/opengraph-image.png` — **exists, 1200×630, 35,055 B**, with `app/twitter-image.png` (identical size) and both `.alt.txt` files. Memory records this was preview-verified 2026-08-12; not re-verified here.

**Favicon / manifest:** `icons` declared in `app/layout.tsx:97-103` (`/logo-mark.svg`, `/logo.png`, apple → 512 px `logo.png`). **No `favicon.ico`** in `app/` or `public/` (legacy `/favicon.ico` requests 404), **no `manifest.webmanifest`/`app/manifest.ts`**, **no `theme-color`**, no `app/icon.tsx`, no 180×180 apple-touch-icon (512 px PNG is scaled). `components/Logo.tsx:18-34` hard-codes **three reds** in the mark itself (`#FF6961`, `#E0362C`, `#FF453A`) plus `#1D1D1F`/`#FBFBFD`; the `logo-mark.svg` in `public/` is a separate hand-maintained copy.

**Owner assets not in the build:** `logos/1-4.png` — 1232×928 RGB PNGs, 916 KB–1.1 MB each, untracked, **referenced by no code path**. Root-level screenshots (`*.jpeg/*.png`, 57 files, largest `hero-390.jpeg` 577 KB, `tools-hub-desktop.png` 490 KB) are untracked working files, not served.

**`next/image`:** zero imports. The 5 `<img>` sites are `ProductCard.tsx:37`, `app/cart/page.tsx:44`, `MoltenForge.tsx` [main], `HandVisual.tsx` (dead), `ForgeExperience.tsx` (retired route).

---

## 7. Refined design-system contract (what implementers code from)

### 7.0 Art direction — the contract's cover sheet

> Format per `premium-ui`. **Not reviewed by Fable** (rate-limited — see header). Sections 7.1–7.6 are the mechanical contract; this is the intent they serve.

**Direction name: SHOP DRAWING.**

**World (one sentence):** *A Surrey fabricator's shop drawing pinned flat on a white bench — everything measured, annotated in the margin, dimensioned in mono, and carrying exactly one red mark that says where the work happens.*

Why this and not something invented: a shop drawing is the precise, dimensioned, annotated sheet a fabricator builds *from*. It is literally "handbuilt + practical + technically excellent", it is trades-native rather than SaaS-native, and it is **continuous with work the owner has already approved** — the dimension-callout labels that replaced the borrowed eyebrow (`components/marketing/primitives.tsx`, `.v-label`). It also does real structural work: it gives the empty 1440 px margins that §5 flags as wasted whitespace an actual job (the annotation column), rather than just tightening padding.

**Type pairing — and an honest correction.** The earlier draft of §7.2 set the display face in **Inter 600**, which directly violates the `no-Inter-as-display` anti-tell it claimed to honour. Inter-at-52px-with-tight-tracking is the single most recognisable AI-startup signature; keeping it would have failed the brief. Corrected pairing:

| Role | Face | Weights | Tracking | Rationale |
|---|---|---|---|---|
| **Display** (H1/H2, the payoff line) | **Archivo** (variable, Google Fonts / `next/font`) | 600 · 700 | −0.02em ≥32 px, 0 below | A grotesque with squarer terminals, a larger x-height and genuine signage/industrial character — the register of a stencilled shop label. Different *skeleton* from Inter, not just a different weight. **Already proven in this repo**: `origin/main:app/layout.tsx:13-38` loads Archivo 500/600/700/800 today. |
| **Text** (lead, body, small, micro) | **Inter** (variable) | 400 · 500 · 600 | 0 | Stays the workhorse. Neutral is correct for body; the character belongs in the display and the annotations. |
| **Annotation / numerals** | **JetBrains Mono** | 500 | +0.09em on caps labels | The dimension callouts, prices, times, ring counters, tabular figures. This is where "technical" lives. |

**Cost, stated honestly:** the working tree is currently Inter + JetBrains Mono (2 families, `app/layout.tsx:2,27-33`). Adding Archivo makes it 3 — one extra variable woff2, subset to latin. That is the price of clearing the Inter-as-display tell. It is still a **net −2 families against production**, which ships five (Inter, Archivo, IBM Plex Mono, Quicksand, JetBrains Mono ≈ 15 files, §1.2).

**Colour direction — two corrections to the earlier draft.**

1. **The neutrals must be warm, and were not.** `#F6F6F6 / #3A3A3D / #686868 / #8A8A8F` are cool, blue-leaning greys — the stock-Tailwind-gray tell the brief forbids, sitting under a warm coral accent. Warmed in §7.1 (R > G > B by 3–6 points) so the sheet reads as paper under shop light, not as a screenshot of a dashboard. Every warmed value re-passes its contrast tier (maths in §7.1).
2. **Coral confined to "marks ≤20 px" was too timid.** `home__1440.png` shows the coral `— handled.` display line doing more brand work than the rest of the page combined; the red **is** the identity. Corrected policy: coral is allowed **big** — as display type ≥32 px, and as a solid primary-CTA fill — with the contrast maths made to work by splitting one token into three (`--accent` / `--accent-fill` / `--accent-text`, §7.1). What stays banned is coral as *small* text and coral as a *gradient*.

**Layout stance:** left-aligned, margin-annotated, asymmetric. The drawing has a rail, not a centre line. This is the direct answer to the `ai-receptionist__1440.png` finding that the entire lander is a centred column with two empty margins.

---

#### Signature moment 1 — "The Margin Callout"

**What:** every section heading is annotated the way a drawing is. A 1 px hairline runs from the left rail to the heading and terminates in a 6 px coral square; above it, an 11 px JetBrains Mono caps label carries the sheet metadata — `01 — INTAKE`, `02 — BOOKING`, `SURREY / DELTA, BC`, `REV. 03`. At ≥1024 px the label sits **in the left margin**, outside the text column.

**Where:** every section heading site-wide — `SectionHeading` in `components/marketing/primitives.tsx`, therefore inherited by the single `PageShell` of §7.6.

**Why only this business can own it:** it is the native grammar of fabrication drawings, it makes the "handbuilt / technically excellent" claim structurally instead of saying it in a headline, and it converts the audit's single biggest whitespace defect (the dead 1440 px gutters) into the design's most distinctive feature. A generic SaaS page cannot adopt it without looking borrowed.

**Build:** pure CSS, zero JS. `display:grid; grid-template-columns:[rail] 140px [col] minmax(0,680px) [rest] 1fr` at ≥1024, collapsing to one column below. Label is a `<span>` in the rail cell; rule is a `::before` with `border-top:1px solid var(--hairline)`; tick is a `::after` 6 px `background:var(--accent)`. Below 1024 the label moves inline above the heading.

**Reduced motion:** nothing to degrade — it is static by construction. That is a feature: the site's signature does not depend on animation, which is exactly why it survives `prefers-reduced-motion`, slow networks, and first paint.

#### Signature moment 2 — "Ring-Out Ledger"

**What:** the missed call rendered as a ledger entry. Four 2 px coral bars pulse in the North-American ring cadence (2 s on / 4 s off) beside a mono readout — `RING 04 · 21:58 TUE`. On the fifth unanswered ring the readout strikes through to `MISSED` in `--danger` and one ledger row drops in beneath it: `21:58  Tue · no answer · est. $340`. Rows stack to four, then the sheet clears and it starts again — the money visibly leaving, in the buyer's own units.

**Where:** the hero's right-hand figure on `/` (replacing the orbiting iOS notification badges of `home__1440.png`), reused at reduced size inside `LiveCalcStrip` so the calculator's number has a picture attached.

**Why only this business can own it:** it is the buyer's literal lived experience — the phone ringing on a roof at 21:58 on a Tuesday — expressed in the two vocabularies this company already owns: the call timeline and the revenue calculator. It is not decoration; it is the product's argument. Every generic alternative (a chat bubble, a dashboard chart, an orbiting phone) is interchangeable between vendors. This one is not.

**Build:** ~20 lines of JS and no library. Bars are four `<i>` elements with one `@keyframes ringBar` on `transform:scaleY()`, staggered via `animation-delay`. **All four ledger rows are server-rendered in the HTML** — never `opacity:0` at first paint — and are progressively marked `[data-shown]` by a single `setInterval`. If JS never runs, the reader sees the complete, correct ledger.

**Reduced motion:** bars freeze at mid-height, the readout renders its final `MISSED` state, and all four rows show at once. Identical information, zero motion — enforced in CSS (`@media (prefers-reduced-motion: reduce)`), not in JS, so it holds even before hydration.

---

#### Anti-AI-tell compliance

| Tell | How this contract honours it |
|---|---|
| No violet/indigo gradient | Palette has no violet or indigo at all; §7.1 **deletes** the legacy `violet.glow` / `cyan.glow` / `electric` aliases (`tailwind.config.ts:45-48`) |
| No Inter-as-display | **Corrected in this pass** — display is Archivo 600/700; Inter is demoted to text only |
| Not everything centered | Left rail + margin annotation is the core layout; centred heroes on T2/T4/T5 are explicitly retired (§5.1, `ai-receptionist__1440.png`) |
| No three-equal-cards row | Card rows are 2-up or 4-up; where three items are unavoidable the grid is asymmetric (lead card spans wider). Kills the `grid-cols-3` comparison at `LandingTemplate.tsx:192-212`, which is also the P1 mobile-overflow defect |
| No emoji icons | Icons are the existing `PegIcon` line set, one coral peg each; no emoji in any primitive |
| No uniform radius | Deliberately tiered: controls/badges **4**, cards **12**, phone mock **44**, ledger rows **2**. Replaces the 25 distinct radius classes found in §1.4 |
| No gradient text | `.text-gradient-brand` is deleted (already a no-op resolving to `text-ink`, `globals.css:275-282`, yet still applied 10× in 9 files); the `#FF6961→#E0362C` CTA gradient on `[main]` goes with it |
| No glassmorphism beyond one layer | `glass-card` (14 files) is retired entirely; edges become 1 px spread shadows. Zero blur layers, which is one fewer than the budget |
| No blob decoration | `GlowBackground.tsx` (the red radial wash still on 13 pages) and `.site-glow` are deleted |
| Warm-tinted neutrals | §7.1 neutrals are warmed off pure grey and off Tailwind's cool `gray` ramp |
| No neon-purple AI-startup look | Two-colour system — warm ink on warm paper, one coral. No neon, no glow shadows, no dark-mode-by-default |

---

### 7.1 Colour tokens — one name per colour, exposed as **both** CSS vars and Tailwind utilities

Neutrals warmed per §7.0 (R > G > B). Ratios are recomputed sRGB relative luminance, not carried over.

| Token | Hex | Contrast | Role / rule |
|---|---|---|---|
| `--surface` | `#FFFFFF` | — | cards, panels, nav. Pure white = the drawing sheet |
| `--field` | `#F7F5F4` | — | page canvas (alternating sections). Warmed from `#F6F6F6` |
| `--recess` | `#FAF8F7` | — | strips cards sit on; the bench under the sheet |
| `--ink` | `#1C1A19` | **17.34:1** on white | all substantive text, primary dark bands. Warmed from the blue-leaning `#1D1D1F` |
| `--ink-2` | `#3B3735` | **11.77:1** on white | body copy and leads. Warmed from `#3A3A3D` |
| `--muted` | `#6B6663` | **5.67:1** white · **5.21:1** on field | secondary text, **≥12 px only**. Never for lead paragraphs |
| `--mark` | `#8C8783` | **3.55:1** | non-text only — rules, inactive dots, icon strokes. Forbidden for text at any size |
| `--hairline` / `--hairline-strong` | `rgba(28,26,25,.08)` / `.14` | — | every edge is a 1 px spread shadow, never a `border` |
| `--accent` | `#E0362C` | 4.44:1 on white | the coral. Marks, hover states, and **display type ≥32 px** (large-text AA needs 3:1). The one red mark per section |
| `--accent-fill` | `#D22E24` | **5.05:1** with white text | solid primary-CTA fill. Passes AA for a white label at *any* size — this is what lets the brand keep a big red button honestly |
| `--accent-text` | `#B8221A` | **6.40:1** on white | coral as *small* text — prices, inline emphasis, eyebrow ticks |
| `--accent-on-dark` | `#FF7A70` | 6.63:1 on ink | coral text on ink bands |
| `--accent-wash` | `#FFE9E7` | — | badge/pill fill behind `--accent-text` |
| `--on-dark` / `--on-dark-muted` | `#F4F4F6` / `#A1A1A6` | 15.32 / 6.54 on ink | text on ink bands |
| `--success` / `--danger` | `#2F6B4F` / `#B42318` | 6.29 / 6.30 | state only. `--danger` is the `MISSED` strike in signature moment 2 |

**The accent split is the load-bearing change.** One `#E0362C` could not serve both a big button and small text: white on `#E0362C` is **4.44:1** (fails AA for a normal-weight label), and `#E0362C` as text on white is the same 4.44:1 (fails for anything under 24 px). Splitting it into `--accent-fill` for solid fills, `--accent-text` for small text, and `--accent` for marks and display type lets the coral be **more** prominent than the previous draft allowed while every combination passes AA.

**Delete:** `amber.*` (byte-identical duplicate of `clay`, `tailwind.config.ts:33-37`), `obsidian.*`, `electric`, `violet.glow`, `cyan.glow`, `gold.soft` (`:44-48`), `--red-grad` (already marked RETIRED, `globals.css:24-27`). **Rename:** the `--v-*` and `--cr-*` prefixes to the names above; `/creators` becomes `[data-theme="studio"]` overriding `--surface/--field/--recess/--ink/--ink-2/--muted/--on-dark` on the *same* token names, which also lets it drop its private header/footer (`CreatorStudio.tsx:127-158,400-420`) and the `ChromeGate` exception (`ChromeGate.tsx:16`). `components/Logo.tsx:18-34` currently hard-codes **three** reds (`#FF6961`, `#E0362C`, `#FF453A`) — the mark must resolve to `--ink`, `--surface`, `--accent` only, and `public/logo-mark.svg` (a separate hand-maintained copy) must be regenerated from the same source.

### 7.2 Type — Archivo (display) + Inter (text) + JetBrains Mono (annotation), one scale, named

| Name | Size | LH | Weight | Tracking | Colour |
|---|---|---|---|---|---|
| `display` (H1) | `clamp(34px, 5vw, 52px)` | 1.08 | **Archivo 700** | −0.02em | ink; the payoff clause may take `--accent` |
| `h2` | `clamp(28px, 4vw, 44px)` | 1.1 | **Archivo 600** | −0.02em | ink |
| `h3` | `clamp(20px, 2.4vw, 24px)` | 1.2 | **Archivo 600** | −0.01em | ink |
| `lead` | 18px | 1.5 | 400 | 0 | **ink-2** (not muted) |
| `body` | 17px | 1.55 | 400 | 0 | ink-2 |
| `small` | 15px | 1.5 | 400 | 0 | muted or ink-2 |
| `micro` | 12px | 1.3 | 500 | 0 | muted (floor: nothing below 12 px) |
| `label` | 11px caps | 1.2 | JetBrains Mono 500 | +0.09em | muted, with `--accent` tick — **the Margin Callout** (signature moment 1) |
| `mono-num` | inherit | 1 | 500 | −0.02em | tabular, JetBrains Mono — prices, times, counters only |

Rules: **no `font-light` anywhere on marketing surfaces**; no `text-ink/NN` alpha classes (delete them by lint rule); no raw `text-[Npx]` outside this table; negative tracking only ≥ 24 px.

### 7.3 Spacing rhythm (8 px grid)

- Section: `48 / 72 / 96` (mobile / ≥768 / ≥1024) — **not 120**; when a section ends in a `Recess` card row, the next section drops its top padding to 48.
- Hero: top `24 / 40 / 56` below the 72 px header (kills `pt-32`).
- Container: `1280` max, gutters `20 / 32 / 40`; headline measure `680`; long-form measure `720` (replaces `max-w-3xl` + `max-w-7xl` + `1180` + `1344`).
- Stack gaps inside cards: 12 / 16 / 24; card padding 24 (≥768: 28).

### 7.4 Primitives

- **Button:** 48 px, radius 4, 15 px/500. `primary` = **`--accent-fill` #D22E24 with a white label (5.05:1)** — the brand keeps its big red button, and it passes AA at any label size; hover `--accent` `#E0362C`. **One primary per view.** `dark` = ink fill (the old primary, for ink bands), `secondary` = surface + hairline ring, `ghost` = text, `invert` = on dark. **No gradient fill and no red glow shadow** — both are `[main]` tells visible in `baseline/screenshots/home__1440.png`. Focus: `0 0 0 2px surface, 0 0 0 4px accent`. Min touch 44 px everywhere including the nav CTA and footer icons. No magnetic/cursor-follow behaviour.
- **Card:** `card` = surface + `--shadow-card` + radius 12; `card-flat` = transparent on recess; hover = `--shadow-lift` + `translateY(-2px)` 200 ms. One card. No `glass-card`, no `border-glow`, no red-tinted glow shadows.
- **Input:** 48 px, radius 4, hairline ring, focus ring accent, placeholder `muted` (5.6:1), error `danger` + inline message; slider 44 px hit area (keep `.v-range`).
- **Badge/pill:** radius 4 (not 999), 12 px/500, `accent-wash` + `accent-text`, or `recess` + ink-2.
- **Eyebrow:** the dimension callout (`.v-label` semantics) — the **only** eyebrow, replacing all four current variants (`.eyebrow` pill 16 files / `.v-label` 3 / tools mono / creators mono).
- **Section heading:** the **Margin Callout** (signature moment 1) — mono label in the left rail at ≥1024, hairline rule, coral tick → h2 → optional lead, at a 680 measure. **Left-aligned, never centred**; centred section headings are the `[main]`/T2 pattern being retired. Server component, no JS.
- **FAQ:** native `<details>/<summary>` (as `ToolShell.tsx:139-146`), 44 px summary, no JS.
- **Phone/dashboard visuals:** `WindowChrome` + `CallTimeline`-style figures with the "example, not a customer result" caption — keep as the product-visual language. The hero figure becomes the **Ring-Out Ledger** (signature moment 2); the iOS orbit/parallax and the orbiting notification badges of `home__1440.png` are retired.

### 7.5 Motion policy

- Durations: micro 120 ms, standard 200 ms, reveal **≤ 300 ms** (`--dur-slow: 280ms`), ease `cubic-bezier(.22,1,.36,1)`.
- **First paint is never opacity-0.** Reveal is *opt-in enhancement*: SSR HTML renders visible; the class that hides is added only after hydration confirms IO support and only for elements **below** the fold at hydration time (`rect.top > innerHeight`). Above-the-fold content never animates in.
- `prefers-reduced-motion: reduce` → **no motion at all** (no reveal, no pulses, no hover lift, `scroll-behavior:auto`), enforced in CSS **and** via `MotionConfig reducedMotion="user"` for any remaining framer usage.
- No infinite decorative animations on marketing pages except the 7 px live dot (1.6 s) and the **Ring-Out Ledger** bars (2 s on / 4 s off, the real ring cadence), both with static reduced-motion fallbacks (the existing pattern at `globals.css:653-685` is already correct and is the model to copy). The Ledger's rows are server-rendered and complete with JS disabled.
- Interactive pages (`/demo`, tools) keep framer only where state transitions need it, always via `useReducedMotion`.

### 7.6 Single template structure

```
<Navbar/>                     global, sticky 72, CTA 44px
<main>
  <Hero variant="copy|copy+visual|copy+tool"/>   no reveal, clamp H1
  <Section*>                  eyebrow → h2 → lead → body slot (grid | prose | cards | steps | pricing | local | faq)
  <Related/>                  optional, card grid
  <FinalCta/>                 ink band, one primary + one text link
</main>
<Footer/>                     global (studio theme = same component under [data-theme])
```
One `PageShell` consumes `lib/data/landing.ts`, `freeTools.ts`, `packages.ts` and a small `hero` prop. Section components are the existing `marketing/*` ones after the fixes above; nothing else composes pages.

---

## Severity-ranked defect list

| # | Sev | Defect | Evidence |
|---|---|---|---|
| 1 | **P0** | **Above-the-fold content ships as `opacity:0`** on ≈210 routes (framer `Reveal` around H1/lead/CTA) and on HEAD homepage sections 2–11 (`.v-reveal{opacity:0}` + `shown=false` when IO exists); no reduced-motion handling in the framer path | `components/Reveal.tsx:6-30`; `LandingTemplate.tsx:55-95`; `marketing/Reveal.tsx:30`; `globals.css:718-723` |
| 2 | **P0** | **Production runs a homepage the working tree has replaced** (confirmed via `baseline/screenshots/home__1440.png`) — 37 commits apart, 37 commits apart; main's page is an untokenised 910-line file with 235 inline styles, 5 font families and a 460 vh scroll-jack | `origin/main:app/page.tsx:2`; `MoltenForge.tsx:22-23,588,660-661`; `origin/main:app/layout.tsx:2-38` |
| 3 | **P1** | Washed-out grey: `text-ink/40` (2.46:1) ×44, `/45` ×7, `/50` ×7, `/55` (3.79:1) ×22, `/60` (4.47:1) ×35, `muted-light` (2.57:1) as text ×6, `font-light` ×299. **All counts re-verified this pass.** | §2.2 table |
| 3b | **P0** | Two contrast failures so severe the text is effectively invisible, both on conversion-critical feedback: `/create` error text **1.66:1** (`#fca5a5` on `#fdecec`) and `/start` success note **1.68:1** (`#c7c7cc` on white, 12 px). Both independently recomputed and confirmed this pass. Fixed by the `--danger` / `--ink-2` tokens in §7.1 | `04-ux-cro-a11y.md:108,130` |
| 4 | **P1** | Three colour vocabularies + dark skin (Tailwind / `--*` / `--v-*` / `--cr-*`), 7 greys, 4 reds, `amber`==`clay`, 98 arbitrary colour classes, 521 raw hex in TSX | §1.1, §1.5 |
| 5 | **P1** | Ten page shells, 2 Reveals, 2 SectionHeadings, 4 eyebrows, 4 cards, 3 FAQs, 3 header/footer sources, 7 containers, 3 type scales | §4.1 |
| 6 | **P1** | Comparison "table" is a 3-col grid with no mobile fallback and no scroll container | `LandingTemplate.tsx:192-212` |
| 7 | **P1** | `pt-32` hero padding ×25 pages + 120 px `.v-section` stacking + `max-w-3xl` columns on 1440 = the whitespace complaint | §5 rows 2,4,5 |
| 8 | **P2** | Motion durations > 300 ms in 10/16 framer transitions and the 420 ms reveal; `MagneticButton` cursor-follow ×43 | §3.1 |
| 9 | **P2** | Touch targets < 44 px: nav CTA 40, footer icons 36, footer links ≈24, legal links, breadcrumbs | `Navbar.tsx:98`, `Footer.tsx:174-179,201,215`, `LandingTemplate.tsx:56-63` |
| 10 | **P2** | Old-template H1 `text-4xl sm:text-6xl` no clamp; sub-12 px text in creators (`text-[10px]`) and eyebrow pill at 11 px `#6E6E73` on `paper-2` (4.66:1) | `app/shop/page.tsx:33`; `CreatorStudio.tsx:419`; `globals.css:286-289` |
| 11 | **P2** | Old-template routes carry ~120–170 KB raw extra JS (framer/Magnetic/Reveal) vs 0 KB for the server-rendered tools shell; `SessionProvider` on every page | build manifest §3.2; `components/Providers.tsx:3-6` |
| 12 | **P2** | No `next/image`; `<img>` without dimensions on shop/cart; no `favicon.ico`, no manifest, no `theme-color`, 512 px apple icon; logo mark hard-codes 3 reds | §6 |
| 13 | **P3** | Dead weight in the build: `components/home/*` (8 files incl. 910-line MoltenForge), `/ai-front-desk` + `/forge` with three.js (882 KB raw lazy chunks), 11 unused keyframes, `.text-gradient-brand`, `.site-glow`, `GlowBackground` on 13 pages, `imm-5645.pdf` 1.4 MB and `v2/index.html` 624 KB in `public/` | §1.5, §3.2, §6 |
| 14 | **P3** | Stale comments/tokens: "Quicksand tops out at 700" (`tailwind.config.ts:57`), `height.btn 56` vs real 48, `--red-grad`, `.spec-frame` | §1.4 |
| 15 | **P1** | **[main, live] Mobile header does not collapse** — at 390 px the logo, the 3 nav links and the CTA stack on three rows and consume ≈135 px before any content; the hero eyebrow wraps to a dangling `DELTA, BC` | `baseline/screenshots/home__390.png` |
| 16 | **P2** | No skip link — `<main>` has no `id`, so keyboard users tab the full nav on every one of ~235 routes | `04-ux-cro-a11y.md:212` |

---

## Proposed implementation plan (file ownership)

| Phase | Work | Files (owner = the implementer who touches them) | Gate |
|---|---|---|---|
| **0 — land the homepage** | Production still serves Molten Forge (proven, header note). Ship the working-tree homepage and delete `components/home/*` in the same PR so only one homepage exists | `app/page.tsx`, `components/home/**`, `components/ChromeGate.tsx` | owner call + `git diff origin/main..HEAD --stat` reviewed |
| **1 — first-paint & motion** (smallest, highest value) | (a) Rewrite `components/marketing/Reveal.tsx`: SSR visible, hide-then-reveal only below fold post-hydration, 280 ms; (b) delete `components/Reveal.tsx` and `MagneticButton.tsx`, re-export the marketing Reveal from `components/Reveal.tsx` so 23 importers keep compiling; (c) drop unused keyframes; (d) add `MotionConfig reducedMotion="user"` in `components/Providers.tsx` for the remaining framer users (`Showroom`, `SolutionFinder`, `BuildRequestForm`, `OccupationIntake`, `tools/ui`) | `components/marketing/Reveal.tsx`, `components/Reveal.tsx`, `components/MagneticButton.tsx`, `components/Providers.tsx`, `tailwind.config.ts:92-145`, `app/globals.css:718-737` | HTML of `/`, `/pricing`, `/ai-receptionist` contains no `opacity:0` on H1/lead/CTA; reduced-motion snapshot identical to final state |
| **2 — tokens** | Collapse to §7.1 names in `globals.css :root` + `tailwind.config.ts` (`theme.colors` referencing the vars); delete `amber/obsidian/electric/violet/cyan/gold/--red-grad`; add `text-ink-2`, `text-muted`, `text-accent-text` utilities; codemod `text-ink/NN` → `text-ink-2` (≥/70) or `text-muted` (<70); replace `text-muted-light` text with `text-muted`; remove `font-light` on marketing/pricing surfaces; single type scale per §7.2; spacing per §7.3 (`pt-32` → hero token; `.v-section` 48/72/96) | `app/globals.css`, `tailwind.config.ts`, `components/Logo.tsx`, `public/logo-mark.svg`, then every file in the §2.2 table (`LandingTemplate`, `LandingHub`, `DemoPageTemplate`, `SectionHeading`, `ServicePackages`, `FAQSection`, `app/{pricing,about,faq,shop,solutions,use-cases,create}`) | grep gate: `text-ink/` = 0, `font-light` = 0 outside `/agent`, `*-[#` = 0 outside creators, hex-in-TSX ≤ 20 |
| **2b — art direction** | Load **Archivo** (variable, latin subset) in `app/layout.tsx` next to Inter and bind it to `--font-display`; point `display/h2/h3` at it (§7.2); warm the neutrals to the §7.1 hexes; split the accent into `--accent` / `--accent-fill` / `--accent-text`; build the **Margin Callout** into `SectionHeading` (CSS grid rail, no JS); build the **Ring-Out Ledger** as a self-contained component with all rows server-rendered | `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`, `components/marketing/primitives.tsx`, `components/marketing/RingOutLedger.tsx` (new), `components/marketing/Hero.tsx`, `LiveCalcStrip.tsx` | Archivo renders on H1/H2 at every breakpoint; contrast spot-check of the 6 warmed tokens matches §7.1; Ring-Out Ledger shows all 4 rows with JS disabled **and** under `prefers-reduced-motion` |
| **3 — one PageShell** | Build `components/PageShell.tsx` from `LandingTemplate` + `LandingHub` + `DemoPageTemplate` + `ToolShell` structure using `marketing/primitives` + `HomeSections` pieces (extract `PricingSection` → `components/sections/Pricing.tsx`, `FaqSection` → `<details>` version, `FinalCta`, `Related`); fix comparison as a stacked list < 768 with `overflow-x-auto` table ≥ 768; migrate T2/T3/T4/T5 pages onto it; retire `GlowBackground`, `components/SectionHeading.tsx`, `FAQSection.tsx`, `ServicePackages.tsx`, `WhyAIShop.tsx`, `HowItWorks.tsx` | `components/PageShell.tsx` (new), `components/sections/*` (new), `components/LandingTemplate.tsx`, `components/LandingHub.tsx`, `components/DemoPageTemplate.tsx`, `app/{pricing,about,faq,shop,solutions,use-cases,create,privacy,terms}/page.tsx`, `lib/data/landing.ts` (hero variant field) | route count unchanged (`scripts/seo-diff.js` gate stays green); every page has exactly one H1 and the same header/footer |
| **4 — chrome & touch** | Nav CTA `h-11`; footer icon links `h-11 w-11`; footer links `py-2`; legal links 13 px + padding; breadcrumb links padded; mobile sheet `max-h-[calc(100dvh-72px)] overflow-y-auto`; `ToolShell` aside `top-[calc(72px+24px)]`; creators hub → `[data-theme="studio"]` on the global `Navbar`/`Footer`, remove its private header/footer and `--cr-*` | `components/Navbar.tsx`, `components/Footer.tsx`, `components/tools/ToolShell.tsx`, `components/creators/CreatorStudio.tsx`, `components/ChromeGate.tsx`, `app/globals.css:750-870` | every tappable ≥ 44 px at 320/390 (measured after Phase 3 in the browser — not from source) |
| **5 — assets & meta** | `next/image` for `ProductCard`/`cart` with explicit sizes; add `app/icon.tsx` (or `favicon.ico` + 180 px `apple-icon.png`), `app/manifest.ts`, `themeColor`; move `imm-5645.pdf` and `v2/index.html` out of `public/` or behind their retired routes; decide `founder.jpg`/`logos/*` (unreferenced) | `components/ProductCard.tsx`, `app/cart/page.tsx`, `app/layout.tsx`, `app/icon.tsx`, `app/manifest.ts`, `public/` | Lighthouse CLS < 0.1 on `/shop`; no 404 on `/favicon.ico` |
| **6 — retire dead routes** | Remove `/ai-front-desk`, `/forge` page files, `components/experience/**`, `components/forge/**`, three/@react-three deps (after confirming the 308 redirects in `next.config`) | `app/ai-front-desk/`, `app/forge/`, `components/experience/`, `components/forge/`, `package.json`, `components/ChromeGate.tsx` | build drops the 684 KB + 198 KB chunks; redirects still 308 |

Verification that **cannot** be done from source and is explicitly left for the browser pass: actual first-paint timing, real tap-target boxes, 1024 px nav fit, CLS numbers, and which homepage is live in production.

---

## Summary (≤300 words)

**Corrections this pass.** The tree audited is unchanged (`e732d98` and HEAD `e7cda0f` share tree `1c53107f`; 0 files differ), so every source finding stands. Three fixes: the branch label; the arbitrary-value count (**140 in 20 files**, not 98 in 16); and §7.2, which set the display face in **Inter** while claiming to honour a `no-Inter-as-display` rule.

**The open P0 is closed.** `baseline/screenshots/home__1440.png` proves production still serves the **Molten Forge** homepage — Quicksand, red-gradient CTA, pink wash, orbiting badges, a private 3-link nav. The working tree's homepage has never shipped. Because `LandingTemplate.tsx` is *identical* on both sides, the production lander shots are valid evidence for the ~200 working-tree routes built on it, confirming the whitespace diagnosis visually: a centred 720 px column on 1440 px, both margins empty.

**What actually causes the owner's complaints** is mechanical, not aesthetic: `components/Reveal.tsx:6-30` serialises `opacity:0` into the server HTML for the H1, lead and CTA of ~210 routes at 0.6 s with **no** reduced-motion path; and grey copy uses alpha classes — `text-ink/40` **2.46:1** ×44, `/55` **3.79:1** ×22, `/60` **4.47:1** ×35 — over 299 `font-light` instances. Two sibling failures are worse: `/create` error text **1.66:1**, `/start` success note **1.68:1**, both recomputed and confirmed here.

**The direction is SHOP DRAWING** — a fabricator's dimensioned sheet: Archivo display over Inter text with JetBrains Mono annotation, warmed neutrals, and coral *promoted* rather than confined (split into `--accent` / `--accent-fill` / `--accent-text` so a big red button and small red text both pass AA). Two signature moments carry it: the **Margin Callout**, which turns the wasted 1440 px gutter into an annotation column, and the **Ring-Out Ledger**, which renders the missed call as money leaving. Both are CSS-first and fully legible with JS disabled.

**Not done:** the Fable consult failed on a rate limit (HTTP 429). §7.0 is unreviewed.

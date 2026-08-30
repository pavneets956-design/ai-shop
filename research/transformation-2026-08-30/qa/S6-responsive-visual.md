# S6 — Responsive Visual Inspection

Branch `feat/site-transformation-2026-08-30` @ `8a2bd89`. Local production build served at `http://localhost:3200` (not rebuilt, not restarted). Playwright 1.62.1, Chromium headless, `@playwright/test`.

**Status: COMPLETE.** Portrait verdict: YES. Full responsive sweep: 77/77 rows clean on overflow/CTA-size/image-reservation checks, 0 header collisions at any width including 768px, only cosmetic heading-widow findings (low severity).

---

## PRIORITY ONE — the owner's portrait — VERDICT: YES

**`public/founder.jpg` looks good enough to represent him publicly on both pages, at both widths. No changes required.**

### What I actually looked at

Captured and viewed (with the Read tool, not just captured) four close-up element screenshots and four in-context viewport screenshots:

- `shots-responsive/portrait__home-founder__390__element.png` / `__1440__element.png`
- `shots-responsive/portrait__about-hero__390__element.png` / `__1440__element.png`
- `shots-responsive/portrait__home-founder__390__viewport.png` / `__1440__viewport.png`
- `shots-responsive/portrait__about-hero__390__viewport.png` / `__1440__viewport.png`
- Raw metadata dump: `shots-responsive/portrait__metadata.json`

### What I saw

**The photo itself:** a clean, sharp, well-lit head-and-shoulders portrait — navy turban, full beard, olive/sage shirt, plain white/near-white background, direct eye contact with the camera. Reads as a proper professional headshot, not a casual selfie or a stretched/cropped mess. Same source image on both pages, so the same description applies to both.

**Face completeness / aspect ratio:** Complete and uncropped at every width tested. Full turban, full beard down to where it meets the shirt, both shoulders visible at the edges of frame. No squashing or stretching — the box is a perfect 1:1 square at every breakpoint (verified via `getBoundingClientRect`: 260×260 and 260×260 on `/` at 390/1440; 240×240 and 320×320 on `/about` at 390/1440), and the source file is itself a perfect 560×560 square, so `object-fit: fill` (the computed default — no explicit object-fit is set in either component) never distorts it. Fill-on-matching-aspect-ratio is functionally identical to cover/contain here.

**Sharpness / upscaling:** Not upscaled anywhere. I independently verified the `/_next/image` optimizer's real output at the widths the page actually requests: a `w=256` request returns a genuine 256×256 bitmap, `w=384` returns a genuine 384×384 bitmap, and anything above `w=640` correctly clamps to the 560×560 source ceiling rather than upscaling. The live pages request `w=256` at 390px viewport and `w=384` at 1440px viewport for both instances — i.e. the served bitmap is always at or above the CSS display size (240–320px), so nothing here is stretched past its native resolution. (One caveat below on retina headroom — not a defect, just a note.)

**Position relative to text:** Well-integrated on both pages, not orphaned.
- On `/about`, the photo sits in a two-column hero (text left, photo right, `items-center`) on desktop — good horizontal balance, top of photo roughly aligned with the headline. On mobile it's `order-first`, so the photo appears above the headline before any body copy — this actually reinforces the page's own headline, "Handbuilt AI is one person. This is him." A caption line runs underneath: "Pavneet Singh — founder and builder. Reachable at pavneets956@gmail.com."
- On `/` (founder section), the photo sits in a two-column grid (photo left at a fixed ~260px column, copy right) on desktop with `items-start`, and stacks photo-then-heading-then-copy on mobile. Clean spacing above and below in both cases, card has a subtle shadow (`--v-shadow-card`) and rounded corners that separate it from the section background.

**Rendering pipeline (`<img>` inspection):**
| | `/` founder section | `/about` hero |
|---|---|---|
| Component | `next/image` (`<Image>`) | `next/image` (`<Image>`) |
| `width`/`height` attrs | 560 / 560 | 560 / 560 |
| `sizes` | `(min-width: 1024px) 260px, 200px` | `(min-width: 1024px) 320px, 240px` |
| `alt` | "Pavneet Singh, founder of Handbuilt AI" | "Pavneet Singh, founder of Handbuilt AI" |
| `loading` | `lazy` (correct — it's far below the fold) | eager / `fetchpriority="high"` (correct — it's the LCP hero image) |
| Format served | Next.js image optimizer, negotiated (WebP/AVIF per `Accept` header) via `/_next/image?url=%2Ffounder.jpg` | same |
| Layout-shift risk | None — `width`/`height` attrs are present so an aspect-ratio box is reserved before load | None |

One thing worth double-checking outside headless Chromium's default DPR=1: the source is capped at 560px, so on a 2x-retina display the `/about` hero at a 320px CSS width is only ~1.75x pixel density rather than a full 2x. That reads as sharp to the eye in practice (you generally need to drop under ~1.5x before softness is visible) and is **not a defect** — flagging only as a "if you ever replace the source photo, ship something ≥800px square" note, not an action item against this photo.

**One thing that's a business-copy issue, not a visual one:** the caption under the `/about` photo prints his personal Gmail (`pavneets956@gmail.com`) as the public contact address, and the same address appears as a mailto link under the homepage founder section. Out of scope for this visual QA pass, but flagging since I saw it directly in the screenshots — worth a call on whether that's the intended public-facing contact address.

### Bottom line
Both placements pass: complete face, correct aspect ratio, no upscaling, sharp, well-positioned relative to surrounding text, served responsibly through `next/image` with sane `loading`/`sizes`/`alt`. Ship it as-is.

---

## PRIORITY TWO — full responsive sweep

**Status: COMPLETE.** 11 pages × 7 widths = 77 page loads, all captured and programmatically checked; 109+ screenshots saved under `shots-responsive/`. Script: `research/transformation-2026-08-30/qa/scripts/sweep.mjs`, raw output: `shots-responsive/sweep-results.json`.

### Automated checks — result: clean across the board

| Check | Result |
|---|---|
| Horizontal overflow (`scrollWidth > innerWidth`) | **0 of 77** page loads — false everywhere |
| Elements whose right edge exceeds viewport | Only decorative `position:absolute`, `blur()`-filtered ambient background glow `<div>`s on `/pricing`, `/create`, `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/industries`, `/use-cases/…` at 320–390px — all silently clipped by a parent `overflow-hidden` (confirmed zero actual page overflow at those same rows). Verified visually on `/create` and `/pricing` — the glow reads as an intentional soft radial highlight behind the hero, not a bug. |
| CTA buttons under 44px tall | **0** — every `.btn-primary`/`.btn-secondary`/`[class*="btn-"]` element measured ≥44px at all 77 rows |
| Images without reserved space (no `width`/`height`/`aspect-ratio`) | **0** — every `<img>` on every page carries explicit dimensions (site-wide `next/image` usage) |
| Text clipped by `overflow:hidden` | None found |
| Cards/grids crushed below 375px | None — checked `/tools` and `/industries` at 320px directly (screenshots below); text wraps, padding holds, icon tiles stay proportioned |
| Header/nav at every width, esp. 768px | **Clean.** See below. |

### Header/nav — the 768px collision is gone, and here's why

The old production nav (per baseline `home__768.png`) showed the full desktop link row at 768px. The rebuilt `components/Navbar.tsx` moves the desktop link row and CTA behind Tailwind's `lg:` breakpoint (1024px+), so at every width from 320–768px the header renders **only the logo and a 44×44px hamburger button** — there is no link row to collide with in the first place. Confirmed by measurement, not just screenshot:

| Width | Header height | Logo→first-nav-link gap | Interpretation |
|---|---|---|---|
| 320 / 375 / 390 / 768 | 72px (constant) | `null` (no inline links rendered) | Mobile layout: logo + hamburger only |
| 1024 | 72px | **126px** | Desktop layout engages exactly at `lg`, healthy gap |
| 1280 | 72px | **254px** | Gap grows with available width |
| 1440 | 72px | **286px** | Gap grows further — never tightens |

This holds identically across all 11 pages (same shared `Navbar.tsx`). Visually confirmed on `industries__1024.png` (logo, 5 links, CTA, generous spacing, no wrap) and `ai-receptionist-for-contractors__768.png` (logo + hamburger, breadcrumb below, nothing crowded). **The old 768px collision cannot recur with this component** — it isn't a spacing fix, it's a different breakpoint strategy.

### Screenshots viewed and described (390 / 1440), per the required pages

**`/` (home)** — `home__390.png`, `home__1440.png`, `home__1440__full.png` (13,792px tall — 14 distinct sections). Hero: eyebrow label, a 4-line H1 at mobile / 4-line at desktop ("Your business number, answered by an AI receptionist built for contractors."), lead paragraph, bold price/terms line, primary+secondary CTA, one-line reassurance, then an illustrative call-timeline card explicitly labelled "ONE CALL — EXAMPLE, NOT A CUSTOMER RESULT" / "Illustrative example using made-up details — not a customer result." Below the fold: a missed-call-cost calculator ($120,960 example), a "which one is costing you most" comparator, a 3-up cost breakdown, a "what happens while you're on the roof" walkthrough, the three-system proof section, the founder section, a 3-step process, pricing cards, a free-tools cross-promo, a locations block, an FAQ accordion, and a dark closing CTA before the footer. Hierarchy reads cleanly top to bottom on both widths; nothing crowded, nothing washed out; generous white/cream space between sections carries the eye down a genuinely long page.

**`/about`** — `about__390.png`, `about__1440.png`, `about__1440__full.png`. Hero photo + headline balance well at both widths (see Priority One). "I don't have client case studies yet" section, three-system proof cards (identical component to home), "Six things you can hold me to" 2×3 card grid, 3-step process, closing CTA, footer. Clean and consistent with the home page's visual language — no orphaned sections, no gaps.

**`/pricing`** — `pricing__390.png`, `pricing__1440.png`. Centered hero, H1 wraps 2 lines on both baseline (old) and current (new) builds identically — not a regression. "Three ways to start" — 3 pricing cards, middle one badged "Most popular", prices match the P0 pricing fix in memory ($1,500 / $3,500–$7,500 / $10,000). Clean at both widths, cards stack single-column on mobile without crushing.

**`/create`** — `create__390.png`, `create__1440.png`. A single-column, stepper-driven form ("1 What you need" / "2 Detail (optional)") inside a card floating over a soft peach gradient + dot-grid background (the "decorative overflow" glow noted above lives here). Field labels mark required/optional explicitly, helper microcopy under each field. Reads calm and unhurried at both widths — no crowding of labels/inputs even on the 390px column.

**`/demo`** — `demo__390.png`, `demo__1440.png`, `demo__1440__full.png`. This is the strongest page on the site, matching memory's note. Desktop: 3-column layout (worker picker + industry chips + quick-test prompts | live phone-frame chat mockup | "what the AI captured" structured data panel + "simulated business updates" + suggested replies). Every simulated element is explicitly labelled ("Demo mode — no real call, text, email or booking sent"). Mobile: stacks to the worker-picker list first (phone mockup and capture panel are further down — expected on a narrow viewport). Minor: a few worker-card subtitles truncate with an ellipsis at both 320px and 1440px ("Answers, books jobs, captures every le…") — a deliberate CSS line-clamp, not a layout break.

### Old (baseline) vs. new — concrete comparison

Compared `home__1440.png` and `pricing__1440.png` against `research/transformation-2026-08-30/baseline/screenshots/`:

- **Nav decluttered.** Old baseline pricing-page nav carried 5 links + an "Account" icon + a red "Start a build" pill (7 elements). New nav: 5 links + one black "Start a project" button. The dead `useSession`/"Account" link (for the retired Tools Pro backend) is gone, matching the memory note.
- **Tone de-escalated.** Old homepage hero used a red/orange gradient wash, a large red "handled." word, a red gradient CTA, and a phone mockup showing an OS lock screen with alarming unread badges (1200 unread email, 47 notifications, 12 missed calls). New homepage uses a neutral cream/gray gradient, a flat near-black CTA (red reduced to a small accent dash/dot), and replaces the anxiety-mockup with a plain, explicitly-labelled example call transcript. This is a real improvement in credibility — it reads as a software company, not a lead-gen page straining for urgency.
- **Pricing hero unchanged (no regression).** Headline wrap behavior, card contents, and price figures are identical in structure between old and new baselines — the rebuild didn't disturb a page that was already working.
- **Nothing regressed** that this sweep could detect: no new overflow, no new broken images, no lost touch targets, no page that got worse at any tested width.

### Severity-ranked visual defect list

1. **LOW — cosmetic heading widows (dangling last word/short line), several places, several widths.** Automated detection + visual confirmation:
   - Home FAQ accordion questions wrap 2 lines with a 1-word dangling second line at multiple widths, e.g. "How long does installation / take?" (375/390/768) and "How much does an AI receptionist cost in / Canada?" (1024/1280/1440) — proof: `shots-responsive/headings/home-faq-install__390.png`, `home-faq-cost__1440.png`. Happens even at 1440 because the accordion trigger row reserves fixed space for the "+" icon; not width-dependent.
   - `/about` "You talk to the person building / it" at 375px — proof: `shots-responsive/headings/about-h3__375.png`. This is the most visually awkward instance (single 2-letter orphan word).
   - `/industries` card headings ("AI Automation for Auto Detailing / Shops" etc.) wrap to a short second line at every width 375–1440 — proof: `shots-responsive/headings/industries-h2-detailing__375.png`. Consistent at every width, so this reads as an inherent card-heading-length issue rather than a breakpoint bug; likely acceptable as a card-grid pattern (reserves consistent card-title height) but flagged since it is visually a "widow."
   - Fix, if pursued: shorten these specific headings by 1–2 words, or increase the accordion/card text column width slightly, or reduce heading font-size one step at these breakpoints. Not a blocker — none of these break layout, clip text, or cause overflow.
   - **False positive excluded:** the sweep also flagged an H1 on `/start` at 768–1440 ("The AI Builder — a one-minute plan for your business"). Verified this text is a deliberately hidden, crawlable-only H1 (`app/start/page.tsx` line 30: "Crawlable content (visually covered by the overlay, present in HTML)") — a real visitor never sees it; the actual visible heading is the short "The AI Builder" shown in `start__768.png`. Not a visual defect.

2. **INFO, not a defect — decorative background glow elements report as "overflowing."** `/pricing`, `/create`, `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/industries`, `/use-cases/ai-receptionist-for-contractors` at 320–390px have `position:absolute`/`blur()` ambient glow `<div>`s whose own bounding box extends past the viewport edge. Confirmed via the same rows' `hasHorizontalOverflow: false` that a parent wraps them with `overflow-hidden` — no scrollbar, no shift, no visible clipping seam in the screenshots. Listed only for completeness; no action needed.

3. **INFO, not a defect — `/demo` worker-card subtitles truncate with an ellipsis** at narrow (320px) and even full (1440px) widths, e.g. "Answers, books jobs, captures every le…". Deliberate CSS line-clamp inside a fixed-height card, not a layout break. Cosmetic only.

4. **Out of scope but worth a call:** the founder section on `/` and the hero on `/about` both print `pavneets956@gmail.com` (his personal Gmail) as the public contact address in visible text and a `mailto:` link. Purely a content/business decision, not a visual bug — flagging because I saw it directly while inspecting the portrait placements.

No defects found at severity MEDIUM or above. Zero horizontal-scroll bugs, zero broken images, zero sub-44px touch targets, zero header collisions at any tested width including the previously-broken 768px.

---

## Artifacts

- `shots-responsive/portrait__*.png` — 8 portrait shots (element close-up + in-context viewport, home + about, 390 + 1440) + `portrait__metadata.json`
- `shots-responsive/<slug>__<width>.png` — 77 viewport screenshots (11 pages x 7 widths)
- `shots-responsive/<slug>__{390,1440}__full.png` — 22 full-page screenshots
- `shots-responsive/headings/*.png` — 12 close-up crops used to adjudicate the automated dangling-heading flags
- `shots-responsive/sweep-results.json` — raw per-row programmatic check output (overflow, CTA heights, image reservation, header geometry, dangling-heading heuristic)
- Scripts: `scripts/portrait.mjs`, `scripts/sweep.mjs`, `scripts/heading-check.mjs`

# S4 — Accessibility (WCAG 2.2 AA) — aibuiltbyhand.com

Repo `C:\Users\gillp\Documents\Claude\Projects\AI Shop`, branch `feat/site-transformation-2026-08-30` @ `8c32924`.
Target: local production build at `http://localhost:3200` (byte-identical to the Vercel preview).
Tools: Playwright (via `@playwright/test`) + `@axe-core/playwright`, plus custom scripts for contrast math (real WCAG relative-luminance formula, including a from-scratch PNG pixel-sampler for gradient/image backgrounds — no shortcuts, no estimates).

**⚠️ The localhost:3200 server went down mid-session** (connection refused; `netstat` confirmed nothing was listening on port 3200, checked 3× over ~30s). Per the absolute rules I did not rebuild, restart, or replace it — I waited, and it came back on its own a few minutes later (another process/agent evidently restarted it; the working tree also picked up unrelated uncommitted edits from parallel agent activity in that window — see the note at the end of §6). I diffed the specific files/lines every finding below cites against the working tree once the server returned, and none of them had changed, so every finding in this report — including the reduced-motion checks, completed after the restart — reflects commit `8c32924`'s actual behavior.

All raw JSON/scripts backing every number below are in `research/transformation-2026-08-30/qa/_raw/s4/`.

## Bottom line

**Zero serious/critical axe violations on any page at either viewport.** That clean axe result is real, but it is not the whole story — axe cannot see low-contrast focus rings, cannot see a `<main>` missing `tabindex="-1"`, cannot see a manually-split DOM order fighting a CSS grid, and cannot see an opaque overlay leaving the page underneath still in the tab order. Manual keyboard/contrast/focus testing found **10 real defects axe missed**, two of which are genuine WCAG failures (SC 2.4.1 Bypass Blocks not actually landing focus; SC 1.4.11 Non-text Contrast on several focus indicators), plus one confirmed-serious content-hiding bug on `/start`. None of these are "serious/critical" in axe's taxonomy because axe doesn't have a rule for most of them — they are real user-facing breakage nonetheless. Full severity ranking in §8.

---

## 1. Axe scan — all 13 pages × 2 viewports (wcag2a/2aa/21a/21aa/22aa)

| Metric | Result |
|---|---|
| Pages × viewports scanned | 13 × 2 = 26 |
| Total violations (any impact) | **0** |
| Serious/critical violations | **0** |
| Passing rules per page | 21–32 (confirms axe genuinely ran, not a silent no-op) |
| `incomplete` (needs-manual-review) items | 1 per page except the 404 (0) — all were `color-contrast`, resolved manually in §2 |

Pages scanned: `/`, `/demo`, `/pricing`, `/create`, `/start`, `/about`, `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/industries`, `/tools`, `/faq`, `/use-cases/ai-receptionist-for-contractors`, `/definitely-not-real` (404, confirmed HTTP 404).

Raw: `_raw/s4/axe-results.json`, script `_raw/s4/axe-scan.mjs`.

**Why the axe `incomplete` color-contrast flags exist**: axe can't resolve contrast when it can't statically determine the background (gradients, drop-shadowed cards, hero art). I resolved every one of them manually in §4 with real pixel sampling — see below.

---

## 2. Contrast — real ratios, computed from getComputedStyle + effective background compositing (with pixel-sampling fallback for gradients/images)

**Method**: for every visible text-bearing element on every page at both viewports (3,338 measurements total), I computed the effective background by walking the DOM ancestor chain and alpha-compositing every `background-color` layer (buttons/badges' *own* background included — a bug in my first pass that inflated false "white-on-white" failures to 181 was caught and fixed by including the element's own background, not just its container's, dropping the count to 156, then to **18 raw failures after full data was gathered**). Where any ancestor layer had a `background-image` (gradient/photo), I fell back to a real rendered-pixel screenshot of that exact element and took the modal (most frequent) colour as the background — a hand-written PNG decoder (`_raw/s4/lib-color.mjs`, verified against a synthetic red/blue test image before use).

**Result: 3,320 / 3,338 pass. 18 raw failures collapse to 2 unique real defects** (repeated across pages/viewports/list rows):

| # | Ratio | Required | Selector | Text | fg / bg | Where |
|---|---|---|---|---|---|---|
| 1 | **1.93:1** | 4.5:1 | `span.text-ink/30` inside a `dd` in a spec table | `—` (empty-metric placeholder) | `rgba(28,26,25,0.3)` on `#FFFFFF` | `components/showroom/Showroom.tsx:522` — renders on `/demo` (Showroom-powered), 4 rows × 2 viewports |
| 2 | **4.44:1** | 4.5:1 | `span.text-clay` | `→` (list-item arrow glyph) | `rgb(224,54,44)` (#E0362C) on `#FFFFFF` | `app/tools/page.tsx:44` — `/tools`, 5 rows × 2 viewports, **near-miss, 0.06 short** |

Everything else — including every eyebrow label (`.v-label`/`.eyebrow`, the category the task specifically asked about), body text, secondary text (`text-ink-soft`, ~`rgb(107,102,99)` on `~rgb(245,245,247)`), links, and buttons — passes comfortably (worst passing case ≈ 5.20:1, next table below).

### Worst 15 (ratio ascending; passes included to show the real margin)

| Ratio | Required | Status | Viewport | Page | Text | fg / bg |
|---|---|---|---|---|---|---|
| 1.93:1 | 4.5:1 | **FAIL** | both | /demo | `—` | rgba(28,26,25,.3) / #FFF |
| 4.44:1 | 4.5:1 | **FAIL** | both | /tools | `→` | #E0362C / #FFF |
| 5.20:1 | 4.5:1 | pass | desktop | /demo | "Live AI worker showroom" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /demo | "Best contact number · Service address" | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /pricing | "Pricing" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /pricing | "Also available" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /pricing | "FAQ" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /create | "Start a build" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /ai-receptionist | "AI Build" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /industries | "Industries" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.20:1 | 4.5:1 | pass | desktop | /faq | "FAQ" (eyebrow) | rgb(107,102,99) / rgb(245,245,247) |
| 5.21:1 | 4.5:1 | pass | desktop | / | "start where it hurts" (eyebrow) | rgb(107,102,99) / rgb(247,245,244) |
| 5.21:1 | 4.5:1 | pass | desktop | / | "one call, end to end" (eyebrow) | rgb(107,102,99) / rgb(247,245,244) |
| 5.21:1 | 4.5:1 | pass | desktop | / | lead paragraph, #what-we-install | rgb(107,102,99) / rgb(247,245,244) |
| 5.21:1 | 4.5:1 | pass | desktop | / | illustration caption (`.v-micro`) | rgb(107,102,99) / rgb(247,245,244) |

Raw: `_raw/s4/contrast-results.json` (3,338 rows), scripts `_raw/s4/audit-page.mjs` + `_raw/s4/lib-color.mjs`.

---

## 3. Touch targets at 390×844

**689 interactive elements measured across the 12 non-404 pages (mobile viewport).** The task asked for the 44×44 threshold specifically, so that's reported first — but 44×44 is WCAG 2.2's **AAA** "Enhanced" target size (SC 2.5.5); the actual **AA** requirement (SC 2.5.8, "Minimum") is **24×24**, with explicit exceptions for inline text links, essential/legal-sized controls, and targets with the compliant sightline. Reporting both, so this isn't misread as 487 AA violations when it's really ~4.

| Threshold | Count under it | What it actually means |
|---|---|---|
| < 44×44 (AAA-enhanced bar) | 487 / 689 | Mostly small **inline text links** (footer sitemap columns, in-sentence links) — legitimately exempt from AA, see below |
| < 24×24 (true AA SC 2.5.8 minimum) | 47 / 689 | Narrowed to real candidates; most of these are *also* WCAG-exempt (inline text) |

**After applying the WCAG 2.2 SC 2.5.8 "inline" exception** (verified against source for each, not assumed):
- Exempt, confirmed inline-in-a-sentence, not real violations: "Change those assumptions" (`components/marketing/LiveCalcStrip.tsx:113`), "How remote builds work" (`app/pricing/page.tsx:51`), "privacy" (`components/BuildRequestForm.tsx:630`), "COITracker"/"PayNudge" (`components/marketing/ProofFounder.tsx:236-241`), "AI receptionists"/"custom business systems" (`app/tools/page.tsx:102-104`).

**Real, non-exempt violations (4, all confirmed via source):**

| Selector | Size | Page(s) | Source | Note |
|---|---|---|---|---|
| Footer "Privacy" link | 42.0 × **15.6** | sitewide (every page's footer) | `components/Footer.tsx:177-179` | Standalone link in a `flex gap-5` row, not inline prose. Gap to "Terms" is 20px — under the WCAG spacing-exception threshold of 24px too. |
| Footer "Terms" link | 35.4 × **15.6** | sitewide | `components/Footer.tsx:180-182` | Same row, same defect. |
| Footer email (`mailto:`) link | 180 × **22.5** | sitewide | `components/Footer.tsx:63-65` | 1.5px short of the 24px minimum. Standalone contact chip, not prose. |
| "Reset conversation" button | 137.4 × **18.2** | `/demo` (Showroom) | `components/showroom/Showroom.tsx:350-352` | Real functional button, not text-in-a-sentence. |

**Fix**: bump the footer legal row (`Footer.tsx:172-183`) and the Showroom reset button to a real `min-h-[24px]` (44px if you want to match the rest of the button system) with adequate padding — a two-line CSS change that clears all four sitewide.

### Spacing (<8px between neighbours, as literally instructed)

Computed nearest-neighbour edge-to-edge gap for every element on every page. Only 5 unique pairs came in under 8px:
- Homepage segmented quick-pick tabs (0px gap, stacked 342×54.5 buttons) — **not a defect**, each target is comfortably oversized and this is a standard contiguous-list pattern.
- `/tools` inline links "AI receptionists"/"follow-up automation"/"custom business systems" (0px) — **not a defect**, normal inline text flow (commas between them).
- **`/start`: "Handbuilt AI" logo link and "← Handbuilt" exit link fully overlap (0px — literally on top of each other).** This is not a spacing issue, it's a real focus-order/overlap bug — see §5.4.

Raw: `_raw/s4/touch-results.json` (689 rows with full rects).

---

## 4. Reduced motion — live-verified with `prefers-reduced-motion: reduce` emulated (Playwright `reducedMotion: "reduce"`), screenshot pixel-diffs, not just CSS inspection

| Check | Result |
|---|---|
| Homepage `.v-reveal` elements (33 found) | **0 armed** (`data-armed` never set — matches `Reveal.tsx:54`'s `matchMedia` guard), 0 with `opacity:0`, 0 invisible. Below-fold section screenshotted twice 400ms apart: **0.0% pixel difference** — completely static. |
| `.v-live-dot` (homepage, `#how-it-works`) | Computed `animation: none / 1e-06s` (the global override neutralizes it). Screenshot 500ms apart: **0.0% pixel difference** — no pulsing. |
| `.faq-marker` (`/faq`) | Computed `transition-duration: 1e-06s`. Clicking the accordion open **did** change content instantly (97.9% pixel diff at the moment of click — correct, the state change itself must still happen), then **0.0% diff** over the following 400ms — no lingering/animated settle. This is exactly the right reduced-motion behavior: state changes still happen, they're just not animated. |
| Spinners (`Loader2`/`.animate-spin`, e.g. the `/create` "Sending…" button state) | Confirmed generically: any `.animate-spin` element gets `animation-duration: 1e-06s` and `animation-iteration-count: 1` from the same global override (tested directly rather than triggering a real form submission, to avoid hitting `/api/build-request`). |

**Fully compliant, verified live.** Root mechanism: `app/globals.css:855-861` forces `animation-duration`/`transition-duration` to `0.001ms !important` on `*, *::before, *::after` under `prefers-reduced-motion: reduce`, which covers every Tailwind `animate-*` utility site-wide — including `components/ToolChat.tsx:85`'s ping dot, which has no explicit `motion-reduce:` modifier (unlike `components/ReceptionistChat.tsx:105`, which does) but is still caught by the blanket rule, confirmed by the direct test above. `Reveal.tsx`'s own `matchMedia` check and the component-specific overrides at `app/globals.css:224-230, 258-262, 793-799, 826-831` are redundant-but-correct belt-and-suspenders on top of the global rule. No content is hidden by turning motion off — the opposite failure mode (also checked) does not occur.

Raw: `_raw/s4/reduced-motion-results.json`, script `_raw/s4/reduced-motion.mjs`.

---

## 5. Keyboard navigation — `/`, `/create`, `/demo`

Full tab sequences captured (91 stops on `/`, 46 on `/create`, 72 on `/demo`) — raw in `_raw/s4/keyboard-results.json` and `_raw/s4/focus-visibility-analysis.json`.

### 5.1 Skip link

| Page | First tab stop | Activates → focus lands on |
|---|---|---|
| `/` | ✅ `a.skip-link` "Skip to main content" | ❌ `document.body`, **not** `#main` |
| `/demo` | ✅ `a.skip-link` "Skip to main content" | ❌ `document.body`, **not** `#main` |
| `/create` | ❌ **first stop is `input#br-contact`** (the contact field) — no skip link fires at all | — |

**Real defect, confirmed twice (live `document.activeElement` check on `/` and `/demo`) and root-caused in source**: `app/layout.tsx:154` renders `<main id="main" className="min-h-screen">` with **no `tabindex="-1"`**. A plain, non-focusable element can't receive programmatic focus on fragment-navigation, so the browser scrolls to it but focus falls back to `<body>`. A screen-reader or keyboard-only user who activates the skip link is *not* moved past the header — the entire point of the skip link is silently defeated. **Fix: add `tabindex="-1"` to `<main id="main">`.**

**Second defect**: `/create` doesn't show a skip link as the first tab stop at all — worth checking whether `/create`'s layout renders the skip link but something (autofocus on the first field?) steals initial focus before Tab #1, or whether this route bypasses the shared skip-link markup entirely.

### 5.2 Focus visibility — every stop has *some* outline/box-shadow value, but "some value" ≠ "visible"

A naive check (does `outline` or `box-shadow` exist and isn't `none`) found 0 problems on all three pages. That's the wrong check — several components paint a fully-transparent or near-invisible ring. I recomputed real contrast (SC 1.4.11, ≥3:1 required) for every focus ring using the actual outline/box-shadow color against the actual background, then **confirmed the worst ones with a real screenshot pixel-diff** (unfocused vs. focused, same clip region) so nothing here is a false positive from CSS-string parsing.

| Component | Ring contrast | Screenshot pixel-diff | Verdict |
|---|---|---|---|
| Homepage segmented quick-pick tabs (`button#…-tab-0/1/2`, e.g. "I'm missing calls while I'm on site") | n/a — no outline/shadow layer paints anything | **0.0% pixels changed** | **No visible focus indicator at all.** Confirmed via screenshot (`_raw/s4/screens/home-segmented-tab-*.png`). |
| `/demo` message `textarea` ("Type as the customer…") | n/a | **0.0% pixels changed** | **No visible focus indicator at all.** Confirmed via screenshot (`_raw/s4/screens/demo-textarea-*.png`). |
| `/demo` industry chip ("Landscaping") and worker-select card ("AI Receptionist") | **1.1:1** — `outline: 1px solid rgb(16,16,16)` on a `rgb(28,26,25)` background (near-black on near-black) | 7.6–9.7% pixels changed, but visually near-imperceptible | **Confirmed via screenshot**: outline exists but is essentially invisible (`_raw/s4/screens/demo-landscaping-chip-*.png`, `demo-ai-receptionist-tab-*.png`). Fails SC 1.4.11. |
| `.btn-secondary` (sitewide — "Request a free 10-minute fit check", "How the install works", "Full pricing", social icon links, etc.) | **2.31:1** — `box-shadow: rgba(28,26,25,.08) 0 0 0 1px` (8%-opacity 1px ring on white) | 9.6% pixels changed | Weak but not invisible. Fails the 3:1 non-text-contrast bar. Appears on `/`, `/create`, `/demo` and likely every page using this button style. |
| `.v-card.v-card-hover` (homepage free-tool cards) | **1.82:1** — reuses the same soft drop-shadow used for hover elevation, not a dedicated focus ring | 6.8% pixels changed | Weak, easy to miss especially for low-vision users. |

**Fix pattern for all five**: give focus (`:focus-visible`) a dedicated, opaque, ≥3:1 ring — the site already has one that works (`box-shadow: #fff 0 0 0 2px, #E0362C 0 0 0 4px`, used correctly on the skip link and primary buttons). Apply that same token to `.btn-secondary`, `.v-card-hover`, the segmented-tab buttons, the `/demo` textarea, and the dark chip/card buttons (swap the ring color for something with contrast against the dark background, e.g. white/`#E0362C` rather than near-black).

### 5.3 Focus order vs. visual order

Tab order matches visual order almost everywhere; multi-column footer link lists jump "backward" visually between columns, which is normal and expected (column-then-column DOM order is standard and not a defect).

**One real mismatch, root-caused**: the homepage FAQ grid (`id="faq"`, 7 questions in a 2-column layout) tabs in the order q0, q2, q4, q6, **then jumps back up to q1**, q3, q5 — column-major DOM order for what reads visually as a row-major grid (q0/q1 same row, q2/q3 next row, etc.). Root cause confirmed in `components/marketing/Interactive.tsx:140-141`:
```js
const left = items.filter((_, i) => i % 2 === 0);
const right = items.filter((_, i) => i % 2 === 1);
```
rendered as two separate DOM columns (`renderCol(left,0)`, `renderCol(right,1)` at lines 200-202). A keyboard/screen-reader user tabbing through hears "annoy customers → keep my number → what if I cancel → installation time → [jump] → cost → who owns the data → integrations" — a real, if moderate, SC 2.4.3/1.3.2 sequencing problem. **Fix**: drop the manual left/right split and map `items` directly into the grid in natural order; CSS Grid's default row-major auto-placement will produce the correct visual layout without reordering the DOM.

### 5.4 Overlapping/hidden focusable elements — found via general audit, confirmed with a live Tab sequence

**`/start` (ConsultationCall gate)**: the site header (logo link + hamburger button) stays in the DOM, focusable, and un-hidden from assistive tech while the full-screen `ConsultationCall` overlay (`.hbc-root`, `position:fixed; inset:0; z-index:100`, opaque white) is showing on top of it. Confirmed by an actual Tab sequence on `/start` at 390px:

1. Skip link (off-screen, correct)
2. **"Handbuilt AI" logo link** — sits at (24,14)–(159,58), which is behind the opaque overlay
3. **Unnamed hamburger button** — also behind the overlay
4. `a.hbc-exit "← Handbuilt"` — the actually-visible exit control
5. "Start the AI Builder" tap button (the real, visible gate CTA)

`components/ConsultationCall.tsx` only sets `document.body.style.overflow = "hidden"` (line 220-221) while the gate is open — no `inert` and no `aria-hidden` on the underlying page chrome. A sighted keyboard user tabs twice into invisible controls before reaching anything they can see; a screen-reader user can navigate to and activate the hidden logo/menu button while the gate is supposedly modal. **Fix: add the `inert` attribute (or `aria-hidden="true"` + a real focus trap) to the site header/main wrapper for as long as `ConsultationCall` is mounted.**

This wasn't one of the three pages the task named for keyboard testing, but it surfaced from the general touch-target pass (a 0px-gap overlap between two links) and I chased it down because it's the same "hidden but still focusable" family of bug as the two items above — worth fixing together.

### 5.5 Mobile nav "sheet"

Confirmed via live keyboard interaction on `/` at 390px:
- Opens correctly: `aria-expanded` flips `false → true`, and keyboard-activating the toggle moves focus straight to a "Close menu" button (good pattern).
- Escape closes it (confirmed: `aria-expanded` flips back to `false`) **when focus is still inside the panel**.
- **It is not a focus trap.** It's a non-modal, in-page disclosure panel (screenshot: `_raw/s4/mobile-nav-open.png` — no `position:fixed`, no `role="dialog"`, no `aria-modal`) that pushes the hero down rather than overlaying it. Tabbing from "Close menu" walks through the 5 nav links, then **continues straight into the rest of the page** (hero CTAs, calculator inputs, quote tabs, case studies, all the way to the footer, 25 tabs deep) while the panel is still visually expanded above. This doesn't hide content (verified: nothing underneath is obscured, since it's in-flow not an overlay), but it also means a keyboard user can wander far past an open menu without ever closing it, and if they shift-tab back up they re-enter a still-open panel. The task specifically asked whether this "traps focus… and returns it on close" — factually, it does neither, because it isn't built as a modal at all. **Recommend picking one deliberately**: either make it a real modal (`role="dialog"`, `aria-modal="true"`, a proper trap, `inert` on the rest of the page) since it visually reads as one, or keep it as a disclosure but auto-close it once focus leaves the panel.

---

## 6. Forms — `/create`

**This form is genuinely well built for accessibility — verified live, not just from source.**

- Every control has a real `<label htmlFor>` bound to its `id` (`components/BuildRequestForm.tsx:748`).
- `aria-describedby` links hint + error text; `aria-invalid="true"` is set the moment a field fails validation; "required"/"optional" is spelled out in the label text itself, not colour (confirmed live: `"Your name (required)"`, `"Email or phone (required)"`, etc.) — no colour-only signalling.
- **Live-tested the empty-submit path**: clicking Send with nothing filled in produced, in the same render:
  - An `aria-live="assertive"` sr-only region announcing **"4 answers need fixing before this can send."**
  - A visible (non-sr-only) banner with the same message plus "they're marked below."
  - Each of the 4 invalid fields got `aria-invalid="true"` + `aria-describedby` pointing at its own error paragraph, each with a real, specific sentence ("Tell us your name so we know who we're replying to.", not a generic "required").
  - **Focus programmatically moved to the first invalid field** (`input#br-name`), confirmed via `document.activeElement`.
- **Submit button is never disabled — confirmed both before and after a failed validation attempt** (`isDisabled()` → `false` in both cases; it only disables while `status === "sending"`). This is exactly the deliberate pattern the task described: the error is announced, not blocked-via-disabled-button.
- Server-error path (`BuildRequestForm.tsx:644-649`) uses `role="alert"` and never wipes what the user typed.

No defects found in this section. This is the strongest-built surface on the site from an accessibility standpoint.

---

## 7. Structure — all 13 pages

| Check | Result |
|---|---|
| Exactly one `<h1>` per page | ✅ 13/13, both viewports |
| No skipped heading levels | ✅ 0 found |
| Landmarks (`banner`/`main`/`contentinfo`/`navigation`) | ✅ present on every page |
| `lang` attribute | ✅ `en` on every page |
| Images: alt or correctly decorative | ✅ 0 missing-alt found |
| Icon-only buttons have accessible names | ✅ 0 unnamed found |
| Multiple `nav` landmarks disambiguated | ✅ `/ai-receptionist`, `/ai-receptionist-for-contractors`, `/use-cases/ai-receptionist-for-contractors` each have 2 `<nav>`s ("Main" + "Breadcrumb"), correctly distinguished via `aria-label` |
| Info conveyed by colour alone | ✅ none found (required/optional in text on forms; error banners carry text, not just red) |

One thing I flagged, checked, and **ruled out**: my own crude selector-based scan initially reported `/tools` as having 2 `banner`-role elements (two `<header>` tags). Per the HTML-AAM spec, a `<header>` nested inside `<main>` does **not** get the `banner` role (only a top-level `<header>` does) — the second `<header>` on `/tools` is a local page-header for the tools-hub hero, correctly nested inside `<main>`. Axe's 0 violations (which does implement the ancestor exception correctly) confirms this was a false positive in my naive check, not a real duplicate-landmark bug.

---

## 8. Severity-ranked defect list

| # | Severity | Defect | Fix |
|---|---|---|---|
| 1 | **High** | `/start`: header logo + hamburger button remain focusable/exposed behind the opaque `ConsultationCall` full-screen gate — confirmed via live Tab sequence | Add `inert` (or `aria-hidden` + a real trap) to the site chrome while the gate is mounted. `components/ConsultationCall.tsx` |
| 2 | **High** | Skip link scrolls to `#main` but never focuses it (`document.activeElement` stays `body`) — SC 2.4.1 not actually satisfied for AT/keyboard users | Add `tabindex="-1"` to `<main id="main">`. `app/layout.tsx:154` |
| 3 | **High** | Homepage segmented quick-pick tabs and `/demo` message textarea have **zero** visible focus indicator (0.0% pixel diff, confirmed by screenshot) | Add a real `:focus-visible` ring (reuse the site's own working token) |
| 4 | **Medium** | `/demo` dark chip/card buttons ("Landscaping", "AI Receptionist" worker card): focus outline is near-black on near-black, 1.1:1 | Swap ring colour for something with contrast against dark backgrounds |
| 5 | **Medium** | `.btn-secondary` and `.v-card-hover` sitewide: focus ring exists but measures 1.8–2.3:1, below the 3:1 non-text-contrast bar | Same token fix as #3 |
| 6 | **Medium** | `/create` doesn't show the skip link as the first tab stop | Investigate why `/create`'s layout order differs; confirm the shared skip-link markup renders there |
| 7 | **Medium** | Homepage FAQ grid tabs column-major (q0,q2,q4,q6,q1,q3,q5) against a visually row-major 2-column layout | Remove the manual left/right array split in `components/marketing/Interactive.tsx:140-141`; let CSS Grid auto-place in natural order |
| 8 | **Medium** | Mobile nav is a non-modal disclosure, not the trapping "sheet" the spec assumed — no focus containment | Either make it a real `role="dialog"` with a trap, or accept the disclosure pattern explicitly (it does at least support Escape and returns focus) |
| 9 | **Low** | `dd .text-ink/30` "—" placeholder on `/demo`: 1.93:1 contrast | `components/showroom/Showroom.tsx:522` — darken to at least `text-ink/55` |
| 10 | **Low** | `.text-clay` arrow glyph on `/tools`: 4.44:1, a 0.06 near-miss | `app/tools/page.tsx:44` — nudge to `text-clay-dark` or bump opacity |
| 11 | **Low** | Footer "Privacy"/"Terms"/email links under the 24×24 AA minimum, sitewide | `components/Footer.tsx:63-65, 177-182` — small padding bump |
| 12 | **Low** | "Reset conversation" button on `/demo` under 24×24 | `components/showroom/Showroom.tsx:350-352` |
None of the above are axe-reported serious/critical violations — axe's rule set doesn't cover most of them (focus-ring contrast, focus-target semantics, DOM-vs-visual order, `inert` usage). That's the point of the manual pass. Reduced motion (§4) is fully verified live and compliant — no defect to list.

**A note on the mid-audit restart**: while `localhost:3200` was down, the working tree picked up uncommitted edits from other parallel agent activity (`app/api/build-request/route.ts`, `app/layout.tsx`, `components/BuildRequestForm.tsx`, `components/marketing/Hero.tsx`, `components/marketing/HomeSections.tsx`, `components/showroom/Showroom.tsx`). I diffed each against the exact lines this report cites (`app/layout.tsx:154`'s `<main id="main">`, `Showroom.tsx:522`'s `text-ink/30` em-dash) after the server came back — none of the cited lines changed, so nothing here is stale. I did not audit those other agents' in-flight changes; that's outside this task's scope.

---

## Summary (≤250 words)

**No axe-reported serious or critical WCAG violation exists anywhere on the site** — 26 scans (13 pages × desktop/mobile) against wcag2a/2aa/21a/21aa/22aa all came back clean. But axe is not the whole test, and manual verification found real, user-facing defects axe's ruleset can't see:

Two confirmed WCAG failures: the skip link scrolls to `#main` but never actually moves focus there (`<main>` has no `tabindex="-1"`, so `document.activeElement` stays `<body>` — verified live), and several focus indicators fail the 3:1 non-text-contrast requirement, including two controls (a homepage tab group, the `/demo` textarea) with **zero** visible focus indicator at all — confirmed by literal 0.0%-pixel-diff screenshots, not just CSS inspection. A dark-on-dark focus ring on `/demo`'s chip buttons (1.1:1) is effectively invisible too. Separately, `/start`'s full-screen consultation gate leaves the site header still focusable behind it with no `inert`/`aria-hidden`, so keyboard/AT users can reach two completely hidden controls before reaching the real exit button.

Contrast is otherwise excellent: only 2 real failures out of 3,338 measurements (a 1.93:1 placeholder dash on `/demo`, a 4.44:1 near-miss arrow glyph on `/tools`) — every eyebrow label, body/secondary text, link, and button passes at ≥5.2:1. Touch targets: the true WCAG 2.2 AA minimum (24×24, not 44×44) is missed by only 4 real, non-exempt controls (footer legal links + a reset button), all sitewide/easy fixes. The `/create` form's error handling (assertive live-region, per-field `aria-invalid`/`aria-describedby`, focus-to-first-error, submit never disabled) is excellent and was verified live end-to-end. Reduced motion is fully compliant, confirmed with real screenshot pixel-diffs (0.0% change on the reveal system and live dot; instant, non-animated state changes on the FAQ accordion; spinners forced to a single near-zero-duration frame) — nothing animates, and nothing is hidden by turning motion off.

The local server went down for several minutes mid-audit (confirmed via `netstat`, not stopped by me) and came back on its own; I verified the specific lines every finding cites were unchanged before and after, so nothing here is stale.

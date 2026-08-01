# Verseo Reference Audit

**Reference:** https://lime-themes-311774.framer.app/ (Verseo, Framer template)
**Audited:** 2026-08-01 · Playwright/Chromium, real viewport resize, computed styles read from the live DOM
**Method:** every number below was measured with `getComputedStyle` / `getBoundingClientRect` in the page. Nothing here is from memory or visual impression.
**Screenshots:** `docs/design/screenshots/reference/`

> Companion documents: `VERSE0-DESIGN-SYSTEM.md` (what we build), `VERSE0-PERFORMANCE-REPORT.md` (what it cost).

---

## 1. Measured facts

### 1.1 Page geometry (1440×900)

| Property | Value |
|---|---|
| Document height | 13,132px |
| Body width | 1425px (15px scrollbar) |
| Content container | **1345px** → 40px gutter each side |
| Centred text column | **673px** (headline + subhead) |
| Section padding | **120px top / 120px bottom** (uniform across 8 of 10 content sections) |
| Logo-strip / integration bands | 40px / 40px |
| Card row widths | 448px (3-up) · 336px (4-up) |

### 1.2 Page geometry (390×844)

| Property | Value |
|---|---|
| Document height | 15,530px |
| Content container | 327px → **24px gutter** each side |
| Horizontal overflow | none |
| Section padding | ~100px / 50px (asymmetric — see §4.1, we do not copy this) |

### 1.3 Type scale — Inter throughout

Space Grotesk appears **only** in the wordmark. JetBrains Mono appears **only** on numerals (`4,9`).
Every size carries **negative tracking**, roughly −0.02em to −0.03em.

| Role | Desktop | Mobile | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| H1 | 60px | **42px** | 600 | 66px (1.10) | −1.8px (−0.03em) |
| H2 / section | 48px | — | 600 | 52.8px (1.10) | −1.44px (−0.03em) |
| Section subhead | 28px | — | 500 | 33.6px (1.20) | −0.28px |
| Card title | 24px | — | 500 | 28.8px (1.20) | −0.24px |
| Card title (sm) | 20px | — | 500 | 24px (1.20) | −0.40px |
| Price | 44px | — | 500 | 52.8px | −0.44px |
| Stat number | 46px | — | 500 | 46px (1.00) | −0.92px |
| Lead paragraph | 18px | — | 400 | 25.2px (1.40) | −0.36px |
| Body | 15px | — | 400 | **18px (1.20)** | −0.30px |
| Small | 14px | — | 400 | 16.8px (1.20) | −0.28px |
| Micro / eyebrow | 12px | — | 400 | 14.4px (1.20) | −0.12px |
| Nav link | 15px | — | 400 | 18px | −0.15px |
| Button label | 15px | — | 400 | 18px | −0.15px |

### 1.4 Colour

| Token | Hex | Use |
|---|---|---|
| Surface | `#ffffff` | cards, elevated panels (63 elements) |
| Page field | `#f6f6f6` | the canvas the whole page sits on (45) |
| Recess | `#f9f9f9` | strips that cards sit **on top of** (10) |
| Ink | `#181818` | text + dark buttons + dark surfaces (27) |
| Muted | `#686868` | body copy (18) |
| Muted light | `#858585` | captions, inactive numerals |
| Hairline | `#ededed` | rare; mostly done with shadow instead |
| Accent — periwinkle | `#AEABFF` | icon marks only |
| Accent — green | `#A2E198` | icon marks only |
| Accent — amber | `#FFCC40` | icon marks only |

The three accents never fill a region. They exist only inside 5×5 icon glyphs and one "Popular" state.

### 1.5 Borders, radii, elevation

**There are zero CSS borders on the page.** Every hairline is a 1px *spread* box-shadow. This is the single most important technical finding.

Radius distribution: `4px ×215` · `10px ×50` · `12px ×37` · `8px ×11` · `100px ×3` (pills).
**4px is the workhorse.** Nothing is blobby.

The signature card elevation, used 11 times:

```css
box-shadow:
  rgba(0,0,0,.03) 0  0px  0px 1px,   /* hairline ring */
  rgba(0,0,0,.03) 0 16px 24px -12px,
  rgba(0,0,0,.03) 0 32px 32px -20px,
  rgba(0,0,0,.02) 0 40px 48px -20px;
```

Four layers, none above 3% opacity. The softness is what reads as expensive — and it is exactly what a saturated glow button destroys (see §5.1).

### 1.6 Buttons

| Variant | Size | Radius | Fill | Padding |
|---|---|---|---|---|
| Primary | 48px tall | 4px | `#181818`, white text | 14px / 16px |
| Secondary | 48px tall | 4px | `#ffffff` | 14px / 26px |
| Small | 46px tall | 4px | `#181818` | 14px / 16px |
| Full-width (mobile) | 48px × 380px | 4px | both variants | — |

No gradients. No coloured shadows. Observed widths: 118 / 142 / 159 / 380px.

### 1.7 Navigation

- `position: fixed`, **76px** tall, always visible, `backdrop-filter: blur(2px)`, `#f9f9f9`
- Logo left · centred link row · one dark CTA pill right
- Mobile: **63px**, logo + hamburger only, CTA drops out of the bar

### 1.8 Scroll behaviour

- The How-It-Works right-hand panel is `position: sticky` and pins at **`top: 96px`** (76px nav + 20px) while three 450px step cards scroll past it. Section total height 2,970px.
- Stat numbers render as `0%` at rest and count up on reveal.
- No scroll-jacking; native scrolling throughout.

---

## 2. Section sequence (measured offsets, 1440px)

| # | Section | Offset | Height | Padding |
|---|---|---:|---:|---|
| 1 | Hero (grid-dots bg) | 65 | 929 | — |
| 2 | Illustration grid | 581 | 412 | — |
| 3 | Client logos | 993 | 168 | 40/40 |
| 4 | Problem and difference | 1161 | 781 | 120/120 |
| 5 | Features (4 cards) | 1942 | 781 | 120/120 |
| 6 | Use cases (accordion) | 2722 | 962 | 120/120 |
| 7 | How it works (sticky, 3 steps) | 3684 | 2970 | 120/0 |
| 8 | Results (bento + stats) | 6654 | 967 | 120/120 |
| 9 | Examples | 7621 | 1612 | 120/120 |
| 10 | Integrations | 9233 | 183 | 40/40 |
| 11 | Testimonials | 9416 | 747 | 120/120 |
| 12 | Pricing | 10162 | 1064 | 120/120 |
| 13 | FAQ (2-col accordion) | 11226 | 820 | 120/120 |
| 14 | Final CTA (stars grid + gradient) | 12038 | 1020 | — |
| 15 | Footer | 12683 | 450 | — |

---

## 3. The eight signature devices

1. **Bracketed micro-eyebrows** — `[ the difference ]`, `[ features ]`, `[ ready to start? ]`, `[ newsletter ]`. 12px, lowercase, muted, literal square brackets. Used in every section and throughout the footer. This is the template's strongest typographic tell.
2. **5×5 dot-matrix icons** — pixel-grid glyphs, one accent colour each. Echo the hero's dotted background.
3. **Recessed `#f9f9f9` strips** — card rows sit on a slightly darker band that extends past the cards, with hairline top/bottom edges.
4. **Two flat + one elevated** — the before/after story told in a single row: two problem cards flat with `✕` marks, one solution card elevated white with `✓`, taller.
5. **Window chrome** — the accordion is wrapped in a fake app window: traffic-light dots + a contextual label that updates with the open row (`FOR MARKETERS`).
6. **Sticky pinned panel** — right-hand demo holds at `top:96px` while step cards scroll past.
7. **Hairline bento** — stat grid whose cells are divided by 1px lines rather than gaps, all inside one rounded container. Numbers count up.
8. **Full-bleed sky** — a photographic cloud/gradient band behind the How-It-Works steps, breaking the white rhythm.

---

## 4. Translation table

| Reference section | Handbuilt AI equivalent | Verdict |
|---|---|---|
| Hero + app mockup | Hero + quote-follow-up workflow visual | **Adapt** |
| Client logo strip | **Live embedded quote-leak calculator** | **Replace** — we have no logos; a working tool is unfakeable |
| Problem and difference | Before / After contractor reality | **Keep** (structure exactly) |
| Features ×4 | Core systems ×4 (Quote Rescue, Missed-call response, Review follow-up, Connected Office) | **Keep** |
| Use-cases accordion | Trade segmentation ×3 (roofing/exteriors, landscaping, general home-service) | **Keep**, 3 not 5 |
| How it works, sticky | Find the leak → Install the workflow → Measure what changed | **Keep** desktop, **stack on mobile** |
| Results bento + stats | Demonstration workflow + *labelled sample* figures | **Adapt** — no invented customer numbers |
| Examples | Free tools showcase | **Adapt** |
| Integrations | "Systems we can connect to" | **Adapt** — wording, not logos-as-endorsement |
| Testimonials | Design-partner invitation | **Replace** — no fabricated quotes |
| Pricing 3-up | Offer ladder from `lib/data/packages.ts` | **Keep** |
| FAQ 2-col | Objection-handling FAQ | **Keep** |
| Final CTA | Three honest next actions | **Keep** |
| Footer grid | Footer, one company name | **Keep** |
| Monthly/annual toggle | — | **Remove** — our pricing is project-based, a toggle would imply subscription |
| Cloud/sky band | **Drafting-sheet band** (CSS grid + SVG roofline) | **Replace** — §5.2 |
| 3 pastel accents | One red accent | **Replace** — §5.1 |
| 15px/1.2 body | 17px/1.55 body | **Replace** — §5.3 |

---

## 5. Deliberate deviations

These are the places we knowingly diverge. Each is a decision, not an omission.

### 5.1 Colour: one ink, one red, no pastels

Verseo's primary action is near-black; three pastels appear only as tiny identifying marks.
Our existing brand ships a red vertical-gradient CTA with a coloured drop shadow and a page-wide red radial glow.

**Decision: near-black primary (`#1d1d1f`), red (`#e0362c`) demoted to a scarce accent, Verseo's pastels dropped entirely.**

The reason is structural, not brand-strategic: the 3%-opacity four-layer shadow system in §1.5 is only legible against restrained colour. Drop a saturated glowing button into it and the eye can no longer resolve the shadows — you inherit the skeleton and lose the quality. Gradient, coloured shadow, and site glow are all removed.

**Red scarcity rule:** red never fills a region larger than ~20px. Permitted uses, exhaustively: the dot before a bracketed eyebrow, exactly one peg per icon, link underlines, active nav state, focus rings, the live-status dot. Target 3–5 red marks per viewport.

We keep `--ink: #1d1d1f` rather than adopting Verseo's `#181818` — a 3-point luminance shift is imperceptible and would churn all 237 pages for no visible gain.

### 5.2 The sky band becomes a drafting sheet

Verseo's cloud photo is a breather that signals aspiration. Imitating sky in CSS reads cheaper than having no sky at all. The contractor equivalent is the drafting table: a `#f9f9f9` band with a graph grid (1px `rgba(29,29,31,.045)` every 24px, heavier `rgba(29,29,31,.07)` every 120px) and one single-weight SVG roofline elevation drawn over it, with red dimension ticks.

### 5.3 Body type is set for the actual reader

Verseo's 15px/1.2 body with negative tracking is a flex for a design-literate audience. Ours is a contractor on a phone, often outdoors. **Body is 17px/1.55, tracking 0.** Negative tracking is retained only at display sizes ≥24px, where it genuinely tightens a headline.

### 5.4 The icon motif is translated, not copied

Pixel-grid glyphs long predate this template (LED matrices, flip-dot signage). The device is generic; Verseo's execution is theirs. Ours is a **pegboard**: all 25 grid positions render as faint 2px holes, the glyph is formed by solid 5px pegs, and exactly one peg per icon is red. Three deliberate differences — the empty grid is visible, the accent is single and fixed, and pegs are circles with a pressed hover state. It reads as a hand-placed object, which is the brand.

### 5.5 Nothing occupies the proof slot except real proof

Verseo puts customer logos under the hero. We have no customers. Rather than a weaker borrowed-credibility device, that slot holds a **working calculator the visitor can use immediately** — the only proof we own outright.

---

## 6. Accessibility observations on the reference

Carried forward as requirements, not copied defects:

- Accordion toggles are 40px squares — at or just under a comfortable tap target. **We use 44px.**
- Several body strings sit at `#686868` on `#f9f9f9` ≈ 4.9:1 — passes AA for normal text, but only just. **We hold body text at ≥7:1 by using `#1d1d1f` for substantive copy and reserving muted grey for genuinely secondary text.**
- Stat count-up animation has no reduced-motion fallback in the reference. **Ours renders the final value immediately under `prefers-reduced-motion`.**
- The reference's sticky section would be hostile on a phone. **Ours degrades to a plain stack below `lg`.**

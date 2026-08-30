# S6 — Responsive Visual Inspection

Branch `feat/site-transformation-2026-08-30` @ `8a2bd89`. Local production build served at `http://localhost:3200` (not rebuilt, not restarted). Playwright 1.62.1, Chromium headless, `@playwright/test`.

**Status: IN PROGRESS.** Portrait verdict (Priority One) complete below. Full responsive sweep (Priority Two) follows.

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

*(in progress — populated below as it completes)*

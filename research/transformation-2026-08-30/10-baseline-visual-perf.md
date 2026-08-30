# Baseline Visual + Performance QA — Production (2026-07-15 build)

Agent A10. Read-only capture of `https://aibuiltbyhand.com` production as it stood on 2026-08-30, before the planned transformation ships. All screenshots and Lighthouse reports live under `research/transformation-2026-08-30/baseline/`.

- Screenshots: `research/transformation-2026-08-30/baseline/screenshots/` (121 PNG files)
- Lighthouse JSON + HTML: `research/transformation-2026-08-30/baseline/lighthouse/` (16 report pairs + `run.log`)

No forms were submitted, nothing was built/started locally, no destructive actions were taken.

---

## 1. Lighthouse scores + Core Web Vitals

Mobile = Lighthouse default (simulated mid-tier mobile, throttled). Desktop = `--preset=desktop`. Both runs used `--chrome-flags="--headless=new"` and succeeded on the first attempt — no fallback flags were needed.

| Page | Device | Perf | A11y | BP | SEO | LCP | CLS | TBT | FCP | Speed Index | Total bytes | Requests | Top opportunity |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 89 | 96 | 100 | 100 | 3.7 s | 0 | 10 ms | 1.3 s | 2.8 s | 370 KiB | 33 | Reduce unused CSS (150 ms) |
| `/` | Desktop | 99 | 96 | 100 | 100 | 0.9 s | 0 | 0 ms | 0.3 s | 0.5 s | 370 KiB | 33 | none |
| `/demo` | Mobile | 95 | 91 | 100 | 100 | 2.8 s | 0 | 0 ms | 0.9 s | 2.6 s | 407 KiB | 29 | none |
| `/demo` | Desktop | 99 | 91 | 100 | 100 | 0.6 s | 0.07 | 0 ms | 0.3 s | 0.8 s | 477 KiB | 40 | none |
| `/pricing` | Mobile | 94 | 91 | 100 | 100 | 3.0 s | 0 | 0 ms | 1.0 s | 1.0 s | 414 KiB | 31 | none |
| `/pricing` | Desktop | 100 | 91 | 100 | 100 | 0.7 s | 0 | 0 ms | 0.3 s | 0.4 s | 503 KiB | 45 | none |
| `/start` | Mobile | 98 | 91 | 100 | 100 | 2.5 s | 0 | 10 ms | 1.0 s | 1.0 s | 361 KiB | 26 | none |
| `/start` | Desktop | 100 | 91 | 100 | 100 | 0.5 s | 0.002 | 0 ms | 0.3 s | 0.5 s | 527 KiB | 46 | none |
| `/ai-receptionist` | Mobile | **82** | 87 | 100 | 100 | **4.1 s** | 0 | 30 ms | 2.0 s | **4.4 s** | 419 KiB | 31 | Initial server response time (68 ms, negligible) |
| `/ai-receptionist` | Desktop | 100 | 87 | 100 | 100 | 0.7 s | 0 | 0 ms | 0.3 s | 0.4 s | 481 KiB | 41 | none |
| `/industries` | Mobile | 93 | 91 | 100 | 100 | 3.2 s | 0 | 0 ms | 1.0 s | 2.3 s | 424 KiB | 32 | none |
| `/industries` | Desktop | 100 | 91 | 100 | 100 | 0.7 s | 0 | 0 ms | 0.3 s | 0.4 s | 568 KiB | 51 | none |
| `/locations/surrey` | Mobile | **FAILED** | — | — | — | — | — | — | — | — | — | — | `ERRORED_DOCUMENT_REQUEST`: "Lighthouse was unable to reliably load the page you requested... (Status code: 404)" |
| `/locations/surrey` | Desktop | **FAILED** | — | — | — | — | — | — | — | — | — | — | Same error, second attempt not needed — cause is the page itself (real 404), not Chrome/launch flags |
| `/locations/ai-automation-agency-surrey-bc` (substitute — see §4) | Mobile | 93 | 87 | 100 | 100 | 3.2 s | 0 | 0 ms | 1.0 s | 1.1 s | 428 KiB | 33 | none |
| `/locations/ai-automation-agency-surrey-bc` (substitute) | Desktop | 100 | 87 | 100 | 100 | 0.7 s | 0 | 0 ms | 0.3 s | 0.4 s | 498 KiB | 43 | none |

Observations, evidence-only:
- Every page scores **Best Practices 100 / SEO 100** on both devices.
- **Accessibility never reaches 100** on any page (87–96 range) — mobile and desktop score identically per page, so this is a static-markup issue, not a rendering/viewport one.
- Mobile Performance is consistently the soft spot (82–98) vs. Desktop (99–100 everywhere it ran) — expected given mobile throttling, but `/ai-receptionist` mobile (82, LCP 4.1 s, Speed Index 4.4 s) is the single weakest score of the whole set.
- `/locations/surrey` could not be scored at all — Lighthouse's own `runtimeError.code` is `ERRORED_DOCUMENT_REQUEST` because the URL is a genuine HTTP 404. This matches the memory note that this URL 404s; the working equivalent page is `/locations/ai-automation-agency-surrey-bc`, scored above as a substitute.
- No page surfaced more than one performance "opportunity" with non-trivial estimated savings; total byte weight (361–568 KiB) and request counts (26–51) are modest across the board.

---

## 2. Console + network findings (first load, per page)

Captured immediately after each page's first load via `browser_console_messages` (level: warning, i.e. warnings+errors) and `browser_network_requests` (all requests, then scanned for 4xx/5xx).

| Page (tested URL) | Console errors/warnings | Failed requests (4xx/5xx) |
|---|---|---|
| `/` | 0 | 0 |
| `/demo` | 0 | 0 |
| `/pricing` | 0 | 0 |
| `/start` | 0 | 0 |
| `/create` | 0 | 0 |
| `/ai-receptionist` | 0 | 0 |
| `/ai-receptionist-for-contractors` | 0 | 0 |
| `/industries` | 0 | 0 |
| `/locations/surrey` | **1 error**: `Failed to load resource: the server responded with a status of 404 ()` | **1**: `GET /locations/surrey → 404` |
| `/locations/ai-automation-agency-surrey-bc` (substitute) | 0 | 0 |
| `/about` | 0 | 0 |
| `/tools` | 0 | 0 |
| `/resources/best-ai-tools-for-contractors` | 0 | 0 (page exists, no 404 — no substitute needed) |

No page produced any other console warning/error or any other failed network request. The only failure anywhere in the sweep is `/locations/surrey` itself being a dead route.

---

## 3. First-paint fade/blank check

For every page, one screenshot was taken immediately on navigation completion (`__t0.png`) and a second after a 1.5 s wait (the plain `__390.png`), both at 390×844.

MD5 comparison of all 12 pairs:

- **Pixel-identical (11 of 12):** home, demo, pricing, create, ai-receptionist, ai-receptionist-for-contractors, industries, locations-surrey-real, about, tools, resources-best-ai-tools. No blank/faded/skeleton first paint on any of these — content is present and unchanged from the instant navigation resolves.
- **Differs (1 of 12): `/start`.** The t0 and +1.5 s captures differ, but visual inspection (`start__390__t0.png` vs `start__390.png`) shows this is the pulsing red dot's CSS animation moving between frames, not a content fade-in — the layout, text, and header are otherwise identical at both moments. See §4 for the more significant finding on this page (near-empty viewport).

---

## 4. Screenshot index + visual defects

All files are under `research/transformation-2026-08-30/baseline/screenshots/`. Naming: `<slug>__<width>.png` (viewport), `<slug>__<width>__full.png` (full page, at 390 and 1440 only), `<slug>__390__t0.png` (immediate-paint control).

Slugs and their source URL:

| Slug | URL | Note |
|---|---|---|
| `home` | `/` | |
| `demo` | `/demo` | |
| `pricing` | `/pricing` | |
| `start` | `/start` | |
| `create` | `/create` | |
| `ai-receptionist` | `/ai-receptionist` | |
| `ai-receptionist-for-contractors` | `/ai-receptionist-for-contractors` | |
| `industries` | `/industries` | |
| `locations-surrey` | `/locations/surrey` | **404 — only one screenshot taken:** `locations-surrey__390__404.png` |
| `locations-surrey-real` | `/locations/ai-automation-agency-surrey-bc` | Substitute for the 404'd page (closest real location page linked from the homepage), full 7-viewport + full-page set captured |
| `about` | `/about` | |
| `tools` | `/tools` | |
| `resources-best-ai-tools` | `/resources/best-ai-tools-for-contractors` | Loaded fine, no substitute needed |

Every slug (except `locations-surrey`) has the full set: 7 viewport shots (320, 375, 390, 768, 1024, 1280, 1440), full-page shots at 390 and 1440, and a `390__t0` control — 121 files total.

### Visual defects observed directly in the screenshots

**D1 — Two unrelated header/nav systems: homepage vs. every internal page.**
`home__1440.png`: all-caps bold "HANDBUILT AI" logo, 3-link nav (`WORKERS · PRICING · FAQ`), single CTA "Book a fit check".
`demo__1440.png` / `pricing__1440.png` / `industries__1440.png` / `ai-receptionist__768.png`: mixed-case lighter-weight "Handbuilt AI" logo, 6-item nav (`See it work · Demo · AI Systems · For Creators · Pricing · Account`), CTA reads "Start a build →". Different logo treatment, different nav taxonomy, different CTA copy — the homepage and the rest of the site do not look like the same product.

**D2 — Internal-page header breaks at 768px (tablet) width.**
`pricing__768.png`, `demo__768.png`, `ai-receptionist__768.png`: the "Handbuilt AI" logo text visually runs into/touches the first nav link "See it work"; "Pricing" and the account icon crowd together with no gap; the "Start a build" button's label wraps to two lines inside the pill. This exact nav does collapse correctly to a hamburger icon at 390px (`demo__390.png`, `pricing__390.png`) and fits cleanly at 1024px (`pricing__1024.png`) — the breakage is isolated to the 768px breakpoint window. The homepage's own (different) header handles 768px without issue (`home__768.png`), because it only has 3 nav items.

**D3 — Three competing CTAs above the fold on the homepage.**
`home__390.png` and `home__1440.png` both show, with no scrolling: header CTA "Book a fit check", hero primary CTA "Find my first AI worker →", and hero secondary CTA "See the AI workers" — three separate calls to action visible in the first viewport on both mobile and desktop.

**D4 — `/start` is almost entirely blank.**
`start__390__full.png` and `start__1440.png`: aside from a thin top bar and a small centered block (pulsing dot, "Tap to start the AI Builder", one line of caption text), the rest of the viewport — and a large scroll region below it before the footer — is empty white space. This holds at both 390px and 1440px. Quantitative corroboration: the `start__*` viewport PNGs are 8–12 KB, versus 60–350 KB for the equivalent shot on every other page (e.g. `home__390.png` is 269 KB, `pricing__390.png` is 94 KB) — there is simply very little painted content on this page.

**D5 — Raw system string exposed as UI copy on `/start`.**
`start__390.png` and `start__1440.png` both show, top-right corner: `voice: Microsoft George - English (United Kingdom)`. This reads as an unformatted Web Speech API voice name leaking directly into production copy rather than intentional UI text.

**D6 — `/locations/surrey` is a dead route.**
`locations-surrey__390__404.png` shows the Next.js default "404: This page could not be found" page, confirmed by an HTTP 404 status and a console error (see §2). The equivalent live page is `/locations/ai-automation-agency-surrey-bc` (screenshotted as `locations-surrey-real__*`).

### Checked, not found

- **No mobile wrapping/overflow or horizontal scroll** at 320px on any of the 12 pages tested (`pricing__320.png`, `industries__320.png`, `ai-receptionist-for-contractors__320.png`, `locations-surrey-real__320.png`, etc.) — text wraps cleanly, no clipped or run-off content observed.
- **No crowded-card or washed-out-text defects** observed in the pricing 3-column tier grid, the industries 2-column category grid, or the tools 2-column grid at 768/1024/1280/1440 — spacing and text contrast look consistent in the reviewed screenshots.
- Aside from D1/D2, footer content and structure (see §5) is otherwise consistent across every internal page.

---

## 5. Footer / social link findings

Checked via `document.querySelectorAll('a')` + a `<footer>` presence check on every page's first load (not just visual inspection).

- **Every internal page tested** (demo, pricing, start, create, ai-receptionist, ai-receptionist-for-contractors, industries, locations-surrey-real, about, tools, resources-best-ai-tools) renders a real `<footer>` containing a **GitHub icon linking to `https://github.com/pavneets956-design/ai-shop`** (aria-label "GitHub") and a **LinkedIn icon with `href="#"`** (aria-label "LinkedIn") — a dead link, confirmed live in the rendered DOM on all 11 of these pages.
- **The homepage (`/`) does not render this footer at all.** `document.querySelectorAll('a')` on `/` returns 26 links, none of them footer/social links, and `document.querySelector('footer')` — implicitly, no footer-scoped links exist. A `href="#"` / `aria-label="LinkedIn"` fragment does turn up in the homepage's raw HTML, but only inside the embedded Next.js RSC flight-data `<script>` payload (serialized prefetch data for another route) — it is never mounted into the visible page. A homepage visitor sees no footer/social block at all, while every internal-page visitor sees a footer with a live but dead LinkedIn link.
- The publicly-exposed GitHub link points at what looks like the actual working repository for this site — worth a callout to the owner independent of the LinkedIn issue, though outside this agent's visual/perf scope.

---

## Files

- Screenshots: `research/transformation-2026-08-30/baseline/screenshots/*.png` (121 files)
- Lighthouse JSON/HTML: `research/transformation-2026-08-30/baseline/lighthouse/*.report.{json,html}` (16 pairs) + `run.log`

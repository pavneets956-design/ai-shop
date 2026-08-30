# 04 — UX / CRO / ACCESSIBILITY AUDIT — aibuiltbyhand.com

**Date:** 2026-08-30 · **Agent:** A4 · **Method:** read-only static audit of the WORKING TREE
(branch `feat/site-transformation-2026-08-30`, HEAD `e732d98`), plus `curl` of production for
rendered-HTML facts only. No build, no browser, no MCP.

> **Verification boundary.** Every finding cites `file:line` in the working tree. Contrast ratios are
> computed (WCAG 2.x relative-luminance formula) from the literal hex values in `app/globals.css`
> and `tailwind.config.ts`; the pair and the ratio are shown each time. Anything that needs a
> rendered page (hydration behaviour, actual pixel sizes, focus order) is marked **UNVERIFIED** and
> handed to the browser-owning agents. Prior findings are cited from
> `research/keyword-gap-2026-08-12/16-conversion-audit.md` ("16-audit") rather than re-derived.

---

## 0. THE ONE-PARAGRAPH ANSWER

The working-tree homepage is honest, well-structured and answers the five-second test on four of
five counts — but it **never links to the site's strongest proof asset (`/demo`)**, carries
**8 separate links to the same `/create` form under 7 different labels**, and hides the price until
section 8 of 11. Production is worse and older: it still serves the retired MoltenForge page whose
three primary CTAs read **"Book a fit check" / "Book my fit check →" / "Book my workflow audit"** and
all point at `/create`, a form — there is no calendar integration anywhere in the codebase
(`CALCOM_API_KEY` exists only as a name in `.env.local`; zero code references). The `/create` form
asks up to **14 questions before contact info**, has **no programmatic label on any field**, and
renders its only error message at **1.66:1 contrast** (`text-red-300` on a white card — a dark-theme
class that survived the light-theme migration). The `/start` fire-and-forget bug from the 16-audit
**is fixed**, but its success note renders at **1.68:1**, its overlay is not a dialog and does not
trap focus, and it still quotes the phantom `$1,500–$2,500` band and invented "~12 hrs/week saved"
figures from `lib/data/builder.ts`. Site-wide there is **no skip link**, three separate visual
systems (Verseo homepage → legacy "blueprint/glass" internal pages → Showroom), a dead `/#finder`
anchor on every landing page, and a legacy `Reveal` that ships `opacity:0` in server HTML and
ignores `prefers-reduced-motion` across ~200 routes.

---

## 1. HOMEPAGE CONVERSION JOURNEY (working tree — `app/page.tsx:128-145`)

### 1.1 Section order, as rendered

| # | Section (component) | File:line | Purpose | CTAs (label → href) |
|---|---|---|---|---|
| 0 | Navbar | `components/Navbar.tsx:47-159` | chrome | 5 nav links (`lib/data/site.ts:50-56`) + **"Request a review" → `/create`** (`:98-101`); mobile sheet CTA **"Request a free AI opportunity review" → `/create`** (`:153-155`) |
| 1 | Hero | `components/marketing/Hero.tsx:35-88` | H1 + support + 2 buttons + CallTimeline visual | **"Request a free AI opportunity review" → `/create`** (`:66-70`); "See what missed calls cost you" → `/tools/missed-call-revenue-calculator` (`:70-73`) |
| 2 | LiveCalcStrip | `components/marketing/LiveCalcStrip.tsx:58-151` | 3-slider missed-call calculator (trust slot) | "Change those assumptions" → tool (`:112-115`); **"Get this checked properly" → `/create`** (`:139-142`) |
| 3 | ProblemSelector | `components/marketing/Interactive.tsx:48-122` | 3-tab problem picker | per tab: tool link (`:107-110`) + "How the install works" → `/ai-receptionist-for-contractors` or `/ai-business-system` (`:111-113`) — 6 links, 2 visible at a time |
| 4 | BeforeAfter | `components/marketing/HomeSections.tsx:22-68` | 2 problem cards + 1 solution card | none |
| 5 | WorkflowStory | `components/marketing/WorkflowStory.tsx:262-303` | 6-frame illustrated call | none (labelled "Illustration… not a customer" `:296-298`) |
| 6 | ProcessSteps | `HomeSections.tsx:117-178` | 3 steps + sticky "what you get" card | **"Request a free AI opportunity review" → `/create`** (`:151-154`) |
| 7 | ToolShowcase | `HomeSections.tsx:184-227` | 5 free-tool cards (`lib/data/freeTools.ts` `order: 1..5` at `:85,179,272,365,458`) | 5 tool cards (`:200-215`) + "See all free tools" → `/tools` (`:220-223`) |
| 8 | PricingSection | `HomeSections.tsx:236-322` | 3 packages from `lib/data/packages.ts` + Care Plan row | **"Start with Starter" / "Build my system" / "Request a quote" → `/create?package=…`** (`:280-286`, labels from `packages.ts:37,58,75`); "Full pricing" → `/pricing` (`:313-316`) |
| 9 | LocalSection | `HomeSections.tsx:331-384` | Surrey positioning + service-area chips | **"Request a free AI opportunity review" → `/create`** (`:348-350`); "AI receptionist in Surrey" → `/locations/ai-receptionist-surrey-bc` (`:354-357`) |
| 10 | FaqSection | `Interactive.tsx:137-214` (items `lib/data/homeFaqs.ts`) | 2-column accordion | "Read the full FAQ" → `/faq` (`:207-209`) |
| 11 | FinalCta | `HomeSections.tsx:406-487` | dark close + "what happens after you click" | **"Request a free AI opportunity review" → `/create`** (`:431-435`); "or just use the free calculators" → `/tools` (`:436-442`) |
| 12 | Footer | `components/Footer.tsx:32-185` | chrome | "Open the calculator" → tool (`:95-98`); **"Request a review" → `/create`** (`:99-101`); 4 link columns; **"Live demo" → `/demo`** (`:159`) — the only link to `/demo` on the page |

### 1.2 CTA inventory

- **Links to `/create` in the homepage body: 8** (hero, calc strip, process, pricing ×3, local, final). Plus navbar desktop, navbar mobile, footer = **11 on the rendered page.**
- **Distinct labels for that one destination: 7** — "Request a free AI opportunity review" (×5 incl. mobile nav), "Request a review" (×2), "Get this checked properly", "Start with Starter", "Build my system", "Request a quote". Seven names for one form is a comprehension tax, and "opportunity review" / "review" both read as a call or meeting the site cannot schedule (see §1.5).
- **Total body links styled or positioned as CTAs: 26** (22 visible at once — 4 sit in hidden tab panels). Against the brief's target of two, the page has thirteen times the competing calls to action.
- **`/demo` is not linked from the hero, any body section, or the navbar.** The only route to the site's "unfakeable proof" (16-audit §4) is the footer's "Live demo" link (`Footer.tsx:159`) and the buried `route.demoHref` inside the `/start` overlay (`lib/data/builder.ts:181-182`). `lib/data/site.ts:46-48` records that `/demo` was deliberately dropped from the nav.

### 1.3 Five-second test (hero only, `Hero.tsx:45-77`)

| Question | Answered? | Evidence |
|---|---|---|
| What he builds | **Yes** | H1 `:52` "…answered by an AI receptionist built for contractors." |
| Who it's for | **Yes** | eyebrow `:45` "for Surrey & Metro Vancouver contractors"; H1 "contractors" |
| The problem | **Yes** | `:56-58` "answers the calls you miss while you're on site… chases the quotes that go quiet" |
| Why trust him | **Weak** | `:61-63` ownership argument only ("You keep the number, the data and the accounts"). No person, no demo link, no proof. The visual (`CallTimeline.tsx:62,98`) is explicitly fictional. 16-audit §4 already found "no evidence anyone has ever paid them"; the hero adds nothing to that. |
| Next step | **Ambiguous** | `:66-70` "Request a free AI opportunity review" → a 3-step form. "Review" implies a session; the destination is a questionnaire with a one-business-day reply (`app/create/page.tsx:29-32`). |

- **Price in hero: NO.** The first on-page price is `HomeSections.tsx:272-278` (section 8). The meta description promises "From $1,500 CAD" (`app/page.tsx:40`) but the visible hero does not. Published pricing is the one differentiator the closest local rival lacks (16-audit §4) — it should not be eight sections down.
- **Go-live timeline in hero: YES** — `:57-58` "Installed in about a week". Consistent with `HomeSections.tsx:125` "Usually live in about a week" and `packages.ts:28` "Live in ~5 business days".

### 1.4 "Book a…" language — confirmed absent from the working-tree homepage, present in production

- **Working tree homepage:** zero "Book a/an/my" strings in `app/page.tsx`, `components/marketing/*`, `Navbar.tsx`, `Footer.tsx`. `lib/data/site.ts:25-33` carries the rule ("Do not reintroduce 'Book a call' language") and `bookingUrl` is dead config (`:32-33`, "currently referenced by nothing").
- **Working tree, still live elsewhere:** `components/PhoneReceptionistPlan.tsx:74` **"Book a setup call"** (rendered on `/pricing` — 16-audit §2b P6 cites `app/pricing/page.tsx:70`); `components/SolutionFinder.tsx:211` **"Book a free 15-min call"**; `lib/data/faqs.ts:58` "you book a free 15-minute call to confirm scope" (on `/faq`). All three promise a scheduled call.
- **Production (`curl https://aibuiltbyhand.com/`, 135,727 bytes):** H1 class `mf-h1`, text "Missed calls, late quotes, invoice chasing —" — this is `components/home/MoltenForge.tsx`, which `app/page.tsx` no longer imports. Rendered CTAs: `href="/create" …>Book a fit check`, `href="/create" …>Book my fit check →`, `href="/create" …>Book my workflow audit` (three matches; `MoltenForge.tsx:599,771,874`, `AUDIT_HREF = "/create"` at `:39`). Zero occurrences of "Request a free". **Production today promises a booking three times and delivers a form.**
- **Calendar integration:** `.env.local` contains the name `CALCOM_API_KEY=` (name only; value not read). `grep -rni "calcom|cal\.com|calendly|savvycal|acuity" app components lib` returns only prose inside `lib/data/*.ts` content files and the `site.ts:29` comment — **no SDK, no embed, no fetch, no link.** Confirmed: nothing on the site can book anything.

---

## 2. LEAD CAPTURE

### 2.1 `/create` — `components/BuildRequestForm.tsx` (3 steps, `STEPS` at `:41`)

**Fields per step (asked BEFORE contact info: up to 14):**

| Step | Fields | File:line |
|---|---|---|
| 0 "The build" | goal (textarea, required), useType (2 chips), industry (9 trade chips from `lib/data/intake.ts:30-141`) | `:210-228` |
| 1 "Your setup" | `OccupationIntake` 2–5 trade-specific fields (`intake.ts`, e.g. plumbing asks 5 at `:46-52`), tasks (textarea), existing (4 chips), website (url), tools (text), budget (4 chips from `packages.ts`), timeline (4 chips) | `:230-280` |
| 2 "You" | name (required), email (required), phone | `:282-301` |

**Note the trade intake is mis-targeted:** `intake.ts` asks the *contractor's customer's* questions ("What's the issue — Leak / water…", "Best callback number", "Active water or gas issue?" at `:47-51`), not questions about the contractor's business. A plumber filling in a lead form is asked whether *they* have a gas leak. This is the showroom's customer-intake schema (`intake.ts:5-7` says the ids match `showroom.ts`) reused as a B2B lead form.

| Check | Result | Evidence |
|---|---|---|
| Visible labels vs placeholder-only | Step 0/1 questions are `<p className="field-label">` (**not** `<label>`) via `Group` `:346-355`; step 2 uses `<label>` | `:350`, `:285,289,293` |
| `for`/`id` association | **None anywhere.** `<label className="field-label">Name *</label>` then `<input required value={form.name} … placeholder="Your name" />` — no `htmlFor`, no `id` (`:285-286`, `:289-290`, `:293-294`). Textareas `:213-219`, `:241-246` and inputs `:254-259`, `:263-267` have no `id`, `aria-label` or `aria-labelledby`. Accessible name falls back to placeholder text (Chrome) or nothing. | WCAG 1.3.1 / 4.1.2 fail |
| Chip groups | `ChipRow` buttons carry no `aria-pressed` and no group semantics; the question above them is a `<p>` — a screen reader hears "Not sure yet, button" with no question | `:358-386` (contrast `OccupationIntake.tsx:53` which DOES set `aria-pressed`) |
| Required indicators | red `*` in text only (`:351`); `required` attr only on name/email (`:286,290`); goal has a visual `*` but no `required`/`aria-required` (`:212-220`) — enforcement is the disabled Next button (`:86,323`) | |
| Inline validation | None. Native browser bubbles for name/email (16-audit S9 still open) | `:286,290` |
| Invalid-input no-op | Whitespace-only name passes `required`, fails `.trim()`, guard calls `go(STEPS.length-1)` = current step → **nothing happens on screen** (16-audit S8 still open) | `:102-105` |
| Error message | Rendered, but at **1.66:1** — `text-red-300` (`#fca5a5`) on `bg-red-500/10` over white (`#fdecec`). Invisible to most users; no `role="alert"`/`aria-live` | `:307-310` |
| Server error text discarded | `if (!res.ok) throw new Error();` — the API's human 502 copy (`app/api/build-request/route.ts:124-125`) never reaches the user (16-audit S10 still open) | `:122` |
| Duplicate-submit guard | ✓ `disabled={status === "sending"}` | `:329` |
| Loading state | ✓ spinner + "Sending…" | `:330-334`; page-level Suspense skeleton `app/create/page.tsx:36` |
| Success state | ✓ replaces form, names next step, mailto fallback; **but** no focus move / `role="status"`, so screen-reader users get no announcement | `:129-148` |
| Failure state | ✓ exists (see contrast above) | `:307-310` |
| Empty state | n/a (form) | |
| Rate-limited | **No client or server rate limit on `/api/build-request`** (16-audit S12 still open; handler `route.ts:34-129` has dedupe only, `:32`) | |
| Offline | Network throw → same generic error line | `:124-126` |
| Spam protection | **No honeypot, no timestamp, no captcha.** Only honeypot in the repo is `components/forge/ForgeExperience.tsx:370,469` (retired `/forge` route) | grep |
| UTM / referrer capture | Only a custom `?src=` tag passed through (`:52-55`, `:118`). No `utm_*`, no `document.referrer`, no landing path | grep: `utm_` appears only in `lib/data/shop.ts:34` (outbound) |
| Privacy note | `:297-300` "No spam, no obligation…" at `text-ink/35` = **2.17:1**, 12px; no link to `/privacy` | |
| Stale budget ranges | ✓ none — bands render from `packagePriceLabel()` (`:15-20`) | |
| Personal Gmail in success + error copy | `site.email` = `pavneets956@gmail.com` (`lib/data/site.ts:11`) rendered at `:142-144`, `:309` (16-audit §4) | |

### 2.2 `/start` — `components/ConsultationCall.tsx` (voice-led overlay; `app/start/page.tsx:43`)

**Question order (7 answers before email, no name field at all):** pain chips `:455-456` → business name `:462-463` → volume `:466-467` → "Yes, show me the plan" `:495-496` → team size `:503-507` → jobs/week `:509-510` → software `:512-516` → email `:533-538`. Contact = email only; the "name" captured is the *business* name (`:432`).

| Check | Result | Evidence |
|---|---|---|
| 16-audit S4/S5 (fire-and-forget, false "sent") | **FIXED.** `await fetch` + `res.ok` check + `leadStatus` state machine; closing screen branches on `sent / sending / failed / no-email`; retry button and mailto on failure, `role="alert"` | `:421-448`, `:771-802` |
| Success-note contrast | `.hbc-note{color:#c7c7cc}` on white = **1.68:1** at 12px — the "Your plan has been sent" confirmation is effectively invisible | `:896`, `:775-779` |
| Input label | `<input ref … placeholder={inputPh} …>` — no `<label>`, `aria-label` or `aria-labelledby`; the spoken/typed question is a sibling `div.hbc-q` (`:632-636`) not linked to the input | `:739-747` — 4.1.2 fail |
| Focus indicator | `.hbc-inputrow input{…outline:none}` + `:focus{border-color:#1d1d1f}` — only a 1.5px bottom-border colour change | `:858-859` |
| Overlay semantics | `position:fixed;inset:0;z-index:100` div with **no `role="dialog"`, no `aria-modal`, no focus trap, no initial focus, no Escape handler**; global `<header>`/`<footer>` remain in the DOM and tab order behind it (`app/layout.tsx:120-126`) | `:588-593`, `:810-812` |
| "thinking" indicator | `<span className="hbc-thinking" aria-label="designing" />` — `aria-label` on a bare `span` with no role is not announced | `:719` |
| Unsupported claims spoken to the lead | "Even 2–3 missed jobs a week can mean thousands in lost revenue a month" `:110`; "Replying in under a minute can double the leads you actually close" `:117`; plan cards show `impact` "~12 hrs/week saved" / "~8 hrs/week saved" / "~15 hrs/week saved" (`lib/data/builder.ts:70,86,149`) and `priceRange` **"$1,500–$2,500"** (`builder.ts:68,84,115` — the phantom band, 16-audit §2b P9). These are read aloud as a diagnosis. | |
| Sound dependency | Gate copy "turn your sound on · it talks you through it" `:611`; text is typed in sync so the flow works muted ✓; audio starts only after the user's tap ✓ (`:560-583`) | |
| Rate-limited / offline | `/api/tts` 429 handled by falling back to browser speech `:336-342`; lead POST failure → `failed` state ✓ | |
| Reduced motion | ✓ `:902-904` disables the CSS animations | |
| Other contrast fails in the overlay | `.hbc-exit #a1a1a6` 13px **2.57:1** `:813`; `.hbc-gate-skip #a1a1a6` `:820`; `.hbc-gate-sub` `:825`; `.hbc-diag-k` 12px on `#fafafa` **2.46:1** `:867`; `.hbc-flow-sub` `:880`; `.hbc-row span:first-child #86868b` 15px **3.62:1** `:885`; `.hbc-flow-arrow #86868b` `:881` | |
| Touch targets | `.hbc-exit` and `.hbc-gate-skip` are 13px text with no padding (~16px tall) | `:813`, `:820` |

### 2.3 `components/intake/OccupationIntake.tsx`

- `<label className="…">{f.label}</label>` with no `htmlFor`; `<input>` with no `id` (`:37-44`) — same association failure as §2.1.
- Chips correctly use `aria-pressed` (`:53`) — the pattern `BuildRequestForm.ChipRow` should copy.
- framer-motion slide on every trade change with no reduced-motion check (`:21-28`).

### 2.4 `lib/data/builder.ts` — only consumed by `ConsultationCall`

Invented statistics (`impact` at `:70,86,102,149`) and the phantom price band (`:68,84,115`) are the only "stale range" defects found in the lead flows; the `/create` form itself is clean.

### 2.5 User-visible state matrix (NO SILENT STATES rule)

| State | `/create` BuildRequestForm | `/start` ConsultationCall | `/demo` Showroom | `/demo/*` ToolChat / ReceptionistChat |
|---|---|---|---|---|
| Loading | ✓ `:330-334` | ✓ "Sending your plan…" `:771-773` | ✓ typing dots + spinner `:407-408,346` (visual only) | ✓ bounce dots `ToolChat:112-122` (visual only) |
| Success | ✓ `:129-148` (not announced) | ✓ but **1.68:1** `:775-779` | n/a | n/a |
| Error | ✓ but **1.66:1**, generic `:307-310` | ✓ `:790-802` | ✓ scripted notice `role="status"` `:414-428` | ✗ 500/429 masked as "Sorry, could you say that again?" `ToolChat:58-62`, `ReceptionistChat:54-57` (no `res.ok`) |
| Empty | n/a | n/a | seeded example ✓ `:62-88` | greeting ✓ |
| Invalid input | ✗ native bubbles; whitespace no-op `:102-105` | ✓ spoken re-ask on bad email `:535-538` | n/a | n/a |
| Rate-limited | ✗ none exists (`route.ts`) | n/a (TTS 429 handled) | ✓ "Free demo limit reached" `:337,601-606` — but **`retryAfter` is ignored** (`:191`), so a 3/min throttle is presented as a hard cap | ✗ (see Error) |
| Offline | generic error | `failed` state | ✓ falls to script + notice | ✓ "the line dropped" `ReceptionistChat:59-62` |
| Waiting on email | ✗ no confirmation email is sent to the lead (16-audit S6; `route.ts:262,274`) | promises "I'll follow up by email" `:778` — same gap | n/a | n/a |

---

## 3. DEMO / SHOWROOM UX

### 3.1 `/demo` — `components/showroom/Showroom.tsx` (server: `app/api/demo/route.ts`)

| Requirement | Met? | Evidence |
|---|---|---|
| Select worker | ✓ 6 workers, `aria-pressed` | `:263-286` |
| Select industry | ✓ 9 industries, `aria-pressed` | `:293-305` |
| Try prompts | ✓ 3 quick prompts + free textarea, Enter-to-send | `:310-348` |
| See captured info | ✓ "What the AI captured" dl | `:496-533` |
| Owner summary | ✓ "Lead / job summary" + "What happens next" | `:536-550` |
| "AI is responding" state | **Visual only.** `Typing` dots `:461-472`, spinner in send button `:346`, prompts disabled `:316`. No `aria-live`/`role="status"` on the message list or typing row, so assistive tech hears nothing while the model works. | |
| Simulation disclosed | ✓ footer pill "Demo mode — no real call, text, email or booking sent" `:430-432`; panel titled "Simulated business updates" `:555`; system prompt forbids claiming real sends `lib/data/showroom.ts:268,278`; page meta `app/demo/page.tsx:7` | |
| Scripted-fallback disclosure (16-audit S7) | **FIXED** — `scripted` state, `role="status"` notice, `fallback` flag checked on all six 200-OK degradation paths | `:52-57`, `:128-162`, `:414-428` |
| Contact CTA after demo | **Conditional.** The dark CTA card renders only when `cta.show \|\| atLimit` (`:595`) — i.e. when the model decides, or after 8 turns (`:21`). A visitor who tries two prompts and leaves sees no "get this" path in the body (only the navbar's "Request a review"). | `:593-618` |

Additional defects:
- **"Dismiss and retry" does not retry** — `onDismissScripted` only sets `scripted=false` (`:234`, `:421-427`). Label promises an action the button doesn't perform.
- **No `focus-visible` styling on any control** (grep: 0 `focus-visible`, 1 `focus:outline-none`) — and that one is the free-text `textarea` `:338`, which removes the outline **without a replacement ring** → keyboard focus is invisible on the main input (2.4.7 fail).
- Section labels `text-muted-light` (`#A1A1A6`) 11px uppercase on white = **2.57:1** (`:361`, `:498`, `:538`, `:540`, `:555`).
- Bubble role labels **8.5px** `text-ink/40` = **2.44:1** (`:451`, `:463`).
- Demo-mode pill **10px** (`:430`); scripted notice **10px** (`:417`). Contrast passes (`#6e6e73` on `#f2efea` = 4.42 — **just under 4.5**, borderline fail; `#b42318` = 6.57 ✓) but 10px text is below any practical readability floor on a phone mock-up.
- "Reset conversation" is 13px text with no padding (~18px tall) `:350-353`; "Dismiss and retry" is an inline 10px button `:421-427` — both under the 24×24 minimum (2.5.8).
- Reduced motion: `useReducedMotion` gates streaming/scroll/delays ✓ (`:33,92,101,167,183`) but `Typing` dots animate `repeat: Infinity` regardless (`:466-468`), and `Bubble`/event `motion.*` still spring.
- CTA copy "launch in days" (`:607`) — `packages.ts:28` says "~5 business days"; fine, but "days" vs the hero's "about a week" is a third phrasing.

### 3.2 `/demo/assistant`, `/demo/lead` — `components/ToolChat.tsx` inside `components/DemoPageTemplate.tsx`

- **No simulation disclosure.** Label reads "AI Lead Assistant — live" (`app/demo/lead/page.tsx:30`); hint claims **"It replies instantly and follows up by email or text until they book"** (`:17`) — the demo is a chat box and sends nothing. `DemoPageTemplate` has no "nothing real is sent" line. The Showroom's honesty pattern (`Showroom.tsx:430-432`) is absent here.
- Contact CTA after demo ✓ always rendered — "Get this installed" → `/create?build=…` (`DemoPageTemplate.tsx:65-73`, `lead/page.tsx:23`).
- `ToolChat.tsx:58-62` — no `res.ok`; any non-network failure becomes "Sorry, could you say that again?" (16-audit S11 still open).
- Input `:141-147` has placeholder only — no label/`aria-label` (4.1.2).
- "Restart" `:91-97`: `text-xs text-ink/40` = **2.46:1**, ~16px tall.
- Message list `:100-123` is not a live region; typing indicator not announced.
- `DemoPageTemplate.tsx:48` hint at `text-ink/40` **2.46:1**, 12px.

### 3.3 `components/ReceptionistChat.tsx` (embedded on use-case pages)

Identical structure and identical defects: no `res.ok` (`:53-57`), unlabelled input (`:140-146`), "Restart" at 2.46:1 and ~16px (`:87-93`), no live region (`:97-120`), no disclosure that nothing is booked. Send button ✓ `aria-label="Send"` (`:151`).

---

## 4. ACCESSIBILITY — WCAG 2.2 AA

### 4.1 Skip link — **MISSING**
No "skip to" / `sr-only` skip link anywhere in `app/` or `components/` (grep). `<main className="min-h-screen">` (`app/layout.tsx:123`) has no `id`. With a 5-link nav plus CTA on every page, keyboard users tab through the header on every route. (2.4.1)

### 4.2 Landmarks — good, one exception
`<header>` `Navbar.tsx:47`, `<nav aria-label="Main">` `:56`, `<main>` `layout.tsx:123`, `<footer>` `Footer.tsx:36`, `<figure>/<figcaption>` on the hero visual `CallTimeline.tsx:61,97`. Exception: the `/start` overlay (§2.2) is a `div` with no dialog role sitting over an intact header/main/footer.

### 4.3 Heading hierarchy — good
Homepage: one `<h1>` (`Hero.tsx:51-53`); each section has an `<h2>` (`LiveCalcStrip:65`, `Interactive:60,197`, `WorkflowStory:276`, `primitives.tsx:127` via `SectionHeading`, `HomeSections:338,421`); cards use `<h3>` (`HomeSections:52,79,168,205,269,305`); FAQ questions are `<h3><button>` (`Interactive:154-158`). `/demo` one `<h1>` (`Showroom:209`), `/create` (`create/page.tsx:24`), `/start` (`start/page.tsx:24`), `LandingTemplate:79` ✓. Production homepage also has exactly one `<h1>` (curl). Footer column heads are `<p class="v-label">` (`Footer.tsx:190`) — acceptable, though `<h2>` would give screen-reader navigation.

### 4.4 Focus-visible

| Surface | Status | Evidence |
|---|---|---|
| `.btn-primary / .btn-secondary / .btn-ghost / .btn-invert` | ✓ 2px white + 4px red ring | `app/globals.css:206-210, 226-228, 238-241, 256-259` |
| Range sliders | ✓ outline on the input + thumb ring | `globals.css:578-588` |
| Navbar links, brand, hamburger, mobile links | ✓ | `Navbar.tsx:61,79,106,132` |
| Footer links / icon links | ✓ | `Footer.tsx:43,201,215` |
| Problem tabs, FAQ buttons, tool cards | ✓ inset/outer ring | `Interactive.tsx:77,161`; `HomeSections.tsx:202` |
| `.field` inputs | ✓ `focus:ring-2` | `globals.css:339-343` |
| ChipRow / OccupationIntake chips | ✓ `focus-visible:ring-2 ring-clay/50` | `BuildRequestForm.tsx:374`, `OccupationIntake.tsx:55` |
| BuildRequestForm progress step buttons | ✗ none (browser default only) | `:163-185` |
| Showroom — every button + textarea | ✗ none; textarea removes outline with no replacement | `Showroom.tsx:268-347`, `:338` |
| ReceptionistChat / ToolChat Restart + suggestion chips | ✗ browser default only | `ReceptionistChat.tsx:87-93,126-133` |
| ConsultationCall chips, gate, exit, input | ✗ input `outline:none` with bottom-border change only | `:855-861` |
| Legacy `FAQSection` | ✓ inset ring | `FAQSection.tsx:19` |

### 4.5 Keyboard operability
- Mobile menu: `aria-expanded` + `aria-controls` (`Navbar.tsx:110-112`), Escape closes (`:39-44`), body scroll lock (`:29-36`) ✓. It is a disclosure, not a modal — acceptable.
- Problem tabs: correct roles (`Interactive.tsx:65-98`) but **no arrow-key navigation / roving tabindex** — every tab is a tab stop (APG deviation, not a hard WCAG fail).
- `/start` overlay: **no focus trap, no initial focus, no Escape** — Tab reaches the hidden navbar behind a `position:fixed` full-screen layer (`ConsultationCall.tsx:810`; layout still renders header/footer `layout.tsx:120-126`). (2.4.3 / 2.1.2 risk)
- Showroom textarea: Enter sends, Shift+Enter newline ✓ (`:333`).
- `MagneticButton` (`components/MagneticButton.tsx:25-37`) is mouse-only cosmetics on a real `<Link>` ✓.

### 4.6 Accessible names on icon-only controls
✓ Hamburger `aria-label` + `aria-expanded` (`Navbar.tsx:109-111`); footer `IconLink aria-label` (`Footer.tsx:214`); chat Send buttons (`ReceptionistChat:151`, `ToolChat:152`, `Showroom:342`, `ConsultationCall:747`).
✗ `ConsultationCall.tsx:719` `<span aria-label="designing" />` — no role, not announced.
✗ `Showroom.tsx:283` `motion.span` selection dot has no text — fine because `aria-pressed` carries state.

### 4.7 Alt text / decorative images
No `<img>` on the homepage; all SVG marks are `aria-hidden` (`Logo.tsx:15`, `primitives.tsx:74-75`, `CallTimeline.tsx:52`, `GlowBackground.tsx:9`). lucide-react `^0.400.0` (`package.json:25`) renders `aria-hidden="true"` by default, and most call sites also set it explicitly. `public/founder.jpg` remains unused (16-audit §4) — when it is used, it needs a real `alt`.

### 4.8 Touch-target sizes (2.5.8 minimum 24×24; 44 recommended)

| Control | Size (from classes/CSS) | Verdict | Evidence |
|---|---|---|---|
| Hamburger, brand link | 44 / min-h-44 | ✓ | `Navbar.tsx:61,106` |
| Mobile nav links | min-h-48 | ✓ | `:132` |
| Desktop nav links | 15px text, no padding (~18px) | ✗ below 24 (row of links, not inline prose) | `:79` |
| All `.btn-*` | 48px | ✓ | `globals.css:198,217,235,248` |
| Range sliders | 44px hit box | ✓ | `globals.css:537-542` |
| FAQ +/- affordance | 44×44 | ✓ | `Interactive.tsx:167` |
| Footer text links | py-0.5 + 15px (~26px) | ✓ marginal | `Footer.tsx:201` |
| Footer icon links | 36×36 | ✓ | `:215` |
| Form chips | py-2/1.5 + 14px (~30–34px) | ✓ | `BuildRequestForm:374`, `OccupationIntake:55` |
| Progress step buttons | h-7 (28px) | ✓ | `BuildRequestForm:172` |
| Chat "Restart" | 12px text, no padding (~16px) | ✗ | `ReceptionistChat:87-93`, `ToolChat:91-97` |
| Showroom "Reset conversation" | 13px, no padding (~18px) | ✗ | `Showroom:350-353` |
| Showroom "Dismiss and retry" | 10px inline | ✗ | `:421-427` |
| `/start` "✕ Skip" / "skip — just explore" | 13px, no padding (~16px) | ✗ | `ConsultationCall:813,820` |
| `/start` chips | 11px pad + 16px text (~44px) | ✓ | `:855` |

### 4.9 Colour contrast — computed from `app/globals.css` / `tailwind.config.ts` values

Body / grey text tokens:

| Pair | Ratio | Verdict |
|---|---|---|
| `--v-ink #1d1d1f` on `#ffffff` | 16.83 | ✓ |
| `--v-ink-2 #3a3a3d` on white / `--v-field #f6f6f6` | 11.34 / 10.49 | ✓ |
| `--v-muted #686868` on white / field / `--v-recess #f9f9f9` | 5.57 / 5.16 / 5.29 | ✓ (used for `.v-lead/.v-small/.v-micro/.v-label`) |
| `--v-muted-light #8a8a8f` on white | 3.44 | ✗ for text — correctly reserved for non-text (`globals.css:518-523`); only text-adjacent use is decorative dots ✓ |
| `ink-soft` / `--muted #6e6e73` on white / `paper-2 #f5f5f7` | 5.07 / 4.66 | ✓ |
| `--muted-light #a1a1a6` on white | **2.57** | ✗ used as TEXT in `Showroom.tsx:361,498,538,540,555` and `ConsultationCall` (§2.2) |
| `--v-on-dark #f4f4f6` / `--v-on-dark-muted #a1a1a6` on `#1d1d1f` | 15.32 / 6.54 | ✓ (FinalCta) |
| `text-ink/30` `#bbbbbc` on white | 1.92 | ✗ `Showroom:523` empty-value dash |
| `text-ink/35` `#b0b0b1` on white | **2.17** | ✗ `BuildRequestForm:298` privacy note; `.field` placeholders (`globals.css:341`) |
| `text-ink/40` `#a5a5a5` on white | **2.46** | ✗ `ReceptionistChat:85,90`; `ToolChat:89,94`; `DemoPageTemplate:48`; `BuildRequestForm:141,177,182`; `LandingTemplate:56,105,119,241,250-253`; `Showroom:451,463` |
| `text-ink/55` `#838384` on white | 3.79 | ✗ at 14px `LandingTemplate:207` (comparison "alternative" column) |
| `text-ink/60` `#777779` on white | 4.47 | ✗ marginal at 16px (`BuildRequestForm:137`); ✓ at 18px large text (`create/page.tsx:29`, `DemoPageTemplate:42`) |
| `text-ink/70` `#616162` on white | 6.19 | ✓ |
| `text-white/70` on ink | 8.77 | ✓ |

Accent red on each background token:

| Pair | Ratio | Verdict / where |
|---|---|---|
| `--v-accent #e0362c` on white | **4.44** | ✗ for text <18px — the design already knows (`globals.css:59-63`, `WorkflowStory.tsx:40-43`) and routes red text through `--v-accent-press`; usage audit: every red *text* on the homepage uses `--v-accent-press` (`WorkflowStory:46,85`, `HomeSections:263`) ✓; `--v-accent` is used only for marks (`.v-label::before`, dots, bars, focus rings, link underline) where 3:1 applies ✓ |
| `--v-accent` on `--v-field #f6f6f6` / `--v-recess #f9f9f9` | 4.11 / 4.21 | ✓ as a mark (≥3:1), ✗ as text — no text use found |
| `--v-accent` on ink band `#1d1d1f` | 3.79 | ✓ mark only; FinalCta text uses `--v-accent-on-dark` `:463` |
| `--v-accent` on `--v-accent-wash #ffe9e7` | 3.82 | ✗ as text — `PricingSection` badge correctly uses `--v-accent-press` on wash = **5.50** ✓ (`HomeSections:263`) |
| `--v-accent-press #b8221a` on white | 6.40 | ✓ |
| `--v-accent-on-dark #ff7a70` on ink | 6.63 | ✓ |
| `--danger #b42318` on white | 6.57 | ✓ (`Showroom:417`, `ConsultationCall:899`) |
| `.hbc-note #c7c7cc` on white | **1.68** | ✗ `/start` success note `:896` |
| `.hbc-voice #d2d2d7` on white | 1.51 | ✗ (decorative label, `:815`) |
| `#86868b` on white | 3.62 | ✗ `ConsultationCall:860,881,885` |
| `/create` error `#fca5a5` on `#fdecec` | **1.66** | ✗ `BuildRequestForm:307-308` |
| `WindowChrome` traffic-light dots | 2.84 | n/a decorative, `aria-hidden` ✓ (`primitives.tsx:166`) |

Verdict: the Verseo token system on the homepage is contrast-clean. Every failure is in code that predates it — `/create`, `/start`, `/demo`, `/demo/*`, `LandingTemplate` — where Tailwind opacity classes (`text-ink/40`) and the legacy `#a1a1a6` grey are used for text.

### 4.10 `prefers-reduced-motion`

| Mechanism | Respects RM? | Evidence |
|---|---|---|
| Marketing `Reveal` (CSS class toggle) | ✓ | `globals.css:701-707` sets `.v-reveal{opacity:1;transform:none;transition:none}` |
| `v-ring-bar`, `v-live-dot` | ✓ static shape | `globals.css:677-685` |
| Global CSS animations/transitions | ✓ | `globals.css:731-740` (`* { animation-duration: .001ms … }`) — also neutralises `animate-ping/bounce` in the chat components |
| **Legacy `components/Reveal.tsx` (framer-motion)** | ✗ no `useReducedMotion`; no `MotionConfig` anywhere (grep) — framer drives inline styles via JS, so the CSS override does not apply. Used by `/create` (`create/page.tsx:20-33`), `/demo/assistant`, `/demo/lead` (`DemoPageTemplate:33-64`), `LandingTemplate.tsx` (≈200 routes), `app/solutions`, `app/use-cases` | `Reveal.tsx:6-31` |
| `BuildRequestForm` step slide | ✗ | `:200-207` |
| `OccupationIntake` | ✗ | `:21-28` |
| `FAQSection` height animation | ✗ | `:29-41` |
| `MagneticButton` spring | ✗ (pointer-only, low impact) | `:22-23` |
| `Showroom` | partial — see §3.1 | `:33,466-468` |
| `ConsultationCall` | ✓ | `:902-904` |
| `HeroFlowField` (unused on current homepage) | ✓ | `components/home/HeroFlowField.tsx:101` |

### 4.11 Content initially hidden by opacity
- **Marketing `Reveal`:** `useState(() => typeof IntersectionObserver === "undefined")` (`components/marketing/Reveal.tsx:30`) is `true` during SSR, so server HTML ships with `is-in` (visible); the client initialiser returns `false` → **className hydration mismatch** is likely. React 18 does not reconcile attribute mismatches in production, so content should stay visible, then the observer re-adds `is-in`. **UNVERIFIED** — needs a console check by the browser agent. The `.next/server/app/index.html` artefact on disk is stale (contains no `v-reveal`), so it cannot confirm this.
- **Legacy `Reveal`:** `initial="hidden"` (`Reveal.tsx:27`) makes framer-motion emit `style="opacity:0;transform:translateY(24px)"` in server HTML; content is invisible until hydration + IntersectionObserver, with per-block delays up to 0.25 s (`DemoPageTemplate:64`, `LandingTemplate:86`). No-JS visitors and search-engine screenshot tools see blank pages. **UNVERIFIED on production** — the `/create` fetch timed out before the inline-style count printed.
- Hidden tab panels use the `hidden` attribute (`Interactive.tsx:98,179`) ✓ correct.

### 4.12 Modal / dialog focus trapping
Only one modal-like surface: the `/start` overlay — no trap (§2.2, §4.5). The mobile nav sheet is a disclosure and needs none.

### 4.13 Form error announcement
- ✓ `ConsultationCall.tsx:781,790` `role="alert"`; `Showroom.tsx:415` `role="status"`; `LiveCalcStrip.tsx:129` `aria-live="polite"` on the result.
- ✓ **Reference implementation already in the repo:** `components/tools/ui.tsx:49` (`role="alert"` error with `id`), `:69-70` (`aria-describedby` + `aria-invalid`), `:220,266,281` (`aria-live` results). The lead form should reuse these primitives.
- ✗ `BuildRequestForm.tsx:307-310` error `<p>` has no `role`/`aria-live`; success screen `:129-148` moves no focus; no `aria-describedby` / `aria-invalid` anywhere in the form.

---

## 5. GLOBAL CHROME CONSISTENCY

**Header/footer identity:** `ChromeGate` hides the global chrome only on `/creators`, `/ai-front-desk`, `/forge` (`components/ChromeGate.tsx:7,16`). Every other route — homepage included since 2026-08-01 (`:12-15`) — shares `Navbar` + `Footer`. Brand mark and wordmark are identical in both (`Navbar:64-71`, `Footer:45-51`).

**But production is different:** the deployed homepage is `MoltenForge.tsx`, which ships its own nav (`class="mf-nav-cta"` → "Book a fit check" in the curl) — so on production the homepage header ≠ the header on every internal page. This resolves the moment the branch deploys.

**Inconsistencies in the working tree:**
1. **CTA label drift in the chrome:** desktop nav "Request a review" (`Navbar:100`) · mobile nav "Request a free AI opportunity review" (`:154`) · footer "Request a review" (`Footer:100`) · hero "Request a free AI opportunity review". Same href, three labels.
2. **No active-route indicator** — no `aria-current`, no active class (`Navbar:75-85`), despite the token comment listing "active nav" as a permitted red use (`globals.css:55-56`).
3. **`/demo` absent from the nav** (`site.ts:50-56`, rationale `:46-48`).
4. **"How It Works" is `/#how-it-works`** (`site.ts:53`) — on internal pages it navigates home and relies on `scroll-padding-top:88px` (`globals.css:121-122`) ✓.
5. **Dead anchor `/#finder`** — the homepage has no `id="finder"` (ids present: `how-it-works`, `tools`, `pricing`, `start`, `faq`, `what-we-install`). Links to it: `LandingTemplate.tsx:91` (every service/industry/location/compare/resource page), `app/solutions/page.tsx:45,88`, `app/use-cases/[slug]/page.tsx:118`, `app/use-cases/page.tsx:69`. Clicking lands on the top of the homepage.
6. **Three visual systems from the user's seat:**
   - Homepage + Navbar + Footer: Verseo `v-*` tokens, 17px body, dimension-callout labels, 4px controls, hairline shadows.
   - `/create`, `/demo/assistant`, `/demo/lead`, all `LandingTemplate` pages, `/solutions`, `/use-cases`: legacy "blueprint" — `GlowBackground` grid (`GlowBackground.tsx:11`), `eyebrow` pill (`globals.css:321-324`), `glass-card` bordered cards (`:267-275`), `rounded-3xl` forms, `MagneticButton`, `pt-32` hero offset under a 72px header (`create/page.tsx:16`, `LandingTemplate:52`), `text-ink/NN` opacity greys.
   - `/demo` Showroom: `container-page`, 24px `rounded-card`, phone mock-up with `#F2EFEA` warm gradient (`Showroom:388`) — the only warm surface on a cool-neutral site.
7. **Positioning contradiction across chrome vs templates:** Footer "Based in Surrey, BC… Remote elsewhere in BC" (`Footer:58-59`), FinalCta "Remote everywhere else in BC" (`HomeSections:444-445`) vs `LandingTemplate.tsx:253-255` "USD / AUD / NZD quotes on request. Built remotely for small businesses across Canada, the US, Australia & New Zealand" and `app/layout.tsx:73` `alternateLocale: ["en_US","en_AU","en_NZ","en_GB"]`.
8. **Mobile menu behaviour** ✓ as documented in §4.5; the sheet is not full-height and shows the full-length CTA label; closing on link tap ✓ (`Navbar:132`).

---

## 6. SEVERITY-RANKED DEFECT LIST

| ID | Sev | Surface | Defect | Evidence |
|---|---|---|---|---|
| D01 | **P0** | Production homepage | Three "Book…" CTAs promise a booking; no calendar exists; the fix (branch) is not deployed | curl: `Book a fit check` / `Book my fit check →` / `Book my workflow audit` → `/create`; `MoltenForge.tsx:39,599,771,874`; no cal.com/calendly code |
| D02 | **P0** | `/create` | Only error message renders at 1.66:1 (`text-red-300` on light) — failures are effectively silent | `BuildRequestForm.tsx:307-310` |
| D03 | **P0** | `/create`, `OccupationIntake`, `/start`, chats | No form control has a programmatic label (`for`/`id`, `aria-label`) | `BuildRequestForm:213-219,241-247,254-267,285-295`; `OccupationIntake:37-44`; `ConsultationCall:739-747`; `ReceptionistChat:140-146`; `ToolChat:141-147` |
| D04 | **P1** | Homepage | `/demo` (strongest proof) not reachable from hero, body or nav; only footer | `Footer.tsx:159`; `site.ts:46-48` |
| D05 | **P1** | Homepage | 8 body links + 3 chrome links to `/create` under 7 labels; 26 CTA-styled links vs a target of 2 | §1.2 |
| D06 | **P1** | Homepage | Price absent from hero; first price at section 8 | `Hero.tsx:45-77`; `HomeSections:272-278` |
| D07 | **P1** | `/create` | Up to 14 questions before contact; trade intake asks the *customer's* questions of the contractor | `BuildRequestForm:210-280`; `intake.ts:46-52` |
| D08 | **P1** | `/api/build-request` | No rate limit, no honeypot, no UTM/referrer capture | `route.ts:34-129`; grep |
| D09 | **P1** | `/start` | Overlay is not a dialog: no role/aria-modal/focus trap/Escape; nav+footer tabbable behind it | `ConsultationCall:588-593,810`; `layout.tsx:120-126` |
| D10 | **P1** | `/start` | Success note 1.68:1; six other sub-4.5 greys in the overlay | `ConsultationCall:813,820,825,860,867,880,885,896` |
| D11 | **P1** | `/start` | Invented statistics and phantom `$1,500–$2,500` band spoken as diagnosis | `ConsultationCall:110,117`; `builder.ts:68,70,84,86,115,149` |
| D12 | **P1** | `/demo/lead` | Hint claims the demo "follows up by email or text until they book"; no simulation disclosure on `/demo/*` | `app/demo/lead/page.tsx:17`; `DemoPageTemplate.tsx` |
| D13 | **P1** | Site-wide | No skip link; `<main>` has no id | grep; `layout.tsx:123` |
| D14 | **P1** | ~200 routes | Legacy `Reveal` ships `opacity:0` in SSR and ignores reduced motion; no `MotionConfig` | `components/Reveal.tsx:6-31`; `create/page.tsx:20-33`; `LandingTemplate.tsx` |
| D15 | **P1** | `/demo` | Textarea `focus:outline-none` with no replacement; zero `focus-visible` styles on any showroom control | `Showroom.tsx:338`; grep count |
| D16 | **P2** | `/demo`, `/demo/*` | "AI is responding" is visual only — no live region on messages/typing | `Showroom:406-409,461-472`; `ToolChat:100-123` |
| D17 | **P2** | `/demo` | Contact CTA only when model says so or after 8 turns | `Showroom:595` |
| D18 | **P2** | `/demo` | "Dismiss and retry" only dismisses; `retryAfter` ignored so a 60-s throttle reads as a hard cap | `Showroom:234,421-427,191`; `api/demo/route.ts:107-114` |
| D19 | **P2** | `/demo/*`, use-case chats | No `res.ok`; server errors read as the AI being dim (16-audit S11) | `ToolChat:58-62`; `ReceptionistChat:54-57` |
| D20 | **P2** | `/create` | Whitespace-name no-op; native validation bubbles; server 502 copy discarded; success not announced (16-audit S8/S9/S10) | `BuildRequestForm:102-105,122,129-148,286,290` |
| D21 | **P2** | `/pricing`, `SolutionFinder`, `/faq` | Residual "Book a setup call" / "Book a free 15-min call" copy | `PhoneReceptionistPlan.tsx:74`; `SolutionFinder.tsx:211`; `faqs.ts:58` |
| D22 | **P2** | Landing pages | Dead `/#finder` anchor on every `LandingTemplate` page + 4 others | `LandingTemplate:91`; `solutions/page.tsx:45,88`; `use-cases/[slug]/page.tsx:118`; `use-cases/page.tsx:69` |
| D23 | **P2** | `/demo`, `/create`, `LandingTemplate`, chats | `text-ink/40` (2.46:1), `#a1a1a6` (2.57:1), `text-ink/35` (2.17:1), `text-ink/55` (3.79:1) used for text | §4.9 rows |
| D24 | **P2** | Chats, showroom, `/start` | Sub-24px controls: Restart, Reset conversation, Dismiss and retry, Skip | §4.8 |
| D25 | **P2** | Chrome | CTA label drift (3 labels, 1 href); no active-route state | `Navbar:100,154`; `Footer:100` |
| D26 | **P3** | Homepage tabs | No arrow-key navigation on `role="tablist"` | `Interactive.tsx:65-90` |
| D27 | **P3** | Desktop nav | Link targets ~18px tall | `Navbar:79` |
| D28 | **P3** | `/start` | `aria-label` on role-less `span` | `ConsultationCall:719` |
| D29 | **P3** | Internal pages | Three visual systems; `LandingTemplate` international copy vs BC-local chrome | §5 items 6–7 |
| D30 | **P3** | All lead flows | No confirmation email to the lead (16-audit S6) — blocked on Resend domain verification per memory | `route.ts:262,274` |

---

## 7. RECOMMENDED HOMEPAGE SECTION ORDER + CTA POLICY

**CTA policy (site-wide):** exactly two CTA identities.

| Role | Label | Href | Style | Where it may appear |
|---|---|---|---|---|
| Primary | **Try the live AI demo** | `/demo` (or `#demo` when the demo is embedded inline) | `.btn-primary` | Hero, after the demo strip, pricing footer row, FinalCta, navbar (desktop + mobile) |
| Secondary | **Request a free 10-minute fit check** | `/create` (renamed route optional: `/fit-check`) | `.btn-secondary` / `.btn-invert` on dark | Hero, pricing cards (with `?package=`), LocalSection, FinalCta, footer panel |

Rules: (a) every other link (tool cards, "See all free tools", "Full pricing", "Read the full FAQ", location link) becomes a `.v-link` text link, not a button; (b) the two labels never vary — retire "Request a review", "opportunity review", "Get this checked properly", "Start with Starter", "Build my system", "Request a quote" (`packages.ts:37,58,75` `cta.label`); (c) **honesty constraint:** with no calendar, "10-minute fit check" must be defined on the page and the form as "10 minutes of your answers; a written yes/no-fit reply with a price within one business day" — never "call". If a Cal.com link is ever wired (`site.ts:29`), change the label in the same commit; (d) "fit check" has zero search presence (`site.ts:44`) — it is a CTA label, not a keyword target, which is fine.

**Section order (11 → 9):**

1. **Hero** — keep H1/eyebrow/support (`Hero.tsx:45-63`). Replace the two buttons with Primary + Secondary. Add one proof-and-price line under them: "From $1,500 CAD, one-time · live in about a week · you own the number, the data and the accounts" (values from `packages.ts:26,28`). Keep `CallTimeline` and its "not a customer result" caption.
2. **Live demo strip (new)** — embed the receptionist Showroom in "lite" form (worker fixed to Receptionist, industry chips, 3 prompts, phone + captured panel) with the "Demo mode — nothing real is sent" pill (`Showroom:430-432`) and the Secondary CTA underneath. This replaces the calculator as the trust slot; the calculator moves to §6. If embedding is too heavy for the first pass, use a static `WindowChrome` transcript with the Primary CTA.
3. **ProblemSelector** — keep; convert its per-tab buttons to text links (§7 rule a).
4. **WorkflowStory** — keep as is (already honest, already illustrated).
5. **Pricing** — moved up from 8 to 5. Card CTAs → Secondary with `?package=`; "Full pricing" → text link.
6. **Free tools + calculator** — merge `LiveCalcStrip` into `ToolShowcase` (calculator on the left, 4 remaining tool cards on the right). Removes one `/create` button.
7. **How it works** — `ProcessSteps` with the sticky card's button → Secondary.
8. **Local** — keep; button → Secondary; location link → text link.
9. **FAQ** — keep.
10. **FinalCta** — keep the close copy; buttons → Primary + Secondary (`btn-invert` for the secondary on dark); "what happens after you click" list must describe the *written* fit check.

Drop **BeforeAfter** (its three cards restate ProblemSelector + WorkflowStory). Navbar: add "Live demo" to `navLinks` (`site.ts:50-56`), set the nav button to Primary, unify the mobile label.

---

## 8. RECOMMENDED SHORT LEAD FORM SPEC (`/create` → "fit check")

**Step 1 — required, one screen, submits the lead:**

| Field | Control | Notes |
|---|---|---|
| Name | `<input id="fc-name" autocomplete="name" required>` with `<label for>` | |
| Email **or** phone | one `<input id="fc-contact" inputmode="email" autocomplete="email tel">` labelled "Best way to reach you (email or mobile)"; server accepts either (`LeadSchema` at `route.ts:28-30` currently requires email — widen to `email \| phone`) | |
| Business name + type | `<input id="fc-biz">` + trade chips reusing `TRADES` labels only (`intake.ts:30-141`) as a `role="radiogroup"` with `aria-checked`; "Something else" allowed | do **not** render `trade.fields` here |
| What are you trying to automate? | `<textarea id="fc-goal" required>` with three prefill chips: "Answer missed calls", "Chase quotes", "Admin at 9pm" (`Interactive.tsx:18,28,38` language) | `?goal=`, `?package=`, `?industry=` presets kept (`BuildRequestForm:45-55`) |
| Honeypot | visually-hidden `website2` field + render timestamp; server rejects if filled or < 3 s (`route.ts` before persist) | pattern in `ForgeExperience.tsx:370,469` |
| Privacy line | "Read by Pav, replied within one business day. No list, no drip. [Privacy]" → `/privacy` at `--v-muted` (5.57:1) | |

**Step 2 — optional, shown on the success screen after the lead is stored:** call volume (chips), tools used today, timeline, budget (from `packagePriceLabel`), anything else. Posts a second `PATCH`/`POST` with the lead id (`route.ts:94-98` already returns `id`); never gates the thank-you.

**States (all required in the same commit):** loading (button spinner, disabled, `aria-busy`); inline invalid (`aria-invalid` + `aria-describedby` error `role="alert"` at `--danger` 6.57:1 — copy `components/tools/ui.tsx:49,69-70`); success (replace form, `role="status"`, move focus to the `<h2>`, show the address/number entered, "didn't hear back?" mailto); failure (show `error` text from the 502 body `route.ts:124-125`, retry button, mailto); rate-limited (429 from a new limiter using `lib/rateLimit.ts` → "Too many requests — try again in N s"); offline (`navigator.onLine` check + "you're offline; your answers are kept"). Capture `utm_source/medium/campaign/content/term`, `document.referrer`, landing path and `src` into the passthrough payload. Confirmation email to the lead stays **BLOCKED** on Resend domain verification (memory) — surface that on the success screen honestly ("I reply from pav@… — check spam") rather than implying an auto-receipt.

---

## 9. ACCESSIBILITY FIX LIST (ordered)

1. Skip link: `<a href="#main" class="sr-only focus:not-sr-only …">Skip to content</a>` as the first child of `<body>`; `id="main"` on `layout.tsx:123`.
2. Label every control (D03): `htmlFor`/`id` pairs or `aria-labelledby` to the question element; `ChipRow` → `role="radiogroup"` + `aria-checked` or `aria-pressed` like `OccupationIntake:53`.
3. Replace every text use of `text-ink/40`, `text-ink/35`, `text-ink/55`, `text-muted-light` / `#a1a1a6`, `#86868b`, `#c7c7cc` with `--v-muted` (`#686868`) or `--v-ink-2`; error text → `--danger`; `/create` error box → `bg-[var(--v-accent-wash)] text-[var(--danger)]` (6.57:1 on white; recompute on wash).
4. `/start` overlay → `role="dialog" aria-modal="true" aria-labelledby`, focus trap, Escape = Skip, `inert` on `header/main/footer` while open, return focus on close.
5. Global `MotionConfig reducedMotion="user"` in `components/Providers.tsx`; make legacy `Reveal` render `initial={false}` when `useReducedMotion()` is true and never emit `opacity:0` server-side (or migrate those pages to `components/marketing/Reveal.tsx`).
6. Live regions: wrap chat message lists in `aria-live="polite"` containers; give `Typing` a visually-hidden "AI is typing" text; `role="status"` on the /create success screen.
7. Focus-visible: add the shared ring to Showroom buttons/textarea, chat Restart/suggestions, `/start` chips/gate/exit/input, progress-step buttons.
8. Touch targets: give Restart / Reset / Skip / Dismiss `min-h-[44px] px-3`; desktop nav links `min-h-[44px]` or `py-3`.
9. Tabs: roving `tabIndex` + ArrowLeft/Right on `Interactive.tsx:65-90` (or drop tab roles and use plain buttons with `aria-pressed`).
10. `aria-current="page"` on the active nav link; fix `hbc-thinking` to `role="status"` with visually-hidden text.
11. Replace `/#finder` links with `/tools` or the Secondary CTA.

---

## 10. PROPOSED IMPLEMENTATION PLAN — file ownership

| Workstream | Files | Notes |
|---|---|---|
| **W1 — CTA policy + copy** | `lib/data/site.ts` (add `cta` constants + "Live demo" nav item), `components/marketing/Hero.tsx`, `HomeSections.tsx` (ProcessSteps/Pricing/Local/FinalCta; delete `BeforeAfter`), `Interactive.tsx` (tab buttons → links), `LiveCalcStrip.tsx` (button → text link or remove), `components/Navbar.tsx:98-101,153-155`, `components/Footer.tsx:95-101`, `lib/data/packages.ts:37,58,75` (`cta.label`), `components/PhoneReceptionistPlan.tsx:74`, `components/SolutionFinder.tsx:211`, `lib/data/faqs.ts:58`, `app/page.tsx:128-145` (new order) | Single commit; grep `Request a`/`Book a` afterward must return only the two labels |
| **W2 — Demo on the homepage** | new `components/marketing/DemoStrip.tsx` (thin wrapper over `Showroom` with fixed worker), `components/showroom/Showroom.tsx` (export a `compact` prop; persistent CTA; `retryAfter`; "Dismiss" label; live regions; focus styles), `app/page.tsx` | Depends on W1 labels |
| **W3 — Lead form rebuild** | `components/BuildRequestForm.tsx` → replace with `components/FitCheckForm.tsx` per §8, `app/create/page.tsx` (copy + `v-*` tokens), `app/api/build-request/route.ts` (contact = email\|phone, honeypot, timestamp, limiter via `lib/rateLimit.ts`, utm passthrough, return `error` text), `components/intake/OccupationIntake.tsx` (keep for the optional step 2 if desired; add `htmlFor`), `lib/data/intake.ts` (unchanged) | Reuse `components/tools/ui.tsx` field primitives |
| **W4 — Demo pages honesty + error handling** | `components/ToolChat.tsx`, `components/ReceptionistChat.tsx` (`res.ok`, live region, label, disclosure pill, Restart sizing), `components/DemoPageTemplate.tsx` (disclosure line, tokens), `app/demo/lead/page.tsx:17`, `app/demo/assistant/page.tsx:17` | |
| **W5 — /start truthfulness + a11y** | `components/ConsultationCall.tsx` (dialog semantics, focus trap, colours at `:813-901`, input label, `hbc-thinking`), `lib/data/builder.ts` (remove `impact` statistics; `priceRange` from `packagePriceLabel`) | Owner call whether `/start` survives at all — it duplicates the fit-check funnel |
| **W6 — Global a11y** | `app/layout.tsx` (skip link, `id="main"`), `components/Providers.tsx` (`MotionConfig`), `components/Reveal.tsx`, `app/globals.css` (shared `.focus-ring` utility; `.sr-only` is Tailwind-native), `components/Navbar.tsx` (`aria-current`, link height), `components/marketing/Interactive.tsx` (tab keyboard) | |
| **W7 — Internal-page chrome parity** | `components/LandingTemplate.tsx` (tokens, `/#finder`, contrast, international copy), `app/solutions/page.tsx`, `app/use-cases/page.tsx`, `app/use-cases/[slug]/page.tsx`, `components/FAQSection.tsx` (reduced motion) | Largest surface (~200 routes); can trail W1–W6 |
| **W8 — Ship** | merge + deploy the branch | Until this happens production keeps D01 regardless of everything above (memory: branch never merged; local `main` behind `origin/main`) |

Gate for each workstream: `tsc` 0, `vitest` green, and a browser pass (A-browser agent) for focus order, hydration warnings (§4.11), and axe contrast on `/`, `/create`, `/demo`, `/demo/lead`, `/start`, one `LandingTemplate` route.

---

## 11. WHAT I COULD NOT VERIFY FROM HERE

- Rendered pixel sizes, focus order, and whether the marketing `Reveal` produces a hydration warning (§4.11) — no browser.
- Production `/demo` and `/demo/lead` HTML — both `curl` attempts timed out at 20–25 s (production `/` and `/create` fetched fine). The `/create` fetch confirmed the H1 and that the form is client-rendered (0 `<label>` elements in server HTML, consistent with `Suspense` + `useSearchParams` at `create/page.tsx:36-38`).
- Whether `OPENAI_API_KEY` / `RESEND_API_KEY` are set in Vercel Production (dashboard not read) — determines how often the Showroom's scripted notice and the lead email path actually engage.
- Any click-through data: Vercel Analytics is mounted (`layout.tsx:130`) with no custom events on any CTA, so the 26-link homepage is unmeasured.

---

## SUMMARY

The working-tree homepage passes the honesty bar the owner set (no testimonials, no invented numbers, illustrations labelled as such) and answers what/who/problem/next-step in the hero — but it hides the price until section 8, never links to `/demo`, and spreads 26 CTA-styled links across 11 sections, 8 of them to the same `/create` form under 7 different labels. Production is a different, older page: `MoltenForge` with three "Book…" buttons that all open a form, and there is no calendar anywhere in the code (`CALCOM_API_KEY` is an env-var name with zero references). Deploying the branch is therefore the single largest conversion fix available.

Lead capture has the right backend contract and the `/start` fire-and-forget bug is genuinely fixed, but both front-ends fail basic accessibility: no field on `/create`, `/start`, or the demo chats has a programmatic label; `/create`'s only error renders at 1.66:1 and `/start`'s success note at 1.68:1; `/create` asks up to 14 questions (including a plumber whether *they* have a gas leak) before asking who is filling it in; there is no honeypot, rate limit, or UTM capture on the lead endpoint.

The Showroom now discloses simulation and scripted fallback correctly, but its contact CTA is conditional, its typing state is invisible to assistive tech, its main textarea has no visible focus, and `/demo/lead` claims the demo "follows up by email or text". Site-wide: no skip link, a framer-motion `Reveal` that ships `opacity:0` and ignores reduced motion on ~200 routes, a dead `/#finder` anchor on every landing page, and three visual systems.

Recommendation: two CTAs only — "Try the live AI demo" (primary) and "Request a free 10-minute fit check" (secondary, explicitly written, not a call) — a four-field first-step form with an optional second step, and the accessibility list in §9, owned per the file map in §10.

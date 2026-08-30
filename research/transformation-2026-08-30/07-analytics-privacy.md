# 07 — Analytics, Event Tracking, Privacy Accuracy (agent A7)

Date: 2026-08-30 · Branch `fix/dead-social-link` (HEAD `e732d98`) · Read-only investigation. No code changed.
Evidence rule: every claim below carries a `file:line`. Anything I could not read from the filesystem or a live API is marked **UNVERIFIED**.

---

## 1. Current analytics — what actually exists

### 1.1 Mount point and vendor

| Item | Evidence |
|---|---|
| Vendor | `@vercel/analytics ^2.0.1` — `package.json:19`. No other analytics dependency in `package.json:13-55`. |
| Mount | `app/layout.tsx:9` `import { Analytics } from "@vercel/analytics/next"`; rendered once at `app/layout.tsx:130` `<Analytics />` inside `<body>`, after `<Providers>`. Comment at L128-129: "Cookieless product analytics (no consent banner needed)". |
| Speed Insights | **Not installed.** `@vercel/speed-insights` absent from `package.json`; grep for `SpeedInsights` across `app/`, `components/`, `lib/` → 0 hits. |
| GA / GTM / gtag / dataLayer / PostHog / Plausible / Hotjar / Clarity / Meta pixel | **None.** Grep across `app/`, `components/`, `lib/` for `gtag|posthog|plausible|dataLayer|googletagmanager|google-analytics|hotjar|clarity\.ms|umami|fathom|mixpanel|fbq` → only a prose hit `components/marketing/WorkflowStory.tsx:21` ("plausible detail"). |
| `next/script`, external `<link>` / `<Script>` | None. Only `dangerouslySetInnerHTML` is inline CSS (`components/ConsultationCall.tsx:592`, `components/home/MoltenForge.tsx:583`) and JSON-LD (`components/JsonLd.tsx:4-8`). |
| Fonts | `next/font/google` (`app/layout.tsx:2,27-33`) — self-hosted at build; no runtime request to `fonts.googleapis`/`fonts.gstatic` (grep → 0 hits). Not a third party at runtime. |
| `vercel.json` | Does not exist. |

### 1.2 The wrapper — `lib/track.ts` (23 lines, whole file)

```
lib/track.ts:7   import { track as vercelTrack } from "@vercel/analytics";
lib/track.ts:9-13  export type ToolEvent = "tool_calculated" | "tool_cta_clicked" | "tool_shared" | "lead_from_tool";
lib/track.ts:15  type SafeProps = Record<string, string | number | boolean | null>;
lib/track.ts:17-23 export function trackTool(event: ToolEvent, props?: SafeProps): void { try { vercelTrack(event, props); } catch { /* never break the tool */ } }
```

Header comment `lib/track.ts:1-6` states the privacy contract (never names/emails/phones/addresses/exact financial inputs/free text) and `lib/track.ts:4` asserts custom events are "dropped (Vercel Hobby)". Introduced in commit `f5f10b1` ("Free tools: registry, shared shell + primitives, analytics").

### 1.3 Every call site (10 in product code, all inside the free-tools suite)

| Event | File:line | Props sent |
|---|---|---|
| `tool_calculated` | `components/tools/calculators/LaborBurdenCalculator.tsx:74` | `{ tool: SLUG }` |
| `tool_calculated` | `components/tools/calculators/LeadLeakAudit.tsx:46` | `{ tool: SLUG, band: result.band }` |
| `tool_calculated` | `components/tools/calculators/MissedCallCalculator.tsx:73` | `{ tool: SLUG }` |
| `tool_calculated` | `components/tools/calculators/ProfitPricingCalculator.tsx:71` | `{ tool: SLUG }` |
| `tool_calculated` | `components/tools/calculators/QuoteFollowUpGenerator.tsx:77` | `{ tool: SLUG }` |
| `tool_shared` | `LaborBurdenCalculator.tsx:88`, `MissedCallCalculator.tsx:86`, `ProfitPricingCalculator.tsx:84` | `{ tool: SLUG }` |
| `tool_cta_clicked` | `components/tools/ToolCta.tsx:23` (`ToolCtaLink`, used by `ToolResultCta` L49) | `{ tool: slug }` |
| `lead_from_tool` | **never fired.** Only reference outside the type is the test `lib/track.test.ts:24`. | — |

**PII / free-text audit: clean.** Every prop is a compile-time slug constant or the coarse `band` enum from `lib/tools/leadLeakAudit.ts`. No input values, no names, no free text reach `vercelTrack`. The existing unit test `lib/track.test.ts:12-18` pins the exact props.

**Coverage gap:** nothing outside `/tools/*` is instrumented. The homepage hero (`components/marketing/Hero.tsx`), `/demo` (`components/showroom/Showroom.tsx`), `/create` (`components/BuildRequestForm.tsx`), `/pricing` (`app/pricing/page.tsx`, `components/ServicePackages.tsx`), `/start` (`components/ConsultationCall.tsx`), and every `mailto:` link fire nothing. The whole paid funnel is blind; only the free-tool top-of-funnel is measured.

### 1.4 Plan question — are custom events retained?

Repo evidence for the "Hobby drops custom events" claim:
- `lib/track.ts:4` (author comment) and `research/keyword-gap-2026-08-12/R1-adversarial-release-review.md:230` ("Custom events also require a paid plan — on Hobby, `track()` is dropped"). Both are assertions, not observations. No plan evidence anywhere in `docs/` or `*.md`.

Live evidence gathered today (read-only, no browser):
- `.vercel/project.json` (git-ignored, mtime 2026-07-04): `projectId prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv`, `orgId team_s5GXChvX5LbYyUSzMbDiO3SO`.
- Vercel MCP `list_teams` → one team, **"Pav's Projects" (`pavs-projects-2a8231d9`, `team_s5GXChvX5LbYyUSzMbDiO3SO`), `"plan": "pro"`**.
- Vercel MCP `list_projects(team)` → returned only `roomrush`; `get_project(prj_vIDu…)` → 404; `get_web_analytics` → 404 "Web Analytics not found". **The MCP integration token is scoped to `roomrush` only — its 404s are not diagnostic for ai-shop.**
- Vercel CLI 54.21.1 (`vercel project ls --scope pavs-projects-2a8231d9`) → `ai-shop  https://aibuiltbyhand.com  updated 32d`. `vercel project inspect ai-shop` → `ID prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv · Owner Pav's Projects · Created 05 June 2026`.

**Conclusion:** `ai-shop` lives in a team the Vercel API reports as **Pro**. The Hobby assumption in `lib/track.ts:4` is most likely stale. What remains **UNVERIFIED** from here: (a) whether **Web Analytics is enabled** on the `ai-shop` project (the `<Analytics/>` component is inert until the dashboard toggle is on — `/_vercel/insights/script.js` 404s otherwise), and (b) whether any `tool_*` events have actually landed since the free tools shipped on 2026-07-16.

**How the owner verifies (2 minutes):** Vercel dashboard → team *Pav's Projects* → project *ai-shop* → **Analytics** tab. If it offers "Enable", it is off. If it shows data, open the **Events** panel (or filter *Custom events*) and look for `tool_calculated` / `tool_cta_clicked` from 2026-07-16 onward. Team → Settings → Billing confirms the plan. CLI equivalents that work now: `vercel teams ls`, `vercel project inspect ai-shop --scope pavs-projects-2a8231d9`. (There is no CLI flag for the analytics toggle; the dashboard is the source.)

### 1.5 Other data flows that matter for §4 (server side)

- `app/api/build-request/route.ts:53` — `console.log("[AI-SHOP LEAD]", JSON.stringify(lead))` writes the **entire lead** (name, email, phone, goal, tasks, and for `/start` the full `transcript` — `components/ConsultationCall.tsx:437`) to Vercel runtime logs on every submission.
- IP is read for in-memory rate limiting only: `lib/rateLimit.ts:107-111` (`clientIp`, used by `/api/demo`), `app/api/tts/route.ts:106-110`, `app/api/consultation/route.ts:39-40`. Not persisted.
- Cookies actually set by this codebase: `tp_free` (httpOnly, 180 d) at `app/api/tools/route.ts:36,315-320` — but **no client calls `/api/tools`** today (grep `fetch("/api/tools"` → 0), so it is dormant; and NextAuth session cookies on Google sign-in (`lib/auth.ts:9-12,26-28`, `SessionProvider` mounted for every visitor at `components/Providers.tsx:3-6` ← `app/layout.tsx:118`). Whether `SessionProvider`'s `/api/auth/session` fetch sets a cookie for anonymous visitors is **UNVERIFIED** (needs a browser).

---

## 2. Required event map — design

### 2.0 Reality check against the live components

- **Hero has no demo link and no "contact" link.** `components/marketing/Hero.tsx:66-72` renders exactly two CTAs: `/create` ("Request a free AI opportunity review") and `/tools/missed-call-revenue-calculator`. `/demo` is linked only from the footer (`lib/data/site.ts:46-48`). So `hero_demo_click` has no element to bind to today; `hero_contact_click` maps to the `/create` CTA (it *is* the contact path).
- **`Hero.tsx`, `ServicePackages.tsx`, `Footer.tsx` are Server Components** (no `"use client"`; `Hero.tsx:1`, `ServicePackages.tsx:1`). `onClick` cannot be attached there. A tiny client `TrackedLink` is required.
- **No calendar link, no `tel:` link on public pages.** The only `tel:` is `app/agent/leads/[id]/page.tsx:156` (auth-gated CRM, `middleware.ts:5`). `lib/data/site.ts:25-33` states there is no booking product. `calendar_click` / `phone_click` must **not** be added — a defined-but-never-fired event is a dashboard lie (that is exactly what `lead_from_tool` already is).
- **`?goal=` carries free text in the URL** (`Showroom.tsx:197-199`, `lib/data/freeTools.ts:584`, `BuildRequestForm.tsx:48`). Any "page" or "landing" prop must be **pathname only**, never `location.href`.

### 2.1 Event → component → safe props

Common props auto-attached by the wrapper (see §2.2): `page` (pathname only), `device`, `utm_source`, `utm_medium`, `utm_campaign`, `ref_host`. Everything else below is event-specific. **Nothing below is free text; no name/email/phone/prompt/goal ever.**

| Event | Fires from | Event-specific props |
|---|---|---|
| `hero_contact_click` | `Hero.tsx:66` via `<TrackedLink event="hero_contact_click" ctaId="hero_request_review">` | `cta_id: "hero_request_review"` |
| `hero_secondary_click` (new, replaces the unbindable `hero_demo_click` until a `/demo` CTA exists in the hero) | `Hero.tsx:70` | `cta_id: "hero_missed_call_calc"` |
| `hero_demo_click` | **reserved — do not add to the union until the hero links to `/demo`.** | `cta_id: "hero_demo"` |
| `demo_started` | `Showroom.tsx:114` `send()` — first successful entry per mount (guard with a `useRef(false)`; the seeded example at L62-86 does **not** count) | `worker: worker.id`, `industry: industry.id` (`lib/data/showroom.ts` ids, e.g. `receptionist`/`plumbing` — slugs only) |
| `demo_prompt_used` | quick chip `Showroom.tsx:312-314` (`onPrompt(p)`) and suggested reply `OutcomePanel` `onSuggest` (L480/L241) — pass the **index**, not `p` | `worker`, `industry`, `source: "quick" \| "suggested"`, `prompt_index: number` |
| `demo_completed` | `Showroom.tsx:188-190`, after `setCta(r.cta)` / `setLimited` — fire once when `r.cta.show` first becomes true, or when `atLimit` flips (`MAX_SESSION_TURNS = 8`, L21) | `worker`, `industry`, `turns`, `reason: "cta" \| "limit"`, `scripted: boolean` (L56 — whether the transcript used the fallback) |
| `pricing_cta_click` | `ServicePackages.tsx:57-62` (package cards → `TrackedLink`), `:86` (care plan), `app/pricing/page.tsx:100` (`MagneticButton` — client, add optional `event` prop), `Showroom.tsx:612` ("See pricing"), `components/marketing/HomeSections.tsx:313` | `cta_id`: `"starter" \| "business" \| "custom" \| "care" \| "pricing_hero" \| "demo_see_pricing" \| "home_pricing"` (from `lib/data/packages.ts:23,40,61` ids) |
| `form_started` | `BuildRequestForm.tsx` — first `set()` call (L78) per mount, via ref | `form: "build_request"`, `preset_src: presetSrc \|\| null` (L54, machine tag like `tool-missed-call-revenue-calculator`), `preset_package: presetPackage \|\| null` (L45), `preset_industry: presetIndustry \|\| null` (L50, trade id) |
| `form_step_completed` | `BuildRequestForm.tsx:89-92` `next()` after `go(step + 1)` | `form`, `step: step + 1` (1-based, the step just left), `total: 3` (`STEPS` L41) |
| `form_validation_error` | `BuildRequestForm.tsx:86` when Enter/Next is pressed while `!canAdvance` (today the Next button is `disabled` L323 but Enter routes through `submit`→`next()` L97-99); and the guard at L101-105 | `form`, `step`, `field: "goal" \| "name" \| "email"` — **field name only** |
| `form_submitted` | `BuildRequestForm.tsx:122-125` — `{ result: "ok" }` after `res.ok`; `{ result: "error", status }` in `catch` | `form`, `result`, `status: number \| null`, `budget: form.budget \|\| null` (band id, L15-20), `timeline: form.timeline \|\| null` (id, L22-27), `industry: form.industry \|\| null` (trade id) |
| `form_submitted` (secondary forms) | `ConsultationCall.tsx:426-441` → `form: "ai_builder"`; `SolutionFinder.tsx:61-69` → `form: "plan_email"` (after fixing D10); `ForgeExperience.tsx:378-384` is behind a 308 (`next.config.js:49` `/forge → /`) — skip | as above |
| `email_click` | `Footer.tsx:63,68` (primary), `app/about/page.tsx:97`, `BuildRequestForm.tsx:142` (success state), `SolutionFinder.tsx:244`, `ConsultationCall.tsx:783,796`, `app/error.tsx:70`, `app/not-found.tsx:59`, `app/global-error.tsx:121` | `location: "footer" \| "about" \| "create_success" \| "finder" \| "start_done" \| "start_failed" \| "error" \| "not_found" \| "global_error"` |
| `calendar_click`, `phone_click` | **not implemented — no such links exist.** Add in the same commit that adds a Cal.com/`tel:` link (per `site.ts:29-30`). | — |

### 2.2 Attribution — `lib/attribution.ts` (new, ~60 lines)

Vercel Web Analytics already records referrer/UTM/device **for pageviews**, but a custom event fired on `/create` after the visitor landed on `/?utm_source=x` does not carry the landing UTMs, and the lead POST carries nothing. Hence first-touch capture per session:

```ts
// lib/attribution.ts — pure core, injectable I/O so it is unit-testable in node
export type Attribution = {
  utm_source: string | null; utm_medium: string | null; utm_campaign: string | null;
  utm_term: string | null;   utm_content: string | null;
  ref_host: string | null;   // hostname of document.referrer, never the path
  landing_path: string;      // pathname ONLY — ?goal= carries free text
  device: "mobile" | "tablet" | "desktop";
};
const KEY = "hb_attr";
const SAFE = /^[a-z0-9_\-.+ ]{1,64}$/i;               // whitelist; drop anything else

export function parseAttribution(search: string, referrer: string, pathname: string, viewportW: number): Attribution
export function captureAttribution(win: Pick<Window, "location" | "document" | "innerWidth">, storage: StorageLike): Attribution
  // first-touch: if storage[KEY] exists, return it; else parse, store, return. Every storage op in try/catch.
export function getAttribution(storage?: StorageLike): Partial<Attribution>   // {} on any failure
```

- Mounted once via a 5-line `"use client"` `<AttributionCapture />` placed next to `<Analytics />` in `app/layout.tsx:130` (calls `captureAttribution(window, sessionStorage)` in `useEffect`).
- `lib/track.ts` merges `getAttribution()` + `page: location.pathname` into every event (`device`, `utm_*`, `ref_host`). External referrer hostnames only; strip `www.`.
- **Lead POST:** `BuildRequestForm.tsx:112-120` spreads `...getAttribution()` into the body (same for `ConsultationCall.tsx:429-438`, `SolutionFinder.tsx:64`). This requires **no server or schema change** — see §3.

---

## 3. Server-side lead attribution — what is persisted today

`prisma/schema.prisma:205-229` (`model BuildRequest`):

```
:206 id        String   @id @default(cuid())
:207 name      String?
:208 email     String
:209 phone     String?
:210 source    String?  // "build-request" | "plan" | "ai-builder" | "consultation"
:211 kind      String?
:212 goal      String?  @db.Text
:218 fingerprint String?
:219 dedupeKey   String? @unique
:220 payload   Json     // full raw submission — nothing is dropped
:221 status    String   @default("new")
:222 emailed   Boolean  @default(false)
:223 createdAt DateTime @default(now())
:225-228 @@index([email]) @@index([createdAt]) @@index([status]) @@index([fingerprint])
```

Write path `app/api/build-request/route.ts:174-185`: `name, email, phone, source: str(lead.source) ?? str(lead.type), kind, goal, fingerprint, dedupeKey, payload: lead`.

Findings:
1. **`source` is the *form* source, not the acquisition source.** Values are `"build-request"` (`BuildRequestForm.tsx:113` via `type`), `"plan"` (`SolutionFinder.tsx:64`), `"ai-builder"` (`ConsultationCall.tsx:430`), `"forge"` (`ForgeExperience.tsx:381`).
2. **The only acquisition tag that exists — `src=tool-<slug>`** (`lib/data/freeTools.ts:583-585` → `BuildRequestForm.tsx:51-54,118`) — survives only inside `payload.src`. No column, no index.
3. **No UTM, referrer, landing page, or device is captured anywhere** — not client-side (`BuildRequestForm.tsx:44-54` reads only `package`, `build`, `goal`, `industry`, `src`) and not server-side (route.ts never reads `referer`/`user-agent`).
4. **Zero-migration path is already open.** `LeadSchema` is `z.object({ email }).passthrough()` (`route.ts:28-30`), the whole object becomes `payload` (`route.ts:184`), and the notification email renders every unknown key in an "extra" block (`route.ts:309-313` `extraLines`, `:605-612` html mirror). Attribution keys are also outside `contentFingerprint` (`route.ts:211-227`: email + goal/want + tasks + name + source/type), so dedupe is unaffected. Query in Neon with `payload->>'utm_source'`.
5. **Migration path (optional, later).** Add nullable columns `acqSource`, `utmSource`, `utmMedium`, `utmCampaign`, `referrerHost`, `landingPath` + `@@index([utmSource])`; map them at `route.ts:174-185` with the existing `str()` helper (L295-299). **This is a production step:** `package.json:7` is `"build": "prisma migrate deploy && next build"`, so the migration executes against the **production Neon database on the next production deploy** (and against the Neon `preview` branch on preview deploys — memory: preview/prod isolation is proven). Additive nullable columns are low-risk but the deploy still needs an explicit owner GO, and the SQL should be generated locally with `prisma migrate dev --create-only`, reviewed, and committed alongside `prisma/migrations/<ts>_add_lead_attribution/`. Existing migrations: `0_init`, `20260617000000_add_user_oauth_fields`, `20260714000000_add_build_request`, `20260714010000_add_build_request_dedupe`.

Recommendation: ship option 4 now (payload JSON), defer 5 until there are enough leads that a column is worth a migration.

---

## 4. Privacy policy accuracy

`app/privacy/page.tsx` — "Last updated: June 6, 2026" (`:10`). It discloses exactly: form fields (`:32-35`), Vercel request logs "IP address and browser type" (`:37-38`), Vercel hosting (`:62`), Resend for the notification email (`:65`). `app/terms/page.tsx` mentions no processors at all.

The June 6 date predates the durable DB (`20260714000000_add_build_request`), analytics (`f5f10b1`, July 16), the showroom, and the `/start` consultation.

### 4.1 Used in code, NOT disclosed

| # | Third party / mechanism | Where it is used | What the policy says |
|---|---|---|---|
| M1 | **OpenAI** — visitor-typed text is sent to OpenAI | `/api/demo` (`app/api/demo/route.ts:2` `getOpenAI`; client sends the full chat history `components/showroom/Showroom.tsx:135-143`, and the model is asked to extract `name, phone, email` fields `demo/route.ts:49-52`) · `/api/consultation` (`route.ts:178`; `/start` interview incl. the `brief` with name/email `route.ts:37`) · `/api/tts` (`route.ts:126-131`, spoken text) · `/api/recommend` (`route.ts:34-57`, finder input) · `/api/tools-demo` (`route.ts:19`; `ToolChat` on `/demo/assistant`, `/demo/lead`) · `/api/tools` (`route.ts:325-332`, dormant) · `lib/agent/openaiConversationEngine.ts:4,26-28` | Nothing. The word "AI processor", "OpenAI", or "model" does not appear. |
| M2 | **Vercel Web Analytics** (page views, referrer, country, device, custom events) | `app/layout.tsx:9,130`; `lib/track.ts` | Only "request logs such as IP address and browser type" (`:37-38`). Analytics is a different product with different data. |
| M3 | **Neon Postgres** (via Prisma) — durable lead store | `prisma/schema.prisma:8-14` (Postgres), `:205-229`; write at `app/api/build-request/route.ts:174-185` | ":74-77 we keep inquiry information" — no processor named, no storage region (memory: Neon `iad1`, US). |
| M4 | **Google OAuth / NextAuth accounts** (email, name, `image`, `emailVerified` stored — `schema.prisma:16-31`) | `lib/auth.ts:9-12` GoogleProvider, `:27` database sessions; `/login` (`lib/auth.ts:15`); `SessionProvider` for all visitors `components/Providers.tsx:3-6` ← `app/layout.tsx:118` | Nothing about accounts, Google sign-in, or session cookies. |
| M5 | **Cookies** | NextAuth session/CSRF cookies on sign-in (`lib/auth.ts:26-28`); `tp_free` httpOnly 180-day cookie `app/api/tools/route.ts:36,315-320` (endpoint live, no caller) | No cookie section. `app/layout.tsx:128` "no consent banner needed" is defensible (analytics is cookieless; auth cookies are strictly necessary) only if they are *disclosed*. |
| M6 | **Full lead PII in Vercel runtime logs** | `app/api/build-request/route.ts:53` logs the whole lead incl. `transcript` (`ConsultationCall.tsx:437`) | ":37-38" claims logs hold IP + browser type. Under-disclosure and a data-minimisation defect (retention follows the Vercel plan and any log drain). |
| M7 | **Stripe** (dormant: `lib/stripe.ts:14`; `/api/stripe/checkout/route.ts:13-16` returns 503 without a key, `:18-20` requires sign-in) | `app/api/stripe/*` | Not mentioned. Acceptable while dormant; must be added the day Tools Pro or `/shop` checkout goes live. |
| M8 | **Twilio** (outbound-call agent) | `lib/agent/callManager.ts:5`, `app/api/agent/call/webhook/route.ts:6` | Not mentioned. Only reachable through the auth-gated `/agent/*` (`middleware.ts:5`), so it is an internal tool, not a visitor data flow. **Note:** if the agent ever dials the public, that is a CASL/CRTC unsolicited-telecom matter, outside this policy and this report. |

### 4.2 Disclosed but not used

None. Vercel and Resend are both real (`route.ts:260-278`).

### 4.3 Accuracy nits

- `components/tools/ToolCta.tsx:53` "nothing you enter is uploaded unless you submit the contact form" — true for the input **values** (calculators are pure client code in `lib/tools/*`), but `tool_calculated` does send a beacon with the tool slug/band. Suggested wording: "The numbers you enter never leave your browser. We count that the tool was used — nothing else."
- `app/demo/page.tsx:7` ("no real call, text, email or booking sent") is accurate and should be echoed in the policy's AI section.
- `:50-51` "we do not send marketing email unless you ask" — consistent with `route.ts` (only a self-notification to `LEAD_NOTIFY_EMAIL`, `:262`). Fine.

---

## 5. Testing — exact specs

### 5.1 Unit (vitest, `environment: "node"` — `vitest.config.ts:8`; no `jsdom` in devDependencies, so attribution must be I/O-injected, not DOM-bound)

**`lib/attribution.test.ts` (new)**

```ts
import { describe, it, expect } from "vitest";
import { parseAttribution, captureAttribution, getAttribution } from "./attribution";

const mem = () => { const m = new Map<string,string>(); return {
  getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => { m.set(k, v); }, removeItem: (k: string) => { m.delete(k); } }; };

describe("parseAttribution", () => {
  it("reads the five utm_* params, lowercased and whitelisted", () => {
    const a = parseAttribution("?utm_source=Google&utm_medium=cpc&utm_campaign=recep-aug&utm_term=x&utm_content=y", "", "/", 1280);
    expect(a).toMatchObject({ utm_source: "google", utm_medium: "cpc", utm_campaign: "recep-aug", utm_term: "x", utm_content: "y" });
  });
  it("drops values that fail the whitelist (injection / free text)", () => {
    const a = parseAttribution("?utm_source=<script>&utm_campaign=" + encodeURIComponent("a".repeat(65)), "", "/", 1280);
    expect(a.utm_source).toBeNull(); expect(a.utm_campaign).toBeNull();
  });
  it("keeps landing_path as pathname only — ?goal= free text must never be stored", () => {
    const a = parseAttribution("?goal=" + encodeURIComponent("my name is Bob, call 604-555-0100"), "", "/create", 1280);
    expect(a.landing_path).toBe("/create"); expect(JSON.stringify(a)).not.toContain("Bob");
  });
  it("stores the referrer hostname only, without www", () => {
    expect(parseAttribution("", "https://www.reddit.com/r/Contractors/comments/abc?x=1", "/", 1280).ref_host).toBe("reddit.com");
    expect(parseAttribution("", "", "/", 1280).ref_host).toBeNull();
  });
  it("classifies device by viewport width", () => {
    expect(parseAttribution("", "", "/", 390).device).toBe("mobile");
    expect(parseAttribution("", "", "/", 820).device).toBe("tablet");
    expect(parseAttribution("", "", "/", 1440).device).toBe("desktop");
  });
});

describe("captureAttribution — first touch wins", () => {
  it("writes on first call and does not overwrite on a later page with new utms", () => {
    const s = mem();
    const first = captureAttribution({ location: { search: "?utm_source=google", pathname: "/" }, document: { referrer: "" }, innerWidth: 1280 } as any, s);
    const second = captureAttribution({ location: { search: "?utm_source=bing", pathname: "/create" }, document: { referrer: "" }, innerWidth: 1280 } as any, s);
    expect(first.utm_source).toBe("google"); expect(second.utm_source).toBe("google"); expect(second.landing_path).toBe("/");
  });
  it("never throws when storage throws (private mode)", () => {
    const bad = { getItem: () => { throw new Error("denied"); }, setItem: () => { throw new Error("denied"); }, removeItem: () => {} };
    expect(() => captureAttribution({ location: { search: "", pathname: "/" }, document: { referrer: "" }, innerWidth: 1 } as any, bad)).not.toThrow();
    expect(getAttribution(bad)).toEqual({});
  });
});
```

**`lib/track.test.ts` (extend the existing file; keep the three tests at `:12-31`)**

```ts
it("attaches attribution + page to every event and never a raw URL", () => {
  // inject: track(event, props, { attribution: {...}, page: "/create" })
  track("form_submitted", { form: "build_request", result: "ok" }, { page: "/create?goal=secret", attribution: { utm_source: "google" } });
  const [, props] = trackMock.mock.calls[0];
  expect(props.page).toBe("/create"); expect(props.utm_source).toBe("google"); expect(JSON.stringify(props)).not.toContain("secret");
});
it("privacy tripwire: refuses values that look like an email, a phone number, or exceed 64 chars", () => {
  track("email_click", { location: "footer", note: "pav@example.com" } as any);
  track("demo_prompt_used", { worker: "receptionist", text: "x".repeat(65) } as any);
  for (const [, p] of trackMock.mock.calls) { expect(JSON.stringify(p)).not.toMatch(/@|x{65}/); }
});
it("union does not contain calendar_click / phone_click / hero_demo_click (no such links exist)", () => {
  // type-level: `const e: SiteEvent = "calendar_click"` must fail tsc; runtime: EVENT_NAMES snapshot
  expect(EVENT_NAMES).not.toContain("calendar_click");
});
```

**`tests/build-request.test.ts` (extend; pattern at `:1-37` already mocks Prisma + Resend)**

```ts
it("round-trips attribution keys into payload and into the notification text, untouched by dedupe", async () => {
  db.findFirst.mockResolvedValue(null); db.create.mockResolvedValue({ id: "row1" }); sendMock.mockResolvedValue({ data: { id: "e1" }, error: null });
  process.env.RESEND_API_KEY = "test";
  const res = await POST(post({ ...validLead, utm_source: "google", utm_campaign: "recep-aug", ref_host: "reddit.com", landing_path: "/", device: "mobile" }));
  expect(res.status).toBe(200);
  const data = db.create.mock.calls[0][0].data;
  expect(data.payload).toMatchObject({ utm_source: "google", ref_host: "reddit.com" });
  expect(sendMock.mock.calls[0][0].text).toContain("utm_source: google");   // extraLines() renders unknown keys (route.ts:309-313)
  // fingerprint identical with/without attribution → same dedupeKey prefix
});
```

### 5.2 Manual / Playwright check on a Preview deploy, then prod (not run by me)

Playwright is **not** a dependency (`package.json:42-55`); the MCP Playwright tools cover a manual run. Spec, if a runner is added later at `tests/e2e/analytics.spec.ts`:

```ts
test("beacons fire and carry attribution", async ({ page }) => {
  const script = page.waitForResponse(r => r.url().includes("/_vercel/insights/script.js"));
  await page.goto("/?utm_source=qa&utm_medium=e2e&utm_campaign=a7");
  expect((await script).status()).toBe(200);                       // 404 ⇒ Web Analytics is OFF on the project
  await page.waitForRequest(r => r.url().includes("/_vercel/insights/view"));   // pageview
  const ev = page.waitForRequest(r => r.url().includes("/_vercel/insights/event") && r.postData()!.includes("hero_contact_click"));
  await page.getByRole("link", { name: /Request a free AI opportunity review/ }).click();
  const body = JSON.parse((await ev).postData()!);
  expect(body.en).toBe("hero_contact_click");
  expect(body.ed).toMatchObject({ page: "/", utm_source: "qa", cta_id: "hero_request_review" });
  expect(JSON.stringify(body.ed)).not.toMatch(/@|goal=/);
  expect(await page.evaluate(() => sessionStorage.getItem("hb_attr"))).toContain('"utm_source":"qa"');
});
```

Manual steps (DevTools → Network, filter `insights`): the same three requests. Then the **only proof of retention** is the Vercel Analytics → Events panel showing the event a few minutes later — the client beacon fires identically on every plan; dropping (if any) happens server-side. For the lead body: submit the `/create` form on **Preview** with a clearly labelled test email, then confirm `utm_source` appears in the Neon `preview` branch row (`select payload->>'utm_source' from "BuildRequest" order by "createdAt" desc limit 1`) and in the notification email's extra block. Never seed fake leads on production.

---

## Defect list

| ID | Sev | Defect | Evidence |
|---|---|---|---|
| D1 | P1 | Privacy policy omits **OpenAI**, which receives visitor-typed text from 6 live endpoints, including a demo that is prompted to extract name/phone/email | `app/privacy/page.tsx` (no mention); `app/api/demo/route.ts:2,49-52`; `Showroom.tsx:135-143`; `consultation/route.ts:178`; `tts/route.ts:126-131`; `recommend/route.ts:34-57` |
| D2 | P1 | Privacy policy omits **analytics** entirely | `app/layout.tsx:130`; `privacy/page.tsx:37-38` |
| D3 | P1 | **Full lead PII (incl. `/start` transcript) written to Vercel logs**; policy says logs hold IP + browser type | `app/api/build-request/route.ts:53`; `ConsultationCall.tsx:437`; `privacy/page.tsx:37-38` |
| D4 | P2 | Policy omits Neon (DB), Google sign-in/accounts, cookies | `schema.prisma:8-14,16-31`; `lib/auth.ts:9-28`; `app/api/tools/route.ts:315-320` |
| D5 | P2 | **Zero event coverage outside `/tools`** — hero, `/demo`, `/create`, `/pricing`, `/start`, footer email all blind | §1.3 table; `Hero.tsx:66-72`; `BuildRequestForm.tsx:94-127`; `Showroom.tsx:114-192` |
| D6 | P2 | `lead_from_tool` is defined and never fired — a dead event that reads as "0 leads" | `lib/track.ts:13`; grep → only `lib/track.test.ts:24` |
| D7 | P2 | Custom-event retention **unverified**; `lib/track.ts:4` assumes Hobby but the owning team reports Pro; Web Analytics enablement unknown | §1.4 — MCP `list_teams` plan `"pro"`; CLI `project inspect ai-shop`; MCP token scoped to `roomrush` |
| D8 | P2 | No UTM/referrer/landing/device captured anywhere; only `src=tool-*` survives, and only inside `payload` JSON | `BuildRequestForm.tsx:44-54,118`; `route.ts:174-185`; `schema.prisma:205-229` |
| D9 | P3 | Silent validation bounce on `/create` — missing name/email jumps to step 3 with **no message** (NO SILENT STATES violation; also makes `form_validation_error` unobservable) | `BuildRequestForm.tsx:101-105` |
| D10 | P3 | `SolutionFinder` shows "saved" even when the lead POST fails — false success and a false `form_submitted` if instrumented as-is | `components/SolutionFinder.tsx:57-70` (`setSaved(true)` outside the `try` result) |
| D11 | P3 | Free-tool footer copy "nothing you enter is uploaded" vs. the `tool_calculated` beacon — wording, not a leak | `components/tools/ToolCta.tsx:53`; `LeadLeakAudit.tsx:46` |
| D12 | P3 | Free text rides in URLs (`?goal=`) — any naive `page: location.href` or `landing: href` prop would leak it into analytics | `Showroom.tsx:197-199`; `freeTools.ts:584`; `BuildRequestForm.tsx:48` |
| D13 | P3 | Policy date "June 6, 2026" predates every data flow above | `privacy/page.tsx:10` vs migrations `20260714*`, commit `f5f10b1` |
| D14 | P3 | `.vercel/project.json` is correct, but the Vercel **MCP** integration cannot see `ai-shop` — future sessions will misread its 404s as "project missing" | MCP `list_projects` → `roomrush` only; CLI lists 10+ projects incl. `ai-shop` |

---

## Proposed implementation plan (file ownership)

**Phase 0 — verify, owner, 2 min, before any code.** Vercel dashboard → *ai-shop* → Analytics: enabled? Events panel shows `tool_*` since 2026-07-16? Record the answer in memory. Outcome decides whether Phase 1 is "instrument" or "enable + instrument". Also re-scope the Vercel MCP integration to include `ai-shop` (D14) — a settings change, owner-only.

**Phase 1 — plumbing (no UI change, no migration).**
- `lib/track.ts` — widen to `SiteEvent` (§2.1 names; **no** `calendar_click`/`phone_click`/`hero_demo_click`), add generic `track(event, props)`, keep `trackTool` as a thin alias so the 10 existing call sites and `lib/track.test.ts` stay green; merge `getAttribution()` + `page` (pathname only) into every event; add the dev-only privacy tripwire (email/phone/>64-char values dropped, `console.warn` in dev). Fix `lib/track.ts:4` comment to state the plan is Pro-per-API / retention verified-on-date-X.
- `lib/attribution.ts` (new) + `components/analytics/AttributionCapture.tsx` (new, `"use client"`, mounted in `app/layout.tsx` beside `<Analytics />` L130).
- `components/analytics/TrackedLink.tsx` (new, `"use client"`): `next/link` wrapper with `event` + `ctaId`; `TrackedAnchor` variant for `mailto:`.
- Tests: `lib/attribution.test.ts` (new), `lib/track.test.ts` (extend), `tests/build-request.test.ts` (extend) — §5.1.

**Phase 2 — instrument (component owners).**
- `components/marketing/Hero.tsx:66,70` → `TrackedLink`.
- `components/ServicePackages.tsx:57-62,86`, `components/marketing/HomeSections.tsx:313` → `TrackedLink`; `components/MagneticButton.tsx` gains optional `event`/`ctaId`; `app/pricing/page.tsx:100` passes them.
- `components/showroom/Showroom.tsx` — `demo_started` (L114 with a ref), `demo_prompt_used` (L314 index + `onSuggest` L241), `demo_completed` (L188-190), `pricing_cta_click` (L612). Never pass `p`, `text`, `messages`.
- `components/BuildRequestForm.tsx` — `form_started`/`form_step_completed`/`form_validation_error`/`form_submitted` (L78-127); spread `...getAttribution()` into the body at L112-120; **replace the silent bounce at L101-105 with a visible inline message** (fixes D9 and makes the error event honest).
- `components/ConsultationCall.tsx:429-438` — attribution spread + `form_submitted form:"ai_builder"`.
- `components/SolutionFinder.tsx:57-70` — fix D10 first (set saved only on `res.ok`, show an error otherwise), then `form_submitted form:"plan_email"`.
- `components/Footer.tsx:63,68` (+ the other `mailto:` sites) → `TrackedAnchor event="email_click"`.
- `components/tools/ToolCta.tsx:53` wording (D11). Either fire `lead_from_tool` from `BuildRequestForm` `form_submitted` when `presetSrc` starts with `tool-`, or delete it from the union (D6) — deleting is cleaner; `form_submitted.preset_src` carries the same information.

**Phase 3 — truth (server + policy, no migration).**
- `app/api/build-request/route.ts:53` — log `{ id, source, kind, hasPhone, emailDomain }` only; drop the full-lead log (D3). Covered by a new assertion in `tests/build-request.test.ts` that `console.log` output never contains the email.
- `app/privacy/page.tsx` — new sections: *Analytics* (Vercel Web Analytics, cookieless, what is recorded, custom events carry no personal data); *AI processing* (OpenAI — demo/consultation/finder/voice text is sent to generate a reply, not used to train, don't type real personal details into the demo; the demo sends no real calls/texts/emails per `app/demo/page.tsx:7`); *Where data is stored* (Neon Postgres — confirm region from the Neon console before writing "United States"); *Accounts & cookies* (Google sign-in, NextAuth session cookie, `tp_free`); *Logs* (accurate description after D3 fix); bump `updated` (`:10`). `app/terms/page.tsx` unchanged. Consult a Fable design pass on the wording only if the owner wants the policy restyled; content is the point.

**Phase 4 — optional migration (owner GO required).** `prisma/schema.prisma:205-229` + `prisma/migrations/<ts>_add_lead_attribution/`, mapping at `route.ts:174-185`. Executes via `package.json:7` on the next deploy — Preview first (Neon `preview` branch), then production.

**Gate for Phases 1-3:** `tsc` 0 · `vitest run` all green (114 existing + new) · `next build` 0 · Preview: `/_vercel/insights/script.js` 200, `view` + `event` beacons observed with `utm_*` in `ed`, a labelled test lead's `payload` shows attribution in the Neon preview branch · owner confirms the event in the Vercel Events panel. Status until then: **PLANNED**.

---

## Summary (≤250 words)

Analytics today is a single `<Analytics />` mount (`app/layout.tsx:130`) plus a privacy-safe wrapper `lib/track.ts` with four event names, ten call sites, all inside the free-tools suite, all sending only slugs and a coarse band — no PII, no free text. One event (`lead_from_tool`) is defined but never fired. Everything that matters commercially — hero CTA, `/demo`, `/create`, `/pricing`, `/start`, email links — is completely unmeasured.

The "custom events are dropped on Hobby" assumption in `lib/track.ts:4` looks stale: the Vercel API reports the owning team "Pav's Projects" as **Pro**, and the CLI confirms `ai-shop` (`prj_vIDu…`) lives there. Whether Web Analytics is *enabled* on the project, and whether any event has ever landed, is still unverified — a two-minute dashboard check. The Vercel MCP token is scoped to `roomrush` only, so its 404s prove nothing.

Attribution is nearly free to add: `LeadSchema` is `.passthrough()` and the full body is stored as `payload` JSON, so UTM/referrer/landing/device can ride into the DB and the notification email with zero server changes and **no migration**. A column-level migration is a production step (`prisma migrate deploy` runs in the build) and should wait.

The privacy policy is the real liability: dated June 6, it omits OpenAI (six endpoints receive visitor text, one asks the model to extract name/phone/email), analytics, the Neon database, Google sign-in, cookies — and understates logging while `route.ts:53` writes every lead, transcript included, to Vercel logs. Fix D1–D3 before any traffic push; instrument in the same release.

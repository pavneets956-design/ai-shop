# AI Phone Receptionist — launch pricing implementation (2026-10-08)

Status: **IMPLEMENTED LOCALLY; independently reviewed and validated by Codex.**
Claude implemented the pricing changes; Codex reviewed and extended the combined diff.
Nothing was committed, pushed or deployed. See `receptionist-review-2026-10-08/verification.md`
for final validation and release boundaries. The live production site remains unchanged.

## The approved offer (single source: `lib/data/packages.ts` → `phonePlan`)

| Term | Value | Field |
|---|---|---|
| Setup (fixed, one-time) | $750 CAD | `phonePlan.setup` |
| Monthly (launch pricing, month-to-month) | $179 CAD | `phonePlan.monthly` |
| Included AI-handled minutes / month | 300 | `phonePlan.includedMinutes` |
| Extra minute | $0.25 CAD | `phonePlan.overagePerMinute` |
| Small customer changes / month (no rollover) | 30 min | `phonePlan.includedChangeMinutes` |
| Taxes | extra | in `PHONE_PRICE_SENTENCE` |

Reusable exports: `PHONE_SETUP_PRICE`, `PHONE_MONTHLY_PRICE`, `PHONE_OVERAGE_PRICE`,
`PHONE_PRICE_LABEL` ("$750 setup + $179/month"), `PHONE_PRICE_SHORT`,
`PHONE_PRICE_SENTENCE`, `PHONE_SCOPE_SENTENCE`, `PHONE_MONTHLY_SENTENCE`,
`PHONE_EXCLUSIONS_SENTENCE`, `PHONE_USAGE_SENTENCE`, `BUILD_AND_PHONE_PRICING`
(for sentences that name receptionists next to other builds), and the type `OfferRef`.
`phonePlan.setupIncludes`, `monthlyIncludes` (derived getter) and `notIncluded` hold the
scope lists. The old `phonePlan = { monthly: 250, usage: "...additional" }` is gone.

The phone offer is deliberately **not** a `ServicePackage`: adding it to `packages[]`
would drag $750 into the build floor, `priceRange`, the build-tier tests and the
llms.txt build list. Landing rows, use cases, featured builds and shop SKUs reference
it with `packageId: "phone"`.

## Unrelated prices — unchanged

Starter from $1,500 · Business $3,500–$7,500 · Custom from $10,000 · Care Plan $99/mo
($79 annual) · PayNudge summary. Generic "builds start at $1,500" copy was left alone
except where the same sentence named the receptionist, where it now uses
`BUILD_AND_PHONE_PRICING` or states both prices separately. No global replace of 1,500.

## Rendering + schema

- `components/LandingTemplate.tsx` — renders a phone price card (setup, monthly,
  term, taxes, usage sentence, exclusions) when `packageId === "phone"`.
- `app/use-cases/[slug]/page.tsx` — same branch; Service JSON-LD references
  `/pricing#phone` by `@id` instead of restating a price.
- `lib/seo.ts` — new `phoneOffer()` in the root `hasOfferCatalog`
  (`price` = setup; `priceSpecification` = setup, monthly/`MONTH`, per-minute/`MIN`;
  `valueAddedTaxIncluded: false`). Landing Service nodes with `packageId: "phone"`
  reference it by `@id`. Organization description now states builds and the phone
  price separately. `priceRange` still derives from build packages only.
- `components/PhoneReceptionistPlan.tsx` (on `/pricing`, anchor `#phone`) — every
  term, setup list, monthly list, exclusions. This is the visible counterpart that
  keeps the JSON-LD Offer truthful.
- `app/llms.txt/route.ts` — new "AI Phone Receptionist" section; key-page note no
  longer says "answers every call and books the job".

## Routes / sources changed

Money pages (`lib/data/money.ts`): `/ai-receptionist`, `/ai-receptionist-for-contractors`
(removed "$1,500 CAD, no monthly fee", calendar booking, confirmation texts, "every call",
"24/7 never clocks out", "live in 5 days"); receptionist sentences on
`/custom-ai-app-development`, `/ai-business-system`, `/done-for-you-ai-automation`,
`/ai-automation-canada`.

Services (`lib/data/_services_b.ts`): `/services/ai-voice-agent` (was "From $3,500",
live booking) and `/services/ai-receptionist-os` (was "$1,500 onboarding + from $349/mo,
calls included", texts/booking/quotes/reviews/dashboard). Both URLs kept; both now the
approved offer, with anything broader stated as separately scoped (Business pricing via
`packagePriceLabel("business")`, explicitly "on top of, not instead of").

Locations (`lib/data/locations.ts`): `/locations/ai-receptionist-surrey-bc` (now
`packageId: "phone"`), plus the receptionist-pricing sentences and booking/SMS claims on
Surrey agency, Delta, Vancouver, Langley, Abbotsford, Richmond, New Westminster, White
Rock, Maple Ridge, Chilliwack and Edmonton pages. `/locations` hub metadata.

Compare (`lib/data/compare.ts`): `/compare/ai-receptionist-vs-virtual-receptionist`,
`/compare/ai-receptionist-vs-answering-service`, `/compare/ai-chatbot-vs-ai-receptionist`,
`/compare/best-ai-receptionist-small-business-canada`,
`/compare/ai-receptionist-pricing-canada`. Unsourced competitor figures on these pages
(virtual-receptionist and answering-service ranges, SaaS ranges, named-vendor prices)
were replaced with qualitative wording plus "check current published pricing".

Resources / how-to: `/resources/ai-receptionist-cost`, `/resources/is-ai-receptionist-worth-it`,
`/resources/can-ai-answer-business-phone-calls`, `/resources/small-business-ai-setup-cost`,
`/resources/how-much-does-ai-automation-cost`, `/resources/what-is-an-ai-worker`,
`/resources/best-ai-tools-for-contractors` (answering section: competitor prices made
qualitative, our "$1,500 one-time" replaced); `/how-to/create-ai-receptionist-for-small-business`.

Industries: `lib/data/industries.ts` (landscaping, plumber, HVAC, pest-control and others
where "just the AI receptionist" / call capture was priced at $1,500 — now
`RECEPTIONIST_ALONE`), `lib/data/_industries_b.ts` (fence, painter).

Use cases: `/use-cases/ai-receptionist-for-dentists` (`packageId: "phone"`; booking,
recalls, texting moved to a scoped connected system).

Shop (`lib/data/shopProducts.ts`, `/shop`): `ai-receptionist-setup` is now the phone SKU
(`hybrid`, setup + monthly from `phonePlan`, usage note with 300 minutes and $0.25).
`ai-receptionist-os` SKU **removed** — it was the same receptionist at $1,500 + $349/mo.
`BuildRequestForm` maps legacy `?build=ai-receptionist-os` links to the phone SKU (that
mapping was added concurrently by another editor) and has a phone budget option +
`?package=phone` preset.

Homepage / FAQ / pricing: `components/studio/StudioHome.tsx`, `lib/data/homeFaqs.ts`,
`lib/data/faqs.ts` (site FAQ + pricing FAQ), `app/pricing/page.tsx` (metadata + copy).

Other surfaces: `/solutions` featured build (`lib/data/solutions.ts`,
`components/FeaturedBuilds.tsx`), `/start` copy + `components/ConsultationCall.tsx`
diagnosis list and spoken line (the shared `lib/data/builder.ts` plan was updated by
another editor), `app/not-found.tsx` hint, missed-call calculator worked example
(`lib/data/freeTools.ts`), dead data `lib/data/liveTools.ts`.

Launch drafts: `docs/launch/00-README.md`, `01`, `05`, `07`, `08` carry a dated
"price line superseded" banner. Draft bodies and all `research/` audit files are untouched.

## Tests changed

- `tests/pricing-consistency.test.ts` — phone figures added to the allowed set from
  `phonePlan`; build-floor test skips the phone SKU (it has no floor); new
  "AI phone receptionist pricing contract" block: pins the five terms, label/sentence
  derivation, phone never in `packages[]`, every receptionist landing row / use case
  uses `packageId: "phone"`, forbidden claims (no monthly fee, unlimited, provider
  usage on top, calls included, $129/$250/$349, booking-into-calendar, guarantees),
  FAQ answers quote $179 and no "provider usage", and a source scan that fails any
  non-comment sentence pairing "receptionist" with "$1,500" unless it carries a
  `PHONE_*`/`BUILD_AND_PHONE_*` constant.
- `tests/shop-pricing.test.ts` — phone SKU excluded from tier floors and instead
  checked for exact equality with `phonePlan`; no receptionist-like SKU may be priced
  outside `phonePlan`; no $129 or $349 monthly SKU.
- `tests/seo-static.test.ts` — catalog length `packages.length + 2`; phone Offer
  price/priceSpecification pinned; receptionist landing Service nodes reference
  `/pricing#phone`.
- `tests/e2e/phone-offer-rendered.spec.ts` already existed in the worktree and was
  used as a contract (not edited).

Claude could not run shell checks in its implementation session. Codex subsequently
ran the full local gate and browser checks; see the verification report.

## Remaining limitations / for review

1. TypeScript, unit tests and the production build passed under Codex's independent review.
2. `lib/seo.ts` `REGISTRY_LASTMOD` / `STATIC_LASTMOD` not regenerated — the file says to
   do that from `git log` after commit.
3. Codex ran `graphify update .` successfully (AST only, no API cost).
4. Dark agent subsystem (`lib/agent/pricebook.ts`, `conversationEngine.ts`, `app/agent/*`)
   still quotes $129/$299/$699 plans and "unlimited calls". It 404s in production and
   was left alone; it must be reconciled before `AGENT_SUBSYSTEM_ENABLED` is ever set.
5. `public/v2/index.html` still contains "$1,000 setup + $250/mo"; `/v2/*` is 308 redirected to
   `/` and disallowed in robots, so it is not reachable. `lib/data/finder.ts` is
   unimported dead code and was not changed.
6. Industry pages still describe connected systems that include an AI receptionist plus
   booking/SMS at Business pricing. That is allowed by the brief (broader custom systems);
   each now states the receptionist-alone price separately.
7. The duplicate `ai-receptionist-os` shop card was consolidated into the phone offer;
   its existing service URL and old form preset links still work.
8. Launch pricing copy never claims a line is live or tested; it says each setup goes
   live only after its own test calls. No Ironwood report or new proof was added.

# Search visibility content release — 2026-09-27

## Scope

The owner authorised implementation, pushing and deployment in the current chat. Work is isolated in the ai-discovery checkout. The concurrent design chat owns the homepage/showcase; this release does not edit its homepage, studio components, stylesheet, layout or footer.

The release adds 12 distinct buyer-task pages and updates 15 existing pages. The research's 50 opportunities included sections, existing-page improvements, overlapping questions and ideas requiring more evidence; they were not 50 independent URLs. New data feeds the existing registry, static routes, public hubs, sitemap and llms.txt.

## New routes

- /services/ai-search-visibility
- /resources/get-your-business-recommended-by-chatgpt
- /resources/ai-wrong-information-about-my-business
- /resources/geo-aeo-explained-for-local-business
- /resources/website-traffic-but-no-quote-requests
- /resources/google-business-profile-checklist-for-trades
- /resources/questions-to-ask-before-hiring-seo-or-geo-agency
- /resources/service-area-pages-without-doorway-pages
- /resources/local-seo-and-ai-visibility-cost-canada
- /how-to/fix-service-area-business-not-showing-on-google-maps
- /how-to/list-your-business-on-bing-places-and-apple-maps
- /how-to/track-where-your-customers-found-you

## Existing pages updated

- ai-receptionist
- ai-lead-follow-up-agent
- automate-quote-requests
- ai-receptionist-cost
- is-ai-receptionist-worth-it
- google-business-profile-lead-automation
- ai-receptionist-pricing-canada
- ai-lead-follow-up-guide
- automate-review-requests
- fence-company-ai-automation
- auto-detailing-ai-automation
- ai-automation-agency-surrey-bc
- ai-receptionist-surrey-bc
- chatgpt-vs-custom-ai-agent
- landscaping-ai-automation

Rewrites clarify channel scope, handoff, costs and enquiry measurement. They remove unverified vendor price ranges and discontinued Google Business messaging/Q&A API promises from the affected entries. Prices still derive from packages.ts; no new price or guarantee was introduced. New examples are labelled illustrative. Founder references use the existing proof register and identify Ironwood as an owned business. No private enquiry data or customer screenshots are included.

The shared landing template can show official references beside the relevant section and an offer-specific secondary link. A single checklist fills the content width instead of leaving an empty price-card column. An optional bare search title lets the new pages use concise titles without changing the titles of unrelated existing pages.

## Research basis

AlsoAsked: three English searches using Canada / Surrey, British Columbia, observed 2026-09-27. Topics were ChatGPT business discovery, local SEO and AI receptionists. Ubersuggest: Canada English keyword estimates from the same date. Public demand signals are distinct from private AI prompts and lead forecasts. The research pack remains local; it is not shipped as website copy.

Official source links appear within the new guides where they support platform-specific information. Practical workflows are implementation guidance, not unsupported client outcomes.

## Validation before release

- TypeScript: passed.
- Vitest: 319 passed.
- Direct Next production build: passed without running database migrations.
- Initial desktop/mobile discovery checks: 26 passed, covering every new route, FAQs, source links, canonicals, enquiry navigation, sitemap/hub inclusion and representative accessibility checks.
- Route-preservation comparison against the September 26 build: 12 additions; no dropped routes, canonical changes, new noindex directives or structured-data price changes. Intentional copy/title/visible-price removals were reviewed.
- Local read-only smoke: 158/158 passed.
- Graphify AST update: completed.

The final build and all 26 discovery checks passed after the concise-title and single-card layout refinement. Cloud validation and production verification are recorded in the PR/release completion record after they actually finish.

No Prisma schema/migrations, API handlers, paid integrations, enquiry storage, analytics contract, contact address or production environment variables changed. No real submission or outbound message is required for these content checks.

## Pre-release production anchor

Origin/main: c5ad090. Production deployment: dpl_4kL3AxmRWyPj7g2KheeASD39pfYW at https://ai-shop-i4nev7jbo-pavs-projects-2a8231d9.vercel.app. Rechecked with the authenticated Vercel CLI immediately before this release. Follow docs/ROLLBACK.md and recheck the alias before any rollback; do not replace concurrent work accidentally.

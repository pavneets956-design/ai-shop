# Local discovery and cleaner measurement — prepared October 3, 2026

Status: tested local changes, not pushed, merged or deployed. Based on fetched `origin/main` at `fe474d20f66100f203a1610a563bfd6d6706ac03`, isolated on `codex/local-discovery-measurement`. The original checkout and its owner's unfinished work are untouched.

## Problem and result

Owner visits were indistinguishable from prospect activity in Vercel. `form_submitted` also includes failures, so its total is not a count of new enquiries. The two local pages with the best recent Google query positions contained broad booking, turnaround and outcome claims.

- `/analytics-preferences` provides a persistent, reversible browser-level exclusion. Both automatic Vercel page views/events and the site's custom event wrappers respect it. Admin, agent, login and preference routes are always excluded. Blocked preference storage suppresses analytics; preference save failures are visible. No identity or exclusion flag is sent as an analytics property.
- `lead_received` fires only after a new request has confirmed persistence or an accepted notification. Duplicate retries and errors do not fire it. `form_submitted` remains available for attempt/outcome diagnostics. Missing delivery evidence now displays a failure rather than a success. Tool conversions also exclude duplicates.
- The Surrey receptionist and Burnaby small-business automation pages now have focused search titles, scoped service descriptions, clear request CTAs, and links to the existing AI search visibility service. Own-business experience is labelled accurately. Removed hard-coded prices and automatic Starter offer associations from these two custom-scoped pages; the pricing catalogue itself is unchanged. URLs and canonicals are unchanged.
- Privacy documentation describes the new localStorage preference and receipt event. The preference page is noindex and is not added to the sitemap.

## Existing AI recommendation pages

- Service: https://aibuiltbyhand.com/services/ai-search-visibility
- Guide: https://aibuiltbyhand.com/resources/get-your-business-recommended-by-chatgpt

No duplicate service page was added. The service was verified live in the browser on October 3.

## Validation

- `npx tsc --noEmit`: passed.
- `npx vitest run`: 19 files, 327 tests passed.
- `npx next build`: passed after final application edits; no migrations or production credentials used. Existing MuPDF async-target, multiple-lockfile and unrelated lint warnings remain. Build log: `local-discovery-2026-10-03/local-build.log`.
- Playwright against the local production build: 20 analytics/lead-form desktop and mobile cases passed; added storage-error cases passed on both devices, making 22 distinct cases. The new preference screen has no axe WCAG A/AA violations. A selector initially matched Next's route announcer as well as the intended error; the selector was narrowed and both cases passed. All lead API responses were mocked, and analytics traffic was blocked.
- Rendered local pages: both return 200, have one H1, self-canonicals, parseable JSON-LD, an AI visibility link and a working request href. Desktop browser review completed. Preference screenshots are in the adjacent evidence folder.
- Current production read-only smoke: 159/159 checks passed. This checks the existing release, not these unpublished changes. Log: `local-discovery-2026-10-03/production-smoke.log`.
- `graphify update .`: completed, AST only.

## Activation after an approved release

1. Visit `/analytics-preferences` on the live domain in each owner/QA browser and choose **Exclude this browser**. A localhost choice does not transfer to production. Existing history is not rewritten, and submitting a real form still creates a real request; use mocked API tests for QA.
2. Count `lead_received` as browser-confirmed new receipts, not qualified customers. Reconcile with stored enquiries and exclude known tests. Ad blockers, a lost response or a closed tab can still cause undercounting. The database remains the durable source; no existing test rows were deleted.
3. Record the actual deployment date as the experiment start. Compare the same two query/page combinations and Canada filter over equal 28-day windows. Research baseline: Surrey query 19 impressions, position 3.11, zero clicks; Burnaby query 15 impressions, position 3.73, zero clicks, Sep 2–29. A changed average or one click alone is not a reliable conversion lift.
4. Use machine campaign tags only on deliberately distributed external links. For an eligible and verified Business Profile, a suitable homepage link is `https://aibuiltbyhand.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp_profile`. Do not add UTMs to internal links or present owner clicks as earned ChatGPT recommendations.

## External work waiting on information

Google Business Profile opens a private mailing-address form before showing the verification method. Neither address supplied in chat was entered or saved. The owner described the business address as virtual; whether Handbuilt AI genuinely offers in-person client service is still awaiting clarification. A rented mailing address without business operations there is not eligible. A qualifying service-area business can use its actual operating base with its address hidden. An online-only business is not eligible. Sources: https://support.google.com/business/answer/3038177 and https://support.google.com/business/answer/13763036.

The signed-in Bing Webmaster Tools account did not expose a configured site or historical query report during the research. Six Vercel visitors with a Bing referrer are evidence of referrals, not proof of a connected Webmaster property. No account permissions were expanded and no verification was fabricated.

## Release and rollback

No schema, migration, paid API, outbound calling flag, or email delivery change. Push, merge and deploy require the owner's explicit per-action approval under `AGENTS.md`. Recheck the production revision before release, use the existing deployment workflow, then rerun production smoke and safe browser checks. Roll back through `docs/ROLLBACK.md` using a freshly verified previous production deployment if verification fails. Do not reuse an old deployment anchor without checking it.

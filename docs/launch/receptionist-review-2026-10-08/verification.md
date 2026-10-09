# Receptionist pricing verification — 2026-10-08

Implemented by Claude CLI and independently reviewed, extended and tested by Codex.
Branch: `codex/receptionist-launch-pricing`, based on fetched `origin/main` in the attached worktree.
Local only: no commit, push, merge, deployment, real lead submission or phone call.

## Approved offer

CAD750 fixed setup; CAD179/month, month-to-month launch pricing; 300 AI-handled minutes
per month; CAD0.25 per extra minute; 30 minutes of small customer changes per month,
no rollover; taxes extra. All active offer prices derive from `lib/data/packages.ts`.
Booking, CRM, SMS, dashboards and additional scope are separately quoted.

## Final results

- `npx tsc --noEmit`: passed.
- `npx vitest run`: 345/345 tests, 20/20 files passed.
- `npx next build`: passed, 213 generated build entries. No database migrations run.
- Local production-mode smoke: 158/158 passed.
- Pricing, receptionist and lead-form Playwright suites: 64/64 passed across desktop Chromium and mobile WebKit. API submissions were intercepted; no leads or emails sent.
- Generated HTML audit: 191 pages scanned, all 15 dedicated receptionist-related pages show setup, monthly, included minutes and extra-minute rate; zero JSON-LD parse errors.
- Rendered old-price contexts were reviewed. Remaining build prices describe chatbots or separately quoted connected systems, not the receptionist offer.
- Desktop/mobile price cards inspected; no horizontal overflow on pricing, receptionist or homepage.
- `graphify update .`: passed, AST-only; `git diff --check`: passed.
- Read-only live-production baseline: 159/159 passed before local implementation. This verifies the existing deployment only; it does not mean the changes are live.

An initial browser run found a comparison metadata issue, corrected before rebuilding,
and one mobile form hydration timeout. The complete final run passed with one worker.
Existing build warnings remain for workspace-root inference, MuPDF top-level await,
ProductCard's img element and Showroom's hook dependency; none were introduced here.

## Independent review additions

- Retired fake marketplace cart/dashboard pages redirect to the shop; old prototype URLs redirect home. Verified HTTP 308 responses.
- The old receptionist OS form link still preselects the correct phone offer.
- Interactive planner and dormant shop data use the shared offer; monthly allowance prose derives from numeric fields.
- City pricing FAQs explicitly distinguish custom builds from phone reception.
- Calculator copy now identifies gross revenue comparisons and excludes job costs, recurring fees and extra usage from any claimed net savings.
- Regression tests cover actual rendered pages, structured data, request presets and old URLs.

## Release boundaries

Historical research and superseded outreach drafts retain historical figures. The disabled
outbound agent subsystem still has its own old pricebook and returns 404; it must not be
enabled with these changes. The archived public/v2 prototype retains historical text but
its URLs redirect to the homepage. These are not active public receptionist offers.

Unrelated Starter, Business, Custom and Care prices are unchanged. No new founder/customer
proof or quantified savings were published. The planned test calls have not occurred.
Schema last-modified maps should be regenerated from git history when committing the release.
AGENTS.md requires explicit owner approval for push, merge and deployment; after approval,
recheck origin/main, resolve any changes, release, then repeat the read-only production smoke.

Detailed execution logs, generated-page audit and screenshots are saved in the original
workspace at `docs/launch/receptionist-review-2026-10-08/` (final-build.log,
final-browser.log, local-after-smoke.log, production-before-smoke.log,
built-pricing-audit.json and pricing/receptionist/home screenshots).

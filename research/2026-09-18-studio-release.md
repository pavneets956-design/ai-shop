# Studio redesign and search recovery — 18 September 2026

## What changed

The owner clarified that Handbuilt AI is a hands-on independent build studio: custom websites and 3D experiences, apps, agents and business automation. The homepage now leads with that offer and a direct project request. Existing contractor and local-service URLs remain available.

- New white, graphite and cobalt design, navigation, footer and vector brand mark.
- New homepage with a keyboard-operable CSS 3D study and selectable, explicitly illustrative workflows. It loads no 3D library and makes no live calls.
- Owned-product proof: Ironwood Grounds, COITracker and PayNudge. No client logos, testimonials or invented results.
- Rebuilt About, Pricing and project-request presentation; preserved the request form's validation, attribution, error states and backend.
- New `/web-design-development` service page, with a self-canonical, visible FAQs, service schema, sitemap entry and specific modification date.
- Existing templates inherit the neutral/cobalt palette. Creator-page legacy coral gradients are also replaced.
- Prices remain $1,500+ / $3,500–$7,500 / $10,000+ CAD. Phone service is clearly separate: setup from $1,500, monthly service from $250, plus provider usage. Removed unsupported popularity and typical-purchase claims.
- FAQ copy now describes real project scoping, third-party costs, ownership and review. Removed obsolete homepage-finder/calendar instructions and “zero rework” promises.
- Permanent redirects repair `/demo/follow-up` → `/demo/lead` and `/demo/ai-receptionist` → `/demo/assistant`.
- Updated social cards and favicon from code-native vector artwork.

## Design references

Reviewed [Linear](https://linear.app/) and [MetaLab](https://www.metalab.com/), with [Ramotion](https://www.ramotion.com/) as another reference. Applied restrained colour, clear typography, useful interactive product presentation and prominent work. Layouts, copy and artwork are original.

The brief does not claim that the owner has previously delivered complex 3D client work. The homepage scene is labelled an interactive web study; detailed WebGL/model production is scoped separately.

## Search evidence and actions

Full observations and history are in [the recovery audit](./2026-09-18-recovery-audit.md).

Google: 4 clicks, approximately 1,290 impressions, 0.3% CTR and average position 58.4 in the observed three-month period. Last 28-day impressions and average position improved, but the sample is too small to attribute a cause. Bing: 0 clicks and 8 impressions; its stored sitemap had 86 discovered URLs and a June 15 crawl.

Bing sitemap resubmission was accepted; its table changed to a September 19 submission date (dashboard date) and Processing. Crawl completion and indexing are not implied. The existing IndexNow route was unconfigured; its missing production secret has been installed securely and will apply to the next deployment. The secret is also retained in the ignored local environment file; no credential is in this change.

The priority remains useful proof and qualified traffic. A redesign or sitemap submission does not guarantee ranking or clicks. No new batch of city pages, fake backlinks or outbound messages was created.

## Validation

- TypeScript check passed.
- 284 unit tests passed.
- Production build passed using `npx next build`, without running database migrations.
- Initial full browser suite: 87 passed, 2 failed, 1 intentionally skipped. Both failures identified the same low-contrast proof caption, now corrected.
- Targeted rerun after correction and new interaction coverage: 37 passed, 1 viewport-specific skip. Covers 7 routes for serious/critical accessibility issues, form success/failure/double-submit states, the 3D keyboard interaction, scenario switching, mobile-menu dismissal/navigation, and horizontal overflow across 5 pages.
- Desktop and 390px-frame mobile layouts visually reviewed. The browser's viewport override did not take effect; the mobile screenshot used a same-origin fixed-width frame. Automated tests separately ran desktop Chromium and iPhone/WebKit profiles.
- Existing build warnings remain in the PDF form-filler engine, two image components and demo hook dependencies. They are outside this visual/search change.
- Test submissions are intercepted by the existing test suite. No live customer lead, email, payment or phone-call test was sent.
- Graphify AST update completed.

Final full browser suite: **96 passed, 2 viewport-specific skips**. Local smoke: **158/158 passed**. A concurrent main-branch update corrected PayNudge usage pricing and payment-sync wording; the release incorporates it and uses the corrected wording in the new proof sections.

Release completion and final verification are recorded below after the deployment is checked.

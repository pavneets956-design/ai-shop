# Product showcase release — September 27, 2026

Owner instruction: fix the lag, push and deploy everything in this showcase work, then check again in one week.

## Release scope

Live RoomRush marketing animation with the real product artwork, COITracker and PayNudge sample previews, responsive 3D composition, foreground RoomRush hover/focus, and removal of the repeated homepage work grid, trust strip and obsolete workflow demo. Prices, schema, migrations, paid APIs, enquiry handling and processors are unchanged. The concurrent AI-discovery PR #7 owns SEO content and must be retained.

The responsiveness fix removes a 400ms stacking delay, shortens the transform transition to 240ms, flattens nested transform surfaces, promotes the moving RoomRush panel for compositing, and replaces continuous idle animation-frame polling with a timer between snake steps. No device-wide frame-rate claim is made.

## Before release

- Initial base: `c5ad090`. Before pushing, merged refreshed `origin/main` at `e3ee4ac`, preserving the complete SEO PR #7 without conflicts.
- Existing production: `dpl_4kL3AxmRWyPj7g2KheeASD39pfYW`, https://ai-shop-i4nev7jbo-pavs-projects-2a8231d9.vercel.app.
- The production anchor must be checked again immediately before merging because the SEO release is concurrent.
- TypeScript and 319 unit tests passed, including after integrating PR #7. The showcase build passed; its focused desktop/mobile browser run passed 14 checks with 2 device-specific skips, and its local read-only smoke passed 158/158. Cloud verification of the integrated release is pending at the time this note was first written.

## Follow-up

One-time review scheduled in this chat for Sunday, October 4, 2026 at 9:00 p.m. America/Vancouver. It checks the live homepage, animation responsiveness, mobile/reduced-motion behavior, links and regressions; it does not authorize a new release.

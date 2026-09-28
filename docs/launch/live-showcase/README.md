# Live product showcase — implementation and review

Implementation in the isolated `codex/live-product-showcase` checkout. The owner authorized the performance fix, push and production deployment on September 27, 2026. Release status and evidence are recorded in `release.md`.

## Scope and collision boundary

The owner approved the 3D homepage concept and requested the RoomRush snakes animate, plus a review of duplicate/unnecessary content across Handbuilt AI. The active chat “Local AI visibility — proof and service…” owns keyword research, discovery content, landing-page data/template changes and SEO page overlap. Its work is in a different checkout. This change owns the homepage showcase, studio CSS, relevant browser tests and asset provenance only. It does not change prices, service registries, SEO builders, inquiry handling, third-party processors or storage.

## What changed

- Replaced the generic cube/workflow demo with one 3D composition showing RoomRush, COITracker and PayNudge.
- Reused RoomRush's exact owner-approved room art and decorative snake paths/timing. This is the animated marketing preview from its homepage, not a connected multiplayer session.
- Locally rendered business-product previews reproduce labelled public sample data. They are not claims about Handbuilt AI's customers or revenue.
- Each window links to the real product. RoomRush is at playroomrush.com; COITracker is at coitracker.co; PayNudge is at paynudge.xyz.
- Pause/play supports keyboard input. Reduced-motion preferences stop canvas animation, as do an offscreen canvas and a hidden tab. Missing art and unavailable canvas contexts have visible fallback states.
- Desktop uses CSS perspective and hover transforms. Mobile uses a compact, flat composition with RoomRush above two smaller business-product previews.
- Removed the repeated lower homepage product-card grid, repeated trust strip, old WorkflowPreview component, and its unused CSS.
- Kept a compact founder/Ironwood bridge and made the portrait treatment consistent with About.

## Review coverage and decisions

Opus 5.5 reviewed homepage, header/footer, About, Pricing, Create, Demo and shared landing templates with read-only tools. Main-agent browser review inspected the actual product sites and the local implementation.

Useful repetition remains: navigation/footer links, the full About product story, pricing information and closing project CTAs. Removing those would make navigation harder. The other chat owns search-topic duplication and new SEO content. Legacy unused marketing components were not deleted because existing tests and schema commentary still reference some of them; that needs a separate dependency-aware cleanup. No claim is made that every historical file or every landing page was independently audited.

## Sources

- https://aibuiltbyhand.com/ — observed hero and existing work section.
- https://playroomrush.com/ and /demo — observed pixel-art identity and public preview.
- https://coitracker.co/ — public fictional-vendor workspace.
- https://paynudge.xyz/ — public sample invoice preview.
- RoomRush source: `C:/Users/gillp/Documents/ChatGPT/roomrush/staging/pixel-homepage/components/landing/PixelRoom.tsx` and `PixelHomepage.module.css`.
- RoomRush assets: `public/pixel-home/approved-art.webp`, `PixelifySans.ttf`, `OFL.txt` in that source checkout.
- Founder/product claim register: `research/transformation-2026-08-30/09-proof-founder-positioning.md`.

No embedding, analytics, accounts, payments, game sessions or email are connected to the preview.

## Validation

- `npx tsc --noEmit`: passed.
- `npx vitest run`: 18 files, 319 tests passed.
- `npx next build`: passed, 200 static pages generated; no migrations run.
- Built-server Playwright run (`studio`, `home`, `a11y`): 46 passed, 2 intentionally skipped for device-specific navigation checks.
- Read-only smoke against the built local preview: 158/158 passed.
- Read-only smoke against existing production before release: 159/159 passed. See the release record for post-deployment verification.
- `graphify update .`: completed.
- `git diff --check`: clean.
- Desktop and 390px mobile layouts visually checked. Evidence: `desktop.png`, `mobile.png`.

Local production-build preview: http://localhost:3217/ (while its server remains running).

## RoomRush foreground interaction

On desktop hover or keyboard focus, RoomRush rises above both side panels, straightens into a full rectangle and scales up slightly. Stacking switches immediately on entry and exit; the transform settles in 240ms. The RoomRush panel uses a compositor hint without nested preserve-3d surfaces. The snake loop sleeps between 140ms game steps and only requests a display frame when it needs to draw. Reduced motion switches panel states instantly and pauses snakes; the compact mobile arrangement is unchanged.

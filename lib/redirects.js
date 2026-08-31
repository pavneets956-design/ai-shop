/**
 * Central redirect registry — the ONE list every consumer reads.
 *
 * Created by Lane B (technical SEO) as the shared contract; filled by Lane D
 * (content consolidation) with the merge map from
 * `research/transformation-2026-08-30/03-content-dispositions.md` §5.2.
 *
 * CONTRACT (do not break — three files depend on it):
 *   - CommonJS. `next.config.js` is CJS and `require()`s this file directly.
 *   - `module.exports = { redirects }` where `redirects` is an array of
 *     `{ source: string, destination: string, permanent: boolean }`.
 *   - `source` and `destination` are site-root-relative paths ("/foo", not a
 *     full URL). `permanent: true` → 308.
 *   - Every `destination` must be a route that returns 200 (never another
 *     redirect source — no chains). `tests/seo-static.test.ts` asserts this.
 *   - No `source` may also appear in `app/sitemap.ts`. Same test asserts it.
 *
 * `next.config.js` merges this list FIRST, then appends its own long-standing
 * entries minus any whose `source` already appears here — so a row added here
 * always wins.
 *
 * WHY EVERY ROW IS A 301 AND NOT A DELETION
 * Nothing is deleted. Each source below had its registry row removed so the
 * page stops generating; the 301 then serves and hands whatever equity the URL
 * had to a page that is kept. Reversible: restore the row, drop the redirect.
 *
 * EVIDENCE GATE APPLIED (Lane D, 2026-08-30)
 * Every source was re-checked against `02-url-inventory.csv` (GSC window
 * 2026-06-14 → ~08-10) before it was written here. 42 of 46 sources have 0
 * impressions and 0 clicks. No source has a single click. The four with any
 * measured impression, and why each still merges:
 *   - /resources/ai-integration-cost .......... 3 impr, 0 clicks, pos 85.3
 *   - /resources/can-ai-follow-up-with-leads .. 2 impr, 0 clicks, pos 71.0
 *   - /how-to/automate-missed-calls ........... 1 impr, 0 clicks, pos 68.0
 *   - /locations/ai-automation-calgary-ab ..... 4 impr, 0 clicks, pos 76.8
 *   - /locations/ai-automation-toronto-on ..... 1 impr, 0 clicks, pos 84.0
 * All sit past position 68 — no traffic value to lose, and the 301 preserves
 * the history rather than discarding it.
 *
 * ONE ROW WAS DOWNGRADED TO KEEP AND IS DELIBERATELY ABSENT:
 *   /locations/ai-automation-edmonton-ab — 1 impr, 0 clicks, **position 7.0**.
 *   §0 gate G1 of the disposition doc flips any source at position ≤30 to KEEP,
 *   and this is the only source on the list that ranks on page one for
 *   anything. Its registry row in `lib/data/locations.ts` was left in place.
 *   (Counter-argument, for the owner: 7.0 is a one-impression sample on a page
 *   whose copy is the Richmond/Coquitlam template with the city swapped. If the
 *   owner wants it gone, add the row here and delete the row from locations.ts
 *   in the same commit.)
 *
 * OWNER APPROVAL REQUIRED (Gate G2, disposition doc §0.4) for the two
 * out-of-service-area location rows at the bottom of this file. They are the
 * only rows here that retire a page for a positioning reason rather than a
 * duplicate-content reason. Everything above them is a straight merge.
 *
 * @type {{ redirects: { source: string, destination: string, permanent: boolean }[] }}
 */
const redirects = [
  // ---------------------------------------------------------------------
  // Use-cases → the money / service / industry page that already owns the
  // intent. Every one of these was a 224–377-word template page whose H1 was
  // generated as `${solution} for ${industry}` (T7). 17 rows.
  // ---------------------------------------------------------------------
  { source: '/use-cases/ai-receptionist-for-contractors', destination: '/ai-receptionist-for-contractors', permanent: true },
  { source: '/use-cases/ai-invoice-reminders-for-small-business', destination: '/services/ai-invoice-reminder-system', permanent: true },
  { source: '/use-cases/estimate-follow-up-automation', destination: '/ai-lead-follow-up-agent', permanent: true },
  { source: '/use-cases/lead-capture-ai-for-real-estate', destination: '/industries/real-estate-agent-ai-automation', permanent: true },
  { source: '/use-cases/ai-receptionist-for-real-estate', destination: '/industries/real-estate-agent-ai-automation', permanent: true },
  { source: '/use-cases/ai-receptionist-for-clinics', destination: '/industries/clinic-ai-automation', permanent: true },
  { source: '/use-cases/ai-document-analyzer-for-law-firms', destination: '/industries', permanent: true },
  { source: '/use-cases/ai-booking-assistant-for-salons', destination: '/industries/salon-ai-automation', permanent: true },
  { source: '/use-cases/ai-chatbot-for-ecommerce', destination: '/services/ai-chatbot-for-website', permanent: true },
  { source: '/use-cases/ai-content-engine-for-creators', destination: '/creators', permanent: true },
  { source: '/use-cases/custom-ai-app-for-startups', destination: '/custom-ai-app-development', permanent: true },
  { source: '/use-cases/personal-ai-assistant-app', destination: '/custom-ai-app-development', permanent: true },
  { source: '/use-cases/ai-support-bot-for-saas', destination: '/services/ai-customer-support-agent', permanent: true },
  { source: '/use-cases/no-show-reminder-automation', destination: '/use-cases/appointment-reminder-automation', permanent: true },
  { source: '/use-cases/instagram-dm-automation', destination: '/use-cases/facebook-lead-automation', permanent: true },
  { source: '/use-cases/ai-operations-assistant', destination: '/services/ai-admin-assistant', permanent: true },
  { source: '/use-cases/client-onboarding-automation', destination: '/services/ai-lead-capture-form', permanent: true },

  // ---------------------------------------------------------------------
  // Services → the sibling service page selling the same thing. 4 rows.
  // ---------------------------------------------------------------------
  { source: '/services/ai-website-assistant', destination: '/services/ai-chatbot-for-website', permanent: true },
  { source: '/services/ai-proposal-generator', destination: '/services/ai-quote-generator', permanent: true },
  { source: '/services/ai-review-request-system', destination: '/services/ai-review-engine', permanent: true },
  { source: '/services/custom-business-automation', destination: '/services/ai-workflow-automation', permanent: true },

  // ---------------------------------------------------------------------
  // Industries. The first three fold a duplicate vertical into its twin; the
  // last five are off-ICP verticals (not local service businesses) folded back
  // into the hub so they stop diluting the trades positioning. 8 rows.
  // ---------------------------------------------------------------------
  { source: '/industries/bookkeeper-ai-automation', destination: '/industries/accountant-ai-automation', permanent: true },
  { source: '/industries/barbershop-ai-automation', destination: '/industries/salon-ai-automation', permanent: true },
  { source: '/industries/food-truck-ai-automation', destination: '/industries/restaurant-ai-automation', permanent: true },
  { source: '/industries/photographer-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/videographer-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/coach-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/ecommerce-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/retail-store-ai-automation', destination: '/industries', permanent: true },

  // ---------------------------------------------------------------------
  // Resources → the page that already holds the demand. 7 rows.
  // `can-ai-edit-videos` points at the /creators hub rather than
  // /creators/ai-video-editing-automation because that twin is noindexed
  // (disposition §1.6 / Gate G2) — a 301 into a noindexed page wastes the hop.
  // ---------------------------------------------------------------------
  { source: '/resources/what-is-an-ai-receptionist', destination: '/ai-receptionist', permanent: true },
  { source: '/resources/ai-integration-cost', destination: '/ai-integration-services', permanent: true },
  { source: '/resources/can-ai-follow-up-with-leads', destination: '/resources/ai-lead-follow-up-guide', permanent: true },
  { source: '/resources/what-can-ai-automate-small-business', destination: '/resources/ai-automation-examples-for-small-business', permanent: true },
  { source: '/resources/best-ai-tools-for-small-business', destination: '/resources/best-ai-automations-for-service-businesses', permanent: true },
  { source: '/resources/can-ai-edit-videos', destination: '/creators', permanent: true },
  { source: '/resources/can-ai-make-tiktok-videos', destination: '/creators/ai-tiktok-content-system', permanent: true },

  // Retargeted alias. This source already redirected — to
  // /resources/best-ai-tools-for-small-business, which is itself a source in
  // the block above. Pointing it straight at the final destination is what
  // keeps the map chain-free. next.config.js de-dupes by `source`, so this row
  // supersedes the long-standing one there; that row can stay or go.
  { source: '/resources/best-ai-tools-for-small-business-canada', destination: '/resources/best-ai-automations-for-service-businesses', permanent: true },

  // ---------------------------------------------------------------------
  // How-to → the page that owns the same task. 3 rows.
  // `build-faceless-content-system` points at /creators for the same
  // noindexed-twin reason as can-ai-edit-videos above.
  // ---------------------------------------------------------------------
  { source: '/how-to/automate-youtube-shorts', destination: '/creators', permanent: true },
  { source: '/how-to/build-faceless-content-system', destination: '/creators', permanent: true },
  { source: '/how-to/automate-missed-calls', destination: '/use-cases/missed-call-automation', permanent: true },

  // ---------------------------------------------------------------------
  // Compare → the page making the same argument, or the page whose job the
  // argument actually is. 4 rows.
  // ---------------------------------------------------------------------
  { source: '/compare/ai-receptionist-vs-human-receptionist', destination: '/compare/ai-receptionist-vs-virtual-receptionist', permanent: true },
  { source: '/compare/custom-ai-automation-vs-zapier', destination: '/compare/make-vs-zapier-vs-custom-ai-automation', permanent: true },
  { source: '/compare/ai-consultant-vs-ai-automation-agency', destination: '/ai-automation-agency', permanent: true },
  { source: '/compare/ai-built-by-hand-vs-generic-ai-agency', destination: '/about', permanent: true },

  // ---------------------------------------------------------------------
  // GATE G2 — OWNER APPROVAL REQUIRED. Out-of-service-area location pages.
  // Both are the Richmond/Coquitlam template with the city name swapped, for
  // cities outside the advertised service area. /remote-ai-development is the
  // honest "we deliver remotely" page, so the 301 sends the intent somewhere
  // true instead of noindexing it away. 2 rows.
  // (Edmonton is deliberately NOT here — see the header block.)
  // ---------------------------------------------------------------------
  { source: '/locations/ai-automation-calgary-ab', destination: '/remote-ai-development', permanent: true },
  { source: '/locations/ai-automation-toronto-on', destination: '/remote-ai-development', permanent: true },


  // ---------------------------------------------------------------------
  // CONSOLIDATION PASS 2 - 2026-08-30. Source:
  // research/transformation-2026-08-30/qa/S3-seo-content-challenge.md 1.6,
  // the adversarial re-read of all 164 rendered pages against GSC.
  //
  // Every source below has 0 clicks and either no ranking position or a
  // position worse than 30, so none is protected by the evidence gate. Three
  // of these were previously a redirect DESTINATION; those rows were repointed
  // in the same commit (see the use-cases and how-to blocks above) so no chain
  // is created. 13 rows.
  //
  // DELIBERATELY NOT CUT, though they are the same off-ICP ~350-word class:
  //   /industries/accountant-ai-automation ............... position 4.0
  //   /industries/consultant-ai-automation ............... position 3.0
  //   /industries/immigration-consultant-ai-automation ... position 6.0
  // All three rank at position <= 6 and are protected. They are the clearest
  // case of the evidence gate overruling the content argument.
  // ---------------------------------------------------------------------
  { source: '/industries/law-firm-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/wedding-planner-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/personal-trainer-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/gym-ai-automation', destination: '/industries', permanent: true },
  { source: '/industries/physiotherapy-ai-automation', destination: '/industries/clinic-ai-automation', permanent: true },
  { source: '/industries/chiropractor-ai-automation', destination: '/industries/clinic-ai-automation', permanent: true },
  { source: '/industries/agency-ai-automation', destination: '/industries', permanent: true },
  { source: '/creators/ai-tools-for-content-creators', destination: '/creators', permanent: true },
  { source: '/creators/ai-youtube-shorts-automation', destination: '/creators', permanent: true },
  { source: '/locations/ai-automation-victoria-bc', destination: '/locations', permanent: true },
  { source: '/locations/ai-automation-coquitlam-bc', destination: '/locations/ai-automation-new-westminster-bc', permanent: true },
  { source: '/services/ai-intake-form-builder', destination: '/services/ai-lead-capture-form', permanent: true },
  { source: '/services/ai-receptionist-setup', destination: '/ai-receptionist', permanent: true },
];

module.exports = { redirects };

# /shop storefront — design spec (2026-06-14)

## Goal
Give AI Shop (Handbuilt) a real storefront that feels intentional — not a cheap
app-store grid. Surface Pavneet's own live SaaS (COITracker, PayNudge) as proof +
the AI Receptionist as the one buyable done-for-you offer. External links only,
no Stripe, no cold product-building.

## Decisions locked (with user + Opus consult)
- **Scope:** storefront only. List existing products. No new one-time products built cold.
- **Payment:** external links only. AI Shop holds no payment code.
- **Design:** new `/shop` page + light polish. Keep existing warm theme. Build in code, judge live.
- **Nav label:** "Shop" (matches brand instinct); on-page H1 uses proof framing.

## Page structure (`app/shop/page.tsx`)
1. **Header** — eyebrow "The shop", H1 "What Handbuilt has shipped",
   sub reframing as production evidence (3 items reads curated, not empty).
2. **AI Receptionist — full-width feature block.** The only thing the local-SMB
   audience buys. Copy + 3 outcome bullets left; "Try it live" → `/demo` right.
   Price anchored ("Custom build, from $1,000") not transacted → primary CTA `/create`.
3. **"Also handbuilt: live SaaS" — quiet two-up rail.** COITracker + PayNudge,
   demoted to credibility. Muted cards: wordmark, one line, single "Live product →".
   Every external link **UTM-tagged** (`utm_source=handbuilt&utm_medium=shop&utm_content=<id>`)
   + `rel="noopener noreferrer"` so studio referrals are attributable (otherwise /shop
   is an unmeasurable dead end — the biggest hidden risk in storefront-only).
4. **Closing band** — "Don't see your problem here? That's the point — I build custom." → `/create`.

## Data model (`lib/data/shop.ts`)
- `ShopItem`: id, name, kind ("service" | "saas"), tagline, outcome bullets,
  price label, optional external `href` (undefined → degrades to "Ask about it" → /create),
  optional `demoHref`. `utmHref()` helper appends UTM params to external links.

## Email ("do better")
- Code is already sound: `replyTo` set, structured subject, always-on log fallback.
- **Real fix is config, not code:** verify `aibuiltbyhand.com` in Resend (DNS), then
  flip `LEAD_FROM_EMAIL` env → `leads@aibuiltbyhand.com`. Currently borrows
  `leads@coitracker.co` (works only because Gmail doesn't bounce self-mail).
- Skip HTML templates / autoresponders — they don't move conversion (Opus + my call).
- Shop CTAs route to existing `/create` + `/demo` forms → already flow through `/api/build-request`.

## Out of scope
Stripe, new products, full visual refresh, CRM, email HTML templates.

## Open input needed from Pavneet
- PayNudge public URL (COITracker = coitracker.co known). Until provided, PayNudge
  card degrades gracefully to "Ask about it".

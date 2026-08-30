# AI Shop — Rebuild Notes (2026-06-05)

Transformed the generic "AI marketplace" into a **premium personal AI studio + AI solution finder**.
Positioning: _"AI that works for your business — built by hand, not bought off a shelf."_

## What changed

- **Homepage** (`app/page.tsx`) rebuilt: animated hero command center, AI Solution Finder, business
  use-case bento, How It Works, pricing, featured builds, Why AI Shop, FAQ, final CTA.
- **Design system** (`tailwind.config.ts`, `app/globals.css`): obsidian dark theme, electric
  blue/violet/cyan/gold accents, glassmorphism, glow, perspective/3D utilities, animated grid +
  aurora, marquee, brand gradient. Fonts: Inter + Space Grotesk.
- **AI Solution Finder** (`components/SolutionFinder.tsx` + `app/api/recommend/route.ts`): pick a
  goal → 2 quick questions → recommendation. Package + price are locked by rules so the LLM can
  **never hallucinate a quote**; OpenAI only personalizes the copy. Rules-based fallback when no key.
- **Pricing** (`lib/data/packages.ts`): Starter **$750 flat** · Business **from $2,500** · Custom
  **from $7,500** · AI Care Plan **$250/mo** (CAD).
- **GEO/SEO**: programmatic `/use-cases/[slug]` pages (answer-first + `Service`/`HowTo`/`FAQPage`
  schema), sitewide `Organization`/`LocalBusiness`/`WebSite` JSON-LD (`lib/seo.ts`), per-page
  metadata, `app/sitemap.ts`, `app/robots.ts` (explicitly **allows** GPTBot/PerplexityBot/ClaudeBot/
  Google-Extended so AI search engines can cite the site).
- **Build Request flow** (`app/create/page.tsx` + `components/BuildRequestForm.tsx` +
  `app/api/build-request/route.ts`): guided premium form → lead capture.
- **Pages**: new `/solutions`, `/pricing`, `/faq`, `/use-cases`; refreshed `/about`; `/products`
  redirects to `/solutions`.
- **Nav/Footer**: rebuilt around Solutions / Use Cases / Pricing / FAQ / About + "Start a build".
- **Fix**: moved NextAuth `authOptions` out of the route into `lib/auth.ts` (was breaking the build).
- **Figma**: editable design of the hero + pricing pushed to Figma →
  https://www.figma.com/design/nJ0NSCnbbV3o2oj6cxJUkR

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — currently passing (36 routes)
```

## 🚨 PROD BLOCKERS (set before launch)

1. **`OPENAI_API_KEY`** — without it the Solution Finder uses the rules-based recommendation
   (still works, just not LLM-personalized). Add in Vercel to enable the "magic" copy.
2. **NextAuth env** — `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
   Currently `/api/auth/session` 500s locally (harmless console noise from the global SessionProvider
   on the marketing pages; login/dashboard/agent won't work until set).
3. **`DATABASE_URL`** — Prisma/Postgres for auth + the existing /agent CRM.
4. **Lead delivery** — wired via Resend. Set `RESEND_API_KEY` (and optionally `LEAD_NOTIFY_EMAIL`,
   `LEAD_FROM_EMAIL`) to get email notifications of every lead. Without the key, leads still log to
   Vercel logs. Until the key is set, leads only appear in logs.
5. **Production domain** — update `site.url` in `lib/data/site.ts` (currently a placeholder) so
   canonical URLs, sitemap, and JSON-LD point at the real domain.
6. **Booking link** — `site.bookingUrl` points to `/create`; swap for a Cal.com/Calendly link.

## TODO / nice-to-have

- Add more `/use-cases/[slug]` rows in `lib/data/useCases.ts` (each is a GEO landing page —
  currently 6; aim for 15–25 for real long-tail coverage).
- Add `/privacy` + `/terms` pages (footer links them).
- Real Google Business Profile + LinkedIn for off-site entity signals (boosts AI-search citation).

## Master prompt (for future iterations)

> Act as a senior product designer + Next.js engineer + GEO/SEO architect. This is AI Shop, a
> personal AI studio (not a marketplace) that builds custom AI apps, agents, automations and tools.
> Keep the obsidian/electric design system in `globals.css` + `tailwind.config.ts`. Keep prices in
> `lib/data/packages.ts` authoritative — the AI finder must never invent a price. When adding pages,
> lead with a direct answer-first paragraph, attach `Service`/`FAQPage` schema via `lib/seo.ts`, and
> add the route to `app/sitemap.ts`. Verify with `npm run build` before finishing.

# GSC + Bing Submission Pack — Handbuilt (aibuiltbyhand.com)

What's already wired into the code (you don't have to do this part):

- **Google verification**: meta-tag method, already in `app/layout.tsx`. Env override: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- **Bing verification**: meta-tag ready. Set `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel to the value Bing gives you, redeploy, then click Verify. (Or skip — see "Import from Google" below.)
- **Sitemap**: `https://aibuiltbyhand.com/sitemap.xml` — auto-includes every landing page (86 URLs today; grows as you add data rows).
- **robots.txt**: references the sitemap and welcomes AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Bingbot, Google-Extended…).
- **llms.txt**: `https://aibuiltbyhand.com/llms.txt` — a site map for AI answer engines, generated from the same data.
- **IndexNow**: key file live at `https://aibuiltbyhand.com/ac88d1565466f5394f041d46f2546ce7.txt`. Ping endpoint: `GET /api/indexnow?secret=<INDEXNOW_PING_SECRET>` (set that env var in Vercel first).

---

## Step 1 — Deploy

These pages are NOT live until you commit + push and Vercel deploys. The build passes locally (115 static pages). After deploy, confirm `https://aibuiltbyhand.com/sitemap.xml` shows the new URLs.

## Step 2 — Google Search Console

1. Go to https://search.google.com/search-console — your `aibuiltbyhand.com` property should already be verified (token is in the layout).
2. **Sitemaps** → add `sitemap.xml` → Submit.
3. **URL Inspection** → paste each of the first-20 URLs below → "Request indexing". (Google rate-limits this; do ~10/day over two days.)

## Step 3 — Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Easiest path: **"Import from Google Search Console"** — one click, pulls your verified property + sitemap. No re-verification needed.
3. If you'd rather verify directly: set `NEXT_PUBLIC_BING_SITE_VERIFICATION` in Vercel, redeploy, click Verify, then **Sitemaps** → submit `https://aibuiltbyhand.com/sitemap.xml`.
4. Bing indexes new URLs fast via IndexNow — after deploy, hit the ping endpoint once (Step 4).

## Step 4 — IndexNow ping (Bing/Yandex instant)

1. In Vercel, set env `INDEXNOW_PING_SECRET` to any random string.
2. After each deploy with new pages, open in a browser:
   `https://aibuiltbyhand.com/api/indexnow?secret=YOUR_SECRET`
   It submits all sitemap URLs to IndexNow and returns `{ ok: true, submitted: N }`.

---

## First 20 URLs to request indexing first (highest intent → top)

```
https://aibuiltbyhand.com/
https://aibuiltbyhand.com/pricing
https://aibuiltbyhand.com/ai-receptionist
https://aibuiltbyhand.com/ai-business-system
https://aibuiltbyhand.com/ai-chatbot-development
https://aibuiltbyhand.com/custom-ai-app-development
https://aibuiltbyhand.com/ai-automation-agency
https://aibuiltbyhand.com/services
https://aibuiltbyhand.com/services/ai-quote-generator
https://aibuiltbyhand.com/services/ai-lead-capture-form
https://aibuiltbyhand.com/services/ai-receptionist-setup
https://aibuiltbyhand.com/industries
https://aibuiltbyhand.com/industries/plumber-ai-automation
https://aibuiltbyhand.com/industries/cleaning-business-ai-automation
https://aibuiltbyhand.com/industries/dental-clinic-ai-automation
https://aibuiltbyhand.com/industries/real-estate-agent-ai-automation
https://aibuiltbyhand.com/resources/how-much-does-ai-automation-cost
https://aibuiltbyhand.com/resources/what-is-an-ai-receptionist
https://aibuiltbyhand.com/how-to/automate-quote-requests
https://aibuiltbyhand.com/use-cases/ai-receptionist-for-contractors
```

---

## Realistic expectations (no hype)

- **Indexing**: 2–4 weeks for Google to crawl/index most pages. Watch the *indexation rate* in GSC, not impressions. If <60% get indexed, fix quality before adding more pages.
- **Traffic**: 4–8 months before meaningful organic traffic on a brand-new domain with little authority. Competitive commercial terms ("AI agency Vancouver") may need backlinks to ever rank.
- **Fastest real win**: the long tail + **AEO citations** — ChatGPT/Perplexity/Google AI Overviews citing your `/resources` and `/how-to` answer pages. That's why those are answer-first with schema + llms.txt.
- **The pages are the close, not the opener.** Outreach + real client outcomes + backlinks move the needle faster than more pages. Expand to Phase 2/3 only once Phase 1 shows impressions in GSC.
```

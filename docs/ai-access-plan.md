# AI Access Plan — making the Tools Pro suite AI-recommendable + AI-usable

**Status: DECIDED, PARKED (2026-06-16).** Build when there's revenue, not before.
Reviewed with Opus. This doc exists so the architecture is decided once and built
once — no re-litigating when the time comes.

## Why parked
Zero paying customers. AI won't recommend, and agents won't use, a tool no human
has paid for. The first $19 from a real contractor is the only signal the product
itself is good. Live blocker is still the 3 secret sets (see `TOOLS-PRO-GO-LIVE.md`).
Do NOT build agent-only infrastructure (esp. an MCP server) before a human pays.

## The three things (Pavneet's ask, decomposed)
1. **AI recommends** the tools (GEO/AEO) — get cited when someone asks an AI
   "best proposal tool for contractors."
2. **AI uses** the tools — an agent calls them programmatically.
3. **AI-legible output** — structured/parseable so an agent relaying a result to a
   human gets clean fields, not a wall of text. Applies to each of the 5 tools.

Priority weighting for a pre-PMF product: **(1) ≈ (3) > (2)**.

## Build order (when it's time)

### Phase A — AI-legible output (cheap, no auth, no cost; do first)
Add a structured JSON mode to `/api/tools` (e.g. `{ format: "json" }` or `?format=json`)
returning typed fields per tool instead of only the ALLCAPS text block:
- proposal → `{ overview, scope[], approach[], timeline, investment, whyUs, terms[], nextSteps, coverEmail }`
- estimate → `{ estimateLow, estimateHigh, labour, materials, factors[], customerQuote }`
- review → `{ friendly, professional, short }`
- brief → `{ brand, targetCustomer, services[], angle[], pages[], heroCopy, keywords[], faqs[], first30Days[] }`
- reminder → `{ email, sms, finalNotice }`
Keep the current text mode as default for the web UI. This makes all 5 "best for AI to use."

### Phase B — Subscriber API keys + Bearer auth (the spine for "AI uses")
- A signed-in subscriber generates a key (`hb_live_…`) in `/account`; store a HASH only.
- `/api/tools` accepts `Authorization: Bearer hb_live_…` OR the existing session cookie.
  The key resolves to the user_id → counts against the same 50/day cap + IP throttle +
  global ceiling. The human did OAuth once in a browser; the agent just carries the key.
  This sidesteps "agents can't do OAuth" entirely.
- **Free, unauthenticated, read-only discovery:** `GET /api/tools/list` returns the tool
  catalogue (names, descriptions, input schemas, example output). It CANNOT generate, so
  it can't run up the OpenAI bill. Discovery is free; execution needs a paying key.
- New Prisma model `ApiKey { id, userId, hash, prefix, createdAt, lastUsedAt, revokedAt }`.

### Phase C — OpenAPI 3.1 schema + one Custom GPT (highest reach, ~1 day)
- One OpenAPI 3.1 doc at `/api/openapi.json` describing the endpoints + Bearer auth.
  Write once → serves API docs, the Custom GPT, and a future MCP server.
- Publish a Custom GPT ("Proposal Writer for Contractors") that calls the API with a key.
  ChatGPT is where the non-technical audience already is → doubles as a discovery channel.

### Phase D — MCP server (LAST; only when a customer asks)
A thin wrapper over the same endpoints, auth via the same `hb_live_…` key (NOT MCP OAuth).
~30 min once B+C exist. Dev-audience infra; local-biz buyers won't use it yet.

## Cost control (lives at the key/route layer, before the OpenAI call)
Resolve key → user → check per-user 50/day → IP 10/min → **global daily ceiling**
(`TOOLS_GLOBAL_DAILY_MAX`, already shipped) → then call OpenAI. Flat $19/mo stays the
pricing model (predictability sells to this buyer); metering is a cost primitive, not a
price. Add a metered overage tier only if agent volume ever threatens margin.

## Model
gpt-4o-mini for 4 of 5 tools (templated writing — nobody can tell it from a frontier
model on a review reply). The **Proposal Generator** is the exception: output quality =
perceived value. Fix the prompt first (done 2026-06-16); if real mini prose is still weak
once the key is live, route ONLY the proposal kind to Claude Sonnet / gpt-4o
(~$0.01/proposal — nothing against a $19 sub).

## GEO — what actually gets cited (not vanity)
Have already: llms.txt, JSON-LD, sitemap, IndexNow. That's parseable, not cited. Levers:
1. **One deep page per real question** ("how do I write a quote for a landscaping job")
   with a worked example + template + the tool as the "or do it in 10s here" CTA. 10 of
   these beat 100 thin pages; doubles as human SEO.
2. **Off-domain corroboration** — genuinely useful answers on Reddit/forums where
   relevant (never faked). This is what gets you into the citation set.
3. **Honest comparison / "alternatives" pages** pointed at "best X for Y" queries.
4. **Public, linkable example output** per tool the AI can cite.
Vanity (skip): more JSON-LD types, llms.txt wording tweaks, more sitemap submissions.

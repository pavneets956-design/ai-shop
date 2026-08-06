# Raw — Voice-of-Customer Access Blockers

**Date:** 2026-07-31

This file exists so the gap is reproducible rather than invisible.

## Reddit — blocked

Three attempted searches, all restricted to `reddit.com`:

1. `contractors answering service AI receptionist experience worth it`
2. `hired AI automation agency small business bad experience wasted money`
3. `plumber HVAC office admin overwhelmed answering phones scheduling`

**All three returned:**

```
API Error: 400 The following domains are not accessible to our user agent: ['reddit.com']
```

An unrestricted search for `reddit contractors missing calls while on the job losing leads` returned 10 results, of which **8 were GoHighLevel funnel-preview pages** (`app.gohighlevel.com/v2/preview/...`) — i.e. agency landing pages built on the GHL platform, not customer discussion. This is itself a market signal: the SERP for contractor missed-call language is heavily occupied by agency funnels rather than organic discussion.

## ContractorTalk — paywalled to bots

Two threads targeted:

- `https://www.contractortalk.com/threads/answering-the-phone.64814/`
- `https://www.contractortalk.com/threads/how-should-i-take-phone-calls.36150/`

**Both:** `307 Temporary Redirect` → `https://tollbit.contractortalk.com/threads/...`
Following the redirect: **`HTTP 402 Payment Required`**

Tollbit is a bot-monetisation gateway. The content is human-accessible but machine-paywalled.

## What was recoverable

Only the search engine's own summary of the ContractorTalk threads, which paraphrases rather than quotes. From that summary:

- A contractor reported an answering service costing **$80/month** and described it as "great."
- Forum members noted that **"many people hang up on answering machines and won't leave messages."**
- Members described reserving the cell phone **"for important clients and subcontractors"** and routing the rest through a service.
- Preference expressed for details **emailed or texted within minutes**, with immediate callback for emergencies.

**These are paraphrases inside a third-party summary of a paywalled page. They are not quotable as verbatim customer language.**

## Effect on the research

The voice-of-customer file (`03-customer-language.md`) identifies objection *categories* with reasonable confidence, drawn from review-site analysis and buyer-guidance literature. It **cannot** establish which specific phrasings are dominant among contractors, because the two sources that would show that were inaccessible.

The remediation protocol — first-party form data, ten recorded owner interviews, incumbent review mining, and trade Facebook/association groups — is in `03-customer-language.md` §5. It is roughly a week of work and would close this gap properly.

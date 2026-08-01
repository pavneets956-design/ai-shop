# 09 — Preview QA Report (P0 Pricing Fix)

**Branch:** `fix/p0-pricing-contradiction`
**Commit:** `97286f0`
**Base:** `free-contractor-tools` @ `551b2d7` (main @ `3031d36`)
**Production status:** ❌ **NOT DEPLOYED. NOT MERGED. NOT PUSHED.**

---

## 1. The defect

`/ai-business-system` published **three mutually exclusive prices**, two of which were self-refuting on their face. `llms.txt` — the file AI answer engines read to state what this business charges — carried the contradiction in both directions (line 9: `$3,500–$7,500`; line 32: `$2,500–5,000`).

## 2. What was changed

Five strings in **`lib/data/money.ts`** (one file, 5 insertions, 5 deletions):

| Line | Before | After |
|---|---|---|
| 277 `description` | `$2,500–5,000 CAD` | `$3,500–$7,500 CAD` |
| 278 `answer` | `$3,500–5,000 CAD (typically $7,500)` ⚠️ impossible | `$3,500–$7,500 CAD` |
| 292 `gets` | `$2,500–5,000 CAD (typically $7,500)` ⚠️ impossible | `$3,500–$7,500 CAD` |
| 65 faq | `$2,500–5,000 CAD, typically $7,500` ⚠️ impossible | `$3,500–$7,500 CAD` |
| 321 faq | `$2,500–5,000` (contradicted its own page) | `$3,500–$7,500` |

## 3. Why $3,500–$7,500 is not an invented number

The assignment forbids inventing a price. This value was **already the dominant value in the repository** — the fix removed outliers rather than choosing a new number:

| Source | Value |
|---|---|
| `money.ts:387` (same file) | $3,500–$7,500 |
| `money.ts:409` (same file) | $3,500–$7,500 |
| `/ai-business-system` JSON-LD `Offer` | `price=3500` |
| `components/home/MoltenForge.tsx:185` (live homepage) | $3,500 – $7,500 |
| `app/pricing/page.tsx:17` | $3,500 |
| `lib/data/faqs.ts:43,48` | from $3,500 |
| `lib/data/_industries_b.ts` (×12) | $3,500–$7,500 |
| `lib/data/resources.ts:650,729` | $3,500–$7,500 |

`money.ts` was contradicting **itself** 100 lines apart. The corrected strings now agree with the page's own structured data.

## 4. What was deliberately NOT changed

| Location | Value | Why left alone |
|---|---|---|
| `lib/data/industries.ts` (12 pages) | $2,500–5,000 | **Pricing decision, not a typo** → `07` Decision 1 |
| `components/BuildRequestForm.tsx:15` | $2,500–$5,000 | Live intake form — customer-facing pricing decision |
| `lib/data/liveTools.ts:127` | $2,500–$5,000 | Legacy component |
| `lib/data/alwaysAnswering.ts` | $1,000–$7,500+ | $1,000 floor is a pricing decision |
| `lib/data/forge.ts` | $750–$2,500 | `/forge` retired via redirect; likely dead code |

Only **objectively self-contradictory** strings were repaired. Everything requiring a judgment about what to charge went to the owner sheet.

## 5. Verification

### Gate — all green

| Check | Command | Result |
|---|---|---|
| Typecheck | `npx tsc --noEmit` | ✅ **0 errors** |
| Tests | `npx vitest run` | ✅ **114 passed / 0 failed** |
| Lint | `npx next lint` | ✅ **0 errors, 0 warnings** |
| Build | `npx next build` | ✅ **exit 0** |

> ⚠️ RTK's console reporter printed a false `2 routes / Errors: 2` for the build. The real result was obtained via `rtk proxy npx next build` — exit 0, full route table rendered, all 5 free tools present. This is a known RTK reporting artifact, not a build failure.

### Built-output verification — `.next/server/app/ai-business-system.html`

| Check | Before | After |
|---|---|---|
| `$3,500–$7,500` occurrences | — | **21** |
| `$2,500–5,000` present | ✅ yes (4×) | ❌ **no** |
| `$3,500–5,000` present | ✅ yes | ❌ **no** |
| `typically $7,500` present | ✅ yes | ❌ **no** |
| JSON-LD price | `3500` | `3500` (now consistent with body copy) |

### Repo-wide contradiction scan

A scanner matching both `(typically $Z)` and `, typically $Z` variants across all `.ts/.tsx/.md/.json`:

```
=== SELF-CONTRADICTORY PRICE STRINGS (range max < "typically") ===
  NONE — clean
```

*(The first scanner version used a parenthesis-only pattern and **missed the comma variant at `money.ts:65`**. It was caught by inspecting the built HTML, then the scanner was broadened and re-run. Recording the miss because the second pass is the only reason the fix is complete.)*

### llms.txt source

`money.ts` description — which generates both the meta description and the `llms.txt` entry — now reads:

> `2–4 connected AI tools that run the repetitive parts of your business as one system. $3,500–$7,500 CAD. The flagship Handbuilt package.`

The line 9 / line 32 contradiction in `llms.txt` is resolved **at the source**, so it cannot drift back.

## 6. Preview deployment — NOT CREATED

The assignment asks for a preview deployment. **I did not create one**, for two reasons:

1. **The Vercel CLI is not installed** in this environment (confirmed at session start).
2. **Deploying requires pushing the branch to origin**, which triggers a Vercel Git preview build. Pushing is an outward-facing action requiring explicit owner authorisation — it has not been given.

**To create the preview, you run:**

```bash
git push -u origin fix/p0-pricing-contradiction
```

Vercel will build a preview automatically. Nothing merges to `main` and production is untouched.

**Preview QA checklist once it builds:**
- [ ] `/ai-business-system` — one price everywhere, `$3,500–$7,500 CAD`
- [ ] View source → JSON-LD `Offer` price `3500`, no conflicting range
- [ ] `/llms.txt` — AI Business System line reads `$3,500–$7,500 CAD`; **no `$2,500–5,000` anywhere**
- [ ] `/pricing` unchanged
- [ ] Homepage unchanged (`$3,500 – $7,500`)
- [ ] All 5 `/tools/*` load and compute correctly
- [ ] Sitemap still 216 URLs
- [ ] `robots.txt` byte-identical to `raw/site/robots.txt`

## 7. Production change status

> **ZERO production changes have been made.**
> Not merged · not pushed · not deployed · no redirect created · no URL deleted · no `noindex` applied · sitemap unchanged at 216 URLs · `robots.txt` untouched · all 5 free tools intact · registry architecture intact.

**Rollback:** the change is one commit on a branch that does not exist on origin. `git branch -D fix/p0-pricing-contradiction` discards it entirely.

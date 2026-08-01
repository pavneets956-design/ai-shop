# 12 — Pricing Consistency Repair

**Executed:** 2026-08-01 · **Branch:** `fix/p0-pricing-contradiction`

## Owner-approved pricing (2026-07-31)

| Product | Approved |
|---|---|
| Starter AI worker | **from $1,500 CAD** |
| AI Receptionist Install | **$1,500–$2,500 CAD** |
| **AI Business System** | **$3,500–$7,500 CAD** |
| Custom AI App | **from $10,000 CAD** |
| Care Plan | unchanged ($99/mo, $79/mo annual) |

Approved wording where space permits:
`From $3,500 CAD. Most connected back-office systems cost $3,500–$7,500 CAD after scope is confirmed.`

---

## 1. Source of truth

`lib/data/packages.ts` was **already** the pricing registry and already held the approved figures
(`business: price 3500, priceHigh 7500`). The contradictions came entirely from **hand-typed copies**
of those numbers in prose and component literals.

Rather than add a competing `lib/data/pricing.ts`, the existing registry was extended:

- `packagePriceLabel(id)` — canonical label per package, so UI never hand-types a range.
- `BUSINESS_SYSTEM_SENTENCE` — the approved long-form wording, rendered from registry values.

Two live components now render from the registry instead of literals (`BuildRequestForm`,
`PhoneReceptionistPlan`). Prose inside content-data files stays literal — those are hand-written
sentences per industry, not templatable without the content rewrite this branch explicitly excludes.

---

## 2. Changed

| File | Route(s) | Old wording | New wording | Product | Reason |
|---|---|---|---|---|---|
| `lib/data/industries.ts` ×11 | 11 `/industries/*` pages | `$2,500–5,000 CAD as a Business AI System` | `$3,500–$7,500 CAD as a Business AI System` | **AI Business System** | Names the product explicitly in the same sentence. Unambiguous. |
| `lib/data/_industries_b.ts` ×5 | `/industries/*` | `CAD $3,500–$7,500 (typically $7,500)` | `CAD $3,500–$7,500` | AI Business System | Same page said "most setups … **at CAD $3,500**" two lines above. Self-contradictory. |
| `lib/data/_industries_b.ts` ×6 | `/industries/*` | `$3,500–$7,500 CAD, typically $7,500 flat.` / `, typically $7,500.` | `$3,500–$7,500 CAD.` | AI Business System | Same contradiction; also conflicts with the registry's `priceTypical: 5000` rendered on `/pricing`. |
| `lib/data/resources.ts` ×1 | `/resources/*` | `Business ($3,500–$7,500, typically $7,500)` | `Business ($3,500–$7,500)` | AI Business System | Same. |
| `components/BuildRequestForm.tsx` | `/create` | `~$1,000 (one tool)` · `$2,500–$5,000 (a system)` · `$7,500+ (custom app)` | rendered via `packagePriceLabel()` → `From $1,500` · `$3,500–$7,500` · `From $10,000` | All three | All three budget bands contradicted the registry. Now derived, so they cannot drift again. |
| `components/PhoneReceptionistPlan.tsx` | `/pricing` | `from $1,000 one-time` | rendered via `packagePriceLabel("starter")` → `from $1,500 one-time` | Starter / Receptionist install | Below the approved $1,500 floor. The file's own comment declared it anchored to the Starter price, which had since moved to $1,500. |
| `lib/data/alwaysAnswering.ts` ×3 | not rendered (`/ai-front-desk` 308s to `/ai-receptionist`) | `from $1,000 to $7,500+ CAD` · `Installed from $1,000 CAD` · stale `// $1,000` comment | `$1,500` / `$1,500 to $10,000+` | Starter | Below approved floor. Comment contradicted the value it annotated (`packages[0].price` = 1500). |
| `app/ai-front-desk/page.tsx` ×1 | redirected | `One-time builds from $1,000 CAD.` | `from $1,500 CAD.` | Starter | Same. |
| `lib/data/liveTools.ts` ×6 | **none — dead code** | `From $1,000` · `$2,500–$5,000` · `From $7,500` | `From $1,500` · `$3,500–$7,500` · `From $10,000` | All three | `LiveAIHome.tsx` has no importer. Fixed so a repo-wide scan stays clean and the strings cannot be revived wrong. |
| `components/home/HomepageNew.tsx` ×3 | **none — dead code** | `$1,000` · `$2,500–5,000` · `$7,500+` | `$1,500` · `$3,500–$7,500` · `From $10,000` | All three | No importer. Same reasoning. |

**Total: 37 replacements across 10 files.**

---

## 3. Intentionally preserved

| File | Wording | Product | Why preserved |
|---|---|---|---|
| `lib/data/forge.ts` L104-109 | `$750–$2,500`, `$2,500–$7,500`, `$7,500+` | — | **Budget bands a user selects**, not price claims. Also on `/forge`, which 308s to `/`. |
| `lib/data/shop.ts`, `lib/data/shopProducts.ts` | `$1,000 · built for you`, `$1,000 + $49/mo` | **`/shop` storefront SKUs** | Genuinely different product line — pre-built, ready-to-install, subscription-attached. Not the bespoke Starter build. |
| `lib/data/_services_b.ts` L436-437 | `From $1,000 to set up, then $49/mo` | **AI Review Engine** | Productised SKU with a monthly, same family as the `/shop` line. Below the Starter floor, but re-pricing it is a **pricing decision the owner has not made** — flagged, not changed. |
| `lib/data/compare.ts` L1294, L1311 | `$100–$250+/hr`, `~$1,000–$10,000+/mo` | **Competitors** | Describes agency/retainer market pricing, not ours. |
| `lib/agent/conversationEngine.ts` L172, L193 | `$3,000–$5,000 per month`, `$3,000–$4,000` | **Human receptionist salary** | Competitor benchmark. Falls in-range by coincidence. |
| `lib/data/packages.ts` `priceTypical: 5000` | "most land around $5,000" on `/pricing` | AI Business System | Inside the approved range and not contradictory once "typically $7,500" is gone. Removing it would be an unapproved change. |
| `lib/data/builder.ts` L68-131 | `$1,500–$2,500`, `$1,500–$3,000` | Individual builds | Consistent with the approved $1,500 floor. |

---

## 4. Open owner decision

**`lib/data/_services_b.ts` — AI Review Engine at "from $1,000 to set up, then $49/mo".**
`packages.ts` lists "review replies" as a **Starter AI worker** capability at a $1,500 floor, so a live
`/services` page sells overlapping capability $500 below the approved floor. It is a distinct SKU
(carries a $49/mo), so it may be intentional. **Not changed — needs an owner call.**

---

## 5. Verification

Repo-wide scan after the change (`*.ts`, `*.tsx`, excluding `node_modules`/`.next`/`research`):

| Pattern | Residual |
|---|---|
| `$2,500–$5,000` family | **0** (one occurrence remains inside an explanatory code comment) |
| `$3,500–$5,000` | **0** |
| `typically $7,500` | **0** |
| Starter/build `from $1,000` | **0** |

Generated output — **237 built HTML files**:

| Pattern | Files |
|---|---|
| `$2,500–$5,000` | **0** |
| `$3,500–$5,000` | **0** |
| `typically $7,500` | **0** |
| `from $1,000` (build/setup) | **0** |
| `$3,500–$7,500` (approved) | **90** |

`/ai-business-system` built page: JSON-LD `price = 3500` (the floor, matching "From $3,500"),
visible copy `$3,500–$7,500` ×21 and `$1,500` ×4 (Starter cross-references). **Structured data
matches visible copy. No impossible price statement remains.**

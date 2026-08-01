# `data/` — how to read these files without miscounting

**Correction issued 2026-08-01.** Two inconsistencies were reported in the deliverable set and are
now resolved here. **No number in any CSV or raw export was altered.** The defects were in the
prose reports, not the data.

## 1. The authoritative property total is 3 clicks / 609 impressions

Window: 2026-06-14 → 2026-07-29 (46 days).

**Do not derive a site total by summing `url-performance.csv` or `query-performance.csv`.**
Neither is additive to the property total, by design:

| File | Rows | Clicks | Impressions | Additive? | Why |
|---|---:|---:|---:|---|---|
| `country-performance.csv` | 25 | 3 | 609 | ✅ | Property-aggregated |
| `device-performance.csv` | 3 | 3 | 609 | ✅ | Property-aggregated |
| `query-performance.csv` | 92 | 0 | 437 | ❌ −3 / −172 | Anonymised queries have no row but count in the total. All 3 clicks are in the withheld bucket. |
| `url-performance.csv` | 218 | 4 | 803 | ❌ +1 / +194 | Page-aggregated. One SERP showing several site URLs = 1 property impression but N page impressions. |

`url-performance.csv` summing to **4** clicks (`/`=3, `/industries`=1) against a property total of
**3** is expected behaviour, not a data error. Same for 803 vs 609 impressions.

Full breakdown with deltas and ruled-out causes: **`reconciliation.csv`** (machine-readable) and
`../01-methodology-and-provenance.md` §2.

Why comments were not inlined into the CSVs: a `#` preamble breaks `Import-Csv` / `pandas.read_csv`
header inference. The reconciliation is kept as its own parseable dataset instead.

## 2. The authoritative protected-page count is 21

`consolidation-decisions.csv`, 218 rows (216 sitemap URLs + `/demo` + `/creators`):

- `revised_decision=KEEP` **and** `protected=yes` → **21** (they agree on every row)
- `revised_decision=DEFER`, `protected=no` → 194
- `revised_decision=NOINDEX-PROPOSED`, `protected=no` → 3

**22 was Phase 1's count.** It appears only in "Phase 1 had" comparison columns and is not a claim
about this phase. Any report stating a protected count other than 21 for this phase is wrong.

## 3. Provenance gap

No `dates-raw.tsv` was archived. The original capture reported daily sums reconciling to 3 / 609,
but that check **cannot be re-verified** from this archive. It is recorded as a gap, not as verified.

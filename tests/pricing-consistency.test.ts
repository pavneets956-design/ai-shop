import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { packages, carePlan } from "@/lib/data/packages";
import { shopProducts } from "@/lib/data/shopProducts";

/**
 * REPOSITORY-WIDE PRICING CONSISTENCY.
 *
 * `tests/shop-pricing.test.ts` pins the shop catalogue. This one pins the other
 * ~240 pages, because that is where the damage actually happened: a page once
 * displayed three different prices for one package, and hand-typed figures in
 * prose drifted below the figures in `lib/data/packages.ts` — which is the only
 * price in this codebase.
 *
 * WHAT IT CHECKS. Not every dollar sign on the site: most are competitor ranges,
 * calculator worked examples, or third-party subscription costs, and those are
 * legitimately arbitrary. It checks every figure that the copy presents as
 * OUR price, found through three shapes that this repo actually uses:
 *
 *   1. the `handbuilt:` column of a comparison-table row
 *   2. "...Handbuilt ... $X" within one clause
 *   3. "starts at / starting at $X"
 *
 * Any figure caught that way must be a real number from `packages.ts`, a real
 * care-plan or shop monthly, or an explicitly named exception below.
 *
 * WHEN THIS FAILS: do not add the number to the allowlist to make it green.
 * Either the copy is wrong (fix the copy) or `packages.ts` changed (then the
 * copy should be re-derived from it).
 */

// ---------------------------------------------------------------------------
// The allowed set, DERIVED from the source of truth — never hand-typed.
// ---------------------------------------------------------------------------

const buildPrices = new Set<number>();
for (const p of packages) {
  buildPrices.add(p.price);
  if (p.priceHigh) buildPrices.add(p.priceHigh);
  if (p.priceTypical) buildPrices.add(p.priceTypical);
}

const monthlyPrices = new Set<number>();
monthlyPrices.add(carePlan.monthly);
monthlyPrices.add(carePlan.annualMonthly);
for (const s of shopProducts) {
  if (s.monthlyPrice) monthlyPrices.add(s.monthlyPrice);
  if (s.setupPrice) buildPrices.add(s.setupPrice);
}

/**
 * Figures that appear beside the word "Handbuilt" but are NOT a Handbuilt
 * price. Each is listed with why, so the list cannot quietly become a dumping
 * ground. Reviewed 2026-08-30.
 */
const NOT_OUR_PRICE = new Map<number, string>([
  [0, "the competitor's $0 setup / free-trial column, always the `alternative` side"],
  [100, "third-party hosting + API run-rate quoted as a range, e.g. $20–$100/mo"],
  [250, "agency hourly rate ($100–$250/hr) quoted as the alternative"],
  [300, "competitor platform fees, e.g. $20–$300/mo"],
  [500, "competitor onboarding / SaaS ranges, e.g. $50–$500+/mo"],
  [1000, "the low end of a competitor monthly-retainer range ($1,000–$10,000+/mo)"],
  [1200, "a YEARLY total computed from a competitor monthly, e.g. $1,200–$6,000+"],
  [6000, "the upper end of that same computed yearly total"],
  [50, "competitor SaaS floor, e.g. $50–$500+/mo"],
  [200, "human answering services, $200–$1,500+/mo"],
]);

const CREATOR_TOOL_EXCEPTION_FILE = "components/creators/CreatorStudio.tsx";

// ---------------------------------------------------------------------------

function copyFiles(): string[] {
  const out: string[] = [];
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(p);
    }
  };
  ["lib/data", "app", "components"].forEach(walk);
  return out;
}

const amount = (raw: string) => Number(raw.replace(/,/g, ""));

type Hit = { file: string; line: number; value: number; text: string };

/** Every figure the copy presents as a Handbuilt price. */
function handbuiltPriceHits(): Hit[] {
  const hits: Hit[] = [];
  const patterns: RegExp[] = [
    // 1. the `handbuilt:` column of a comparison row
    /handbuilt:\s*"([^"]*)"/gi,
    // 2. "Handbuilt ... $X" inside one clause (stop at a sentence end)
    /Handbuilt[^.!?\n]{0,90}?\$\s?([\d][\d,]*)/g,
    // 3. an explicit "starts at" claim, which is always ours
    /start(?:s|ing)? at\s*(?:CAD\s*)?\$\s?([\d][\d,]*)/gi,
  ];

  for (const file of copyFiles()) {
    const rel = file.replace(/\\/g, "/");
    const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const re of patterns) {
        re.lastIndex = 0;
        for (const m of line.matchAll(re)) {
          // Pattern 1 yields a whole cell; pull every figure out of it.
          const scope = /^handbuilt:/i.test(m[0]) ? m[1] : m[1];
          const nums = /^handbuilt:/i.test(m[0])
            ? [...scope.matchAll(/\$\s?([\d][\d,]*)/g)].map((x) => amount(x[1]))
            : [amount(scope)];
          for (const value of nums) {
            if (!Number.isFinite(value)) continue;
            hits.push({ file: rel, line: i + 1, value, text: line.trim().slice(0, 160) });
          }
        }
      }
    });
  }
  return hits;
}

describe("repository-wide pricing consistency", () => {
  it("packages.ts still holds the floors the owner set on 2026-08-30", () => {
    // If any of these move, every assertion below moves with them — which is
    // the point. Hard-coded here ONLY because this is the owner's stated rule,
    // and a silent downgrade of a floor is exactly what must fail.
    expect(packages.find((p) => p.id === "starter")?.price).toBe(1500);
    expect(packages.find((p) => p.id === "business")?.price).toBe(3500);
    expect(packages.find((p) => p.id === "custom")?.price).toBe(10000);
  });

  it("every figure the copy presents as a Handbuilt price is a real price", () => {
    const offenders = handbuiltPriceHits().filter((h) => {
      if (buildPrices.has(h.value)) return false;
      if (monthlyPrices.has(h.value)) return false;
      if (NOT_OUR_PRICE.has(h.value)) return false;
      return true;
    });

    const report = offenders
      .map((o) => `  ${o.file}:${o.line}  $${o.value.toLocaleString()}\n      ${o.text}`)
      .join("\n");

    expect(
      offenders,
      offenders.length
        ? `These figures read as a Handbuilt price but match nothing in packages.ts, ` +
            `carePlans, or the shop catalogue. Fix the copy — do not widen the allowlist ` +
            `unless the number genuinely belongs to a competitor or an example:\n${report}`
        : ""
    ).toEqual([]);
  });

  it("no BUILD shop SKU contradicts packages.ts", () => {
    // Build billing only. A `managed` subscription prices on a different axis
    // (the build cost is amortised into the monthly), and the owner has not
    // ruled on whether the build floors apply to it — see the next test.
    for (const s of shopProducts) {
      if (s.billing === "managed") continue;
      if (!s.setupPrice) continue;
      const floor = packages.find((p) => p.id === s.packageId)?.price;
      expect(floor, `${s.packageId} must exist in packages.ts`).toBeDefined();
      expect(
        s.setupPrice >= floor!,
        `${s.slug}: $${s.setupPrice} is below the ${s.packageId} floor of $${floor}`
      ).toBe(true);
    }
  });

  it("KNOWN GAP, owner decision: managed SKUs carrying a setup fee under their tier floor", () => {
    // Surfaced by this test on 2026-08-30 and NOT changed. `managed` SKUs were
    // exempt from the shop floor rule because a subscription is not a build —
    // but some of them ALSO charge a one-time setup fee, and that fee is a build
    // price by any reading. Recorded here with exact values so the owner can
    // rule on it, and so it cannot drift further without failing.
    const offenders = shopProducts
      .filter((s) => s.billing === "managed" && s.setupPrice)
      .map((s) => ({
        slug: s.slug,
        setupPrice: s.setupPrice!,
        monthlyPrice: s.monthlyPrice ?? null,
        packageId: s.packageId,
        floor: packages.find((p) => p.id === s.packageId)?.price ?? null,
      }))
      .filter((s) => s.floor !== null && s.setupPrice < s.floor!)
      .sort((a, b) => a.slug.localeCompare(b.slug));

    expect(offenders).toEqual([
      {
        slug: "ai-operations-dashboard",
        setupPrice: 1500,
        monthlyPrice: 199,
        packageId: "business",
        floor: 3500,
      },
      {
        slug: "ai-receptionist-os",
        setupPrice: 1500,
        monthlyPrice: 349,
        packageId: "business",
        floor: 3500,
      },
    ]);
  });

  it("the reactivation campaign is no longer under the starter floor", () => {
    const p = shopProducts.find((x) => x.slug === "ai-customer-reactivation");
    expect(p?.setupPrice).toBe(1500);
    // The prose on the service page must agree with the card. This is the exact
    // failure mode that produced three prices for one package.
    const services = fs.readFileSync("lib/data/_services_b.ts", "utf8");
    const block = services.slice(services.indexOf('"slug": "ai-customer-reactivation"'));
    const end = block.indexOf('"slug": "', 40);
    const scoped = end > 0 ? block.slice(0, end) : block;
    expect(scoped.includes("$500"), "the reactivation page still says $500 somewhere").toBe(false);
    expect(scoped.includes("$1,500")).toBe(true);
  });

  it("KNOWN GAP, owner decision: the creator tool prices sit under the done-for-you floor", () => {
    // Not a passing grade — a pin. components/creators/CreatorStudio.tsx sells
    // six one-time "own it" creator tools at $500–$900, all below the $1,500
    // done-for-you floor. They are prose only (no JSON-LD Offer) and are a
    // different product line from the three service tiers, so they were NOT
    // repriced without the owner's decision. This test records the exact state
    // so the gap cannot be forgotten and cannot silently grow.
    const src = fs.readFileSync(CREATOR_TOOL_EXCEPTION_FILE, "utf8");
    const block = src.slice(src.indexOf("const PRICES = ["));
    const values = [...block.slice(0, block.indexOf("];")).matchAll(/\$\s?([\d][\d,]*)/g)].map((m) =>
      amount(m[1])
    );
    expect(values.length, "the creator PRICES list moved — re-review this exception").toBe(6);
    expect(values).toEqual([500, 500, 700, 700, 900, 900]);
    // If the owner raises them, this assertion fails and the exception is deleted.
    expect(
      values.every((v) => v < 1500),
      "a creator tool now clears the $1,500 floor — delete this exception and let the main rule cover it"
    ).toBe(true);
  });
});

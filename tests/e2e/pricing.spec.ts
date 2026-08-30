import { test, expect } from "@playwright/test";
import { packages, packagePriceLabel } from "../../lib/data/packages";

/**
 * Pricing must match `lib/data/packages.ts` — the single source of truth.
 *
 * This is the exact defect class that produced the last P0: `/ai-business-system`
 * showed three different prices on one page because prose files carried
 * hand-typed copies of the numbers. Owner-approved figures (2026-07-31):
 * Starter from $1,500 · Business $3,500–$7,500 · Custom from $10,000 CAD.
 */

/** Retired price strings that must never appear in rendered HTML again. */
const STALE_PRICE_PATTERNS: RegExp[] = [
  /\$2,500\s*[–-]\s*\$?5,000/,
  /\$3,500\s*[–-]\s*\$?5,000/,
  /from CAD \$7,500/i,
  /\$7,500\s*[–-]\s*\$?10,000/,
];

const PRICE_PAGES = ["/pricing", "/", "/ai-business-system", "/create"];

test.describe("pricing", () => {
  test("/pricing shows the canonical label for every package", async ({ page }) => {
    await page.goto("/pricing");
    const body = await page.locator("body").innerText();

    for (const pkg of packages) {
      const label = packagePriceLabel(pkg.id);
      // Compare on digits so "From $1,500" vs "from $1,500 CAD" both pass but a
      // different NUMBER does not.
      const digits = label.replace(/[^\d,–-]/g, "");
      expect(body, `${pkg.name} (${label}) missing from /pricing`).toContain(digits);
      expect(body, `${pkg.name} name missing from /pricing`).toContain(pkg.name);
    }
  });

  test("no page carries a retired price string", async ({ request }) => {
    const offenders: string[] = [];
    for (const path of PRICE_PAGES) {
      const res = await request.get(path, { maxRedirects: 5 });
      if (res.status() >= 400) continue;
      const html = await res.text();
      for (const pattern of STALE_PRICE_PATTERNS) {
        if (pattern.test(html)) offenders.push(`${path} matches ${pattern}`);
      }
    }
    expect(offenders, "stale prices in rendered HTML").toEqual([]);
  });

  test("/llms.txt quotes the same prices as packages.ts", async ({ request }) => {
    const res = await request.get("/llms.txt");
    test.skip(res.status() !== 200, "/llms.txt is not served");
    const body = await res.text();
    for (const pattern of STALE_PRICE_PATTERNS) {
      expect(pattern.test(body), `/llms.txt matches ${pattern}`).toBe(false);
    }
    for (const pkg of packages) {
      const digits = packagePriceLabel(pkg.id).replace(/[^\d,–-]/g, "");
      expect(body, `/llms.txt is missing ${pkg.id} (${digits})`).toContain(digits);
    }
  });

  test("FAQ prose never renders the mangled 'is From $' construction", async ({ request }) => {
    // `One AI worker is From $1,500 CAD` — a label interpolated into a sentence.
    // It also ships into the FAQPage JSON-LD, so it is a structured-data defect.
    for (const path of ["/", "/pricing", "/faq"]) {
      const res = await request.get(path, { maxRedirects: 5 });
      if (res.status() >= 400) continue;
      const html = await res.text();
      expect(/\bis From \$/.test(html), `${path} renders "is From $"`).toBe(false);
    }
  });

  test("every JSON-LD block on /pricing parses", async ({ page }) => {
    await page.goto("/pricing");
    const blocks = await page
      .locator('script[type="application/ld+json"]')
      .evaluateAll((els) => els.map((e) => e.textContent || ""));
    expect(blocks.length).toBeGreaterThan(0);
    for (const block of blocks) {
      expect(() => JSON.parse(block)).not.toThrow();
    }
  });
});

import { describe, it, expect } from "vitest";
import { shopProducts } from "@/lib/data/shopProducts";
import { getPackage } from "@/lib/data/packages";

/**
 * Price floors, enforced.
 *
 * `lib/data/shopProducts.ts` hand-types `priceLabel` and `setupPrice` per SKU
 * instead of deriving them from `packages.ts`. That is how five products ended
 * up BELOW their own tier floor and, worse, below the price their own
 * `/services/<slug>` page quotes for the same slug:
 *
 *   ai-quote-generator / ai-chatbot-for-website / ai-invoice-reminder-system
 *     $1,000 on the shop card vs $1,500 on the service page
 *   ai-review-engine        $1,000 + $49/mo, while packages.ts names
 *                           "review replies" as a Starter worker
 *   ai-lead-capture-form    $2,500 for reply + qualify + multi-channel
 *                           follow-up wired into a CRM — a connected system
 *
 * These are not just prose. `shopSchema()` publishes them to Google as
 * `Offer.price`, so an under-floor number is a structured-data claim.
 *
 * The owner's rule, 2026-08-30: a single done-for-you AI worker is at least
 * $1,500 CAD, a connected business system at least $3,500, a custom app at
 * least $10,000.
 */

/** Only builds have a floor. A monthly subscription is a different axis. */
const BUILD_BILLING = new Set(["one-time", "hybrid"]);

/**
 * There are NO exemptions any more.
 *
 * `ai-customer-reactivation` was the last one — a ~3-day one-off campaign at
 * $500 while tagged `starter`. The owner resolved it on 2026-08-30: it involves
 * done-for-you work (segmenting the list, writing the email and SMS copy,
 * sending, reporting), so it takes the $1,500 floor. The exemption set is gone
 * rather than emptied, so nobody can quietly add a slug back into it.
 */

describe("shop pricing never drops below its tier floor", () => {
  for (const product of shopProducts) {
    if (!BUILD_BILLING.has(product.billing)) continue;

    it(`${product.slug} (${product.packageId}) clears its floor`, () => {
      const floor = getPackage(product.packageId)?.price;
      expect(floor, `${product.packageId} must exist in packages.ts`).toBeDefined();
      expect(
        product.setupPrice,
        `${product.slug} is billed "${product.billing}" so it needs a setupPrice`,
      ).toBeGreaterThan(0);
      expect(
        product.setupPrice!,
        `${product.slug} is $${product.setupPrice} but the ${product.packageId} floor is $${floor}`,
      ).toBeGreaterThanOrEqual(floor!);
    });

    it(`${product.slug} label agrees with its setupPrice`, () => {
      // The label is what a human reads and what ends up quoted back at him on
      // a call; the number is what schema publishes. They must not disagree.
      const digits = String(product.setupPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      expect(
        product.priceLabel.includes(digits),
        `${product.slug}: label "${product.priceLabel}" does not contain setupPrice ${digits}`,
      ).toBe(true);
    });
  }

  it("the reactivation campaign is on the floor, not under it", () => {
    // Pinned by name because this SKU is the one that was under the floor with
    // a documented exemption. A silent revert to $500 must fail loudly.
    const p = shopProducts.find((x) => x.slug === "ai-customer-reactivation");
    expect(p, "ai-customer-reactivation must exist").toBeDefined();
    expect(p!.setupPrice).toBe(1500);
    expect(p!.priceLabel).toContain("1,500");
  });
});

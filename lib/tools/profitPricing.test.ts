import { describe, it, expect } from "vitest";
import {
  computeProfitPricing,
  marginToMarkup,
  markupToMargin,
  type ProfitPricingInput,
} from "./profitPricing";

const base: ProfitPricingInput = {
  materials: 2000,
  laborHours: 40,
  laborRate: 45,
  subcontractor: 0,
  equipment: 300,
  otherCosts: 200,
  overhead: 500,
  contingencyPct: 10,
  desiredMarginPct: 30,
  proposedPrice: 6000,
};

describe("marginToMarkup / markupToMargin", () => {
  it("converts a 50% margin to a 100% markup", () => {
    expect(marginToMarkup(50)).toBe(100);
  });
  it("converts a 100% markup to a 50% margin", () => {
    expect(markupToMargin(100)).toBe(50);
  });
  it("round-trips 30% margin -> 42.86% markup", () => {
    expect(marginToMarkup(30)).toBe(42.86);
  });
  it("treats a 0% margin as 0% markup", () => {
    expect(marginToMarkup(0)).toBe(0);
    expect(markupToMargin(0)).toBe(0);
  });
});

describe("computeProfitPricing — worked example", () => {
  const r = computeProfitPricing(base);
  it("sums labour and direct cost correctly", () => {
    expect(r.laborCost).toBe(1800);
    expect(r.directCost).toBe(4300);
  });
  it("applies contingency on direct + overhead", () => {
    expect(r.contingencyAmount).toBe(480);
    expect(r.totalJobCost).toBe(5280);
  });
  it("break-even equals total job cost", () => {
    expect(r.breakEvenPrice).toBe(5280);
  });
  it("recommends price from margin (not markup)", () => {
    expect(r.recommendedPrice).toBe(7542.86);
    expect(r.recommendedProfit).toBe(2262.86);
    expect(r.recommendedMargin).toBe(30);
  });
  it("reports the equivalent markup", () => {
    expect(r.equivalentMarkupPct).toBe(42.86);
  });
  it("evaluates the proposed price as below target margin", () => {
    expect(r.proposed?.price).toBe(6000);
    expect(r.proposed?.profit).toBe(720);
    expect(r.proposed?.marginPct).toBe(12);
    expect(r.proposed?.markupPct).toBe(13.64);
    expect(r.proposed?.verdict).toBe("below-target");
  });
  it("models 10/20/30% cost overruns against the proposed price", () => {
    const [o10, o20, o30] = r.overruns;
    expect(o10.overrunPct).toBe(10);
    expect(o10.jobCost).toBe(5808);
    expect(o10.profit).toBe(192);
    expect(o20.profit).toBe(-336);
    expect(o30.profit).toBe(-864);
  });
});

describe("computeProfitPricing — verdicts", () => {
  it("flags a price below cost", () => {
    const r = computeProfitPricing({ ...base, proposedPrice: 4000 });
    expect(r.proposed?.verdict).toBe("below-cost");
    expect(r.proposed?.profit).toBeLessThan(0);
  });
  it("calls a price at the target margin on-target", () => {
    const r = computeProfitPricing({ ...base, proposedPrice: 7542.86 });
    expect(r.proposed?.verdict).toBe("on-target");
  });
  it("calls a richer price above-target", () => {
    const r = computeProfitPricing({ ...base, proposedPrice: 9000 });
    expect(r.proposed?.verdict).toBe("above-target");
  });
  it("omits the proposed block when no proposed price is given", () => {
    const { proposedPrice, ...noProposed } = base;
    const r = computeProfitPricing(noProposed);
    expect(r.proposed).toBeUndefined();
    // overruns fall back to the recommended price
    expect(r.overruns[0].overrunPct).toBe(10);
  });
});

describe("computeProfitPricing — edge cases", () => {
  it("handles all-zero inputs without NaN/Infinity", () => {
    const r = computeProfitPricing({
      materials: 0, laborHours: 0, laborRate: 0, subcontractor: 0,
      equipment: 0, otherCosts: 0, overhead: 0, contingencyPct: 0,
      desiredMarginPct: 30,
    });
    expect(r.totalJobCost).toBe(0);
    expect(r.recommendedPrice).toBe(0);
    expect(r.equivalentMarkupPct).toBe(42.86);
    expect(Number.isFinite(r.recommendedProfit)).toBe(true);
  });
  it("clamps negative cost inputs to zero and warns", () => {
    const r = computeProfitPricing({ ...base, materials: -500 });
    expect(r.directCost).toBe(2300); // materials treated as 0
    expect(r.warnings.some((w) => /negative/i.test(w))).toBe(true);
  });
  it("clamps an impossible margin (>=100%) and warns", () => {
    const r = computeProfitPricing({ ...base, desiredMarginPct: 120 });
    expect(r.recommendedMargin).toBeLessThanOrEqual(95);
    expect(Number.isFinite(r.recommendedPrice)).toBe(true);
    expect(r.warnings.some((w) => /margin/i.test(w))).toBe(true);
  });
  it("survives huge values", () => {
    const r = computeProfitPricing({ ...base, materials: 1_000_000_000 });
    expect(Number.isFinite(r.recommendedPrice)).toBe(true);
    expect(r.recommendedPrice).toBeGreaterThan(r.totalJobCost);
  });
});

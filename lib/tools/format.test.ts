import { describe, it, expect } from "vitest";
import { round2, formatCurrency, formatPercent, formatNumber, clampNonNeg, safeNum } from "./format";

describe("safeNum", () => {
  it("passes finite numbers through", () => {
    expect(safeNum(12.5)).toBe(12.5);
    expect(safeNum(0)).toBe(0);
    expect(safeNum(-3)).toBe(-3);
  });
  it("coerces NaN, Infinity, null, undefined, '' to 0", () => {
    expect(safeNum(NaN)).toBe(0);
    expect(safeNum(Infinity)).toBe(0);
    expect(safeNum(-Infinity)).toBe(0);
    expect(safeNum(null)).toBe(0);
    expect(safeNum(undefined)).toBe(0);
    expect(safeNum("")).toBe(0);
  });
  it("parses numeric strings", () => {
    expect(safeNum("1234.56")).toBe(1234.56);
    expect(safeNum("  42 ")).toBe(42);
  });
  it("supports a custom fallback", () => {
    expect(safeNum(NaN, 5)).toBe(5);
  });
});

describe("clampNonNeg", () => {
  it("clamps negatives to zero", () => {
    expect(clampNonNeg(-10)).toBe(0);
    expect(clampNonNeg(-0.01)).toBe(0);
  });
  it("leaves non-negatives untouched", () => {
    expect(clampNonNeg(0)).toBe(0);
    expect(clampNonNeg(99.9)).toBe(99.9);
  });
  it("sanitises non-finite input to zero", () => {
    expect(clampNonNeg(NaN)).toBe(0);
    expect(clampNonNeg(Infinity)).toBe(0);
  });
});

describe("round2", () => {
  it("rounds to two decimals", () => {
    expect(round2(1.005)).toBe(1.01);
    expect(round2(2.344)).toBe(2.34);
    expect(round2(2.345)).toBe(2.35);
  });
  it("returns 0 for non-finite", () => {
    expect(round2(NaN)).toBe(0);
    expect(round2(Infinity)).toBe(0);
  });
  it("handles huge values without scientific notation loss", () => {
    expect(round2(1000000.129)).toBe(1000000.13);
  });
});

describe("formatCurrency", () => {
  it("formats CAD by default with grouping and 2 decimals", () => {
    const out = formatCurrency(1234.5);
    expect(out).toContain("1,234.50");
    expect(out.startsWith("$")).toBe(true);
  });
  it("rounds cents", () => {
    expect(formatCurrency(1234.567)).toContain("1,234.57");
  });
  it("renders zero as $0.00", () => {
    expect(formatCurrency(0)).toContain("0.00");
  });
  it("coerces non-finite to zero", () => {
    expect(formatCurrency(Infinity)).toContain("0.00");
    expect(formatCurrency(NaN)).toContain("0.00");
  });
  it("supports USD", () => {
    const out = formatCurrency(1000, "USD");
    expect(out).toContain("1,000.00");
  });
  it("can drop decimals when whole=true", () => {
    expect(formatCurrency(1500, "CAD", true)).toContain("1,500");
    expect(formatCurrency(1500, "CAD", true)).not.toContain(".00");
  });
});

describe("formatPercent", () => {
  it("formats with one decimal by default and a % sign", () => {
    expect(formatPercent(23.456)).toBe("23.5%");
  });
  it("respects a custom precision", () => {
    expect(formatPercent(23.456, 0)).toBe("23%");
    expect(formatPercent(23.4, 2)).toBe("23.40%");
  });
  it("coerces non-finite to 0%", () => {
    expect(formatPercent(Infinity)).toBe("0.0%");
  });
});

describe("formatNumber", () => {
  it("groups thousands with no decimals by default", () => {
    expect(formatNumber(12345)).toBe("12,345");
  });
  it("supports decimals", () => {
    expect(formatNumber(12.3, 1)).toBe("12.3");
  });
});

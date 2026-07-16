import { describe, it, expect } from "vitest";
import { computeLaborBurden, type LaborBurdenInput } from "./laborBurden";

const base: LaborBurdenInput = {
  baseWage: 30,
  payrollTaxPct: 8,
  workersCompPct: 6,
  benefitsPct: 5,
  vacationPct: 4,
  statHolidayPct: 3,
  otherAnnualCost: 6000,
  paidHoursPerYear: 2080,
  billableHoursPerYear: 1600,
  overheadPct: 15,
  desiredMarginPct: 25,
  proposedBillRate: 65,
};

describe("computeLaborBurden — worked example", () => {
  const r = computeLaborBurden(base);
  it("computes total annual cost", () => {
    expect(r.totalAnnualCost).toBe(84624);
  });
  it("computes true hourly cost per paid hour", () => {
    expect(r.trueHourlyCost).toBe(40.68);
  });
  it("computes burden percentage over base wage", () => {
    expect(r.burdenPercentage).toBe(35.62);
  });
  it("computes cost per billable hour and break-even rate", () => {
    expect(r.costPerBillableHour).toBe(52.89);
    expect(r.breakEvenBillRate).toBe(52.89);
  });
  it("recommends a bill rate with overhead + margin", () => {
    expect(r.recommendedBillRate).toBe(81.1);
    expect(r.profitPerBillableHour).toBe(20.27);
  });
  it("evaluates a proposed bill rate as below target", () => {
    expect(r.proposed?.profitPerHour).toBe(4.18);
    expect(r.proposed?.marginPct).toBe(6.43);
    expect(r.proposed?.verdict).toBe("below-target");
  });
});

describe("computeLaborBurden — edge cases", () => {
  it("defaults paid/billable hours when omitted", () => {
    const { paidHoursPerYear, billableHoursPerYear, ...noHours } = base;
    const r = computeLaborBurden(noHours);
    expect(r.paidHoursPerYear).toBe(2080);
    expect(r.billableHoursPerYear).toBe(1600);
  });
  it("guards against zero billable hours", () => {
    const r = computeLaborBurden({ ...base, billableHoursPerYear: 0 });
    expect(r.costPerBillableHour).toBe(0);
    expect(Number.isFinite(r.recommendedBillRate)).toBe(true);
  });
  it("clamps negative wage to zero and warns", () => {
    const r = computeLaborBurden({ ...base, baseWage: -10 });
    expect(r.totalAnnualCost).toBe(6000); // only otherAnnualCost survives
    expect(r.warnings.some((w) => /negative/i.test(w))).toBe(true);
  });
  it("caps an impossible margin and warns", () => {
    const r = computeLaborBurden({ ...base, desiredMarginPct: 120 });
    expect(r.recommendedMargin).toBeLessThanOrEqual(95);
    expect(Number.isFinite(r.recommendedBillRate)).toBe(true);
    expect(r.warnings.some((w) => /margin/i.test(w))).toBe(true);
  });
  it("all-zero inputs produce no NaN", () => {
    const r = computeLaborBurden({
      baseWage: 0, payrollTaxPct: 0, workersCompPct: 0, benefitsPct: 0,
      vacationPct: 0, statHolidayPct: 0, otherAnnualCost: 0,
      overheadPct: 0, desiredMarginPct: 25,
    });
    expect(r.totalAnnualCost).toBe(0);
    expect(r.recommendedBillRate).toBe(0);
    expect(r.trueHourlyCost).toBe(0);
  });
});

import { describe, it, expect } from "vitest";
import { computeMissedCall, type MissedCallInput } from "./missedCall";

const base: MissedCallInput = {
  callsPerPeriod: 50,
  period: "week",
  missedPct: 20,
  genuinePct: 70,
  closeRate: 40,
  avgJobValue: 1200,
  currentAnsweringCost: 0,
  recoverableRate: 60,
  aiSetupCost: 1500,
};

describe("computeMissedCall — worked example (weekly)", () => {
  const r = computeMissedCall(base);
  it("normalises weekly calls to a month (x4.33)", () => {
    expect(r.missedCallsPerMonth).toBe(43.3);
  });
  it("derives qualified leads and jobs lost", () => {
    expect(r.missedQualifiedLeads).toBe(30.31);
    expect(r.jobsLostPerMonth).toBe(12.12);
  });
  it("computes revenue at risk monthly and annually", () => {
    expect(r.revenueAtRiskMonthly).toBe(14548.8);
    expect(r.revenueAtRiskAnnual).toBe(174585.6);
  });
  it("produces three recovery scenarios with documented rates", () => {
    const [cons, likely, opt] = r.scenarios;
    expect(cons.key).toBe("conservative");
    expect(cons.rate).toBe(36);
    expect(cons.recoveredRevenueMonthly).toBe(5237.57);
    expect(likely.rate).toBe(60);
    expect(likely.recoveredRevenueMonthly).toBe(8729.28);
    expect(likely.recoveredJobs).toBe(7.27);
    expect(opt.rate).toBe(84);
    expect(opt.recoveredRevenueMonthly).toBe(12220.99);
  });
  it("computes break-even jobs and payback period from setup cost", () => {
    expect(r.jobsToBreakEven).toBe(2);
    expect(r.paybackMonths).toBe(0.17);
  });
});

describe("computeMissedCall — edge cases", () => {
  it("treats period=month as no multiplier", () => {
    const r = computeMissedCall({ ...base, callsPerPeriod: 100, period: "month" });
    expect(r.callsPerMonth).toBe(100);
  });
  it("returns all zeros for empty inputs without NaN", () => {
    const r = computeMissedCall({
      callsPerPeriod: 0, period: "month", missedPct: 0, genuinePct: 0,
      closeRate: 0, avgJobValue: 0, currentAnsweringCost: 0, recoverableRate: 0,
    });
    expect(r.revenueAtRiskMonthly).toBe(0);
    expect(r.scenarios[1].recoveredRevenueMonthly).toBe(0);
    expect(r.jobsToBreakEven).toBe(0);
    expect(r.paybackMonths).toBe(0);
  });
  it("clamps percentages above 100 and caps optimistic at 100", () => {
    const r = computeMissedCall({ ...base, recoverableRate: 150 });
    expect(r.scenarios[1].rate).toBe(100);
    expect(r.scenarios[2].rate).toBe(100);
  });
  it("avoids divide-by-zero when avgJobValue is 0", () => {
    const r = computeMissedCall({ ...base, avgJobValue: 0 });
    expect(r.jobsToBreakEven).toBe(0);
    expect(Number.isFinite(r.paybackMonths)).toBe(true);
  });
  it("no setup cost => zero payback and zero break-even jobs", () => {
    const r = computeMissedCall({ ...base, aiSetupCost: 0 });
    expect(r.jobsToBreakEven).toBe(0);
    expect(r.paybackMonths).toBe(0);
  });
});

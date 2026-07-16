import { describe, it, expect } from "vitest";
import { scoreLeadLeak, LEAD_LEAK_CATEGORIES, type LeadLeakAnswers } from "./leadLeakAudit";

const keys = LEAD_LEAK_CATEGORIES.map((c) => c.key);
const answersAll = (points: number): LeadLeakAnswers =>
  Object.fromEntries(keys.map((k) => [k, points]));

describe("LEAD_LEAK_CATEGORIES", () => {
  it("defines exactly 12 categories, each with 4 scored options", () => {
    expect(LEAD_LEAK_CATEGORIES).toHaveLength(12);
    for (const c of LEAD_LEAK_CATEGORIES) {
      expect(c.options).toHaveLength(4);
      expect(c.options.map((o) => o.points).sort()).toEqual([0, 1, 2, 3]);
      expect(c.manualFix.length).toBeGreaterThan(0);
      expect(c.automateFix.length).toBeGreaterThan(0);
    }
  });
  it("has unique category keys", () => {
    expect(new Set(keys).size).toBe(12);
  });
});

describe("scoreLeadLeak", () => {
  it("scores a perfect audit at 100 (strong)", () => {
    const r = scoreLeadLeak(answersAll(3));
    expect(r.overall).toBe(100);
    expect(r.band).toBe("strong");
    expect(r.byCategory.every((c) => c.score === 100)).toBe(true);
  });
  it("scores a worst-case audit at 0 (critical) with 3 top leaks", () => {
    const r = scoreLeadLeak(answersAll(0));
    expect(r.overall).toBe(0);
    expect(r.band).toBe("critical");
    expect(r.topLeaks).toHaveLength(3);
    expect(r.topLeaks.every((l) => l.score === 0)).toBe(true);
  });
  it("averages a half-and-half audit to 50 (leaky)", () => {
    const answers: LeadLeakAnswers = {};
    keys.forEach((k, i) => (answers[k] = i < 6 ? 3 : 0));
    const r = scoreLeadLeak(answers);
    expect(r.overall).toBe(50);
    expect(r.band).toBe("leaky");
    expect(r.topLeaks.every((l) => l.score === 0)).toBe(true);
  });
  it("surfaces the lowest-scoring categories as top leaks with actions", () => {
    const answers = answersAll(3);
    answers[keys[4]] = 0;
    answers[keys[7]] = 1;
    const r = scoreLeadLeak(answers);
    expect(r.topLeaks[0].key).toBe(keys[4]);
    expect(r.topLeaks[1].key).toBe(keys[7]);
    expect(r.topLeaks[0].manualFix.length).toBeGreaterThan(0);
    expect(r.topLeaks[0].automateFix.length).toBeGreaterThan(0);
  });
  it("only counts answered categories toward completeness and score", () => {
    const partial: LeadLeakAnswers = { [keys[0]]: 3, [keys[1]]: 3, [keys[2]]: 3 };
    const r = scoreLeadLeak(partial);
    expect(r.overall).toBe(100);
    expect(r.answeredCount).toBe(3);
    expect(r.completeness).toBe(25); // 3 / 12 => 25%
  });
  it("returns 0 for no answers without NaN", () => {
    const r = scoreLeadLeak({});
    expect(r.overall).toBe(0);
    expect(r.answeredCount).toBe(0);
    expect(Number.isFinite(r.overall)).toBe(true);
  });
  it("ignores out-of-range answer values", () => {
    const r = scoreLeadLeak({ [keys[0]]: 9, [keys[1]]: -4, [keys[2]]: 3 });
    expect(r.answeredCount).toBe(1); // only keys[2]=3 is valid
    expect(r.overall).toBe(100);
  });
});

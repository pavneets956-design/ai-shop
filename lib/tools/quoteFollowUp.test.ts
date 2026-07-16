import { describe, it, expect } from "vitest";
import {
  generateQuoteFollowUps,
  smsSegments,
  type QuoteFollowUpInput,
} from "./quoteFollowUp";

const base: QuoteFollowUpInput = {
  firstName: "Mike",
  trade: "roofing",
  jobType: "roof replacement",
  tone: "friendly",
  channel: "both",
  financingAvailable: false,
};

describe("smsSegments", () => {
  it("counts a single segment up to 160 chars", () => {
    expect(smsSegments("a".repeat(160))).toBe(1);
  });
  it("splits into 153-char concatenated segments beyond 160", () => {
    expect(smsSegments("a".repeat(200))).toBe(2);
  });
  it("treats empty text as zero segments", () => {
    expect(smsSegments("")).toBe(0);
  });
});

describe("generateQuoteFollowUps", () => {
  it("returns the full 7-step sequence in order", () => {
    const { sequence } = generateQuoteFollowUps(base);
    expect(sequence.map((m) => m.id)).toEqual([
      "receipt",
      "first-follow-up",
      "question-handling",
      "timing",
      "final-check-in",
      "cold-reopening",
      "respectful-close",
    ]);
    for (const m of sequence) {
      expect(m.timingHint.length).toBeGreaterThan(0);
      expect(m.label.length).toBeGreaterThan(0);
    }
  });

  it("produces both SMS and email variants when channel=both", () => {
    const { sequence } = generateQuoteFollowUps(base);
    for (const m of sequence) {
      expect(m.sms).toBeDefined();
      expect(m.email).toBeDefined();
      expect(m.email?.subject.length).toBeGreaterThan(0);
      expect(m.sms?.segments).toBeGreaterThanOrEqual(1);
    }
  });

  it("produces only SMS when channel=sms", () => {
    const { sequence } = generateQuoteFollowUps({ ...base, channel: "sms" });
    expect(sequence.every((m) => m.sms && !m.email)).toBe(true);
  });

  it("produces only email when channel=email", () => {
    const { sequence } = generateQuoteFollowUps({ ...base, channel: "email" });
    expect(sequence.every((m) => m.email && !m.sms)).toBe(true);
  });

  it("interpolates the customer name and trade", () => {
    const { sequence } = generateQuoteFollowUps(base);
    const all = sequence.map((m) => `${m.sms?.body} ${m.email?.body}`).join(" ");
    expect(all).toContain("Mike");
    expect(all).toContain("roofing");
    expect(all).not.toContain("undefined");
    expect(all).not.toContain("{");
  });

  it("falls back gracefully when the name is missing", () => {
    const { firstName, ...noName } = base;
    const { sequence } = generateQuoteFollowUps(noName);
    const all = sequence.map((m) => m.sms?.body).join(" ");
    expect(all).toContain("there");
    expect(all).not.toContain("undefined");
  });

  it("mentions financing only when it is available", () => {
    const withFin = generateQuoteFollowUps({ ...base, financingAvailable: true });
    const withoutFin = generateQuoteFollowUps({ ...base, financingAvailable: false });
    const finText = withFin.sequence.map((m) => m.email?.body).join(" ").toLowerCase();
    const noFinText = withoutFin.sequence.map((m) => m.email?.body).join(" ").toLowerCase();
    expect(finText).toMatch(/financing|payment plan/);
    expect(noFinText).not.toMatch(/financing|payment plan/);
  });

  it("mentions expiry only when an expiration date is given", () => {
    const withExp = generateQuoteFollowUps({ ...base, expirationDate: "2026-08-01" });
    const noExp = generateQuoteFollowUps(base);
    const withText = withExp.sequence.map((m) => m.email?.body).join(" ").toLowerCase();
    const noText = noExp.sequence.map((m) => m.email?.body).join(" ").toLowerCase();
    expect(withText).toContain("2026-08-01");
    expect(noText).not.toMatch(/expire|expires/);
  });

  it("stays in the sales/quote lane — no payment/invoice/overdue wording", () => {
    const { sequence } = generateQuoteFollowUps({ ...base, financingAvailable: true });
    const all = sequence
      .map((m) => `${m.sms?.body ?? ""} ${m.email?.subject ?? ""} ${m.email?.body ?? ""}`)
      .join(" ")
      .toLowerCase();
    expect(all).not.toMatch(/invoice|overdue|past due|payment reminder/);
  });

  it("keeps SMS bodies within a sensible length and reports segments", () => {
    const { sequence } = generateQuoteFollowUps({ ...base, channel: "sms" });
    for (const m of sequence) {
      expect(m.sms!.length).toBe(m.sms!.body.length);
      expect(m.sms!.segments).toBe(smsSegments(m.sms!.body));
    }
  });
});

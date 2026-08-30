import { describe, it, expect, vi, afterEach } from "vitest";

// The wrapper imports { track } from "@vercel/analytics"; mock it.
const { trackMock } = vi.hoisted(() => ({ trackMock: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track: trackMock }));

import { trackTool, trackEvent, safeProps } from "./track";

afterEach(() => vi.clearAllMocks());

describe("trackTool — privacy-safe, failure-safe analytics", () => {
  it("forwards a tool event with only non-sensitive props", () => {
    trackTool("tool_calculated", { tool: "contractor-lead-leak-audit", band: "leaky" });
    expect(trackMock).toHaveBeenCalledWith("tool_calculated", {
      tool: "contractor-lead-leak-audit",
      band: "leaky",
    });
  });

  it("never throws when the analytics provider throws — submission/tool flow is unaffected", () => {
    trackMock.mockImplementation(() => {
      throw new Error("blocked by ad-blocker / offline");
    });
    expect(() => trackTool("lead_from_tool", { tool: "x" })).not.toThrow();
    expect(() => trackTool("tool_cta_clicked", { tool: "x" })).not.toThrow();
    expect(() => trackEvent("form_submitted", { step: 2 })).not.toThrow();
  });

  it("is a no-op-safe wrapper even with no props", () => {
    expect(() => trackTool("tool_shared")).not.toThrow();
    // Server-side there is no `window`, so no `page` prop is attached.
    expect(trackMock).toHaveBeenCalledWith("tool_shared", {});
  });
});

describe("prop sanitiser — the guarantee, asserted rather than assumed", () => {
  it("drops any key that could carry personal or free-text data", () => {
    // console.error is the dev-mode alarm; silence it for the assertion.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const out = safeProps({
      cta_id: "hero_primary",
      name: "Pavneet",
      email: "someone@example.com",
      phone: "604-555-0100",
      message: "please call me",
      prompt: "my roof is leaking",
      field: "email", // the NAME of an invalid field is fine…
    });
    expect(out).toEqual({ cta_id: "hero_primary", field: "email" });
    spy.mockRestore();
  });

  it("caps long values so a hostile string cannot become the payload", () => {
    const out = safeProps({ slug: "x".repeat(500) });
    expect((out!.slug as string).length).toBe(64);
  });

  it("passes numbers and booleans through untouched", () => {
    expect(safeProps({ step: 2, completed: true })).toEqual({ step: 2, completed: true });
  });
});

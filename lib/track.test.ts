import { describe, it, expect, vi, afterEach } from "vitest";

// The wrapper imports { track } from "@vercel/analytics"; mock it.
const { trackMock } = vi.hoisted(() => ({ trackMock: vi.fn() }));
vi.mock("@vercel/analytics", () => ({ track: trackMock }));

import { trackTool } from "./track";

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
  });

  it("is a no-op-safe wrapper even with no props", () => {
    expect(() => trackTool("tool_shared")).not.toThrow();
    expect(trackMock).toHaveBeenCalledWith("tool_shared", undefined);
  });
});

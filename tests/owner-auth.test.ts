import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * The owner allowlist is the only thing standing between the internet and a
 * table of customer names, emails and phone numbers. Every branch is pinned
 * here, including the two that must FAIL CLOSED:
 *   - an unset allowlist admits nobody (never "allow everyone")
 *   - a session lookup that throws is never read as authorised
 */

const { getServerSessionMock } = vi.hoisted(() => ({ getServerSessionMock: vi.fn() }));
vi.mock("next-auth/next", () => ({ getServerSession: getServerSessionMock }));
vi.mock("@/lib/auth", () => ({ authOptions: {} }));

import {
  checkOwner,
  ownerAllowlistConfigured,
  ownerEmails,
  OWNER_EMAILS_ENV,
  LEGACY_OWNER_EMAILS_ENV,
} from "@/lib/ownerAuth";

beforeEach(() => {
  vi.stubEnv(OWNER_EMAILS_ENV, "");
  vi.stubEnv(LEGACY_OWNER_EMAILS_ENV, "");
  getServerSessionMock.mockReset();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("ownerEmails", () => {
  it("is empty when nothing is configured", () => {
    expect(ownerEmails()).toEqual([]);
    expect(ownerAllowlistConfigured()).toBe(false);
  });

  it("parses, trims and lower-cases a comma-separated list", () => {
    vi.stubEnv(OWNER_EMAILS_ENV, " Pav@Example.com , second@example.com ,, ");
    expect(ownerEmails()).toEqual(["pav@example.com", "second@example.com"]);
  });

  it("falls back to AGENT_OWNER_EMAILS so existing Vercel config keeps working", () => {
    vi.stubEnv(LEGACY_OWNER_EMAILS_ENV, "legacy@example.com");
    expect(ownerEmails()).toEqual(["legacy@example.com"]);
  });

  it("prefers OWNER_EMAILS when both are set", () => {
    vi.stubEnv(OWNER_EMAILS_ENV, "new@example.com");
    vi.stubEnv(LEGACY_OWNER_EMAILS_ENV, "legacy@example.com");
    expect(ownerEmails()).toEqual(["new@example.com"]);
  });
});

describe("checkOwner", () => {
  it("reports 'anonymous', NOT 'unconfigured', to a signed-out caller when the list is empty", async () => {
    // Regression: an earlier version short-circuited on the empty allowlist, so
    // /admin/leads answered an unauthenticated 200 with a page naming the env
    // var. An anonymous caller must learn nothing beyond "sign in".
    getServerSessionMock.mockResolvedValue(null);
    await expect(checkOwner()).resolves.toEqual({ status: "anonymous" });
  });

  it("reports 'unconfigured' only to a signed-in caller, and never admits them", async () => {
    getServerSessionMock.mockResolvedValue({ user: { email: "anyone@example.com" } });
    const result = await checkOwner();
    expect(result).toEqual({ status: "unconfigured" });
    // Fail closed: an empty allowlist must not mean "let everybody in".
    expect(result).not.toMatchObject({ status: "owner" });
  });

  it("reports 'anonymous' when there is no session", async () => {
    vi.stubEnv(OWNER_EMAILS_ENV, "pav@example.com");
    getServerSessionMock.mockResolvedValue(null);
    await expect(checkOwner()).resolves.toEqual({ status: "anonymous" });
  });

  it("reports 'forbidden' for a signed-in account that is not on the list", async () => {
    vi.stubEnv(OWNER_EMAILS_ENV, "pav@example.com");
    getServerSessionMock.mockResolvedValue({ user: { email: "stranger@example.com" } });
    await expect(checkOwner()).resolves.toEqual({ status: "forbidden" });
  });

  it("admits an allowlisted owner, case-insensitively", async () => {
    vi.stubEnv(OWNER_EMAILS_ENV, "pav@example.com");
    getServerSessionMock.mockResolvedValue({ user: { email: "PAV@Example.com" } });
    await expect(checkOwner()).resolves.toEqual({
      status: "owner",
      email: "pav@example.com",
    });
  });

  it("treats a thrown session lookup as an error, never as authorised", async () => {
    vi.stubEnv(OWNER_EMAILS_ENV, "pav@example.com");
    getServerSessionMock.mockRejectedValue(new Error("adapter offline"));
    const result = await checkOwner();
    expect(result.status).toBe("error");
    expect(result).not.toMatchObject({ status: "owner" });
  });
});

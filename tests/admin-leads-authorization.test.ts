import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * ORDER OF OPERATIONS ON /admin/leads.
 *
 * `tests/owner-auth.test.ts` pins *who* is allowed in. This file pins something
 * different and easy to regress: that the page never touches the lead table
 * until the authorisation check has already returned `owner`.
 *
 * Why it matters even though the non-owner branches all return early today: the
 * query is a plain `await prisma.buildRequest.findMany(...)` sitting in the same
 * function body. Any future edit that hoists it — to compute a count for a
 * banner, to prefetch, to share a `Promise` between branches — would read
 * customer names, emails and phone numbers out of Neon for a caller who is
 * about to be shown a 404. Nothing in the type system stops that. This does.
 *
 * The `owner` case is the control. Without it the suite would still pass if the
 * query were deleted entirely.
 */

const { findMany, checkOwnerMock, redirectMock } = vi.hoisted(() => ({
  findMany: vi.fn(),
  checkOwnerMock: vi.fn(),
  redirectMock: vi.fn((url: string) => {
    // Mirrors Next's real behaviour: redirect() throws to unwind the render.
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

vi.mock("@/lib/prisma", () => ({ prisma: { buildRequest: { findMany } } }));
vi.mock("@/lib/ownerAuth", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ownerAuth")>("@/lib/ownerAuth");
  return { ...actual, checkOwner: checkOwnerMock };
});
vi.mock("next/navigation", () => ({ redirect: redirectMock }));
vi.mock("next/link", () => ({ default: () => null }));

import AdminLeadsPage from "@/app/admin/leads/page";

beforeEach(() => {
  findMany.mockReset();
  findMany.mockResolvedValue([]);
  checkOwnerMock.mockReset();
  redirectMock.mockClear();
});

afterEach(() => vi.unstubAllEnvs());

describe("/admin/leads reads no lead data before authorisation succeeds", () => {
  it("anonymous: redirects to /login and never queries", async () => {
    checkOwnerMock.mockResolvedValue({ status: "anonymous" });
    await expect(AdminLeadsPage()).rejects.toThrow(/NEXT_REDIRECT/);
    expect(redirectMock).toHaveBeenCalledWith("/login?callbackUrl=%2Fadmin%2Fleads");
    expect(findMany).not.toHaveBeenCalled();
  });

  it("forbidden: renders the ordinary not-found and never queries", async () => {
    checkOwnerMock.mockResolvedValue({ status: "forbidden" });
    await AdminLeadsPage();
    expect(findMany).not.toHaveBeenCalled();
  });

  it("unconfigured allowlist: fails closed and never queries", async () => {
    checkOwnerMock.mockResolvedValue({ status: "unconfigured" });
    await AdminLeadsPage();
    expect(findMany).not.toHaveBeenCalled();
  });

  it("session lookup error: never queries", async () => {
    checkOwnerMock.mockResolvedValue({ status: "error", detail: "adapter offline" });
    await AdminLeadsPage();
    expect(findMany).not.toHaveBeenCalled();
  });

  it("owner: DOES query — the control that keeps the four assertions above honest", async () => {
    checkOwnerMock.mockResolvedValue({ status: "owner", email: "pav@example.com" });
    await AdminLeadsPage();
    expect(findMany).toHaveBeenCalledTimes(1);
  });

  it("owner: selects no column the inbox does not display", async () => {
    checkOwnerMock.mockResolvedValue({ status: "owner", email: "pav@example.com" });
    await AdminLeadsPage();
    const select = findMany.mock.calls[0][0].select as Record<string, boolean>;
    // `payload` holds the entire raw submission, including anything a visitor
    // typed into a field the inbox does not render. It must never be selected.
    expect(select.payload).toBeUndefined();
    expect(select.fingerprint).toBeUndefined();
    expect(select.dedupeKey).toBeUndefined();
  });
});

import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";

/**
 * The retry worker and its authorisation.
 *
 * The defect this whole subsystem exists to prevent: a lead is persisted, the
 * notification fails, and nothing ever tries again — so the founder never learns
 * the enquiry happened. These tests pin the four things that make the fix real:
 *
 *   1. a failed notification is RETRIED and can succeed later
 *   2. retrying is IDEMPOTENT — a lost claim never produces a second email
 *   3. a crashed attempt is RECOVERED rather than parked in `sending` forever
 *   4. the endpoint is UNREACHABLE without the cron secret or an owner session
 */

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () { return { emails: { send: sendMock } }; }),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    buildRequest: {
      findMany: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

const { getServerSessionMock } = vi.hoisted(() => ({ getServerSessionMock: vi.fn() }));
vi.mock("next-auth/next", () => ({ getServerSession: getServerSessionMock }));
vi.mock("@/lib/auth", () => ({ authOptions: {} }));

import { prisma } from "@/lib/prisma";
import {
  claimLeadForNotify,
  recordNotifyResult,
  runNotifyRetry,
  MAX_NOTIFY_ATTEMPTS,
  NOTIFY,
} from "@/lib/leadNotify";
import { GET, POST } from "@/app/api/internal/lead-notify-retry/route";

const db = prisma.buildRequest as unknown as {
  findMany: Mock;
  update: Mock;
  updateMany: Mock;
  count: Mock;
};

const leadRow = (over: Partial<Record<string, unknown>> = {}) => ({
  id: "lead_1",
  source: "build-request",
  payload: {
    type: "build-request",
    name: "QA Tester",
    email: "qa@example.com",
    goal: "Answer my phone",
  },
  ...over,
});

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CRON_SECRET", "");
  vi.stubEnv("OWNER_EMAILS", "");
  vi.stubEnv("AGENT_OWNER_EMAILS", "");
  db.updateMany.mockResolvedValue({ count: 0 }); // no stale claims by default
  db.findMany.mockResolvedValue([]);
  db.update.mockResolvedValue({});
  db.count.mockResolvedValue(0);
  sendMock.mockResolvedValue({ data: { id: "email_retry_1" }, error: null });
  getServerSessionMock.mockResolvedValue(null);
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

// ---------------------------------------------------------------------------
// The claim — the idempotency primitive
// ---------------------------------------------------------------------------

describe("claimLeadForNotify", () => {
  it("claims only rows that are pending or failed, and increments the attempt", async () => {
    db.updateMany.mockResolvedValue({ count: 1 });
    await expect(claimLeadForNotify("lead_1")).resolves.toBe(true);
    expect(db.updateMany).toHaveBeenCalledWith({
      where: { id: "lead_1", notifyStatus: { in: [NOTIFY.PENDING, NOTIFY.FAILED] } },
      data: {
        notifyStatus: NOTIFY.SENDING,
        notifyClaimedAt: expect.any(Date),
        notifyAttempts: { increment: 1 },
      },
    });
  });

  it("does NOT claim a row somebody else already owns or already delivered", async () => {
    db.updateMany.mockResolvedValue({ count: 0 });
    await expect(claimLeadForNotify("lead_1")).resolves.toBe(false);
  });

  it("refuses the claim when the database errors — never sends on uncertainty", async () => {
    db.updateMany.mockRejectedValue(new Error("db down"));
    await expect(claimLeadForNotify("lead_1")).resolves.toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Recording the outcome
// ---------------------------------------------------------------------------

describe("recordNotifyResult", () => {
  it("writes delivered + the provider receipt on success", async () => {
    await recordNotifyResult("lead_1", { ok: true, id: "email_abc" });
    expect(db.update).toHaveBeenCalledWith({
      where: { id: "lead_1" },
      data: {
        notifyStatus: NOTIFY.DELIVERED,
        notifiedAt: expect.any(Date),
        notifyMessageId: "email_abc",
        notifyLastError: null,
        emailed: true,
      },
    });
  });

  it("writes failed + a redacted reason on failure, and never sets emailed", async () => {
    await recordNotifyResult("lead_1", {
      ok: false,
      reason: "provider_error",
      detail: "invalid_key: API key is invalid",
    });
    const data = db.update.mock.calls[0][0].data;
    expect(data.notifyStatus).toBe(NOTIFY.FAILED);
    expect(data.emailed).toBe(false);
    expect(data.notifyLastError).toBe("invalid_key: API key is invalid");
  });

  it("classifies a deliberate test non-send as skipped, so it never joins the retry queue", async () => {
    await recordNotifyResult("lead_1", { ok: false, reason: "test_skipped" });
    expect(db.update.mock.calls[0][0].data.notifyStatus).toBe(NOTIFY.SKIPPED);
  });

  it("swallows a status-write failure — the lead is already durable", async () => {
    db.update.mockRejectedValue(new Error("db down"));
    await expect(recordNotifyResult("lead_1", { ok: true })).resolves.toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// The worker
// ---------------------------------------------------------------------------

describe("runNotifyRetry", () => {
  it("retries a lead whose notification previously failed, and marks it delivered", async () => {
    db.findMany.mockResolvedValue([leadRow()]);
    db.updateMany.mockImplementation(async ({ where }: { where: Record<string, unknown> }) =>
      where.id === "lead_1" ? { count: 1 } : { count: 0 }
    );

    const report = await runNotifyRetry();

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(report).toMatchObject({ scanned: 1, delivered: 1, failed: 0 });
    expect(db.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ notifyStatus: NOTIFY.DELIVERED, emailed: true }),
      })
    );
  });

  it("replies to the address from the payload, not the phone-only sentinel column", async () => {
    db.findMany.mockResolvedValue([
      leadRow({ payload: { type: "build-request", phone: "604-555-0100" } }),
    ]);
    db.updateMany.mockImplementation(async ({ where }: { where: Record<string, unknown> }) =>
      where.id ? { count: 1 } : { count: 0 }
    );

    await runNotifyRetry();

    const sent = sendMock.mock.calls[0][0];
    expect(sent).not.toHaveProperty("replyTo");
    expect(sent.subject).toContain("phone only");
  });

  it("IS IDEMPOTENT: a row it cannot claim is never emailed", async () => {
    db.findMany.mockResolvedValue([leadRow()]);
    // Someone else (a live submission, or a concurrent run) got there first.
    db.updateMany.mockImplementation(async ({ where }: { where: Record<string, unknown> }) =>
      where.id ? { count: 0 } : { count: 0 }
    );

    const report = await runNotifyRetry();

    expect(sendMock).not.toHaveBeenCalled();
    expect(report.delivered).toBe(0);
    expect(db.update).not.toHaveBeenCalled();
  });

  it("records a failure rather than reporting a phantom success", async () => {
    db.findMany.mockResolvedValue([leadRow()]);
    db.updateMany.mockImplementation(async ({ where }: { where: Record<string, unknown> }) =>
      where.id ? { count: 1 } : { count: 0 }
    );
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "rate_limit_exceeded", message: "Too many requests" },
    });

    const report = await runNotifyRetry();

    expect(report).toMatchObject({ delivered: 0, failed: 1 });
    const data = db.update.mock.calls[0][0].data;
    expect(data.notifyStatus).toBe(NOTIFY.FAILED);
    expect(data.notifyLastError).toContain("rate_limit_exceeded");
  });

  it("reaps a claim orphaned by a crashed attempt so the lead is not stranded", async () => {
    db.updateMany.mockImplementation(async ({ where }: { where: Record<string, unknown> }) =>
      where.notifyStatus === NOTIFY.SENDING ? { count: 2 } : { count: 0 }
    );
    const report = await runNotifyRetry();
    expect(report.reaped).toBe(2);
    expect(db.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          notifyStatus: NOTIFY.SENDING,
          notifyClaimedAt: { lt: expect.any(Date) },
        }),
      })
    );
  });

  it("only scans rows under the attempt cap, and counts the ones that need a human", async () => {
    db.count.mockResolvedValue(3);
    const report = await runNotifyRetry();
    expect(db.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          notifyStatus: { in: [NOTIFY.PENDING, NOTIFY.FAILED] },
          notifyAttempts: { lt: MAX_NOTIFY_ATTEMPTS },
        },
      })
    );
    expect(report.exhausted).toBe(3);
  });

  it("reports an error instead of a quiet zero when the queue cannot be read", async () => {
    db.findMany.mockRejectedValue(new Error("connection terminated"));
    const report = await runNotifyRetry();
    expect(report.error).toContain("connection terminated");
    expect(sendMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Authorisation on the endpoint
// ---------------------------------------------------------------------------

const req = (headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/internal/lead-notify-retry", { headers });

describe("GET /api/internal/lead-notify-retry authorisation", () => {
  it("404s when CRON_SECRET is unset and nobody is signed in", async () => {
    const res = await GET(req());
    expect(res.status).toBe(404);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("404s on a wrong bearer token", async () => {
    vi.stubEnv("CRON_SECRET", "correct-horse");
    const res = await GET(req({ authorization: "Bearer wrong-token-xx" }));
    expect(res.status).toBe(404);
  });

  it("404s on a bearer of a different length (no timing oracle, still refused)", async () => {
    vi.stubEnv("CRON_SECRET", "correct-horse");
    const res = await GET(req({ authorization: "Bearer x" }));
    expect(res.status).toBe(404);
  });

  it("runs for Vercel Cron with the right bearer", async () => {
    vi.stubEnv("CRON_SECRET", "correct-horse");
    const res = await GET(req({ authorization: "Bearer correct-horse" }));
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true, via: "cron" });
  });

  it("runs for a signed-in owner so the queue can be drained by hand", async () => {
    vi.stubEnv("OWNER_EMAILS", "pav@example.com");
    getServerSessionMock.mockResolvedValue({ user: { email: "pav@example.com" } });
    const res = await POST(req());
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ ok: true, via: "owner" });
  });

  it("404s for a signed-in account that is not an owner", async () => {
    vi.stubEnv("OWNER_EMAILS", "pav@example.com");
    getServerSessionMock.mockResolvedValue({ user: { email: "stranger@example.com" } });
    const res = await GET(req());
    expect(res.status).toBe(404);
  });

  it("answers 503, not a false success, when the run cannot read its queue", async () => {
    vi.stubEnv("CRON_SECRET", "correct-horse");
    db.findMany.mockRejectedValue(new Error("connection terminated"));
    const res = await GET(req({ authorization: "Bearer correct-horse" }));
    expect(res.status).toBe(503);
    await expect(res.json()).resolves.toMatchObject({ ok: false });
  });

  it("never returns lead content — counts only", async () => {
    vi.stubEnv("CRON_SECRET", "correct-horse");
    db.findMany.mockResolvedValue([leadRow()]);
    db.updateMany.mockImplementation(async ({ where }: { where: Record<string, unknown> }) =>
      where.id ? { count: 1 } : { count: 0 }
    );
    const res = await GET(req({ authorization: "Bearer correct-horse" }));
    const text = await res.text();
    expect(text).not.toContain("qa@example.com");
    expect(text).not.toContain("QA Tester");
    expect(text).not.toContain("lead_1");
  });
});

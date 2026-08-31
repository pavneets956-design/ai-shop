import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";

/**
 * Guards on /api/build-request — the abuse, cost and truthfulness rails added
 * 2026-08-30. The happy path and the delivery contract live in
 * tests/build-request.test.ts; this file only asserts that the guards do what
 * they claim AND that none of them can produce a false "we sent it".
 *
 * Every case uses its own client IP unless it is deliberately testing the rate
 * limiter — the limiter's buckets are module state shared across this file.
 */

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    buildRequest: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      // The notification is now claimed with an atomic conditional UPDATE
      // before it is sent, so `updateMany` is on the hot path of every
      // submission — see lib/leadNotify.ts.
      updateMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import { POST } from "@/app/api/build-request/route";
import { prisma } from "@/lib/prisma";

const db = prisma.buildRequest as unknown as {
  findFirst: Mock;
  findMany: Mock;
  create: Mock;
  update: Mock;
  updateMany: Mock;
  count: Mock;
};

let ipSeq = 0;
/** A fresh IP per request, so only the rate-limit test ever sees a shared bucket. */
function freshIp(): string {
  ipSeq += 1;
  return `172.16.0.${ipSeq}`;
}

function post(
  body: unknown,
  opts: { ip?: string; headers?: Record<string, string> } = {}
): Request {
  return new Request("http://localhost/api/build-request", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      host: "localhost",
      "x-forwarded-for": opts.ip ?? freshIp(),
      ...(opts.headers ?? {}),
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validLead = {
  type: "build-request",
  name: "QA Tester",
  email: "qa@example.com",
  business: "QA Plumbing",
  goal: "Answer my phone and book jobs",
};

beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  // Generous default so only the rate-limit case trips the limiter.
  vi.stubEnv("LEAD_MAX_PER_IP_MIN", "500");
  vi.stubEnv("LEAD_MAX_PER_IP_DAY", "5000");
  db.findFirst.mockResolvedValue(null);
  db.create.mockResolvedValue({ id: "lead_guard_1" });
  db.update.mockResolvedValue({});
  // Default: this request wins the notification claim (count === 1).
  db.updateMany.mockResolvedValue({ count: 1 });
  db.findMany.mockResolvedValue([]);
  db.count.mockResolvedValue(0);
  sendMock.mockResolvedValue({ data: { id: "email_guard_1" }, error: null });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

// ---------------------------------------------------------------- honeypot --
// The field was renamed off "company_website" on 2026-08-30: that name is
// exactly what browser autofill and password managers reach for, and a tripped
// honeypot makes the API discard the lead — so the trap caught real customers.
describe("honeypot", () => {
  it("stores nothing and sends nothing when the hidden field is filled", async () => {
    const res = await POST(post({ ...validLead, hb_form_token: "http://spam.example" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    // Looks like a success to the bot, but reports honestly that nothing landed.
    expect(body.ok).toBe(true);
    expect(body.delivery).toEqual({ persisted: false, emailed: false });
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("treats an empty honeypot as a normal submission and never persists the field", async () => {
    const res = await POST(post({ ...validLead, hb_form_token: "" }));
    expect(res.status).toBe(200);
    expect(db.create).toHaveBeenCalledTimes(1);
    const data = db.create.mock.calls[0][0].data;
    expect(data.payload).not.toHaveProperty("hb_form_token");
  });
});

// -------------------------------------------------------------- rate limit --
describe("rate limit", () => {
  it("returns 429 with a retryAfter once the per-IP minute cap is hit", async () => {
    vi.stubEnv("LEAD_MAX_PER_IP_MIN", "2");
    const ip = "203.0.113.77";
    expect((await POST(post(validLead, { ip }))).status).toBe(200);
    expect((await POST(post({ ...validLead, goal: "second" }, { ip }))).status).toBe(200);

    const res = await POST(post({ ...validLead, goal: "third" }, { ip }));
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.retryAfter).toBeGreaterThan(0);
    // A throttled request must never reach storage or the provider.
    expect(db.create).toHaveBeenCalledTimes(2);
    expect(sendMock).toHaveBeenCalledTimes(2);
  });

  it("does not throttle a different IP", async () => {
    vi.stubEnv("LEAD_MAX_PER_IP_MIN", "1");
    await POST(post(validLead, { ip: "203.0.113.80" }));
    const res = await POST(post(validLead, { ip: "203.0.113.81" }));
    expect(res.status).toBe(200);
  });
});

// ------------------------------------------------------------ payload size --
describe("payload size cap", () => {
  it("rejects an oversized body with 413 and never persists it", async () => {
    const huge = { ...validLead, goal: "x".repeat(40_000) };
    const res = await POST(post(huge));
    expect(res.status).toBe(413);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBeTruthy();
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("truncates an over-long field inside an acceptable body rather than dropping it", async () => {
    const long = "y".repeat(9_000);
    const res = await POST(post({ ...validLead, goal: long }));
    expect(res.status).toBe(200);
    const data = db.create.mock.calls[0][0].data;
    expect(data.goal.length).toBeLessThan(long.length);
    // The cut is visible, so the owner never wonders why a sentence stops.
    expect(data.goal).toContain("[truncated]");
  });
});

// ----------------------------------------------------------- origin check --
describe("origin check", () => {
  it("rejects a cross-origin post with 403", async () => {
    const res = await POST(
      post(validLead, { headers: { origin: "https://evil.example" } })
    );
    expect(res.status).toBe(403);
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("accepts a same-origin post", async () => {
    const res = await POST(post(validLead, { headers: { origin: "http://localhost" } }));
    expect(res.status).toBe(200);
  });

  it("accepts a post with no origin header at all (privacy tooling, scripts)", async () => {
    // Dropping a real lead is worse than accepting an unattributed one.
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
  });
});

// ------------------------------------------------------------- email or phone --
describe("email or phone", () => {
  it("accepts a phone-only lead, stores a non-deliverable sentinel, and never reply-to's it", async () => {
    const res = await POST(
      post({ type: "build-request", name: "Phone Only", phone: "604 555 0100", goal: "Answer calls" })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.contact).toBe("phone");

    const data = db.create.mock.calls[0][0].data;
    expect(data.phone).toBe("604 555 0100");
    // RFC 2606 reserved TLD — self-documenting as "not a real address".
    expect(data.email).toMatch(/@lead\.invalid$/);
    // The payload keeps only what the visitor actually gave.
    expect(data.payload.email).toBeUndefined();

    const sent = sendMock.mock.calls[0][0];
    expect(sent.replyTo).toBeUndefined();
    expect(sent.subject).toContain("phone only");
    expect(sent.text).toContain("604 555 0100");
  });

  it("uses a deterministic sentinel so a repeat phone-only submit still dedupes", async () => {
    await POST(post({ type: "build-request", name: "A", phone: "604-555-0100", goal: "g" }));
    await POST(post({ type: "build-request", name: "A", phone: "(604) 555 0100", goal: "g" }));
    const k1 = db.create.mock.calls[0][0].data.dedupeKey;
    const k2 = db.create.mock.calls[1][0].data.dedupeKey;
    expect(k1).toEqual(k2);
  });

  it("still reply-to's a real email lead", async () => {
    await POST(post(validLead));
    expect(sendMock.mock.calls[0][0].replyTo).toBe("qa@example.com");
  });
});

// ---------------------------------------------------------------- test mode --
describe("test mode", () => {
  it("persists with a test marker and sends NO email when the secret matches", async () => {
    vi.stubEnv("LEAD_TEST_SECRET", "s3cr3t-value");
    const res = await POST(post(validLead, { headers: { "x-lead-test": "s3cr3t-value" } }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.test).toBe(true);
    expect(body.delivery).toEqual({ persisted: true, emailed: false });

    const data = db.create.mock.calls[0][0].data;
    expect(data.status).toBe("test");
    expect(data.source).toBe("test:build-request");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("routes a test submission to LEAD_TEST_NOTIFY_EMAIL when one is configured", async () => {
    vi.stubEnv("LEAD_TEST_SECRET", "s3cr3t-value");
    vi.stubEnv("LEAD_TEST_NOTIFY_EMAIL", "throwaway@example.com");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "owner@example.com");
    await POST(post(validLead, { headers: { "x-lead-test": "s3cr3t-value" } }));
    expect(sendMock).toHaveBeenCalledTimes(1);
    const sent = sendMock.mock.calls[0][0];
    expect(sent.to).toBe("throwaway@example.com");
    expect(sent.subject).toContain("[TEST]");
  });

  it("treats a WRONG secret as an ordinary lead — never an error, never a hint", async () => {
    vi.stubEnv("LEAD_TEST_SECRET", "s3cr3t-value");
    vi.stubEnv("LEAD_NOTIFY_EMAIL", "owner@example.com");
    const res = await POST(post(validLead, { headers: { "x-lead-test": "wrong-value!!" } }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.test).toBeUndefined();
    expect(db.create.mock.calls[0][0].data.status).toBeUndefined();
    expect(sendMock.mock.calls[0][0].to).toBe("owner@example.com");
  });

  it("ignores the header entirely when no LEAD_TEST_SECRET is configured", async () => {
    const res = await POST(post(validLead, { headers: { "x-lead-test": "anything" } }));
    expect(res.status).toBe(200);
    expect((await res.json()).test).toBeUndefined();
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("returns 502 rather than a false success when a test lead cannot be stored", async () => {
    vi.stubEnv("LEAD_TEST_SECRET", "s3cr3t-value");
    db.findFirst.mockRejectedValue(new Error("db down"));
    db.create.mockRejectedValue(new Error("db down"));
    const res = await POST(post(validLead, { headers: { "x-lead-test": "s3cr3t-value" } }));
    // Email is deliberately skipped in test mode, so a DB failure means the
    // pipeline genuinely did not work — say so instead of pretending.
    expect(res.status).toBe(502);
    expect((await res.json()).ok).toBe(false);
  });
});

// ------------------------------------------------- no false "sent" responses --
describe("a failed send is never reported as sent", () => {
  it("reports emailed:false when the provider returns an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { name: "invalid_key", message: "bad" } });
    const res = await POST(post(validLead));
    const body = await res.json();
    expect(body.ok).toBe(true); // the lead IS durably stored
    expect(body.delivery.emailed).toBe(false);
    // Never flags the row as emailed. It DOES write the failure down, which is
    // what makes the lead recoverable instead of silently unseen.
    expect(db.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ notifyStatus: "failed", emailed: false }),
      })
    );
  });

  it("reports emailed:false when the provider throws", async () => {
    sendMock.mockRejectedValue(new Error("ECONNRESET"));
    const body = await (await POST(post(validLead))).json();
    expect(body.delivery.emailed).toBe(false);
  });

  it("reports emailed:false when there is no API key", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const body = await (await POST(post(validLead))).json();
    expect(body.delivery).toEqual({ persisted: true, emailed: false });
  });

  it("never returns a 2xx when both channels fail in production", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    db.findFirst.mockRejectedValue(new Error("db down"));
    db.create.mockRejectedValue(new Error("db down"));
    const res = await POST(post(validLead));
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(JSON.stringify(body)).not.toMatch(/sent|inbox|delivered/i);
  });
});

// -------------------------------------------------------- duplicate submits --
describe("duplicate submission", () => {
  it("returns a 200 marked deduped, with no second insert and no second email", async () => {
    db.findFirst.mockResolvedValue({ id: "lead_existing_9" });
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ ok: true, deduped: true, id: "lead_existing_9" });
    expect(body.delivery).toEqual({ persisted: true, emailed: false });
    expect(body.contact).toBe("email");
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });
});

// --------------------------------------------------------------- PII in logs --
describe("logging", () => {
  it("never writes lead contact details or free text to the log", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    await POST(
      post({
        ...validLead,
        email: "secret.person@example.com",
        phone: "604 555 9999",
        goal: "my very identifying free text",
      })
    );
    const written = log.mock.calls.map((c) => JSON.stringify(c)).join("\n");
    expect(written).not.toContain("secret.person@example.com");
    expect(written).not.toContain("604 555 9999");
    expect(written).not.toContain("my very identifying free text");
    // It still logs enough to diagnose: a source and a coarse shape.
    expect(written).toContain("build-request");
    log.mockRestore();
  });
});

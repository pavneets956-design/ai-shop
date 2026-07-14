import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";

// --- Mocks -----------------------------------------------------------------
// Resend is dynamically imported inside the route; hoist the send spy so the
// factory can reference it.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({ emails: { send: sendMock } })),
}));

// Durable store — the route imports `{ prisma }` from "@/lib/prisma".
vi.mock("@/lib/prisma", () => ({
  prisma: {
    buildRequest: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

import { POST } from "@/app/api/build-request/route";
import { prisma } from "@/lib/prisma";

const db = prisma.buildRequest as unknown as {
  findFirst: Mock;
  create: Mock;
  update: Mock;
};

function post(body: unknown): Request {
  return new Request("http://localhost/api/build-request", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validLead = {
  type: "build-request",
  name: "QA Tester",
  email: "qa@example.com",
  goal: "Answer my phone and book jobs",
  budget: "business",
};

beforeEach(() => {
  // Default = a real deploy (preview/prod) with a working key + DB (happy path).
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  db.findFirst.mockResolvedValue(null); // no recent duplicate
  db.create.mockResolvedValue({ id: "lead_test_1" });
  db.update.mockResolvedValue({});
  sendMock.mockResolvedValue({ data: { id: "email_test_1" }, error: null });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/build-request", () => {
  // ---- Invalid input -----------------------------------------------------
  it("rejects a non-JSON body with 400 and does not persist", async () => {
    const res = await POST(post("{ not valid json"));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "Invalid request" });
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects a missing email with 400 (invalid form data)", async () => {
    const res = await POST(post({ name: "No Email" }));
    expect(res.status).toBe(400);
    await expect(res.json()).resolves.toEqual({ error: "Valid email required" });
    expect(db.create).not.toHaveBeenCalled();
  });

  it("rejects a malformed email with 400", async () => {
    const res = await POST(post({ ...validLead, email: "not-an-email" }));
    expect(res.status).toBe(400);
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  // ---- Missing Resend configuration --------------------------------------
  it("still succeeds when RESEND_API_KEY is missing, because the lead is persisted", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.delivery).toEqual({ persisted: true, emailed: false });
    expect(db.create).toHaveBeenCalledTimes(1);
    // No key => the provider is never contacted.
    expect(sendMock).not.toHaveBeenCalled();
  });

  // ---- Successful provider response --------------------------------------
  it("succeeds and marks emailed=true on a successful provider response", async () => {
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.delivery).toEqual({ persisted: true, emailed: true });
    expect(sendMock).toHaveBeenCalledTimes(1);
    // Delivery flag recorded on the persisted row.
    expect(db.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { emailed: true } })
    );
  });

  // ---- Provider non-2xx (Resend returns { error }) -----------------------
  it("does NOT claim email delivery when the provider returns an error, but still accepts via DB", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { name: "rate_limit_exceeded", message: "Too many requests" },
    });
    const res = await POST(post(validLead));
    expect(res.status).toBe(200); // lead is durably saved -> truthfully accepted
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.delivery).toEqual({ persisted: true, emailed: false });
    // Never falsely records delivery.
    expect(db.update).not.toHaveBeenCalled();
  });

  // ---- Provider / network exception --------------------------------------
  it("swallows a provider network exception but still accepts via DB", async () => {
    sendMock.mockRejectedValue(new Error("ECONNRESET"));
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.delivery).toEqual({ persisted: true, emailed: false });
  });

  // ---- Both durable channels fail (production) ---------------------------
  it("returns 502 (no false success) when DB and email both fail in production", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    db.findFirst.mockRejectedValue(new Error("db down"));
    db.create.mockRejectedValue(new Error("db down"));
    const res = await POST(post(validLead));
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(body.error).toBeTruthy();
  });

  it("does not leak provider/DB error internals to the client on failure", async () => {
    db.findFirst.mockRejectedValue(new Error("db down"));
    db.create.mockRejectedValue(new Error("db down"));
    sendMock.mockRejectedValue(new Error("smtp secret leaked xyz"));
    const res = await POST(post(validLead));
    expect(res.status).toBe(502);
    const text = JSON.stringify(await res.json());
    expect(text).not.toContain("db down");
    expect(text).not.toContain("smtp");
    expect(text).not.toContain("xyz");
  });

  // ---- Duplicate / rapid repeated submission -----------------------------
  it("is idempotent on a rapid duplicate submission (no second insert, no second email)", async () => {
    db.findFirst.mockResolvedValue({ id: "lead_existing_1" });
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ ok: true, deduped: true, id: "lead_existing_1" });
    expect(db.create).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  // ---- Development mock (never claims real delivery) ---------------------
  it("returns an explicit dev-mock (never claims delivery) only in local development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("RESEND_API_KEY", "");
    db.findFirst.mockRejectedValue(new Error("no local db"));
    db.create.mockRejectedValue(new Error("no local db"));
    const res = await POST(post(validLead));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.devMock).toBe(true);
    expect(body.delivery).toEqual({ persisted: false, emailed: false });
    expect(body.note).toMatch(/not persisted/i);
  });

  it("normalizes /start consultation `want` into the persisted goal column", async () => {
    await POST(
      post({
        source: "ai-builder",
        name: "Cafe Owner",
        email: "cafe@example.com",
        want: "Take orders after hours",
      })
    );
    expect(db.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          goal: "Take orders after hours",
          source: "ai-builder",
          kind: "AI consultation",
        }),
      })
    );
  });
});

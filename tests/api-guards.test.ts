/**
 * API guard tests.
 *
 * These pin the 2026-08-30 security work described in
 * `research/transformation-2026-08-30/08-tests-prod-risk.md` §2 and §7:
 *
 *   P0 — every `/api/agent/*` handler was unauthenticated. `GET
 *        /api/agent/contacts` returned every stored name/phone/email, `PUT
 *        /api/agent/contacts/[id]` was a mass-assignment write, and `PUT
 *        /api/agent/call` dialled arbitrary numbers through Twilio.
 *   P1 — `/api/tools-demo` and `/api/recommend` called OpenAI on the owner's
 *        key with no rate limit at all.
 *
 * The contract asserted here is: the agent subsystem is INVISIBLE (404) unless
 * `AGENT_SUBSYSTEM_ENABLED === "true"`, and even then it is owner-only, and the
 * two OpenAI proxies degrade instead of spending without limit.
 */
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";

// --- Mocks -----------------------------------------------------------------
// The guard dynamically imports these; vi.mock intercepts dynamic imports too.
const { getServerSessionMock } = vi.hoisted(() => ({ getServerSessionMock: vi.fn() }));
vi.mock("next-auth/next", () => ({ getServerSession: getServerSessionMock }));
vi.mock("@/lib/auth", () => ({ authOptions: {}, getSession: vi.fn(), getCurrentUser: vi.fn() }));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    contact: {
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    call: { findMany: vi.fn(), findUnique: vi.fn() },
  },
}));

// Never construct a real Twilio client or hit the network from a unit test.
const { twilioValidateMock, callsCreateMock } = vi.hoisted(() => ({
  twilioValidateMock: vi.fn(() => false),
  callsCreateMock: vi.fn(),
}));
vi.mock("twilio", () => {
  const factory = Object.assign(
    vi.fn(() => ({ calls: { create: callsCreateMock } })),
    {
      validateRequest: twilioValidateMock,
      twiml: {
        VoiceResponse: class {
          say() {}
          toString() {
            return "<Response><Say>Test</Say></Response>";
          }
        },
      },
    },
  );
  return { default: factory };
});

// /api/recommend reaches the model only when OPENAI_API_KEY is set; make that
// path throw instead of calling OpenAI, so the route falls back to rules.
vi.mock("openai", () => ({
  default: class {
    chat = {
      completions: {
        create: async () => {
          throw new Error("openai mocked out in tests");
        },
      },
    };
  },
}));

import { prisma } from "@/lib/prisma";
import middleware, { config as middlewareConfig } from "@/middleware";
import { guardAgentApi, AGENT_ENABLED_ENV, AGENT_OWNERS_ENV } from "@/lib/agent/guard";

const contactDb = prisma.contact as unknown as {
  findMany: Mock;
  create: Mock;
  update: Mock;
  delete: Mock;
};

const OWNER = "owner@example.com";

/** Build a Request with a controllable client IP (rate-limit buckets key on it). */
function req(url: string, init: RequestInit & { ip?: string } = {}): Request {
  const { ip, ...rest } = init;
  const headers = new Headers(rest.headers);
  if (ip) headers.set("x-forwarded-for", ip);
  if (rest.body && !headers.has("content-type")) headers.set("content-type", "application/json");
  return new Request(url, { ...rest, headers });
}

function json(body: unknown): string {
  return JSON.stringify(body);
}

/** Minimal NextRequest-shaped object for the middleware. */
function midReq(path: string) {
  const url = `https://aibuiltbyhand.com${path}`;
  return { nextUrl: new URL(url), url, headers: new Headers() } as never;
}

beforeEach(() => {
  getServerSessionMock.mockResolvedValue(null);
  twilioValidateMock.mockReturnValue(false);
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

// ===========================================================================
// 1. Kill switch — the subsystem is invisible while disabled
// ===========================================================================
describe("agent subsystem — kill switch (AGENT_SUBSYSTEM_ENABLED unset)", () => {
  it("guardAgentApi returns 404, not 401 — an attacker cannot tell the routes exist", async () => {
    const denied = await guardAgentApi();
    expect(denied).not.toBeNull();
    expect(denied!.status).toBe(404);
    await expect(denied!.json()).resolves.toEqual({ error: "Not found" });
  });

  it("never consults the session while disabled (no NextAuth/Prisma in the path)", async () => {
    await guardAgentApi();
    expect(getServerSessionMock).not.toHaveBeenCalled();
  });

  it.each([
    ["GET /api/agent/contacts", () => import("@/app/api/agent/contacts/route").then((m) => m.GET())],
    [
      "POST /api/agent/contacts",
      () =>
        import("@/app/api/agent/contacts/route").then((m) =>
          m.POST(req("http://localhost/api/agent/contacts", { method: "POST", body: json({ company: "X", phone: "1" }) }) as never),
        ),
    ],
    [
      "PUT /api/agent/contacts/[id]",
      () =>
        import("@/app/api/agent/contacts/[id]/route").then((m) =>
          m.PUT(req("http://localhost/api/agent/contacts/abc", { method: "PUT", body: json({ status: "won" }) }) as never, {
            params: { id: "abc" },
          }),
        ),
    ],
    [
      "DELETE /api/agent/contacts/[id]",
      () =>
        import("@/app/api/agent/contacts/[id]/route").then((m) =>
          m.DELETE(req("http://localhost/api/agent/contacts/abc", { method: "DELETE" }) as never, {
            params: { id: "abc" },
          }),
        ),
    ],
    ["GET /api/agent/calls", () => import("@/app/api/agent/calls/route").then((m) => m.GET(req("http://localhost/api/agent/calls") as never))],
    [
      "POST /api/agent/calls",
      () =>
        import("@/app/api/agent/calls/route").then((m) =>
          m.POST(req("http://localhost/api/agent/calls", { method: "POST", body: json({ callId: "x" }) }) as never),
        ),
    ],
    ["GET /api/agent/campaigns", () => import("@/app/api/agent/campaigns/route").then((m) => m.GET(req("http://localhost/api/agent/campaigns") as never))],
    [
      "POST /api/agent/campaigns",
      () =>
        import("@/app/api/agent/campaigns/route").then((m) =>
          m.POST(req("http://localhost/api/agent/campaigns", { method: "POST", body: json({ name: "c", targetBusinesses: [] }) }) as never),
        ),
    ],
    [
      "PUT /api/agent/campaigns",
      () =>
        import("@/app/api/agent/campaigns/route").then((m) =>
          m.PUT(req("http://localhost/api/agent/campaigns", { method: "PUT", body: json({ campaignId: "c", action: "start" }) }) as never),
        ),
    ],
    [
      "POST /api/agent/businesses/search",
      () =>
        import("@/app/api/agent/businesses/search/route").then((m) =>
          m.POST(req("http://localhost/api/agent/businesses/search", { method: "POST", body: json({ location: "Surrey" }) }) as never),
        ),
    ],
    [
      "PUT /api/agent/businesses/search",
      () =>
        import("@/app/api/agent/businesses/search/route").then((m) =>
          m.PUT(req("http://localhost/api/agent/businesses/search", { method: "PUT", body: json({ csvContent: "a,b" }) }) as never),
        ),
    ],
    [
      "POST /api/agent/call",
      () =>
        import("@/app/api/agent/call/route").then((m) =>
          m.POST(req("http://localhost/api/agent/call", { method: "POST", body: json({ callId: "x", userInput: "hi" }) }) as never),
        ),
    ],
    [
      "PUT /api/agent/call (the Twilio dialer)",
      () =>
        import("@/app/api/agent/call/route").then((m) =>
          m.PUT(req("http://localhost/api/agent/call", { method: "PUT", body: json({ toNumber: "+16045551234" }) }) as never),
        ),
    ],
  ])("%s answers 404", async (_label, call) => {
    const res = await call();
    expect(res.status).toBe(404);
  });

  it("GET /api/agent/contacts leaks no contact data and never queries the DB", async () => {
    const { GET } = await import("@/app/api/agent/contacts/route");
    const res = await GET();
    expect(res.status).toBe(404);
    expect(await res.text()).toBe('{"error":"Not found"}');
    expect(contactDb.findMany).not.toHaveBeenCalled();
  });

  it("PUT /api/agent/call never reaches Twilio, even with credentials configured", async () => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "AC_test");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token_test");
    vi.stubEnv("TWILIO_PHONE_NUMBER", "+16045550000");
    const { PUT } = await import("@/app/api/agent/call/route");
    const res = await PUT(
      req("http://localhost/api/agent/call", { method: "PUT", body: json({ toNumber: "+16045551234" }) }) as never,
    );
    expect(res.status).toBe(404);
    expect(callsCreateMock).not.toHaveBeenCalled();
  });
});

// ===========================================================================
// 2. Owner auth — the switch being on is not enough
// ===========================================================================
describe("agent subsystem — owner auth (switch on)", () => {
  beforeEach(() => {
    vi.stubEnv(AGENT_ENABLED_ENV, "true");
  });

  it("fails closed with 403 when the allowlist is unconfigured", async () => {
    const denied = await guardAgentApi();
    expect(denied!.status).toBe(403);
    const body = await denied!.json();
    expect(body.code).toBe("agent_allowlist_unconfigured");
    // The message must name the variable to set — an unexplained 403 is a silent state.
    expect(body.error).toContain(AGENT_OWNERS_ENV);
  });

  it("returns JSON 401 (not an HTML login redirect) for an anonymous caller", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, OWNER);
    getServerSessionMock.mockResolvedValue(null);
    const denied = await guardAgentApi();
    expect(denied!.status).toBe(401);
    expect(denied!.headers.get("content-type")).toContain("application/json");
    const body = await denied!.json();
    expect(body.code).toBe("agent_unauthenticated");
  });

  it("returns 403 for a signed-in account that is not on the allowlist", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, OWNER);
    getServerSessionMock.mockResolvedValue({ user: { email: "someone-else@example.com" } });
    const denied = await guardAgentApi();
    expect(denied!.status).toBe(403);
    expect((await denied!.json()).code).toBe("agent_forbidden");
  });

  it("treats a thrown session lookup as unauthenticated, never as authorised", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, OWNER);
    getServerSessionMock.mockRejectedValue(new Error("db down"));
    const denied = await guardAgentApi();
    expect(denied!.status).toBe(401);
  });

  it("lets the owner through (allowlist match is case-insensitive)", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, `${OWNER}, other@example.com`);
    getServerSessionMock.mockResolvedValue({ user: { email: OWNER.toUpperCase() } });
    await expect(guardAgentApi()).resolves.toBeNull();
  });

  it("GET /api/agent/contacts serves data ONLY to the owner", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, OWNER);
    const { GET } = await import("@/app/api/agent/contacts/route");

    getServerSessionMock.mockResolvedValue(null);
    expect((await GET()).status).toBe(401);
    expect(contactDb.findMany).not.toHaveBeenCalled();

    getServerSessionMock.mockResolvedValue({ user: { email: OWNER } });
    contactDb.findMany.mockResolvedValue([{ id: "c1", company: "Acme", phone: "+1" }]);
    const ok = await GET();
    expect(ok.status).toBe(200);
    expect(await ok.json()).toEqual([{ id: "c1", company: "Acme", phone: "+1" }]);
  });

  it("PUT /api/agent/contacts/[id] no longer mass-assigns the request body", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, OWNER);
    getServerSessionMock.mockResolvedValue({ user: { email: OWNER } });
    contactDb.update.mockResolvedValue({ id: "c1" });

    const { PUT } = await import("@/app/api/agent/contacts/[id]/route");
    await PUT(
      req("http://localhost/api/agent/contacts/c1", {
        method: "PUT",
        body: json({ status: "won", id: "hijacked", createdAt: "1999-01-01", notAColumn: true }),
      }) as never,
      { params: { id: "c1" } },
    );

    expect(contactDb.update).toHaveBeenCalledTimes(1);
    const { data } = contactDb.update.mock.calls[0][0];
    expect(data).toEqual({ status: "won" });
    expect(data).not.toHaveProperty("id");
    expect(data).not.toHaveProperty("createdAt");
    expect(data).not.toHaveProperty("notAColumn");
  });

  it("PUT /api/agent/contacts/[id] 400s when nothing editable was sent", async () => {
    vi.stubEnv(AGENT_OWNERS_ENV, OWNER);
    getServerSessionMock.mockResolvedValue({ user: { email: OWNER } });
    const { PUT } = await import("@/app/api/agent/contacts/[id]/route");
    const res = await PUT(
      req("http://localhost/api/agent/contacts/c1", { method: "PUT", body: json({ id: "hijacked" }) }) as never,
      { params: { id: "c1" } },
    );
    expect(res.status).toBe(400);
    expect(contactDb.update).not.toHaveBeenCalled();
  });
});

// ===========================================================================
// 3. Middleware — the edge gate
// ===========================================================================
describe("middleware", () => {
  it("matches BOTH the agent pages and the agent API", () => {
    expect(middlewareConfig.matcher).toContain("/agent/:path*");
    // The bug: this entry did not exist, so every /api/agent/* handler was open.
    expect(middlewareConfig.matcher).toContain("/api/agent/:path*");
  });

  it("404s /api/agent/* with JSON while the switch is off", async () => {
    const res = (await middleware(midReq("/api/agent/contacts"), {} as never)) as Response;
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
  });

  it("404s /agent/* with a real HTML page (not a blank body) while the switch is off", async () => {
    const res = (await middleware(midReq("/agent/contacts"), {} as never)) as Response;
    expect(res.status).toBe(404);
    expect(res.headers.get("content-type")).toContain("text/html");
    const html = await res.text();
    expect(html).toContain("Page not found");
    expect(html).toContain('href="/"'); // a way back — no silent states
    expect(html).toContain("noindex");
  });

  it("404s the bare /agent path too", async () => {
    const res = (await middleware(midReq("/agent"), {} as never)) as Response;
    expect(res.status).toBe(404);
  });

  it("passes non-agent paths straight through", async () => {
    const res = (await middleware(midReq("/pricing"), {} as never)) as Response;
    expect(res.status).toBe(200);
  });

  it("passes /api/agent/* through to the handlers when the switch is on (handlers answer 401, not a login redirect)", async () => {
    vi.stubEnv(AGENT_ENABLED_ENV, "true");
    const res = (await middleware(midReq("/api/agent/contacts"), {} as never)) as Response;
    expect(res.status).toBe(200); // NextResponse.next()
    expect([301, 302, 307, 308]).not.toContain(res.status);
  });
});

// ===========================================================================
// 4. Twilio webhooks — signature-gated, not session-gated
// ===========================================================================
describe("Twilio webhooks", () => {
  beforeEach(() => {
    vi.stubEnv(AGENT_ENABLED_ENV, "true");
  });

  it("voice webhook rejects a request with no signature", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token_test");
    const { POST } = await import("@/app/api/agent/call/webhook/route");
    const res = await POST(req("https://aibuiltbyhand.com/api/agent/call/webhook", { method: "POST", body: "CallSid=CA1" }) as never);
    expect(res.status).toBe(403);
    expect((await res.json()).reason).toBe("missing_signature");
  });

  it("voice webhook rejects a bad signature and returns no TwiML", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token_test");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://aibuiltbyhand.com");
    twilioValidateMock.mockReturnValue(false);
    const { POST } = await import("@/app/api/agent/call/webhook/route");
    const res = await POST(
      req("https://aibuiltbyhand.com/api/agent/call/webhook", {
        method: "POST",
        body: "CallSid=CA1",
        headers: { "x-twilio-signature": "not-a-real-signature" },
      }) as never,
    );
    expect(res.status).toBe(403);
    expect(await res.text()).not.toContain("<Response>");
  });

  it("voice webhook returns TwiML for a validly signed request", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token_test");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://aibuiltbyhand.com");
    twilioValidateMock.mockReturnValue(true);
    const { POST } = await import("@/app/api/agent/call/webhook/route");
    const res = await POST(
      req("https://aibuiltbyhand.com/api/agent/call/webhook", {
        method: "POST",
        body: "CallSid=CA1",
        headers: { "x-twilio-signature": "sig" },
      }) as never,
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("<Response>");
  });

  it("fails closed when TWILIO_AUTH_TOKEN is not configured", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "");
    const { POST } = await import("@/app/api/agent/call/webhook/route");
    const res = await POST(
      req("https://aibuiltbyhand.com/api/agent/call/webhook", {
        method: "POST",
        body: "CallSid=CA1",
        headers: { "x-twilio-signature": "sig" },
      }) as never,
    );
    expect(res.status).toBe(403);
    expect((await res.json()).reason).toBe("not_configured");
  });

  it("the statusCallback route registered by callManager.ts now EXISTS", async () => {
    // callManager registers `${webhookUrl}/status`; that route 404'd until 2026-08-30.
    const mod = await import("@/app/api/agent/call/webhook/status/route");
    expect(typeof mod.POST).toBe("function");
    expect(typeof mod.GET).toBe("function");
  });

  it("statusCallback rejects an unsigned callback", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token_test");
    const { POST } = await import("@/app/api/agent/call/webhook/status/route");
    const res = await POST(
      req("https://aibuiltbyhand.com/api/agent/call/webhook/status", { method: "POST", body: "CallSid=CA1&CallStatus=completed" }) as never,
    );
    expect(res.status).toBe(403);
  });

  it("statusCallback acknowledges a signed callback with 204", async () => {
    vi.stubEnv("TWILIO_AUTH_TOKEN", "token_test");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://aibuiltbyhand.com");
    twilioValidateMock.mockReturnValue(true);
    const { POST } = await import("@/app/api/agent/call/webhook/status/route");
    const res = await POST(
      req("https://aibuiltbyhand.com/api/agent/call/webhook/status", {
        method: "POST",
        body: "CallSid=CA1&CallStatus=completed&To=%2B16045551234",
        headers: { "x-twilio-signature": "sig" },
      }) as never,
    );
    expect(res.status).toBe(204);
  });
});

// ===========================================================================
// 5. /api/tools-demo — validation + rate limit (was unmetered OpenAI)
// ===========================================================================
describe("/api/tools-demo", () => {
  it("400s on invalid JSON", async () => {
    const { POST } = await import("@/app/api/tools-demo/route");
    const res = await POST(req("http://localhost/api/tools-demo", { method: "POST", body: "not json", ip: "10.0.0.1" }));
    expect(res.status).toBe(400);
  });

  it("400s on an unknown kind", async () => {
    const { POST } = await import("@/app/api/tools-demo/route");
    const res = await POST(
      req("http://localhost/api/tools-demo", { method: "POST", body: json({ kind: "wat" }), ip: "10.0.0.2" }),
    );
    expect(res.status).toBe(400);
  });

  it("400s a chat kind with no messages", async () => {
    const { POST } = await import("@/app/api/tools-demo/route");
    const res = await POST(
      req("http://localhost/api/tools-demo", { method: "POST", body: json({ kind: "lead", messages: [] }), ip: "10.0.0.3" }),
    );
    expect(res.status).toBe(400);
  });

  it("rate-limits a single IP after 3 requests a minute, and SAYS so in the reply", async () => {
    const { POST } = await import("@/app/api/tools-demo/route");
    const ip = "10.0.0.10";
    const call = (n: number) =>
      POST(
        req("http://localhost/api/tools-demo", {
          method: "POST",
          body: json({ kind: "lead", messages: [{ role: "user", content: `hello ${n}` }] }),
          ip,
        }),
      );

    for (let i = 0; i < 3; i++) {
      const ok = await call(i);
      expect(ok.status).toBe(200);
      expect((await ok.json()).limited).toBeUndefined();
    }

    const limited = await call(99);
    expect(limited.status).toBe(200); // the /demo/* clients don't read res.ok
    const body = await limited.json();
    expect(body.limited).toBe(true);
    expect(body.retryAfter).toBeGreaterThan(0);
    expect(limited.headers.get("retry-after")).toBeTruthy();
    // The visitor must be told what happened, not fed a fake model reply.
    expect(body.reply).toMatch(/free demo limit/i);
  });

  it("keeps separate budgets per IP", async () => {
    const { POST } = await import("@/app/api/tools-demo/route");
    const res = await POST(
      req("http://localhost/api/tools-demo", {
        method: "POST",
        body: json({ kind: "lead", messages: [{ role: "user", content: "hi" }] }),
        ip: "10.0.0.11",
      }),
    );
    expect((await res.json()).limited).toBeUndefined();
  });
});

// ===========================================================================
// 6. /api/recommend — validation + rate limit (was unmetered OpenAI)
// ===========================================================================
describe("/api/recommend", () => {
  it("400s on invalid JSON", async () => {
    const { POST } = await import("@/app/api/recommend/route");
    const res = await POST(req("http://localhost/api/recommend", { method: "POST", body: "not json", ip: "10.1.0.1" }));
    expect(res.status).toBe(400);
  });

  it("400s when `outcome` is missing", async () => {
    const { POST } = await import("@/app/api/recommend/route");
    const res = await POST(req("http://localhost/api/recommend", { method: "POST", body: json({}), ip: "10.1.0.2" }));
    expect(res.status).toBe(400);
  });

  it("413s an oversized body before parsing it", async () => {
    const { POST } = await import("@/app/api/recommend/route");
    const res = await POST(
      req("http://localhost/api/recommend", {
        method: "POST",
        body: json({ outcome: "x".repeat(10_000) }),
        ip: "10.1.0.3",
      }),
    );
    expect(res.status).toBe(413);
  });

  it("rate-limits per IP once a key is configured, still returning the rules answer", async () => {
    vi.stubEnv("OPENAI_API_KEY", "sk-test-not-real");
    const { POST } = await import("@/app/api/recommend/route");
    const ip = "10.1.0.10";
    const call = () =>
      POST(req("http://localhost/api/recommend", { method: "POST", body: json({ outcome: "more-leads" }), ip }));

    for (let i = 0; i < 3; i++) {
      const ok = await call();
      expect(ok.status).toBe(200);
      expect((await ok.json()).limited).toBeUndefined();
    }

    const limited = await call();
    expect(limited.status).toBe(200);
    const body = await limited.json();
    expect(body.limited).toBe(true);
    // The package/price come from rules, so a limited caller still gets a real answer.
    expect(body.packageId).toBeTruthy();
  });

  it("does not rate-limit (or spend) when no key is configured", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    const { POST } = await import("@/app/api/recommend/route");
    const ip = "10.1.0.20";
    for (let i = 0; i < 5; i++) {
      const res = await POST(
        req("http://localhost/api/recommend", { method: "POST", body: json({ outcome: "more-leads" }), ip }),
      );
      expect(res.status).toBe(200);
      expect((await res.json()).limited).toBeUndefined();
    }
  });
});

// ===========================================================================
// 7. /api/tts — same-origin guard (regression pin, unchanged this wave)
// ===========================================================================
describe("/api/tts", () => {
  it("403s a cross-site caller with no Origin/Referer", async () => {
    const { POST } = await import("@/app/api/tts/route");
    const res = await POST(
      req("http://localhost/api/tts", { method: "POST", body: json({ text: "hello" }), ip: "10.2.0.1" }),
    );
    expect(res.status).toBe(403);
  });

  it("403s an Origin from another host", async () => {
    const { POST } = await import("@/app/api/tts/route");
    const res = await POST(
      req("http://localhost/api/tts", {
        method: "POST",
        body: json({ text: "hello" }),
        headers: { host: "aibuiltbyhand.com", origin: "https://evil.example" },
        ip: "10.2.0.2",
      }),
    );
    expect(res.status).toBe(403);
  });
});

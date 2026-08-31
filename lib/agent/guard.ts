/**
 * Agent-subsystem access guard.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Until 2026-08-30 `middleware.ts` matched only `/agent/:path*`, so the six
 * `/agent/*` **pages** were behind NextAuth while all thirteen `/api/agent/*`
 * **handlers** were open to the internet:
 *   - `GET  /api/agent/contacts`        dumped every stored name / phone / email
 *   - `PUT  /api/agent/contacts/[id]`   passed the raw body into `prisma.update`
 *   - `PUT  /api/agent/call`            placed a real Twilio call to any number
 *   - `PUT  /api/agent/campaigns`       started an autodial loop
 *
 * Two independent locks now stand in front of every one of those handlers:
 *
 *   1. KILL SWITCH — the whole subsystem (pages + API) answers 404 unless
 *      `AGENT_SUBSYSTEM_ENABLED === "true"`. That variable is set nowhere, so
 *      the subsystem ships dark and is re-enabled by one env var. Nothing is
 *      deleted; no Prisma model is dropped; the change is reversible.
 *
 *   2. OWNER SESSION — when the switch is on, every handler still requires a
 *      NextAuth session whose email is in `AGENT_OWNER_EMAILS`. The check lives
 *      in the handlers (not the middleware) because `next-auth/middleware`
 *      answers an unauthenticated API call with a 307 to an HTML login page —
 *      useless to a fetch() caller and easy to mistake for success. Here it is
 *      an explicit JSON 401/403.
 *
 * Fail-closed: enabling the switch without an allowlist denies everyone and
 * says which variable to set, rather than silently opening the CRM.
 *
 * The only deliberate exception is the Twilio voice webhook, which Twilio
 * itself calls with no session — see `lib/agent/twilioSignature.ts`.
 */
import { NextResponse } from "next/server";
import { ownerEmails } from "@/lib/ownerAuth";

/** Env var names (exported so tests and docs cannot drift from the code). */
export const AGENT_ENABLED_ENV = "AGENT_SUBSYSTEM_ENABLED";
export const AGENT_OWNERS_ENV = "AGENT_OWNER_EMAILS";

/** Master kill switch. Anything other than the exact string "true" is off. */
export function agentSubsystemEnabled(): boolean {
  return process.env[AGENT_ENABLED_ENV] === "true";
}

/**
 * Owner allowlist, lower-cased. Empty array = nobody is allowed in.
 *
 * Delegates to `lib/ownerAuth.ts` so the agent subsystem and the lead inbox
 * cannot drift apart into two lists of "the owner". `AGENT_OWNER_EMAILS` still
 * works — it is the documented fallback there — so nothing has to be renamed in
 * Vercel for this to keep behaving exactly as before.
 */
export function agentOwnerEmails(): string[] {
  return ownerEmails();
}

/** The 404 the subsystem shows the world while the kill switch is off. */
export function agentDisabledResponse(): NextResponse {
  return NextResponse.json(
    { error: "Not found" },
    { status: 404, headers: { "x-robots-tag": "noindex, nofollow" } },
  );
}

/**
 * Call FIRST in every `/api/agent/*` handler.
 *
 * @returns a Response to return immediately, or `null` when the caller is the
 *          authenticated owner and the handler may proceed.
 */
export async function guardAgentApi(): Promise<NextResponse | null> {
  // 1. Kill switch. Indistinguishable from a route that does not exist.
  if (!agentSubsystemEnabled()) return agentDisabledResponse();

  // 2. Allowlist must be configured, or nobody gets in. Fail closed, and say
  //    exactly what to fix — an unexplained 403 is a silent state.
  const owners = agentOwnerEmails();
  if (owners.length === 0) {
    return NextResponse.json(
      {
        error:
          `The agent subsystem is enabled but no owner allowlist is configured. ` +
          `Set ${AGENT_OWNERS_ENV} to a comma-separated list of owner emails, or ` +
          `unset ${AGENT_ENABLED_ENV} to take the subsystem offline again.`,
        code: "agent_allowlist_unconfigured",
      },
      { status: 403 },
    );
  }

  // 3. Real session. Imported lazily so a disabled subsystem never pulls
  //    NextAuth + the Prisma adapter into the request path (and so tests can
  //    exercise the 404 branch without mocking auth at all).
  let email: string | null = null;
  try {
    const [{ getServerSession }, { authOptions }] = await Promise.all([
      import("next-auth/next"),
      import("@/lib/auth"),
    ]);
    const session = await getServerSession(authOptions);
    email = session?.user?.email?.toLowerCase() ?? null;
  } catch (err) {
    // A broken session lookup must never read as "authorised".
    console.error("[agent-guard] session lookup failed:", (err as Error)?.message);
    return NextResponse.json(
      { error: "Could not verify your session. Sign in again at /login.", code: "agent_session_error" },
      { status: 401 },
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Sign in required.", code: "agent_unauthenticated", signInUrl: "/login" },
      { status: 401 },
    );
  }

  if (!owners.includes(email)) {
    return NextResponse.json(
      { error: "This account is not an owner of the agent subsystem.", code: "agent_forbidden" },
      { status: 403 },
    );
  }

  return null;
}

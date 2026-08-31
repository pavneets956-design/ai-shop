/**
 * Owner identity — the single allowlist behind every private surface.
 *
 * WHY IT IS SEPARATE FROM `lib/agent/guard.ts`
 * --------------------------------------------
 * `guardAgentApi()` couples two things: "are you the owner?" and "is the
 * outbound-calling subsystem switched on?". That coupling is correct for
 * `/api/agent/*` — the whole subsystem ships dark behind
 * `AGENT_SUBSYSTEM_ENABLED` and must stay dark until the CRTC/DNCL and CASL work
 * is done. It is wrong for the lead inbox, which has to work NOW and must never
 * require flipping the cold-calling kill switch to read a customer enquiry.
 *
 * So the allowlist moves here and `guard.ts` reads it, leaving one variable to
 * configure and one place where "who is the owner" is decided.
 *
 * CONFIGURE: `OWNER_EMAILS` — comma-separated, case-insensitive.
 *   `AGENT_OWNER_EMAILS` is honoured as a fallback so the existing agent-side
 *   configuration keeps working and nothing has to be renamed in Vercel.
 *
 * FAIL CLOSED. An empty or unset allowlist admits NOBODY. The alternative — an
 * empty list meaning "allow everyone" — would publish the lead inbox to any
 * Google account on the internet the moment someone forgot the variable.
 */

/** Env var names, exported so tests and docs cannot drift from the code. */
export const OWNER_EMAILS_ENV = "OWNER_EMAILS";
export const LEGACY_OWNER_EMAILS_ENV = "AGENT_OWNER_EMAILS";

/** The allowlist, lower-cased. An empty array means nobody is allowed in. */
export function ownerEmails(): string[] {
  const raw =
    process.env[OWNER_EMAILS_ENV] || process.env[LEGACY_OWNER_EMAILS_ENV] || "";
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

/** True when the allowlist has been configured at all. */
export function ownerAllowlistConfigured(): boolean {
  return ownerEmails().length > 0;
}

export type OwnerCheck =
  /** Signed in and on the allowlist. */
  | { status: "owner"; email: string }
  /** Not signed in — send them to /login. */
  | { status: "anonymous" }
  /** Signed in as somebody else — must not learn that this page holds leads. */
  | { status: "forbidden" }
  /** Nobody can be an owner because the allowlist was never set. */
  | { status: "unconfigured" }
  /** The session lookup itself failed. Never read as authorised. */
  | { status: "error"; detail: string };

/**
 * Resolve the caller against the allowlist.
 *
 * Imports NextAuth lazily so an unconfigured allowlist never drags NextAuth and
 * the Prisma adapter into the request path, and so tests can exercise the
 * `unconfigured` branch without mocking auth at all.
 */
export async function checkOwner(): Promise<OwnerCheck> {
  if (!ownerAllowlistConfigured()) return { status: "unconfigured" };

  let email: string | null = null;
  try {
    const [{ getServerSession }, { authOptions }] = await Promise.all([
      import("next-auth/next"),
      import("@/lib/auth"),
    ]);
    const session = await getServerSession(authOptions);
    email = session?.user?.email?.toLowerCase() ?? null;
  } catch (err) {
    const detail = (err as Error)?.message ?? "unknown";
    console.error("[owner-auth] session lookup failed:", detail);
    return { status: "error", detail };
  }

  if (!email) return { status: "anonymous" };
  if (!ownerEmails().includes(email)) return { status: "forbidden" };
  return { status: "owner", email };
}

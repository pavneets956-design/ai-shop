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
 * ORDER MATTERS, and it is not the obvious one. The session is resolved FIRST,
 * before the allowlist is even consulted. An earlier version short-circuited on
 * an empty allowlist and returned `unconfigured` immediately — which meant that
 * with `OWNER_EMAILS` unset (its state in Vercel today) `/admin/leads` answered
 * an unauthenticated **200** to the whole internet with a page naming the
 * variable to set. No lead data leaked, but an anonymous 200 on a path called
 * /admin/leads is not something to ship.
 *
 * Now an anonymous caller is `anonymous` whatever the configuration, so they get
 * the login redirect and never learn anything else. The `unconfigured`
 * diagnostic is only ever shown to somebody who is already signed in — which is
 * the person who needs it.
 *
 * NextAuth is imported lazily so it is pulled in only on a request that reaches
 * an owner-gated surface.
 */
export async function checkOwner(): Promise<OwnerCheck> {
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

  // Signed in, but nobody can be an owner because the list was never set.
  // Fail closed, and say which variable fixes it — this reader is authenticated.
  if (!ownerAllowlistConfigured()) {
    console.error(
      `[owner-auth] ${OWNER_EMAILS_ENV} is not set, so no account can be an owner. ` +
        `Set it to a comma-separated list of owner emails.`
    );
    return { status: "unconfigured" };
  }

  if (!ownerEmails().includes(email)) return { status: "forbidden" };
  return { status: "owner", email };
}

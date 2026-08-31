import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { checkOwner, OWNER_EMAILS_ENV } from "@/lib/ownerAuth";
import { MAX_NOTIFY_ATTEMPTS, NOTIFY } from "@/lib/leadNotify";

/**
 * The owner's lead inbox.
 *
 * WHY THIS PAGE EXISTS
 * --------------------
 * Leads were being persisted to Neon correctly and then never seen. The only
 * `/agent/leads` view rendered a hard-coded `mockLeads` array, and the agent
 * subsystem it sits inside answers 404 by design until the cold-calling
 * compliance work is done. So the durable store had no reader at all.
 *
 * WHY IT IS A SERVER COMPONENT AND NOT AN API
 * -------------------------------------------
 * There is deliberately NO lead-reading endpoint on this site. This page queries
 * Prisma directly after the authorisation check, so there is no JSON route an
 * attacker could find, no token that could leak, and nothing to rate-limit. The
 * only other reader is `scripts/leads-report.mjs`, which runs on the founder's
 * own machine against credentials he already owns.
 *
 * EVERY NON-OWNER OUTCOME IS AN EXPLICIT, DESIGNED STATE — no blank screens:
 *   anonymous     → /login, with a callback back to here
 *   forbidden     → the site's ordinary "page not found", so a signed-in
 *                   stranger never learns that this URL holds customer data
 *   unconfigured  → says which environment variable to set (leaks no data)
 *   error         → says the session check failed and what to do next
 */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 200;

type LeadRow = {
  id: string;
  createdAt: Date;
  name: string | null;
  email: string;
  phone: string | null;
  source: string | null;
  kind: string | null;
  goal: string | null;
  status: string;
  notifyStatus: string;
  notifyAttempts: number;
  notifiedAt: Date | null;
  notifyLastError: string | null;
  notifyMessageId: string | null;
};

export default async function AdminLeadsPage() {
  const owner = await checkOwner();

  if (owner.status === "anonymous") {
    redirect(`/login?callbackUrl=${encodeURIComponent("/admin/leads")}`);
  }

  if (owner.status === "forbidden") return <NotFound />;

  if (owner.status === "unconfigured") {
    return (
      <Shell title="Owner allowlist not configured">
        <p className="text-ink-soft">
          Nobody can open this page until the owner allowlist exists. Set{" "}
          <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">
            {OWNER_EMAILS_ENV}
          </code>{" "}
          in the Vercel project to a comma-separated list of owner email
          addresses, then redeploy.
        </p>
        <p className="mt-4 text-ink-soft">
          Nothing is lost in the meantime — every lead is still being written to
          the database. You can read them right now with{" "}
          <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm">
            node --env-file=.env.prod.local scripts/leads-report.mjs
          </code>
          .
        </p>
      </Shell>
    );
  }

  if (owner.status === "error") {
    return (
      <Shell title="Could not verify your session">
        <p className="text-ink-soft">
          The sign-in check failed, so this page will not show anything rather
          than guess that you are the owner.
        </p>
        <p className="mt-4">
          <Link href="/login" className="font-semibold text-clay underline">
            Sign in again
          </Link>
        </p>
      </Shell>
    );
  }

  // ---- Authorised. Read the inbox. -----------------------------------------
  let rows: LeadRow[] | null = null;
  let dbError: string | null = null;
  try {
    rows = await prisma.buildRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      select: {
        id: true,
        createdAt: true,
        name: true,
        email: true,
        phone: true,
        source: true,
        kind: true,
        goal: true,
        status: true,
        notifyStatus: true,
        notifyAttempts: true,
        notifiedAt: true,
        notifyLastError: true,
        notifyMessageId: true,
      },
    });
  } catch (err) {
    dbError = (err as Error)?.message?.slice(0, 200) ?? "unknown error";
    console.error("[admin-leads] query failed:", dbError);
  }

  if (dbError) {
    return (
      <Shell title="The lead database did not answer">
        <p className="text-ink-soft">
          Your leads are not lost — this page could not reach Neon just now.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-paper-2 p-4 font-mono text-xs text-ink-soft">
          {dbError}
        </pre>
      </Shell>
    );
  }

  const leads = rows ?? [];
  const unnotified = leads.filter(
    (l) => l.notifyStatus !== NOTIFY.DELIVERED && l.notifyStatus !== NOTIFY.SKIPPED
  );
  const exhausted = leads.filter(
    (l) => l.notifyStatus === NOTIFY.FAILED && l.notifyAttempts >= MAX_NOTIFY_ATTEMPTS
  );
  const newLeads = leads.filter((l) => l.status === "new");

  // Configuration problems the founder cannot see from anywhere else.
  const warnings: string[] = [];
  if (!process.env.RESEND_API_KEY) {
    warnings.push(
      "RESEND_API_KEY is not set in this environment, so no owner notification can be sent here. Leads are still being stored."
    );
  }
  if (!process.env.CRON_SECRET) {
    warnings.push(
      "CRON_SECRET is not set, so the hourly retry worker cannot authenticate and will never drain the queue below."
    );
  }

  return (
    <Shell title="Leads" subtitle={`Signed in as ${owner.email}`}>
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total stored" value={leads.length} />
        <Stat label="Need follow-up" value={newLeads.length} />
        <Stat label="You were never told" value={unnotified.length} tone={unnotified.length ? "warn" : "ok"} />
        <Stat label="Retries exhausted" value={exhausted.length} tone={exhausted.length ? "bad" : "ok"} />
      </div>

      {warnings.map((w) => (
        <p
          key={w}
          className="mb-3 rounded-lg border border-danger/30 bg-clay-soft px-4 py-3 text-sm text-ink"
        >
          <strong className="font-semibold">Configuration:</strong> {w}
        </p>
      ))}

      {leads.length === 0 ? (
        <div className="rounded-xl border border-line bg-paper-card p-10 text-center">
          <h2 className="text-lg font-semibold text-ink">No leads yet</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            Every request from the site form, the plan email action and the AI
            consultation lands here, newest first, with the delivery state of the
            email that tells you about it.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft">
            If you expected one to be here, submit a test through{" "}
            <Link href="/create" className="font-semibold text-clay underline">
              /create
            </Link>{" "}
            and refresh.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-paper-card">
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Website leads, newest first, with owner-notification delivery state
            </caption>
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-4 py-3 font-semibold">Received</th>
                <th scope="col" className="px-4 py-3 font-semibold">Contact</th>
                <th scope="col" className="px-4 py-3 font-semibold">What they want</th>
                <th scope="col" className="px-4 py-3 font-semibold">Source</th>
                <th scope="col" className="px-4 py-3 font-semibold">You were told</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-line/60 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-ink-soft">
                    <time dateTime={l.createdAt.toISOString()}>
                      {l.createdAt.toISOString().replace("T", " ").slice(0, 16)}
                    </time>
                  </td>
                  <td className="px-4 py-3">
                    <span className="block font-semibold text-ink">{l.name ?? "—"}</span>
                    {l.email.endsWith(".invalid") ? (
                      <span className="block text-ink-soft">phone only</span>
                    ) : (
                      <a href={`mailto:${l.email}`} className="block text-clay underline">
                        {l.email}
                      </a>
                    )}
                    {l.phone ? (
                      <a href={`tel:${l.phone}`} className="block text-ink-soft">
                        {l.phone}
                      </a>
                    ) : null}
                  </td>
                  <td className="max-w-md px-4 py-3 text-ink-soft">
                    {l.goal ? l.goal.slice(0, 240) : <span className="text-muted">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-soft">
                    <span className="block">{l.kind ?? "—"}</span>
                    <span className="block text-muted">{l.source ?? "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <NotifyBadge row={l} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        Showing the {PAGE_SIZE} most recent. For the full set, or for a copy you
        can grep, run{" "}
        <code className="font-mono">node --env-file=.env.prod.local scripts/leads-report.mjs --detail</code>.
      </p>
    </Shell>
  );
}

/** Delivery state of the email that was supposed to tell the owner about a lead. */
function NotifyBadge({ row }: { row: LeadRow }) {
  const map: Record<string, { label: string; cls: string }> = {
    [NOTIFY.DELIVERED]: { label: "emailed to you", cls: "bg-success/10 text-success" },
    [NOTIFY.PENDING]: { label: "queued", cls: "bg-paper-2 text-ink-soft" },
    [NOTIFY.SENDING]: { label: "sending now", cls: "bg-paper-2 text-ink-soft" },
    [NOTIFY.SKIPPED]: { label: "test — not sent", cls: "bg-paper-2 text-muted" },
    [NOTIFY.FAILED]: { label: "NOT sent", cls: "bg-clay-soft text-danger" },
  };
  const meta = map[row.notifyStatus] ?? {
    label: row.notifyStatus,
    cls: "bg-paper-2 text-ink-soft",
  };
  const done = row.notifyStatus === NOTIFY.DELIVERED;
  const dead = row.notifyStatus === NOTIFY.FAILED && row.notifyAttempts >= MAX_NOTIFY_ATTEMPTS;

  return (
    <div className="min-w-[11rem]">
      <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${meta.cls}`}>
        {meta.label}
      </span>
      {done && row.notifiedAt ? (
        <span className="mt-1 block font-mono text-[11px] text-muted">
          {row.notifiedAt.toISOString().replace("T", " ").slice(0, 16)}
        </span>
      ) : null}
      {row.notifyAttempts > 0 && !done ? (
        <span className="mt-1 block text-[11px] text-muted">
          {row.notifyAttempts} attempt{row.notifyAttempts === 1 ? "" : "s"}
          {dead ? " — giving up, follow this one up by hand" : ""}
        </span>
      ) : null}
      {row.notifyLastError ? (
        <span className="mt-1 block break-words text-[11px] text-danger">
          {row.notifyLastError}
        </span>
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "ok",
}: {
  label: string;
  value: number;
  tone?: "ok" | "warn" | "bad";
}) {
  const toneCls =
    tone === "bad" ? "text-danger" : tone === "warn" ? "text-clay" : "text-ink";
  return (
    <div className="rounded-xl border border-line bg-paper-card p-4">
      <span className={`block text-2xl font-bold ${toneCls}`}>{value}</span>
      <span className="mt-1 block text-xs uppercase tracking-wide text-muted">{label}</span>
    </div>
  );
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
      </header>
      {children}
      <p className="mt-10 text-sm">
        <Link href="/" className="text-ink-soft underline">
          Back to the site
        </Link>
      </p>
    </main>
  );
}

/**
 * A signed-in stranger gets the ordinary "page not found", not a 403. A 403
 * would confirm that this URL exists and holds something worth protecting.
 */
function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-ink-soft">This page isn&rsquo;t part of the site.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-ink px-5 py-2.5 font-semibold text-white"
      >
        Go to the homepage
      </Link>
    </main>
  );
}

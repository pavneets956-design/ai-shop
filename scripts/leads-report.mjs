#!/usr/bin/env node
/**
 * Owner-only lead report — the safe CLI half of lead retrieval.
 *
 * There is deliberately NO public endpoint that reads leads. This script and the
 * authenticated `/agent/leads` view are the only two ways to see a submission.
 *
 * USAGE (from the repo root):
 *
 *   # 1. pull the credentials you already own, into a gitignored file
 *   vercel env pull .env.prod.local --environment=production --yes
 *
 *   # 2. read. This script NEVER writes to the database and never writes a file.
 *   node --env-file=.env.prod.local scripts/leads-report.mjs              # census, no personal data
 *   node --env-file=.env.prod.local scripts/leads-report.mjs --detail     # full leads (PERSONAL DATA)
 *   node --env-file=.env.prod.local scripts/leads-report.mjs --json       # machine-readable census
 *   node --env-file=.env.prod.local scripts/leads-report.mjs --since=2026-08-01
 *   node --env-file=.env.prod.local scripts/leads-report.mjs --retry-queue # leads the owner was never told about
 *
 *   # 3. delete the credentials file when you are done
 *   rm .env.prod.local
 *
 * Default output is aggregates only — counts, timestamps and delivery status —
 * so it is safe to paste into a chat, a ticket or a report. `--detail` prints
 * names, emails and phone numbers to your terminal and nowhere else; it prints a
 * banner first so it can never be mistaken for the safe mode.
 *
 * Everything is raw SQL against information_schema-checked columns, so this keeps
 * working against a database that has not yet had the newest migration applied.
 */
import { PrismaClient } from "@prisma/client";

const args = new Set(process.argv.slice(2));
const arg = (prefix) =>
  process.argv.slice(2).find((a) => a.startsWith(prefix))?.slice(prefix.length);

const DETAIL = args.has("--detail");
const JSON_OUT = args.has("--json");
const RETRY_QUEUE = args.has("--retry-queue");
const SINCE = arg("--since=");
const LIMIT = Number(arg("--limit=") ?? 500);

if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
  console.error(
    "No database URL in the environment.\n" +
      "Run:  vercel env pull .env.prod.local --environment=production --yes\n" +
      "Then: node --env-file=.env.prod.local scripts/leads-report.mjs"
  );
  process.exit(2);
}

const prisma = new PrismaClient();
const out = {};
const iso = (d) => (d ? new Date(d).toISOString() : null);
const num = (v) => (typeof v === "bigint" ? Number(v) : v);

/** Columns that exist on this database right now. */
async function liveColumns() {
  const rows = await prisma.$queryRawUnsafe(
    `select column_name from information_schema.columns where table_name = 'BuildRequest'`
  );
  return new Set(rows.map((r) => r.column_name));
}

function whereSince() {
  if (!SINCE) return { sql: "", params: [] };
  const d = new Date(SINCE);
  if (Number.isNaN(d.getTime())) {
    console.error(`--since= is not a valid date: ${SINCE}`);
    process.exit(2);
  }
  return { sql: `where "createdAt" >= $1`, params: [d] };
}

try {
  const cols = await liveColumns();
  if (cols.size === 0) {
    console.error(
      'The "BuildRequest" table does not exist on this database. Wrong environment, or migrations have not been deployed.'
    );
    process.exit(1);
  }

  // Which notification columns are available decides what we can report.
  const hasNotifyStatus = cols.has("notifyStatus");
  const hasEmailed = cols.has("emailed");
  const hasAttempts = cols.has("notifyAttempts");
  const hasNotifiedAt = cols.has("notifiedAt");
  const hasLastError = cols.has("notifyLastError");

  const where = whereSince();

  const [{ count: totalRaw }] = await prisma.$queryRawUnsafe(
    `select count(*)::int as count from "BuildRequest" ${where.sql}`,
    ...where.params
  );
  const total = num(totalRaw);

  out.database = (
    await prisma.$queryRawUnsafe(
      `select current_database() as db, current_user as "user"`
    )
  )[0];
  out.schema = {
    notificationStatusColumns: hasNotifyStatus,
    columns: [...cols],
  };
  out.totalLeads = total;
  if (SINCE) out.since = new Date(SINCE).toISOString();

  const group = async (col) =>
    (
      await prisma.$queryRawUnsafe(
        `select ${col} as k, count(*)::int as n from "BuildRequest" ${where.sql} group by 1 order by 2 desc`,
        ...where.params
      )
    ).map((r) => [r.k ?? "(null)", num(r.n)]);

  if (total > 0) {
    out.byStatus = await group(`"status"`);
    out.bySource = await group(`"source"`);
    out.byKind = await group(`"kind"`);
    if (hasNotifyStatus) out.byNotifyStatus = await group(`"notifyStatus"`);
    if (hasEmailed)
      out.byOwnerNotified = (await group(`"emailed"`)).map(([k, n]) => [
        k === true ? "notified" : "NOT-NOTIFIED",
        n,
      ]);

    const select = [
      `"id"`,
      `"createdAt"`,
      `"source"`,
      `"kind"`,
      `"status"`,
      hasEmailed ? `"emailed"` : `false as "emailed"`,
      hasNotifyStatus ? `"notifyStatus"` : `null as "notifyStatus"`,
      hasAttempts ? `"notifyAttempts"` : `null as "notifyAttempts"`,
      hasNotifiedAt ? `"notifiedAt"` : `null as "notifiedAt"`,
      hasLastError ? `"notifyLastError"` : `null as "notifyLastError"`,
    ];
    if (DETAIL) select.push(`"name"`, `"email"`, `"phone"`, `"goal"`, `"payload"`);

    const rows = await prisma.$queryRawUnsafe(
      `select ${select.join(", ")} from "BuildRequest" ${where.sql} order by "createdAt" asc limit ${LIMIT}`,
      ...where.params
    );

    out.leads = rows.map((r) => ({
      id: r.id,
      createdAt: iso(r.createdAt),
      source: r.source,
      kind: r.kind,
      status: r.status,
      ownerNotified: r.emailed === true,
      notifyStatus: r.notifyStatus,
      notifyAttempts: num(r.notifyAttempts),
      notifiedAt: iso(r.notifiedAt),
      notifyLastError: r.notifyLastError,
      ...(DETAIL
        ? { name: r.name, email: r.email, phone: r.phone, goal: r.goal, payload: r.payload }
        : {}),
    }));

    out.needsFollowUp = out.leads.filter((l) => l.status === "new").length;
    out.neverNotified = out.leads.filter(
      (l) => !l.ownerNotified && l.notifyStatus !== "delivered"
    ).length;
  } else {
    out.leads = [];
    out.needsFollowUp = 0;
    out.neverNotified = 0;
  }

  if (RETRY_QUEUE) {
    const cond = hasNotifyStatus
      ? `"notifyStatus" in ('pending','failed')`
      : `"emailed" = false`;
    const rows = await prisma.$queryRawUnsafe(
      `select "id", "createdAt" from "BuildRequest" where ${cond} order by "createdAt" asc limit ${LIMIT}`
    );
    out.retryQueue = rows.map((r) => ({ id: r.id, createdAt: iso(r.createdAt) }));
  }

  if (JSON_OUT) {
    console.log(JSON.stringify(out, null, 2));
  } else {
    if (DETAIL) {
      console.log(
        "\n[41m[97m  PERSONAL DATA BELOW — names, emails and phone numbers. Do not paste this anywhere.  [0m\n"
      );
    }
    console.log(`database        : ${out.database.db} (as ${out.database.user})`);
    console.log(
      `notify columns  : ${hasNotifyStatus ? "present" : "ABSENT — migration not deployed to this database"}`
    );
    if (SINCE) console.log(`since           : ${out.since}`);
    console.log(`total leads     : ${out.totalLeads}`);
    if (total > 0) {
      const fmt = (pairs) => pairs.map(([k, n]) => `${k}=${n}`).join("  ");
      console.log(`by status       : ${fmt(out.byStatus)}`);
      console.log(`by source       : ${fmt(out.bySource)}`);
      console.log(`by kind         : ${fmt(out.byKind)}`);
      if (out.byNotifyStatus) console.log(`by notify status: ${fmt(out.byNotifyStatus)}`);
      if (out.byOwnerNotified) console.log(`owner notified  : ${fmt(out.byOwnerNotified)}`);
      console.log(`needs follow-up : ${out.needsFollowUp} (status="new")`);
      console.log(`never notified  : ${out.neverNotified}`);
      console.log("\nsubmissions:");
      for (const l of out.leads) {
        const base = `  ${l.createdAt}  source=${l.source ?? "-"}  status=${l.status}  notify=${
          l.notifyStatus ?? (l.ownerNotified ? "delivered" : "unknown")
        }${l.notifyAttempts != null ? `/${l.notifyAttempts}try` : ""}`;
        console.log(base);
        if (l.notifyLastError) console.log(`      last error: ${l.notifyLastError}`);
        if (DETAIL) {
          console.log(`      name=${l.name ?? "-"}  email=${l.email}  phone=${l.phone ?? "-"}`);
          if (l.goal) console.log(`      goal=${String(l.goal).slice(0, 300)}`);
        }
      }
    }
    if (out.retryQueue) {
      console.log(`\nretry queue     : ${out.retryQueue.length} lead(s) awaiting a notification`);
      for (const r of out.retryQueue) console.log(`  ${r.id}  ${r.createdAt}`);
    }
    console.log("");
  }
} catch (e) {
  console.error(`leads-report failed: ${e?.constructor?.name}: ${String(e?.message).slice(0, 400)}`);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}

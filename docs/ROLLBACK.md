# ROLLBACK — how to put aibuiltbyhand.com back the way it was

Read this before touching production. Rollback is an **owner action**: it needs the Vercel dashboard or a push to `main`, and no agent may do either.

---

## The anchor

Production runs whatever is at the tip of `origin/main`. Right now that is:

```
482b5e8   Merge pull request #3 — hotfix/agent-api-auth        (2026-08-30, LIVE)
3031d36   Merge pull request #2 — free-contractor-tools        (2026-07-15, the point before it)
```

`482b5e8` is what the domain serves today. `3031d36` is the state before the agent-API security
hotfix — roll back that far only if the hotfix itself is the problem, because doing so **reopens
`/api/agent/*` to the internet**.

Verify it yourself before trusting this file — the tip moves the moment a release merges:

```bash
git fetch origin
git rev-parse origin/main          # the commit production is built from
git rev-list --count origin/main..HEAD   # how far the working branch is ahead
```

**This is the state to return to.** It is the last commit that has actually been deployed and lived on the domain, and it is the only version with a real production track record.

Project: Vercel `ai-shop`, project id `prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv`, team `pavs-projects-2a8231d9` ("Pav's Projects"), domain `aibuiltbyhand.com`.

> **The Vercel MCP token in this environment cannot see this project.** `get_project` and `get_web_analytics` return 404/403 for `prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv` — the integration token is scoped to a different project, so its errors are not evidence about `ai-shop`. The **CLI and the REST API both work**: `vercel ls`, `vercel env ls`, `vercel redeploy`, and `https://api.vercel.com/v9/projects/prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv?teamId=team_s5GXChvX5LbYyUSzMbDiO3SO` all resolve (verified 2026-08-31). Promoting to production is still an **owner action**.
>
> `vercel env pull` returns **empty values** for every variable, because all pre-existing variables are typed `sensitive` — write-only by design. That is not a broken account. To give an existing secret a second environment, **PATCH its `target`** (`PATCH /v9/projects/{id}/env/{envId}`) instead of trying to read and re-set the value.

---

## Path A — re-promote the previous deployment (fastest, use this first)

No rebuild, no code change, no database work. Seconds, not minutes.

1. Vercel dashboard → team **Pav's Projects** → project **ai-shop** → **Deployments**.
2. Find the last deployment that was live and healthy — the one built from `3031d36`, dated 2026-07-15.
3. Open it, use the **⋯** menu → **Promote to Production** (older UI: **Rollback** / **Redeploy**).
4. Confirm. The domain switches to that build's output immediately.

CLI equivalent, if the dashboard is inconvenient:

```bash
vercel ls ai-shop --scope pavs-projects-2a8231d9         # list deployments, newest first
vercel promote <deployment-url> --scope pavs-projects-2a8231d9
```

**What Path A does not do:** it does not change `main`, so the next push to `main` redeploys the broken code. Path A buys time; follow it with Path B or a fix-forward.

**What Path A cannot undo:** a database migration. See the migration warning below.

---

## Path B — revert the merge on `main` (the durable fix)

Use this when the bad release is already merged and you want `main` to stop producing it.

1. Find the merge commit the release landed as:

   ```bash
   git fetch origin
   git log --oneline --merges origin/main -5
   ```

2. Revert it, keeping the first parent (the mainline):

   ```bash
   git checkout main
   git pull origin main
   git revert -m 1 <merge-sha>
   ```

   `-m 1` is not optional on a merge commit — without it git refuses, and with `-m 2` you revert the wrong side.

3. Resolve any conflicts, then push. **Pushing to `main` deploys.** That is the owner's call, not an agent's.

   ```bash
   git push origin main
   ```

Never `git reset --hard` and force-push `main` to roll back. It destroys the history that Path A depends on, and Vercel keeps building whatever it last saw.

---

## ⚠️ Migrations do not roll back

`package.json` defines `"build": "prisma migrate deploy && next build"`. **Every production build runs the migrations first.** Consequences:

- Reverting the code does **not** revert the schema. Prisma has no down-migrations here.
- Additive, nullable columns are harmless left behind — the old code simply ignores them.
- A destructive migration (dropped column, dropped table, renamed field, changed type) is **not recoverable by rollback**. It needs a Neon point-in-time restore, and any writes since the deploy are at risk.
- So: before approving any release that contains a file under `prisma/migrations/`, read the SQL. If it drops or renames anything, the rollback plan is a database restore, not a git revert, and that must be decided **before** the deploy, not after.

---

## This release ships exactly one migration: `20260830150000_add_lead_notification_status`

**Verified 2026-08-31, before it has ever touched production.**

*Not yet applied.* Production is built from `482b5e8`, and that tree contains four migration
directories — `0_init`, `20260617000000_add_user_oauth_fields`, `20260714000000_add_build_request`,
`20260714010000_add_build_request_dedupe`. `20260830150000` is **not** among them:

```bash
git ls-tree -r origin/main --name-only -- prisma/migrations
```

It runs for the first time on the next **production** deploy, because `npm run build` is
`prisma migrate deploy && next build`. (It has already run against the Neon **`preview`** branch,
which is a separate database from `main` — preview builds run the same command.)

*Additive only.* The whole executable body is:

| Statement | Destructive? |
|---|---|
| `ALTER TABLE "BuildRequest" ADD COLUMN ×6` (`notifyStatus`, `notifyAttempts`, `notifyClaimedAt`, `notifiedAt`, `notifyLastError`, `notifyMessageId`) | No — every one is nullable or has a `DEFAULT` |
| `UPDATE "BuildRequest" SET "notifyStatus" = CASE WHEN "emailed" ...` | No — writes only the new column, derived from the old one |
| `CREATE INDEX "BuildRequest_notifyStatus_createdAt_idx"` | No |

No `DROP`, no `RENAME`, no `ALTER COLUMN`, no type change, no `DELETE`. The only `DROP` strings in
the file are inside the comment block that documents the reversal. `emailed` is kept and still
written, so code built before this migration keeps working against a database that has it.

The two `NOT NULL DEFAULT` columns do **not** rewrite the table: PostgreSQL ≥ 11 stores the default
in the catalog (this database is PostgreSQL 17). Expect a metadata-only `ALTER` plus one `UPDATE`
over the row count — currently small.

### Recovery, in the order you should try it

1. **Nothing.** The columns are inert to older code. If you roll the *code* back to `482b5e8`, the
   old build ignores the six columns and reads `emailed` exactly as before. **This is the expected
   path — a code rollback needs no database work at all.**

2. **Undo the schema** (only if a stray column is genuinely a problem — e.g. a later fix needs the
   name back). Run against the Neon **`main`** branch, in a transaction:

   ```sql
   BEGIN;
   DROP INDEX IF EXISTS "BuildRequest_notifyStatus_createdAt_idx";
   ALTER TABLE "BuildRequest"
     DROP COLUMN IF EXISTS "notifyStatus",
     DROP COLUMN IF EXISTS "notifyAttempts",
     DROP COLUMN IF EXISTS "notifyClaimedAt",
     DROP COLUMN IF EXISTS "notifiedAt",
     DROP COLUMN IF EXISTS "notifyLastError",
     DROP COLUMN IF EXISTS "notifyMessageId";
   DELETE FROM "_prisma_migrations"
    WHERE migration_name = '20260830150000_add_lead_notification_status';
   COMMIT;
   ```

   The `_prisma_migrations` row **must** go too, or the next deploy sees the migration as applied
   and never re-creates the columns. **This loses delivery history** (which lead was notified, when,
   with which Resend message id) — `emailed` survives and is the fallback signal.

3. **Point-in-time restore.** Only if step 2 is not enough. Neon project `ai-shop-db`
   (`lingering-sun-58786665`) → branch `main` → **Backup & Restore**. ⚠️ **History retention on this
   project is 6 hours.** A restore older than that is impossible, so decide fast — and any lead
   submitted after the restore point is lost. Take a branch copy before restoring.

### Before the production deploy

Run the census first so you know what the migration is about to touch, and so you have a
before-number to compare against:

```bash
node scripts/leads-report.mjs                # aggregates only — safe to paste anywhere
node scripts/leads-report.mjs --retry-queue  # the leads that will enter the retry queue
```

Every row with `emailed = false` becomes `notifyStatus = 'pending'` and therefore enters the retry
worker's queue. The first cron tick after the deploy will email you about **all of them at once**.
That is the intended behaviour — they are enquiries nobody was ever told about — but know the number
before it lands in your inbox rather than after.

---

## Verify the rollback actually took effect

Do not conclude from the dashboard. Check the live domain.

```bash
# 1. The most reliable marker: the legal pages carry an explicit date.
curl -s https://aibuiltbyhand.com/privacy | grep -o "Last updated: [^<]*"
#    "June 6, 2026"    → the old build is live (rollback succeeded)
#    "August 30, 2026" → the new build is still live (rollback did NOT take)

# 2. Homepage title — the pre-release production title.
curl -s https://aibuiltbyhand.com/ | grep -o "<title>[^<]*</title>"

# 3. Status of the key routes.
for p in / /pricing /create /demo /tools /about /privacy /terms; do
  printf "%s " "$p"; curl -s -o /dev/null -w "%{http_code}\n" "https://aibuiltbyhand.com$p";
done

# 4. Which deployment served the request.
curl -sI https://aibuiltbyhand.com/ | grep -i "x-vercel-id\|age\|cache"
```

**The CDN can serve the previous page for a short window after a promote.** A stale response is not a failed rollback. Re-check with a cache-buster before concluding anything:

```bash
curl -s "https://aibuiltbyhand.com/privacy?cb=$(date +%s)" | grep -o "Last updated: [^<]*"
```

Also confirm the form still works after a rollback — a lead posted to `/api/build-request` should return `ok`, and a real submission should land in the inbox. A site that renders but silently drops enquiries is worse than the bug you rolled back.

---

## After any rollback

1. Say in one line what broke, and quote the evidence. Do not upgrade a guess to a diagnosis.
2. Leave `main` in a state that redeploys the *good* version — otherwise the next unrelated push re-ships the bug.
3. Record the rollback in project memory with the date, the deployment promoted, and what triggered it.

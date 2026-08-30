# ROLLBACK — how to put aibuiltbyhand.com back the way it was

Read this before touching production. Rollback is an **owner action**: it needs the Vercel dashboard or a push to `main`, and no agent may do either.

---

## The anchor

Production runs whatever is at the tip of `origin/main`. Right now that is:

```
3031d36baae51b05cca0db14557217f1fc5ff9fd
Wed Jul 15 22:18:24 2026 -0700
Merge pull request #2 from pavneets956-design/free-contractor-tools
```

Verify it yourself before trusting this file — the tip moves the moment a release merges:

```bash
git fetch origin
git rev-parse origin/main          # the commit production is built from
git rev-list --count origin/main..HEAD   # how far the working branch is ahead
```

**This is the state to return to.** It is the last commit that has actually been deployed and lived on the domain, and it is the only version with a real production track record.

Project: Vercel `ai-shop`, project id `prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv`, team `pavs-projects-2a8231d9` ("Pav's Projects"), domain `aibuiltbyhand.com`.

> **The Vercel MCP token in this environment cannot see this project.** `get_project` and `get_web_analytics` return 404/403 for `prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv` — the integration token is scoped to a different project, so its errors are not evidence about `ai-shop`. Rollback is therefore a **dashboard or git action the owner performs by hand.** The Vercel CLI works if it is run with `--scope pavs-projects-2a8231d9`.

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

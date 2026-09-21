# Rollback — aibuiltbyhand.com

Release and rollback require user authorization. The September 20, 2026 continuation explicitly authorizes this release and recovery if verification fails.

## Verified pre-release anchor (September 20, 2026)

- Git: `8986b82188b9a1f457b8f5fe98a2ac0de1f0dfbb` (`origin/main` before PR #5).
- Healthy production deployment: `dpl_7BY3EMnWuimXfJvzypnMntYcA1K2`.
- Deployment URL: `https://ai-shop-nelq7m7i4-pavs-projects-2a8231d9.vercel.app`.
- Project: `ai-shop`, `prj_vIDuVSy2yn14NeZ5Gp2nzUhGaDzv`; scope `pavs-projects-2a8231d9`.

Re-check the live alias and Git state before using an anchor. Older revisions in this document's history predate security fixes and are not safe default rollback targets.

## Fast recovery

If production verification reveals a material regression, return the production alias to the verified previous production deployment without rebuilding:

```powershell
vercel rollback https://ai-shop-nelq7m7i4-pavs-projects-2a8231d9.vercel.app --scope pavs-projects-2a8231d9
vercel inspect https://aibuiltbyhand.com
node scripts/smoke.mjs https://aibuiltbyhand.com
```

Use the authenticated CLI's current `vercel rollback --help` before executing. Do not promote a preview using preview environment values as a substitute for a production rollback. CLI access works for this project even when the browser requires SSO/2FA.

Then fix forward or revert the offending merge on a dedicated branch. For a merge commit, `git revert -m 1 <merge-sha>` keeps the production parent. Review and validate the revert, then merge it through the normal GitHub workflow. Never reset or force-push main. An alias rollback alone leaves the bad code on main for the next deploy.

## Database boundaries

`npm run build` runs `prisma migrate deploy` before Next. PR #5 contains no Prisma schema or migration changes relative to the verified production base. Check deployment logs for no pending migrations.

A code rollback cannot undo a database migration. Any future destructive migration needs its own reviewed restore plan before release; do not use old example SQL from this document's history. Preserve customer records and notification state.

## Verify and record

Verify the live alias, critical routes, API rejection boundaries and relevant browser flows. Use `gh workflow run validate.yml --ref main -f production=true` for the existing cloud gate: production browser requests that could create leads or spend money are intercepted; analytics are suppressed. This validates UI recovery and local PDF output, not real email delivery or billing.

Record the previous/new deployment IDs, Git revision, reason and actual verification results in the release report. Allow a brief CDN propagation interval and re-check before diagnosing a stale response as a failed rollback.

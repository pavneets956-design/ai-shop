-- Owner-notification delivery state for BuildRequest.
--
-- WHY: `emailed BOOLEAN` could not distinguish "never attempted" from "attempted
-- and failed", so a lead whose notification bounced looked identical to a fresh
-- one and nothing could safely retry it. These columns make the notification a
-- retryable, idempotent piece of state.
--
-- SAFETY: this migration is ADDITIVE ONLY.
--   * No column is dropped, renamed or retyped. `emailed` is kept and continues
--     to be written, so any older code path reading it still works.
--   * Every new column is nullable or has a DEFAULT, so the ALTER does not
--     rewrite existing rows into an invalid state.
--   * The backfill is a single UPDATE derived from `emailed`, so history is
--     preserved rather than reset.
--   * Reversible with:
--       ALTER TABLE "BuildRequest"
--         DROP COLUMN "notifyStatus", DROP COLUMN "notifyAttempts",
--         DROP COLUMN "notifyClaimedAt", DROP COLUMN "notifiedAt",
--         DROP COLUMN "notifyLastError", DROP COLUMN "notifyMessageId";
--       DROP INDEX "BuildRequest_notifyStatus_createdAt_idx";
--
-- NOTE FOR THE DEPLOY: `npm run build` runs `prisma migrate deploy`, so this
-- executes against production on the next production deploy. After it runs,
-- every existing lead with emailed = false becomes notifyStatus = 'pending' and
-- therefore enters the retry queue. Run
--   node --env-file=.env.prod.local scripts/leads-report.mjs --retry-queue
-- first if you want to see that list before the worker mails you about them.

ALTER TABLE "BuildRequest"
  ADD COLUMN "notifyStatus"    TEXT NOT NULL DEFAULT 'pending',
  ADD COLUMN "notifyAttempts"  INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "notifyClaimedAt" TIMESTAMP(3),
  ADD COLUMN "notifiedAt"      TIMESTAMP(3),
  ADD COLUMN "notifyLastError" TEXT,
  ADD COLUMN "notifyMessageId" TEXT;

-- Backfill from the boolean we are superseding. A row that was already emailed
-- is 'delivered'; everything else is 'pending' and will be picked up by the
-- retry worker. `notifiedAt` is left NULL for backfilled rows: we know the mail
-- went out, we do not know when, and inventing a timestamp would be a fabricated
-- fact in the system of record.
UPDATE "BuildRequest"
   SET "notifyStatus" = CASE WHEN "emailed" THEN 'delivered' ELSE 'pending' END;

-- Queue scan for the retry worker: WHERE notifyStatus IN (...) ORDER BY createdAt.
CREATE INDEX "BuildRequest_notifyStatus_createdAt_idx"
  ON "BuildRequest" ("notifyStatus", "createdAt");

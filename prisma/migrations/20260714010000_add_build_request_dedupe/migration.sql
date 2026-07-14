-- AlterTable
ALTER TABLE "BuildRequest" ADD COLUMN     "dedupeKey" TEXT,
ADD COLUMN     "fingerprint" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BuildRequest_dedupeKey_key" ON "BuildRequest"("dedupeKey");

-- CreateIndex
CREATE INDEX "BuildRequest_fingerprint_idx" ON "BuildRequest"("fingerprint");

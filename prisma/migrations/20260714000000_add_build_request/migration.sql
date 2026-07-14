-- CreateTable
CREATE TABLE "BuildRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "source" TEXT,
    "kind" TEXT,
    "goal" TEXT,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "emailed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuildRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BuildRequest_email_idx" ON "BuildRequest"("email");

-- CreateIndex
CREATE INDEX "BuildRequest_createdAt_idx" ON "BuildRequest"("createdAt");

-- CreateIndex
CREATE INDEX "BuildRequest_status_idx" ON "BuildRequest"("status");

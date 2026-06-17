-- AlterTable: add NextAuth/OAuth profile fields required by @next-auth/prisma-adapter
ALTER TABLE "User" ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "image" TEXT;

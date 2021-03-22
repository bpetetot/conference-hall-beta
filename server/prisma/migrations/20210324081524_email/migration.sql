-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('SENT', 'DELIVERED');

-- AlterTable
ALTER TABLE "proposals" ADD COLUMN     "emailStatus" "EmailStatus",
ADD COLUMN     "speakerNotified" BOOLEAN NOT NULL DEFAULT false;

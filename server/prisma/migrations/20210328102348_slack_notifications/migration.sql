/*
  Warnings:

  - You are about to drop the column `slackNotifSubmitted` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "slackNotifSubmitted",
ADD COLUMN     "slackNotifications" JSONB;

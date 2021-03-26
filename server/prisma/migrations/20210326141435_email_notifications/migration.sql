-- AlterTable
ALTER TABLE "events" ADD COLUMN     "emailOrganizer" TEXT,
ADD COLUMN     "emailNotifications" JSONB;

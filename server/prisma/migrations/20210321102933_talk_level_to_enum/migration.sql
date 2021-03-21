/*
  Warnings:

  - The `level` column on the `proposals` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level` column on the `talks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TalkLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- AlterTable
ALTER TABLE "proposals" DROP COLUMN "level",
ADD COLUMN     "level" "TalkLevel";

-- AlterTable
ALTER TABLE "talks" DROP COLUMN "level",
ADD COLUMN     "level" "TalkLevel";

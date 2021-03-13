-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MEETUP', 'CONFERENCE');

-- CreateEnum
CREATE TYPE "EventVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "OrganizationRole" AS ENUM ('OWNER', 'MEMBER', 'REVIEWER');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('SUBMITTED', 'ACCEPTED', 'REJECTED', 'CONFIRMED', 'DECLINED');

-- CreateEnum
CREATE TYPE "RatingFeeling" AS ENUM ('LOVE', 'HATE', 'NEUTRAL', 'NO_OPINION');

-- CreateEnum
CREATE TYPE "MessageChannel" AS ENUM ('ORGANIZER', 'SPEAKER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "bio" TEXT,
    "photoURL" TEXT,
    "betaAccess" TEXT,
    "github" TEXT,
    "company" TEXT,
    "language" TEXT,
    "phone" TEXT,
    "references" TEXT,
    "twitter" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "level" TEXT,
    "language" TEXT,
    "references" TEXT,
    "ownerId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_keys" (
    "uuid" TEXT NOT NULL,
    "organization" TEXT,

    PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL DEFAULT E'CONFERENCE',
    "visibility" "EventVisibility" NOT NULL DEFAULT E'PRIVATE',
    "organizationId" INTEGER,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "timezone" TEXT,
    "remote" BOOLEAN NOT NULL DEFAULT false,
    "contact" TEXT,
    "website" TEXT,
    "bannerUrl" TEXT,
    "conferenceStart" TIMESTAMP(3),
    "conferenceEnd" TIMESTAMP(3),
    "cfpStart" TIMESTAMP(3),
    "cfpEnd" TIMESTAMP(3),
    "formatsRequired" BOOLEAN NOT NULL DEFAULT false,
    "categoriesRequired" BOOLEAN NOT NULL DEFAULT false,
    "maxProposals" INTEGER,
    "ownerId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "deliberationEnabled" BOOLEAN NOT NULL DEFAULT false,
    "displayOrganizersRatings" BOOLEAN NOT NULL DEFAULT true,
    "displayProposalsRatings" BOOLEAN NOT NULL DEFAULT true,
    "displayProposalsSpeakers" BOOLEAN NOT NULL DEFAULT true,
    "surveyEnabled" BOOLEAN NOT NULL DEFAULT false,
    "surveyQuestions" JSONB,
    "slackWebhookUrl" TEXT,
    "slackNotifSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "apiKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_formats" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations_members" (
    "memberId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "role" "OrganizationRole" NOT NULL DEFAULT E'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("memberId","organizationId")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" SERIAL NOT NULL,
    "talkId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "level" TEXT,
    "language" TEXT,
    "references" TEXT,
    "comments" TEXT,
    "status" "ProposalStatus" NOT NULL DEFAULT E'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,
    "feeling" "RatingFeeling" NOT NULL DEFAULT E'NEUTRAL',
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "channel" "MessageChannel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_speakers_talks" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_speakers_proposals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_proposals_formats" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_proposals_categories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users.uid_unique" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "proposals.talkId_eventId_unique" ON "proposals"("talkId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "surveys.userId_eventId_unique" ON "surveys"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings.userId_proposalId_unique" ON "ratings"("userId", "proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "_speakers_talks_AB_unique" ON "_speakers_talks"("A", "B");

-- CreateIndex
CREATE INDEX "_speakers_talks_B_index" ON "_speakers_talks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_speakers_proposals_AB_unique" ON "_speakers_proposals"("A", "B");

-- CreateIndex
CREATE INDEX "_speakers_proposals_B_index" ON "_speakers_proposals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_proposals_formats_AB_unique" ON "_proposals_formats"("A", "B");

-- CreateIndex
CREATE INDEX "_proposals_formats_B_index" ON "_proposals_formats"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_proposals_categories_AB_unique" ON "_proposals_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_proposals_categories_B_index" ON "_proposals_categories"("B");

-- AddForeignKey
ALTER TABLE "events" ADD FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_formats" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_categories" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations_members" ADD FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations_members" ADD FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD FOREIGN KEY ("talkId") REFERENCES "talks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_speakers_talks" ADD FOREIGN KEY ("A") REFERENCES "talks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_speakers_talks" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_speakers_proposals" ADD FOREIGN KEY ("A") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_speakers_proposals" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_proposals_formats" ADD FOREIGN KEY ("A") REFERENCES "event_formats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_proposals_formats" ADD FOREIGN KEY ("B") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_proposals_categories" ADD FOREIGN KEY ("A") REFERENCES "event_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_proposals_categories" ADD FOREIGN KEY ("B") REFERENCES "proposals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

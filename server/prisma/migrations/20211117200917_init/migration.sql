-- CreateEnum
CREATE TYPE "TalkLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('MEETUP', 'CONFERENCE');

-- CreateEnum
CREATE TYPE "EventVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "OrganizationRole" AS ENUM ('OWNER', 'MEMBER', 'REVIEWER');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('SUBMITTED', 'ACCEPTED', 'REJECTED', 'CONFIRMED', 'DECLINED');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('SENT', 'DELIVERED');

-- CreateEnum
CREATE TYPE "RatingFeeling" AS ENUM ('LOVE', 'HATE', 'NEUTRAL', 'NO_OPINION');

-- CreateEnum
CREATE TYPE "MessageChannel" AS ENUM ('ORGANIZER', 'SPEAKER');

-- CreateEnum
CREATE TYPE "InviteType" AS ENUM ('ORGANIZATION', 'SPEAKER');

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
    "references" TEXT,
    "twitter" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talks" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "level" "TalkLevel",
    "language" TEXT,
    "references" TEXT,
    "ownerId" INTEGER NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "invitationUuid" TEXT,

    CONSTRAINT "talks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_keys" (
    "uuid" TEXT NOT NULL,
    "organization" TEXT,

    CONSTRAINT "beta_keys_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL DEFAULT E'CONFERENCE',
    "visibility" "EventVisibility" NOT NULL DEFAULT E'PRIVATE',
    "organizationId" INTEGER,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "timezone" TEXT,
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
    "emailOrganizer" TEXT,
    "emailNotifications" JSONB,
    "slackWebhookUrl" TEXT,
    "slackNotifications" JSONB,
    "apiKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_formats" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" INTEGER,

    CONSTRAINT "event_formats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_categories" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eventId" INTEGER,

    CONSTRAINT "event_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "invitationUuid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations_members" (
    "memberId" INTEGER NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "role" "OrganizationRole" NOT NULL DEFAULT E'REVIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_members_pkey" PRIMARY KEY ("memberId","organizationId")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "talkId" INTEGER,
    "eventId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "level" "TalkLevel",
    "language" TEXT,
    "references" TEXT,
    "comments" TEXT,
    "avgRateForSort" DOUBLE PRECISION,
    "status" "ProposalStatus" NOT NULL DEFAULT E'SUBMITTED',
    "emailStatus" "EmailStatus",
    "speakerNotified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,
    "feeling" "RatingFeeling" NOT NULL DEFAULT E'NEUTRAL',
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "channel" "MessageChannel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invites" (
    "uuid" TEXT NOT NULL,
    "type" "InviteType" NOT NULL,
    "entityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("uuid")
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
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "talks_uid_key" ON "talks"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "events_uid_key" ON "events"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_uid_key" ON "organizations"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "proposals_uid_key" ON "proposals"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "proposals_talkId_eventId_key" ON "proposals"("talkId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_uid_key" ON "surveys"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_userId_eventId_key" ON "surveys"("userId", "eventId");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_uid_key" ON "ratings"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "ratings_userId_proposalId_key" ON "ratings"("userId", "proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "messages_uid_key" ON "messages"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "invites_type_entityId_key" ON "invites"("type", "entityId");

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
ALTER TABLE "talks" ADD CONSTRAINT "talks_invitationUuid_fkey" FOREIGN KEY ("invitationUuid") REFERENCES "invites"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_formats" ADD CONSTRAINT "event_formats_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_categories" ADD CONSTRAINT "event_categories_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_invitationUuid_fkey" FOREIGN KEY ("invitationUuid") REFERENCES "invites"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations_members" ADD CONSTRAINT "organizations_members_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations_members" ADD CONSTRAINT "organizations_members_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_talkId_fkey" FOREIGN KEY ("talkId") REFERENCES "talks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "proposals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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

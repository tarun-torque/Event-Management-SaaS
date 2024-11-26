-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'attendee', 'organizer');

-- CreateEnum
CREATE TYPE "ticketType" AS ENUM ('earlyBird', 'vip', 'general', 'waitlist');

-- CreateTable
CREATE TABLE "attendee" (
    "attendeeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'attendee',

    CONSTRAINT "attendee_pkey" PRIMARY KEY ("attendeeId")
);

-- CreateTable
CREATE TABLE "attendeeEvents" (
    "attendeeEventId" TEXT NOT NULL,
    "attendeeId" TEXT,
    "eventEventId" TEXT,

    CONSTRAINT "attendeeEvents_pkey" PRIMARY KEY ("attendeeEventId")
);

-- CreateTable
CREATE TABLE "organizer" (
    "organizerId" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "website" TEXT,
    "socialMediaLinks" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'organizer',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "organizer_pkey" PRIMARY KEY ("organizerId")
);

-- CreateTable
CREATE TABLE "event" (
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "banner" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "agenda" TEXT NOT NULL,
    "organizerId" TEXT,

    CONSTRAINT "event_pkey" PRIMARY KEY ("eventId")
);

-- CreateTable
CREATE TABLE "TicketsInfo" (
    "numberOfGeneralTicket" TEXT NOT NULL,
    "numberOfVipTickets" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "discountOnEarlyBird" TEXT NOT NULL,
    "deadlineEarlyBird" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TicketsInfo_eventId_key" ON "TicketsInfo"("eventId");

-- AddForeignKey
ALTER TABLE "attendeeEvents" ADD CONSTRAINT "attendeeEvents_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("attendeeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendeeEvents" ADD CONSTRAINT "attendeeEvents_eventEventId_fkey" FOREIGN KEY ("eventEventId") REFERENCES "event"("eventId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "organizer"("organizerId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketsInfo" ADD CONSTRAINT "TicketsInfo_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

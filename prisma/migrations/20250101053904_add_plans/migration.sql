/*
  Warnings:

  - The primary key for the `attendeeEvents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `attendeeEventId` on the `attendeeEvents` table. All the data in the column will be lost.
  - You are about to drop the column `eventEventId` on the `attendeeEvents` table. All the data in the column will be lost.
  - You are about to drop the column `agenda` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `event` table. All the data in the column will be lost.
  - Added the required column `priceEarlyBird` to the `TicketsInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceGeneralTicket` to the `TicketsInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceVipTicket` to the `TicketsInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `attendeeEvents` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `attendeeEvents` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `ticketType` to the `attendeeEvents` table without a default value. This is not possible if the table is not empty.
  - Made the column `attendeeId` on table `attendeeEvents` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `eventType` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "eventType" AS ENUM ('wedding', 'corporateEvent', 'birthdayParties', 'anniversary', 'housewarmingFunction');

-- CreateEnum
CREATE TYPE "plan" AS ENUM ('free', 'starter', 'pro', 'enterprise');

-- DropForeignKey
ALTER TABLE "attendeeEvents" DROP CONSTRAINT "attendeeEvents_attendeeId_fkey";

-- DropForeignKey
ALTER TABLE "attendeeEvents" DROP CONSTRAINT "attendeeEvents_eventEventId_fkey";

-- AlterTable
ALTER TABLE "TicketsInfo" ADD COLUMN     "priceEarlyBird" TEXT NOT NULL,
ADD COLUMN     "priceGeneralTicket" TEXT NOT NULL,
ADD COLUMN     "priceVipTicket" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "attendee" ADD COLUMN     "otp" TEXT;

-- AlterTable
ALTER TABLE "attendeeEvents" DROP CONSTRAINT "attendeeEvents_pkey",
DROP COLUMN "attendeeEventId",
DROP COLUMN "eventEventId",
ADD COLUMN     "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "eventId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ticketType" "ticketType" NOT NULL,
ALTER COLUMN "attendeeId" SET NOT NULL,
ADD CONSTRAINT "attendeeEvents_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "event" DROP COLUMN "agenda",
DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "anniversaryId" TEXT,
ADD COLUMN     "eventType" "eventType" NOT NULL;

-- AlterTable
ALTER TABLE "organizer" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "plan" "plan" NOT NULL DEFAULT 'free';

-- CreateTable
CREATE TABLE "admin" (
    "adminId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "otp" TEXT,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "anniversary" (
    "id" TEXT NOT NULL,
    "coupleNames" TEXT NOT NULL,
    "years" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "specialNote" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "anniversary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wedding" (
    "id" TEXT NOT NULL,
    "coupleNames" TEXT NOT NULL,
    "theme" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corporate" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "eventPurpose" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "corporate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "birthday" (
    "id" TEXT NOT NULL,
    "birthdayPersonName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "specialNote" TEXT,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "birthday_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "housewarming" (
    "id" TEXT NOT NULL,
    "hostName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "specialRituals" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "housewarming_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "anniversary_eventId_key" ON "anniversary"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "wedding_eventId_key" ON "wedding"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "corporate_eventId_key" ON "corporate"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "birthday_eventId_key" ON "birthday"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "housewarming_eventId_key" ON "housewarming"("eventId");

-- AddForeignKey
ALTER TABLE "anniversary" ADD CONSTRAINT "anniversary_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wedding" ADD CONSTRAINT "wedding_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corporate" ADD CONSTRAINT "corporate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "birthday" ADD CONSTRAINT "birthday_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housewarming" ADD CONSTRAINT "housewarming_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendeeEvents" ADD CONSTRAINT "attendeeEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendeeEvents" ADD CONSTRAINT "attendeeEvents_attendeeId_fkey" FOREIGN KEY ("attendeeId") REFERENCES "attendee"("attendeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

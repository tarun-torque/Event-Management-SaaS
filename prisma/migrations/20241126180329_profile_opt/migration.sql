/*
  Warnings:

  - You are about to drop the column `isApprove` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `organizer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "isApprove",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "organizer_email_key" ON "organizer"("email");

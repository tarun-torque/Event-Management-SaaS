/*
  Warnings:

  - You are about to drop the column `location` on the `attendee` table. All the data in the column will be lost.
  - Changed the type of `deadline` on the `TicketsInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `city` to the `attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `attendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TicketsInfo" DROP COLUMN "deadline",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "attendee" DROP COLUMN "location",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "profile" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;

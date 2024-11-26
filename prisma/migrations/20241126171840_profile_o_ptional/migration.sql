-- AlterTable
ALTER TABLE "event" ADD COLUMN     "isApprove" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "organizer" ALTER COLUMN "profile" DROP NOT NULL;

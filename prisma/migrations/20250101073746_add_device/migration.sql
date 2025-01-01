-- AlterTable
ALTER TABLE "organizer" ADD COLUMN     "loggedInDevices" TEXT[],
ADD COLUMN     "ownerDeviceId" TEXT NOT NULL DEFAULT 'none';

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'EXPIRED', 'VERIFIED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "code" TEXT,
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING';

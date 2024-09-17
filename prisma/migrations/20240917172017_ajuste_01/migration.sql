-- DropIndex
DROP INDEX "Group_name_key";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;

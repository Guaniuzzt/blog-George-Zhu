-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "locale" TEXT NOT NULL DEFAULT 'en',
ALTER COLUMN "published" SET DEFAULT false;

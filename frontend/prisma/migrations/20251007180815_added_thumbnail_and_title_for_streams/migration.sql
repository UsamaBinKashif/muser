-- AlterTable
ALTER TABLE "public"."Stream" ADD COLUMN     "thumbnail_lg" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "thumbnail_sm" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

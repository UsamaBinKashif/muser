/*
  Warnings:

  - The values [Youtube] on the enum `StreamType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `platform` on the `Stream` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StreamType_new" AS ENUM ('Spotify', 'YouTube');
ALTER TABLE "public"."Stream" ALTER COLUMN "streamType" TYPE "public"."StreamType_new" USING ("streamType"::text::"public"."StreamType_new");
ALTER TYPE "public"."StreamType" RENAME TO "StreamType_old";
ALTER TYPE "public"."StreamType_new" RENAME TO "StreamType";
DROP TYPE "public"."StreamType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."Stream" DROP COLUMN "platform";

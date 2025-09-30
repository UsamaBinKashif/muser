/*
  Warnings:

  - You are about to drop the column `type` on the `Stream` table. All the data in the column will be lost.
  - Added the required column `platform` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Stream" DROP COLUMN "type",
ADD COLUMN     "platform" TEXT NOT NULL;

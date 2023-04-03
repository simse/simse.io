/*
  Warnings:

  - You are about to drop the `ContentCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContentCard" DROP CONSTRAINT "ContentCard_messageId_fkey";

-- DropTable
DROP TABLE "ContentCard";

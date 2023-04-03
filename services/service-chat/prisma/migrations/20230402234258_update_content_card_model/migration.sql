-- AlterTable
ALTER TABLE "ContentCard" ALTER COLUMN "body" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "timestamp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Conversation" ALTER COLUMN "timestamp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "timestamp" DROP NOT NULL;

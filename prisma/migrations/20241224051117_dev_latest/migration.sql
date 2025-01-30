/*
  Warnings:

  - You are about to drop the column `productId` on the `GiftWrap` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[giftWrapId]` on the table `Gift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[giftMessageId]` on the table `Gift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[giftRecieptId]` on the table `Gift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[giftId]` on the table `GiftMessage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[giftId]` on the table `GiftReciept` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Gift" ADD COLUMN "giftMessageId" INTEGER;
ALTER TABLE "Gift" ADD COLUMN "giftRecieptId" INTEGER;
ALTER TABLE "Gift" ADD COLUMN "giftWrapId" INTEGER;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftWrap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "giftId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GiftWrap_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GiftWrap" ("createdAt", "description", "giftId", "id", "image", "price", "title") SELECT "createdAt", "description", "giftId", "id", "image", "price", "title" FROM "GiftWrap";
DROP TABLE "GiftWrap";
ALTER TABLE "new_GiftWrap" RENAME TO "GiftWrap";
CREATE UNIQUE INDEX "GiftWrap_giftId_key" ON "GiftWrap"("giftId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Gift_giftWrapId_key" ON "Gift"("giftWrapId");

-- CreateIndex
CREATE UNIQUE INDEX "Gift_giftMessageId_key" ON "Gift"("giftMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "Gift_giftRecieptId_key" ON "Gift"("giftRecieptId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftMessage_giftId_key" ON "GiftMessage"("giftId");

-- CreateIndex
CREATE UNIQUE INDEX "GiftReciept_giftId_key" ON "GiftReciept"("giftId");

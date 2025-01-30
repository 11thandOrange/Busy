/*
  Warnings:

  - You are about to drop the column `giftMessageSetting` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftRecieptSetting` on the `Gift` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GiftWrap" ADD COLUMN "productId" INTEGER;

-- CreateTable
CREATE TABLE "GiftMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "productId" INTEGER,
    "giftId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GiftMessage_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GiftReciept" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "productId" INTEGER,
    "giftId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GiftReciept_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "selectionType" TEXT DEFAULT 'any',
    "productList" TEXT,
    "giftWrapStatus" BOOLEAN NOT NULL DEFAULT false,
    "giftMessageStatus" BOOLEAN NOT NULL DEFAULT false,
    "giftRecieptStatus" BOOLEAN NOT NULL DEFAULT false,
    "giftAppearanceSetting" TEXT,
    "appearanceRules" TEXT,
    "accountSetting" TEXT,
    "shop" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Gift" ("accountSetting", "appearanceRules", "createdAt", "giftAppearanceSetting", "giftWrapStatus", "id", "shop") SELECT "accountSetting", "appearanceRules", "createdAt", "giftAppearanceSetting", "giftWrapStatus", "id", "shop" FROM "Gift";
DROP TABLE "Gift";
ALTER TABLE "new_Gift" RENAME TO "Gift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

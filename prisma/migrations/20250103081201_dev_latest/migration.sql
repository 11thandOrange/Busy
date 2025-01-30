/*
  Warnings:

  - You are about to drop the column `displayGiftButton` on the `GiftSetting` table. All the data in the column will be lost.
  - You are about to drop the column `displayGiftOptions` on the `GiftSetting` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "GiftCustomization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayGiftOptions" TEXT NOT NULL DEFAULT 'both',
    "giftBtnType" TEXT NOT NULL DEFAULT 'both',
    "btnText" TEXT,
    "btnColor" TEXT,
    "btnEmoji" TEXT,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "addEmailClient" TEXT,
    "giftWrapTagName" TEXT,
    "giftMessageTagName" TEXT,
    "giftReceiptTagName" TEXT,
    "refreshTheCart" BOOLEAN NOT NULL DEFAULT true,
    "giftLogging" TEXT NOT NULL DEFAULT '1',
    "showDecimalPoints" BOOLEAN NOT NULL DEFAULT false,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GiftSetting" ("addEmailClient", "createdAt", "giftLogging", "giftMessageTagName", "giftReceiptTagName", "giftWrapTagName", "id", "refreshTheCart", "shop", "showDecimalPoints") SELECT "addEmailClient", "createdAt", "giftLogging", "giftMessageTagName", "giftReceiptTagName", "giftWrapTagName", "id", "refreshTheCart", "shop", "showDecimalPoints" FROM "GiftSetting";
DROP TABLE "GiftSetting";
ALTER TABLE "new_GiftSetting" RENAME TO "GiftSetting";
CREATE UNIQUE INDEX "GiftSetting_shop_key" ON "GiftSetting"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "GiftCustomization_shop_key" ON "GiftCustomization"("shop");

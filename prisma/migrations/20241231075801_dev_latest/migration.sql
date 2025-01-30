/*
  Warnings:

  - You are about to drop the column `optionLogging` on the `GiftSetting` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_cart` on the `GiftSetting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gift" ADD COLUMN "messageProductId" TEXT;
ALTER TABLE "Gift" ADD COLUMN "recipeientProductId" TEXT;
ALTER TABLE "Gift" ADD COLUMN "wrapProductId" TEXT;

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
INSERT INTO "new_GiftSetting" ("createdAt", "id", "shop") SELECT "createdAt", "id", "shop" FROM "GiftSetting";
DROP TABLE "GiftSetting";
ALTER TABLE "new_GiftSetting" RENAME TO "GiftSetting";
CREATE UNIQUE INDEX "GiftSetting_shop_key" ON "GiftSetting"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

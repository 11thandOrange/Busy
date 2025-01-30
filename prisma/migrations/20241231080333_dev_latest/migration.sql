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
    "displayGiftButton" TEXT NOT NULL DEFAULT 'Both',
    "displayGiftOptions" TEXT NOT NULL DEFAULT 'Both',
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GiftSetting" ("addEmailClient", "createdAt", "giftLogging", "giftMessageTagName", "giftReceiptTagName", "giftWrapTagName", "id", "refreshTheCart", "shop", "showDecimalPoints") SELECT "addEmailClient", "createdAt", "giftLogging", "giftMessageTagName", "giftReceiptTagName", "giftWrapTagName", "id", "refreshTheCart", "shop", "showDecimalPoints" FROM "GiftSetting";
DROP TABLE "GiftSetting";
ALTER TABLE "new_GiftSetting" RENAME TO "GiftSetting";
CREATE UNIQUE INDEX "GiftSetting_shop_key" ON "GiftSetting"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

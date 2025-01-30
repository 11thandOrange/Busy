/*
  Warnings:

  - Made the column `shop` on table `GiftSetting` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refresh_cart" BOOLEAN NOT NULL DEFAULT false,
    "optionLogging" TEXT NOT NULL DEFAULT 'notes',
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GiftSetting" ("createdAt", "id", "optionLogging", "refresh_cart", "shop") SELECT "createdAt", "id", "optionLogging", "refresh_cart", "shop" FROM "GiftSetting";
DROP TABLE "GiftSetting";
ALTER TABLE "new_GiftSetting" RENAME TO "GiftSetting";
CREATE UNIQUE INDEX "GiftSetting_shop_key" ON "GiftSetting"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

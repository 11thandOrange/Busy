/*
  Warnings:

  - You are about to drop the column `html` on the `countdown_timer` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `countdown_timer` table. All the data in the column will be lost.
  - Made the column `shop` on table `Cart_notice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shop` on table `countdown_timer` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cart_notice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "primary_message" TEXT,
    "secondary_message" TEXT,
    "backgroundColor" TEXT DEFAULT '#fff5cd',
    "textColor" TEXT DEFAULT '#222222',
    "fire_icon" BOOLEAN NOT NULL DEFAULT false,
    "showCountdown" BOOLEAN NOT NULL DEFAULT true,
    "countdown_timer" INTEGER NOT NULL DEFAULT 1,
    "general_setting" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cart_notice" ("createdAt", "general_setting", "id", "primary_message", "secondary_message", "shop") SELECT "createdAt", "general_setting", "id", "primary_message", "secondary_message", "shop" FROM "Cart_notice";
DROP TABLE "Cart_notice";
ALTER TABLE "new_Cart_notice" RENAME TO "Cart_notice";
CREATE UNIQUE INDEX "Cart_notice_shop_key" ON "Cart_notice"("shop");
CREATE TABLE "new_countdown_timer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "general_setting" TEXT,
    "display_setting" TEXT,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_countdown_timer" ("createdAt", "display_setting", "general_setting", "id", "shop") SELECT "createdAt", "display_setting", "general_setting", "id", "shop" FROM "countdown_timer";
DROP TABLE "countdown_timer";
ALTER TABLE "new_countdown_timer" RENAME TO "countdown_timer";
CREATE UNIQUE INDEX "countdown_timer_shop_key" ON "countdown_timer"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

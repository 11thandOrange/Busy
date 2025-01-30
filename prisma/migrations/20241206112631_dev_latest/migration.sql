/*
  Warnings:

  - You are about to drop the column `hideTheFireIcon` on the `Cart_notice` table. All the data in the column will be lost.

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
    "emojiToAdd" TEXT DEFAULT '🔥',
    "showCountdown" BOOLEAN NOT NULL DEFAULT true,
    "countdown_timer" INTEGER NOT NULL DEFAULT 1,
    "general_setting" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cart_notice" ("backgroundColor", "countdown_timer", "createdAt", "fire_icon", "general_setting", "id", "primary_message", "secondary_message", "shop", "showCountdown", "textColor") SELECT "backgroundColor", "countdown_timer", "createdAt", "fire_icon", "general_setting", "id", "primary_message", "secondary_message", "shop", "showCountdown", "textColor" FROM "Cart_notice";
DROP TABLE "Cart_notice";
ALTER TABLE "new_Cart_notice" RENAME TO "Cart_notice";
CREATE UNIQUE INDEX "Cart_notice_shop_key" ON "Cart_notice"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

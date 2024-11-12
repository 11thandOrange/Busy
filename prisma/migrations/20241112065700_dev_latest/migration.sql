/*
  Warnings:

  - Made the column `shop` on table `Inactive_tab_message` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inactive_tab_message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inactive_tab_message" ("createdAt", "id", "message", "shop") SELECT "createdAt", "id", "message", "shop" FROM "Inactive_tab_message";
DROP TABLE "Inactive_tab_message";
ALTER TABLE "new_Inactive_tab_message" RENAME TO "Inactive_tab_message";
CREATE UNIQUE INDEX "Inactive_tab_message_shop_key" ON "Inactive_tab_message"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `image` on the `Fav_widget` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Announcement_bar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT,
    "name" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "general_setting" TEXT,
    "theme_style" TEXT,
    "theme_setting" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "countdown_timer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "general_setting" TEXT,
    "shop" TEXT,
    "display_setting" TEXT,
    "position" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fav_widget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT,
    "widgetId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Fav_widget_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "Widget" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fav_widget" ("createdAt", "id", "shop", "widgetId") SELECT "createdAt", "id", "shop", "widgetId" FROM "Fav_widget";
DROP TABLE "Fav_widget";
ALTER TABLE "new_Fav_widget" RENAME TO "Fav_widget";
CREATE UNIQUE INDEX "Fav_widget_widgetId_shop_key" ON "Fav_widget"("widgetId", "shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

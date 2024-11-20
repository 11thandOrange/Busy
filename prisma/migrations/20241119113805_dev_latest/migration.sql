/*
  Warnings:

  - Made the column `shop` on table `Setting` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "admin_language" TEXT,
    "lazy_load_images" BOOLEAN NOT NULL DEFAULT false,
    "change_setting" BOOLEAN NOT NULL DEFAULT false,
    "color_theme" TEXT NOT NULL DEFAULT 'light',
    "global_customizations" TEXT,
    "shop" TEXT NOT NULL
);
INSERT INTO "new_Setting" ("admin_language", "change_setting", "color_theme", "global_customizations", "id", "lazy_load_images", "shop") SELECT "admin_language", "change_setting", "color_theme", "global_customizations", "id", "lazy_load_images", "shop" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_shop_key" ON "Setting"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

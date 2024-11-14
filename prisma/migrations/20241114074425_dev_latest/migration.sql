/*
  Warnings:

  - You are about to drop the column `lazY_load_images` on the `Setting` table. All the data in the column will be lost.

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
    "shop" TEXT
);
INSERT INTO "new_Setting" ("admin_language", "change_setting", "color_theme", "global_customizations", "id") SELECT "admin_language", "change_setting", "color_theme", "global_customizations", "id" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

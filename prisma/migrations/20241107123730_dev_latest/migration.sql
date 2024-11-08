/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Widget` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_WidgetCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_WidgetCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_WidgetCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Widget" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Widget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Widget" ("createdAt", "description", "id", "image", "name") SELECT "createdAt", "description", "id", "image", "name" FROM "Widget";
DROP TABLE "Widget";
ALTER TABLE "new_Widget" RENAME TO "Widget";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_WidgetCategories_AB_unique" ON "_WidgetCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_WidgetCategories_B_index" ON "_WidgetCategories"("B");

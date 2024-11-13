/*
  Warnings:

  - You are about to drop the `_AppEvents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `elementId` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `Analytics` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_AppEvents_B_index";

-- DropIndex
DROP INDEX "_AppEvents_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_AppEvents";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Analytics" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shop" TEXT,
    "appId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Analytics_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Analytics_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Analytics" ("appId", "createdAt", "id", "pageUrl", "shop", "timestamp", "updatedAt") SELECT "appId", "createdAt", "id", "pageUrl", "shop", "timestamp", "updatedAt" FROM "Analytics";
DROP TABLE "Analytics";
ALTER TABLE "new_Analytics" RENAME TO "Analytics";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

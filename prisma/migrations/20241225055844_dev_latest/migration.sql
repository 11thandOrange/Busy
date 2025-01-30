/*
  Warnings:

  - You are about to alter the column `productId` on the `GiftWrap` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GiftWrap" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "productId" BIGINT,
    "giftId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GiftWrap_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gift" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_GiftWrap" ("createdAt", "description", "giftId", "id", "image", "price", "productId", "title") SELECT "createdAt", "description", "giftId", "id", "image", "price", "productId", "title" FROM "GiftWrap";
DROP TABLE "GiftWrap";
ALTER TABLE "new_GiftWrap" RENAME TO "GiftWrap";
CREATE UNIQUE INDEX "GiftWrap_giftId_key" ON "GiftWrap"("giftId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the `GiftMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GiftReciept` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GiftWrap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `accountSetting` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `appearanceRules` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftAppearanceSetting` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftMessageId` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftMessageStatus` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftRecieptId` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftRecieptStatus` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftWrapId` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftWrapStatus` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `productList` on the `Gift` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "GiftMessage_giftId_key";

-- DropIndex
DROP INDEX "GiftReciept_giftId_key";

-- DropIndex
DROP INDEX "GiftWrap_giftId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GiftMessage";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GiftReciept";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GiftWrap";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "selectionType" TEXT DEFAULT 'any',
    "selectedProductList" TEXT,
    "enableGiftWrap" BOOLEAN NOT NULL DEFAULT false,
    "giftWrapImage" TEXT,
    "giftWrapTitle" TEXT,
    "giftWrapPrice" REAL,
    "giftWrapDescription" TEXT,
    "enableGiftMessage" BOOLEAN NOT NULL DEFAULT false,
    "giftMessageTitle" TEXT,
    "giftMessageDescription" TEXT,
    "sendWithGiftReceipt" BOOLEAN NOT NULL DEFAULT false,
    "sendWithNoInvoice" BOOLEAN NOT NULL DEFAULT false,
    "recipientEmailTitle" TEXT,
    "recipientEmailDescription" TEXT,
    "recipientEmail" TEXT,
    "sendEmailUponCheckout" BOOLEAN NOT NULL DEFAULT false,
    "sendEmailWhenItemIsShipped" BOOLEAN NOT NULL DEFAULT false,
    "giftWrapCustomizationText" TEXT,
    "giftWrapCustomizationColor" TEXT,
    "giftWrapCustomizationEmoji" TEXT,
    "giftMessageCustomizationText" TEXT,
    "giftMessageCustomizationColor" TEXT,
    "giftMessageCustomizationEmoji" TEXT,
    "shop" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Gift" ("createdAt", "id", "selectionType", "shop") SELECT "createdAt", "id", "selectionType", "shop" FROM "Gift";
DROP TABLE "Gift";
ALTER TABLE "new_Gift" RENAME TO "Gift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

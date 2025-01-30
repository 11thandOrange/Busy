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
    "enableGiftReceipt" BOOLEAN NOT NULL DEFAULT false,
    "sendWithGiftReceipt" BOOLEAN NOT NULL DEFAULT false,
    "sendWithNoInvoice" BOOLEAN NOT NULL DEFAULT false,
    "enableGiftRecipientEmail" BOOLEAN NOT NULL DEFAULT false,
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
    "wrapProductId" TEXT,
    "messageProductId" TEXT,
    "recipeientProductId" TEXT,
    "shop" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Gift" ("createdAt", "enableGiftMessage", "enableGiftWrap", "giftMessageCustomizationColor", "giftMessageCustomizationEmoji", "giftMessageCustomizationText", "giftMessageDescription", "giftMessageTitle", "giftWrapCustomizationColor", "giftWrapCustomizationEmoji", "giftWrapCustomizationText", "giftWrapDescription", "giftWrapImage", "giftWrapPrice", "giftWrapTitle", "id", "messageProductId", "recipeientProductId", "recipientEmail", "recipientEmailDescription", "recipientEmailTitle", "selectedProductList", "selectionType", "sendEmailUponCheckout", "sendEmailWhenItemIsShipped", "sendWithGiftReceipt", "sendWithNoInvoice", "shop", "updatedAt", "wrapProductId") SELECT "createdAt", "enableGiftMessage", "enableGiftWrap", "giftMessageCustomizationColor", "giftMessageCustomizationEmoji", "giftMessageCustomizationText", "giftMessageDescription", "giftMessageTitle", "giftWrapCustomizationColor", "giftWrapCustomizationEmoji", "giftWrapCustomizationText", "giftWrapDescription", "giftWrapImage", "giftWrapPrice", "giftWrapTitle", "id", "messageProductId", "recipeientProductId", "recipientEmail", "recipientEmailDescription", "recipientEmailTitle", "selectedProductList", "selectionType", "sendEmailUponCheckout", "sendEmailWhenItemIsShipped", "sendWithGiftReceipt", "sendWithNoInvoice", "shop", "updatedAt", "wrapProductId" FROM "Gift";
DROP TABLE "Gift";
ALTER TABLE "new_Gift" RENAME TO "Gift";
CREATE TABLE "new_GiftCustomization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "displayGiftOptions" TEXT NOT NULL DEFAULT 'both',
    "giftBtnType" TEXT NOT NULL DEFAULT 'both',
    "btnText" TEXT NOT NULL DEFAULT 'Add As Gift',
    "btnColor" TEXT,
    "btnEmoji" TEXT,
    "shop" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_GiftCustomization" ("btnColor", "btnEmoji", "btnText", "createdAt", "displayGiftOptions", "giftBtnType", "id", "shop") SELECT "btnColor", "btnEmoji", coalesce("btnText", 'Add As Gift') AS "btnText", "createdAt", "displayGiftOptions", "giftBtnType", "id", "shop" FROM "GiftCustomization";
DROP TABLE "GiftCustomization";
ALTER TABLE "new_GiftCustomization" RENAME TO "GiftCustomization";
CREATE UNIQUE INDEX "GiftCustomization_shop_key" ON "GiftCustomization"("shop");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

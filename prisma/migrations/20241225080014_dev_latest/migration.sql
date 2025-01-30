-- CreateTable
CREATE TABLE "GiftSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "refresh_cart" BOOLEAN NOT NULL DEFAULT false,
    "optionLogging" TEXT NOT NULL DEFAULT 'notes',
    "shop" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/*
  Warnings:

  - A unique constraint covering the columns `[appId,shop]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Merchant_appId_shop_key" ON "Merchant"("appId", "shop");

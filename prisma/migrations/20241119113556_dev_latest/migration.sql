/*
  Warnings:

  - A unique constraint covering the columns `[id,shop]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Setting_id_shop_key" ON "Setting"("id", "shop");

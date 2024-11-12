/*
  Warnings:

  - A unique constraint covering the columns `[shop]` on the table `Inactive_tab_message` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "App" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Inactive_tab_message_shop_key" ON "Inactive_tab_message"("shop");

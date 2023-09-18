/*
  Warnings:

  - A unique constraint covering the columns `[priceHeaderId,productId]` on the table `pricelines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pricelines_priceHeaderId_productId_key` ON `pricelines`(`priceHeaderId`, `productId`);

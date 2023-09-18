-- DropForeignKey
ALTER TABLE `orderdetails` DROP FOREIGN KEY `orderdetails_productId_fkey`;

-- DropForeignKey
ALTER TABLE `pricelines` DROP FOREIGN KEY `pricelines_productId_fkey`;

-- AlterTable
ALTER TABLE `priceheaders` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `pricelines` MODIFY `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `orderdetails` ADD CONSTRAINT `orderdetails_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pricelines` ADD CONSTRAINT `pricelines_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `CompanyEmployee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `CompanyEmployee` DROP FOREIGN KEY `CompanyEmployee_clientId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `CompanyEmployee_clientId_key` ON `CompanyEmployee`(`clientId`);

-- AddForeignKey
ALTER TABLE `CompanyEmployee` ADD CONSTRAINT `CompanyEmployee_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

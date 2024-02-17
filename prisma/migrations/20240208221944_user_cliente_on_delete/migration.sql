-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_idUser_fkey`;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `idSalary` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payroll` ADD COLUMN `idSalary` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Salary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `typePayment` ENUM('HORAS', 'CHEQUE') NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_idSalary_fkey` FOREIGN KEY (`idSalary`) REFERENCES `Salary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

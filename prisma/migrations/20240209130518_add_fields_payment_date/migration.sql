/*
  Warnings:

  - Added the required column `paymentDate` to the `Payroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payroll` ADD COLUMN `paymentDate` DATETIME(3) NOT NULL;

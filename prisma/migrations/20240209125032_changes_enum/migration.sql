/*
  Warnings:

  - The values [CREATE] on the enum `Payroll_state` will be removed. If these variants are still used in the database, this will fail.
  - The values [Cheque,Efectivo,Transferencia] on the enum `Payroll_typePayment` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Payroll` MODIFY `state` ENUM('CREADO', 'RECHAZADO', 'APROBADO') NOT NULL,
    MODIFY `typePayment` ENUM('HORAS', 'CHEQUE') NOT NULL;

/*
  Warnings:

  - Made the column `Email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `Email` VARCHAR(255) NOT NULL,
    MODIFY `Name` VARCHAR(255) NULL;

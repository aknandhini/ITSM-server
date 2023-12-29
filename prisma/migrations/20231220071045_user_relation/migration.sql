/*
  Warnings:

  - Added the required column `Assigned_to` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `Assigned_to` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_Assigned_to_fkey` FOREIGN KEY (`Assigned_to`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;

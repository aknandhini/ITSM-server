/*
  Warnings:

  - You are about to drop the `ticket_table` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `ticket_table`;

-- CreateTable
CREATE TABLE `ticket` (
    `name` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `created_at` VARCHAR(255) NULL,
    `updated_at` VARCHAR(255) NULL,
    `impact` VARCHAR(255) NULL,
    `impact_override` VARCHAR(255) NULL,
    `started_at` VARCHAR(255) NULL,
    `page_id` VARCHAR(255) NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket_table` (
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

-- CreateTable
CREATE TABLE `ticket_table_2` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Description` VARCHAR(255) NULL,
    `Subject` VARCHAR(255) NOT NULL,
    `Status` ENUM('Open', 'progress', 'Hold', 'Closed') NOT NULL DEFAULT 'Open',
    `Priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Low',
    `Type` ENUM('Ticket', 'Problem', 'Question') NOT NULL DEFAULT 'Ticket',
    `Created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Notes` VARCHAR(255) NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


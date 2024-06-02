/*
  Warnings:

  - You are about to drop the `records` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `records` DROP FOREIGN KEY `Records_agentId_fkey`;

-- DropForeignKey
ALTER TABLE `records` DROP FOREIGN KEY `Records_userId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `theme` VARCHAR(191) NOT NULL DEFAULT 'luxury';

-- DropTable
DROP TABLE `records`;

-- CreateTable
CREATE TABLE `SpellBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `author` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `agentId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpellBook` ADD CONSTRAINT `SpellBook_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agents`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpellBook` ADD CONSTRAINT `SpellBook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE `spellbook` DROP FOREIGN KEY `SpellBook_agentId_fkey`;

-- DropForeignKey
ALTER TABLE `spellbook` DROP FOREIGN KEY `SpellBook_userId_fkey`;

-- AlterTable
ALTER TABLE `spellbook` ADD COLUMN `image` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `SpellBook` ADD CONSTRAINT `SpellBook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpellBook` ADD CONSTRAINT `SpellBook_agentId_fkey` FOREIGN KEY (`agentId`) REFERENCES `Agents`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `content` on the `spellbook` table. All the data in the column will be lost.
  - Added the required column `description` to the `SpellBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `element` to the `SpellBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `powerLevel` to the `SpellBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `spellbook` DROP COLUMN `content`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `element` VARCHAR(191) NOT NULL,
    ADD COLUMN `powerLevel` INTEGER NOT NULL;

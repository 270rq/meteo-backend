/*
  Warnings:

  - Added the required column `createrUserId` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createrUserId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createrUserId` to the `Sun` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Map` ADD COLUMN `createrUserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `createrUserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Sun` ADD COLUMN `createrUserId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Sun` ADD CONSTRAINT `Sun_createrUserId_fkey` FOREIGN KEY (`createrUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_createrUserId_fkey` FOREIGN KEY (`createrUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Map` ADD CONSTRAINT `Map_createrUserId_fkey` FOREIGN KEY (`createrUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

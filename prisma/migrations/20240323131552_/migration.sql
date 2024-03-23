/*
  Warnings:

  - You are about to drop the column `day` on the `Map` table. All the data in the column will be lost.
  - Added the required column `date` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_flowerId_fkey`;

-- AlterTable
ALTER TABLE `Map` DROP COLUMN `day`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Sun` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` MODIFY `flowerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_flowerId_fkey` FOREIGN KEY (`flowerId`) REFERENCES `Flower`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

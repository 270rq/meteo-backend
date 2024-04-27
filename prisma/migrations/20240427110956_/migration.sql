-- AlterTable
ALTER TABLE `User` ADD COLUMN `x` DOUBLE NULL,
    ADD COLUMN `y` DOUBLE NULL,
    MODIFY `receive_notifications` BOOLEAN NOT NULL DEFAULT false;

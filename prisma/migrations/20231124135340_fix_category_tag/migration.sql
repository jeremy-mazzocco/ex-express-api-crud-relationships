/*
  Warnings:

  - You are about to drop the column `postID` on the `category` table. All the data in the column will be lost.
  - Added the required column `categoryID` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_postID_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `postID`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `categoryID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryID_fkey` FOREIGN KEY (`categoryID`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `permissionId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_permissionId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "permissionId";

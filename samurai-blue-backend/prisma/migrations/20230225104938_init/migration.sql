/*
  Warnings:

  - Added the required column `creditcard` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paynow` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "creditcard" BOOLEAN NOT NULL,
ADD COLUMN     "paynow" BOOLEAN NOT NULL;

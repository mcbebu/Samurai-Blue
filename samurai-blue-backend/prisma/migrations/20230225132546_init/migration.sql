/*
  Warnings:

  - Added the required column `sessionName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creditcard` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paynow` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "sessionName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "creditcard" BOOLEAN NOT NULL,
ADD COLUMN     "paynow" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_sessionName_fkey" FOREIGN KEY ("sessionName") REFERENCES "Session"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

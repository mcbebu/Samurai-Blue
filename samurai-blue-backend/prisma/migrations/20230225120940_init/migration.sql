/*
  Warnings:

  - You are about to drop the column `sessionId` on the `Orders` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Session` table. All the data in the column will be lost.
  - Added the required column `sessionName` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_sessionId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "sessionId",
ADD COLUMN     "sessionName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id",
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_sessionName_fkey" FOREIGN KEY ("sessionName") REFERENCES "Session"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

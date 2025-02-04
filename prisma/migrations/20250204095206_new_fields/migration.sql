/*
  Warnings:

  - You are about to drop the column `isAgreedToTerms` on the `user` table. All the data in the column will be lost.
  - Added the required column `companyAddress` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "isAgreedToTerms",
ADD COLUMN     "companyAddress" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "role" SET NOT NULL;

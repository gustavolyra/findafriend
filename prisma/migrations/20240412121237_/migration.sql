/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Org` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cep` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Org` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `Org` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Org" ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Org_email_key" ON "Org"("email");

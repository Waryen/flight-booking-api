/*
  Warnings:

  - You are about to drop the `Compagny` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Compagny";

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

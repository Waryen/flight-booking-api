-- CreateTable
CREATE TABLE "Compagny" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Compagny_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Compagny_name_key" ON "Compagny"("name");

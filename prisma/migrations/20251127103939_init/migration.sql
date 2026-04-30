/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Kunde" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dbirth" DATETIME NOT NULL,
    "street" TEXT NOT NULL,
    "hausnummer" INTEGER NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Kunde_email_key" ON "Kunde"("email");

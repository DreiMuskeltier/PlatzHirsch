/*
  Warnings:

  - You are about to drop the column `status` on the `Ort` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Ort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Kommentar` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OrtVorschlag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'BEANTRAGT',
    "originalOrtId" TEXT,
    "createdById" TEXT NOT NULL,
    "reviewedById" TEXT,
    "reviewedAt" DATETIME,
    "rejectionReason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "OrtVorschlag_originalOrtId_fkey" FOREIGN KEY ("originalOrtId") REFERENCES "Ort" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "OrtVorschlag_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrtVorschlag_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ort" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "beschreibung" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Ort_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ort" ("beschreibung", "createdAt", "id", "lat", "lng", "name", "updatedAt") SELECT "beschreibung", "createdAt", "id", "lat", "lng", "name", "updatedAt" FROM "Ort";
DROP TABLE "Ort";
ALTER TABLE "new_Ort" RENAME TO "Ort";
CREATE TABLE "new_Kommentar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ortId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Kommentar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kommentar_ortId_fkey" FOREIGN KEY ("ortId") REFERENCES "Ort" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Kommentar" ("createdAt", "id", "ortId", "text", "userId") SELECT "createdAt", "id", "ortId", "text", "userId" FROM "Kommentar";
DROP TABLE "Kommentar";
ALTER TABLE "new_Kommentar" RENAME TO "Kommentar";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Kommentar" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "ortId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Kommentar_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Kommentar_ortId_fkey" FOREIGN KEY ("ortId") REFERENCES "Ort" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Kommentar" ("createdAt", "id", "ortId", "text", "updatedAt", "userId") SELECT "createdAt", "id", "ortId", "text", "updatedAt", "userId" FROM "Kommentar";
DROP TABLE "Kommentar";
ALTER TABLE "new_Kommentar" RENAME TO "Kommentar";
CREATE TABLE "new_Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT,
    "ortId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Favorite_ortId_fkey" FOREIGN KEY ("ortId") REFERENCES "Ort" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("createdAt", "id", "ortId", "userId") SELECT "createdAt", "id", "ortId", "userId" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
CREATE UNIQUE INDEX "Favorite_userId_ortId_key" ON "Favorite"("userId", "ortId");
CREATE UNIQUE INDEX "Favorite_sessionId_ortId_key" ON "Favorite"("sessionId", "ortId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rolle" TEXT NOT NULL DEFAULT 'REGISTRIERT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "rolle") SELECT "createdAt", "email", "id", "name", "rolle" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

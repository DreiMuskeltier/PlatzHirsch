-- CreateTable
CREATE TABLE "Bewertung" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "sessionId" TEXT,
    "ortId" TEXT NOT NULL,
    "sterne" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Bewertung_ortId_fkey" FOREIGN KEY ("ortId") REFERENCES "Ort" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bewertung_userId_ortId_key" ON "Bewertung"("userId", "ortId");

-- CreateIndex
CREATE UNIQUE INDEX "Bewertung_sessionId_ortId_key" ON "Bewertung"("sessionId", "ortId");

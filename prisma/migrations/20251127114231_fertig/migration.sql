-- CreateTable
CREATE TABLE "Bestellung" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kundenId" INTEGER NOT NULL,
    "datum" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Bestellung_kundenId_fkey" FOREIGN KEY ("kundenId") REFERENCES "Kunde" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produkt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "preis" INTEGER NOT NULL,
    "lkz" BOOLEAN NOT NULL DEFAULT false,
    "groesse" TEXT NOT NULL,
    "farbe" TEXT NOT NULL,
    "logo" INTEGER NOT NULL,
    "bestand" INTEGER NOT NULL,
    CONSTRAINT "Produkt_logo_fkey" FOREIGN KEY ("logo") REFERENCES "Logos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BestellungProdukt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bestellungId" INTEGER NOT NULL,
    "produktId" INTEGER NOT NULL,
    "menge" INTEGER NOT NULL,
    CONSTRAINT "BestellungProdukt_bestellungId_fkey" FOREIGN KEY ("bestellungId") REFERENCES "Bestellung" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BestellungProdukt_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Logos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lieferanten" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "hausnummer" INTEGER NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LieferantenProdukt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lieferantId" INTEGER NOT NULL,
    "produktId" INTEGER NOT NULL,
    "preis" INTEGER NOT NULL,
    CONSTRAINT "LieferantenProdukt_lieferantId_fkey" FOREIGN KEY ("lieferantId") REFERENCES "Lieferanten" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LieferantenProdukt_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Lieferanten_email_key" ON "Lieferanten"("email");

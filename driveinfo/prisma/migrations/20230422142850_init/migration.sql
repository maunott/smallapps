-- CreateTable
CREATE TABLE "Ajopaiva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reitti" TEXT NOT NULL,
    "matka" TEXT NOT NULL,
    "kayttaja" INTEGER NOT NULL,
    "pvm" TEXT NOT NULL
);

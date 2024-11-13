-- AlterTable
ALTER TABLE "App" ADD COLUMN "sliderImages" TEXT;

-- CreateTable
CREATE TABLE "Specification" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AppSpecifications" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AppSpecifications_A_fkey" FOREIGN KEY ("A") REFERENCES "App" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppSpecifications_B_fkey" FOREIGN KEY ("B") REFERENCES "Specification" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_AppSpecifications_AB_unique" ON "_AppSpecifications"("A", "B");

-- CreateIndex
CREATE INDEX "_AppSpecifications_B_index" ON "_AppSpecifications"("B");

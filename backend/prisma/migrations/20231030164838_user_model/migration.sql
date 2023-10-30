-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_messageFrom" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_messageTo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_messageFrom_AB_unique" ON "_messageFrom"("A", "B");

-- CreateIndex
CREATE INDEX "_messageFrom_B_index" ON "_messageFrom"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_messageTo_AB_unique" ON "_messageTo"("A", "B");

-- CreateIndex
CREATE INDEX "_messageTo_B_index" ON "_messageTo"("B");

-- AddForeignKey
ALTER TABLE "_messageFrom" ADD CONSTRAINT "_messageFrom_A_fkey" FOREIGN KEY ("A") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messageFrom" ADD CONSTRAINT "_messageFrom_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messageTo" ADD CONSTRAINT "_messageTo_A_fkey" FOREIGN KEY ("A") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_messageTo" ADD CONSTRAINT "_messageTo_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

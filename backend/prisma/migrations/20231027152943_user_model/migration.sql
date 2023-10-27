-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "userName" VARCHAR NOT NULL,
    "avatar" VARCHAR NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR NOT NULL,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_friendsTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "friends_userName_key" ON "friends"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "_friendsTouser_AB_unique" ON "_friendsTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_friendsTouser_B_index" ON "_friendsTouser"("B");

-- AddForeignKey
ALTER TABLE "_friendsTouser" ADD CONSTRAINT "_friendsTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "friends"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friendsTouser" ADD CONSTRAINT "_friendsTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

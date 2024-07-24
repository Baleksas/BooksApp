/*
  Warnings:

  - You are about to drop the column `authorId` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `bookIds` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Collection` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rating` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "authorId",
DROP COLUMN "bookIds",
DROP COLUMN "title",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorId",
DROP COLUMN "content",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "creatorId" TEXT NOT NULL,
DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToCollection_AB_unique" ON "_BookToCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToCollection_B_index" ON "_BookToCollection"("B");

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCollection" ADD CONSTRAINT "_BookToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToCollection" ADD CONSTRAINT "_BookToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `etag` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLink` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "etag" TEXT NOT NULL,
ADD COLUMN     "imageLink" TEXT NOT NULL;

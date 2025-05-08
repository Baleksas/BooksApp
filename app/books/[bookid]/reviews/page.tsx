import {
  getBookByID,
  getAllReviewsOfChosenBook,
  getBookFromDB,
} from "@/app/actions";
import { Rating } from "@/components/shared/Rating";
import { BookAPI, BookDB } from "@/types/Book";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default async function Page({
  params,
}: {
  params: Promise<{ bookid: any }>;
}) {
  const bookId = (await params).bookid;

  const bookData = (await getBookFromDB(bookId)) as BookDB;

  const reviews = await getAllReviewsOfChosenBook(bookId);

  if (reviews.length === 0)
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <p className="text-xl">No reviews for this book yet.</p>
      </div>
    );
  else
    return (
      <React.Fragment>
        <h1 className="text-2xl font-bold">Reviews of the book:</h1>
        <div className="card card-side bg-base-300 shadow-xl my-4 px-4 min-w-full ">
          {bookData.imageLink && (
            <figure>
              <Image
                width={200}
                height={400}
                quality={100}
                alt={bookData.title}
                src={bookData.imageLink}
              />
            </figure>
          )}
          <div className="card-body card-bordered">
            <h2 className="card-title">{bookData.title}</h2>

            {bookData?.authorName && <p>{bookData.authorName}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="card card-side bg-gray-800 shadow-xl"
            >
              <div className="card-body	">
                <h2 className="card-title">By: {review.creatorNickname}</h2>
                <h2 className="card-title">
                  Rating:
                  <div className="rating">
                    <Rating rating={review.rating} readOnly />
                  </div>
                </h2>
                <p className="text-xl italic font-semibold text-gray-700 dark:text-gray-400">
                  &quot; {review.comment} &quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
}

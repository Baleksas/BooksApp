import {
  getBookByID,
  getAllReviewsOfChosenBook,
  getBookFromDB,
} from "@/app/actions";
import { Rating } from "@/components/shared/Rating";
import { BookAPI, BookDB } from "@/types/Book";
import Image from "next/image";
import React from "react";
export default async function Page({
  params,
}: {
  params: Promise<{ bookid: any }>;
}) {
  const bookId = (await params).bookid;

  const bookData = (await getBookFromDB(bookId)) as BookDB;

  const reviews = await getAllReviewsOfChosenBook(bookId);

  return (
    <React.Fragment>
      <h1 className="text-2xl font-bold">Reviews of the book:</h1>
      <div className="card card-side bg-base-100 shadow-xl my-4 px-4 ">
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
        <div className="card-body">
          <h2 className="card-title">{bookData.title}</h2>

          {bookData?.authorName && <p>{bookData.authorName}</p>}
        </div>
      </div>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="card card-side bg-base-100 shadow-xl my-4 px-4"
        >
          <div className="card-body">
            <h2 className="card-title">{review.creatorNickname}</h2>
            <h2 className="card-title">
              Rating:
              <div className="rating">
                <Rating rating={review.rating} readOnly />
              </div>
            </h2>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

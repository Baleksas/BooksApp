import {
  addBookToCollection,
  createReview,
  getAllCollections,
  getPersonalReviews,
} from "@/app/actions";
import { BookAPI } from "@/types/Book";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import Loading from "../shared/Loading";
import Dropdown from "../shared/Dropdown";
import { Collection } from "@/types/Collection";
import { useFormStatus } from "react-dom";
import { Review, ReviewDB } from "@/types/Review";
import ReviewModal from "../shared/ReviewModal";
import Link from "next/link";
import SuccessBadge from "../shared/Badges/SuccessBadge";

interface BookCardProps {
  bookData: BookAPI;
  collectionOptions: Option[];
  reviews: Review[];
}

export default function BookCard({
  bookData,
  collectionOptions,
  reviews,
}: BookCardProps) {
  const [reviewForBookExists, setReviewForBookExists] = useState(false);

  const startReview = async (bookId: string) => {
    const modalElement = document.getElementById(bookId) as HTMLDialogElement;
    modalElement.showModal();
  };

  const checkIfReviewForBookExists = async () => {
    return reviews.some((review) => review.bookId === bookData.id);
  };

  useEffect(() => {
    const checkReviewExists = async () => {
      const exists = await checkIfReviewForBookExists();
      setReviewForBookExists(exists);
    };
    checkReviewExists();
  }, [bookData.id]);

  const onCreateReview = async (review: Review) => {
    const response = await createReview(bookData, review);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success(
        `Review for book "${bookData.volumeInfo.title}" created successfully`
      );
    }
  };

  return (
    <React.Fragment>
      <ReviewModal
        action={(review: Review) => onCreateReview(review)}
        dialogId={bookData.id}
      />

      <div className="card md:card-side bg-base-100 shadow-xl my-4 flex flex-col md:flex-row items-center">
        {bookData.volumeInfo?.imageLinks?.thumbnail && (
          <figure className="relative w-[200px] h-[300px] min-w-[200px]">
            <Image
              fill
              sizes="200px"
              quality={100}
              alt={bookData.volumeInfo.title}
              src={bookData.volumeInfo.imageLinks.thumbnail}
              className="object-cover"
            />
          </figure>
        )}
        <div className="card-body p-6">
          <h2 className="card-title text-xl">{bookData.volumeInfo.title}</h2>
          {bookData.volumeInfo.subtitle && (
            <h3 className="text-lg text-gray-400">
              {bookData.volumeInfo.subtitle}
            </h3>
          )}
          {bookData.volumeInfo?.authors?.[0] && (
            <p className="text-gray-500">{bookData.volumeInfo.authors[0]}</p>
          )}
          <div className="card-actions md:justify-end items-center mt-4">
            <Link
              className="btn btn-outline"
              href={`/books/${bookData.id}/reviews`}
            >
              See all reviews
            </Link>
            {!reviewForBookExists ? (
              <button
                onClick={() => startReview(bookData.id)}
                className="btn btn-outline text-pink-400"
              >
                Review
              </button>
            ) : (
              <SuccessBadge>Reviewed</SuccessBadge>
            )}
            <Dropdown
              title="Add to collection"
              options={collectionOptions}
              book={bookData}
            ></Dropdown>
            {/* Future concept - integration of AI model */}
            {/* <button type="button" className="btn btn-outline">
              Talk to the author
            </button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

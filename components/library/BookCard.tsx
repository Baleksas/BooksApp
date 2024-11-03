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
import Modal from "../shared/Modal";

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
      <Modal
        action={(review: Review) => onCreateReview(review)}
        dialogId={bookData.id}
      />

      <div className="card card-side bg-base-100 shadow-xl my-4 px-4 ">
        {bookData.volumeInfo?.imageLinks?.thumbnail && (
          // FIXME: fix images sizing
          <figure>
            <Image
              width={200}
              height={400}
              quality={100}
              alt={bookData.volumeInfo.title}
              src={bookData.volumeInfo.imageLinks.thumbnail}
            />
          </figure>
        )}
        <div className="card-body">
          <h2 className="card-title">{bookData.volumeInfo.title}</h2>
          {bookData.volumeInfo.subtitle && (
            <h3>{bookData.volumeInfo.subtitle}</h3>
          )}
          {bookData.volumeInfo?.authors?.[0] && (
            <p>{bookData.volumeInfo.authors[0]}</p>
          )}
          <div className="card-actions justify-end items-center">
            {!reviewForBookExists ? (
              <button
                onClick={() => startReview(bookData.id)}
                className="btn btn-outline text-pink-400"
              >
                Review
              </button>
            ) : (
              <div className="badge badge-success gap-2">Reviewed</div>
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

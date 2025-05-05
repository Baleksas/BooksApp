"use client";
import {
  createReview,
  getBooksInCollection,
  removeBookFromCollection,
} from "@/app/actions";
import { BookDB } from "@/types/Book";
import { Review } from "@/types/Review";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import BookSkeleton from "../library/BookSkeleton";
import ReviewModal from "../shared/ReviewModal";
import Link from "next/link";
import SuccessBadge from "../shared/Badges/SuccessBadge";

interface CollectionBookProps {
  bookData: BookDB;
  selectedCollectionId: string;
  setCollectionBooks: (books: BookDB[]) => void;
  reviews: Review[];
}

export default function CollectionBook({
  bookData,
  selectedCollectionId,
  setCollectionBooks,
  reviews,
}: CollectionBookProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [reviewForBookExists, setReviewForBookExists] = useState(false);

  const removeBook = async (bookId: string, collectionId: string) => {
    const response = removeBookFromCollection(bookId, collectionId);

    toast.promise(response, {
      loading: "Loading",
      success: "Book removed from collection",
      error: "Error removing book",
    });
    const books = await getBooksInCollection(selectedCollectionId);

    toast.promise(response, {
      loading: "Loading in book comp",
      success: "Books are loaded in book comp",
      error: "Error loading books in book comp",
    });

    setCollectionBooks(books as BookDB[]);
  };

  const startReview = async (bookId: string) => {
    const modalElement = document.getElementById(bookId) as HTMLDialogElement;
    modalElement.showModal();
  };

  const onCreateReview = async (review: Review) => {
    const response = await createReview(bookData, review);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success(`Review for book "${bookData.title}" created successfully`);
    }
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

  return (
    <React.Fragment>
      <ReviewModal
        action={(review: Review) => onCreateReview(review)}
        dialogId={bookData.id}
      />
      {!bookData && <BookSkeleton />}
      {bookData && (
        <div className="card card-side bg-base-300 shadow-xl my-4 px-4">
          {bookData.imageLink && (
            <figure>
              <Image
                style={{ visibility: imageLoaded ? "visible" : "hidden" }}
                width={200}
                height={400}
                quality={100}
                alt={bookData.title}
                src={bookData.imageLink}
                onLoad={() => {
                  setImageLoaded(true);
                }}
              />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title">{bookData.title}</h2>
            <h2>{bookData.authorName}</h2>
            <div className="grid card-actions justify-end items-center md:flex">
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
                //TODO: Add see reviews button
              )}
              <button
                onClick={() => removeBook(bookData.id, selectedCollectionId)}
                className="btn btn-outline text-red-500"
              >
                Remove from collection
              </button>

              {/* Future concept - integration of AI model */}
              {/* <button type="button" className="btn btn-outline">
              Talk to the author
            </button> */}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

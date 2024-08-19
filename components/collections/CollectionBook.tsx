"use client";
import { BookAPI, BookDB } from "@/types/Book";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast/headless";
import Loading from "../shared/Loading";
import {
  createReview,
  getBooksInCollection,
  removeBookFromCollection,
} from "@/app/actions";
import { ToastBar } from "react-hot-toast";
import BookSkeleton from "../library/BookSkeleton";
import Modal from "../shared/Modal";
import { Review, ReviewDB } from "@/types/Review";

interface CollectionBookProps {
  bookData: BookDB;
  selectedCollectionId: string;
  setCollectionBooks: (books: BookDB[]) => void;
}

export default function CollectionBook({
  bookData,
  selectedCollectionId,
  setCollectionBooks,
}: CollectionBookProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const removeBook = async (bookId: string, collectionId: string) => {
    const response = removeBookFromCollection(bookId, collectionId);

    toast.promise(response, {
      loading: "Loading",
      success: "Book removed from collection",
      error: "Error removing book",
    });
    // get books here
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
    const response = await createReview(bookData.id, review);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success(`Review for book "${bookData.title}" created successfully`);
    }
  };

  return (
    <>
      <Modal
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
                  console.log("image loaded, setting it to true");
                  setImageLoaded(true);
                }}
              />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title">{bookData.title}</h2>
            <h2>{bookData.authorName}</h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-outline text-pink-400"
                onClick={() => startReview(bookData.id)}
              >
                {/* TODO: hide this button if review exists for this book */}
                Review
              </button>
              <button
                onClick={() => removeBook(bookData.id, selectedCollectionId)}
                className="btn btn-outline text-red-500"
              >
                Remove from collection
              </button>
              <button className="btn btn-outline">Talk to the author</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

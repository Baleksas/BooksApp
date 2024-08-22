import {
  addBookToCollection,
  createReview,
  getAllCollections,
} from "@/app/actions";
import { BookAPI } from "@/types/Book";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import Loading from "../shared/Loading";
import Dropdown from "../shared/Dropdown";
import { Collection } from "@/types/Collection";
import { useFormStatus } from "react-dom";
import { Review } from "@/types/Review";
import Modal from "../shared/Modal";

interface BookCardProps {
  bookData: BookAPI;
  collectionOptions: Option[];
}

export default function BookCard({
  bookData,
  collectionOptions,
}: BookCardProps) {
  const addBookToCollectionFc = async (
    bookData: BookAPI,
    collectionId: string
  ) => {
    const response = await addBookToCollection(bookData, collectionId);

    if (response?.error) {
      toast.error(response.error);
    } else toast.success(`${bookData.volumeInfo.title} added to collection`);
  };

  const startReview = async (bookId: string) => {
    const modalElement = document.getElementById(bookId) as HTMLDialogElement;
    modalElement.showModal();
  };

  const onCreateReview = async (review: Review) => {
    console.log(bookData.id, review);
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
    <>
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
          <div className="card-actions justify-end">
            <button
              onClick={() => startReview(bookData.id)}
              className="btn btn-outline text-pink-400"
            >
              {/* TODO: hide this button if review exists for this book */}
              Review
            </button>
            <button
              onClick={() => addBookToCollectionFc(bookData, "dawdaw2")}
              type="submit"
              className="btn btn-outline text-green-600"
            >
              Mark as read
            </button>
            <Dropdown
              title="Add to collection"
              options={collectionOptions}
              book={bookData}
            ></Dropdown>
            <button type="button" className="btn btn-outline">
              Talk to the author
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

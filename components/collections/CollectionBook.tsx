"use client";
import { BookAPI, BookDB } from "@/types/Book";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast/headless";
import Loading from "../shared/Loading";
import { removeBookFromCollection } from "@/app/actions";
import { ToastBar } from "react-hot-toast";
import BookSkeleton from "../library/BookSkeleton";
import { revalidatePath } from "next/cache";

interface CollectionBookProps {
  bookData: BookDB;
  selectedCollectionId: string;
}

export default function CollectionBook({
  bookData,
  selectedCollectionId,
}: CollectionBookProps) {
  const [isBookLoading, setIsBookLoading] = useState(false);
  console.log("book data in collection book", bookData);
  const removeBook = async (bookId: string, collectionId: string) => {
    const response = removeBookFromCollection(bookId, collectionId);

    toast.promise(response, {
      loading: "Loading",
      success: "Book removed from collection",
      error: "Error removing book",
    });
  };

  return isBookLoading ? (
    <BookSkeleton />
  ) : (
    bookData && (
      <>
        <div className="card card-side bg-base-100 shadow-xl my-4 px-4">
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
            <h2>{bookData.authorName}</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-outline text-pink-400">Review</button>
              <button
                onClick={() => removeBook(bookData.id, selectedCollectionId)}
                className="btn btn-outline text-red-700"
              >
                Remove from collection
              </button>
              <button className="btn btn-outline">Talk to the author</button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

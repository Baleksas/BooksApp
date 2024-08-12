import { addBookToCollection, getAllCollections } from "@/app/actions";
import { BookAPI } from "@/types/Book";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast/headless";
import Loading from "../shared/Loading";
import Dropdown from "../shared/Dropdown";
import { Collection } from "@/types/Collection";
import { useFormStatus } from "react-dom";

interface BookCardProps {
  book: BookAPI;
  collectionOptions: Option[];
}

export default function BookCard({ book, collectionOptions }: BookCardProps) {
  const addBook = async (book: BookAPI, collectionId: string) => {
    const response = await addBookToCollection(book, collectionId);

    if (response?.error) {
      toast.error(response.error);
    } else toast.success(`${book.volumeInfo.title} added to collection`);
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl my-4 px-4 ">
      {book.volumeInfo?.imageLinks?.thumbnail && (
        //fix images sizing
        <figure>
          <Image
            width={200}
            height={400}
            quality={100}
            alt={book.volumeInfo.title}
            src={book.volumeInfo.imageLinks.thumbnail}
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{book.volumeInfo.title}</h2>
        {book.volumeInfo.subtitle && <h3>{book.volumeInfo.subtitle}</h3>}
        {book.volumeInfo?.authors?.[0] && <p>{book.volumeInfo.authors[0]}</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-outline text-pink-400">Review</button>
          <button
            onClick={() => addBook(book, "dawdaw2")}
            type="submit"
            className="btn btn-outline text-green-600"
          >
            Mark as read
          </button>
          <Dropdown
            title="Add to collection"
            options={collectionOptions}
            book={book}
          ></Dropdown>
          <button type="button" className="btn btn-outline">
            Talk to the author
          </button>
        </div>
      </div>
    </div>
  );
}

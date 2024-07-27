import { addBookToCollection } from "@/app/actions";
import { BookAPI } from "@/types/Book";
import React from "react";
import toast from "react-hot-toast/headless";

const Dropdown = ({
  title,
  options,
  book,
}: {
  title: string;
  options: Option[];
  book: BookAPI;
}) => {
  const addBook = async (book: BookAPI, collectionId: string) => {
    const response = addBookToCollection(book, collectionId);

    toast.promise(response, {
      loading: "Loading",
      success: `${book.volumeInfo.title} added to collection`,
      error: "Error adding book to collection",
    });
  };

  return (
    <details className="dropdown">
      <summary className="btn m-1">{title}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        {options.map((option) => {
          return (
            <li key={option.value}>
              <button onClick={() => addBook(book, option.value)}>
                {option.name}
              </button>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default Dropdown;

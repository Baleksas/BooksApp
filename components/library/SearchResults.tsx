"use client";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import BookCard from "./BookCard";
import { Book } from "@/types/Book";

export default function SearchResults({
  searchResults,
}: {
  searchResults: BookSearchResponse;
}) {
  console.log(searchResults);
  return (
    <>
      {searchResults ? (
        <div className="text-xl mt-2">
          {searchResults && (
            <div>Results found: {searchResults.totalItems}</div>
          )}
        </div>
      ) : null}
      <div className="mt-3 ">
        {searchResults ? (
          searchResults.items.map((book: Book) => (
            <BookCard key={book.id} book={book}></BookCard>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </>
  );
}

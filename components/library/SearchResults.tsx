"use client";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import BookCard from "./BookCard";
import { Book } from "@/types/Book";

export default function SearchResults({
  searchResults,
}: {
  searchResults: BookSearchResponse;
}) {
  return (
    <>
      {searchResults ? (
        <div className="text-xl mt-2">
          {searchResults && <div>Results found: {searchResults.numFound}</div>}
        </div>
      ) : null}
      <div className="mt-3 ">
        {searchResults ? (
          searchResults.docs.map((book: Book) => (
            <BookCard key={book.id_goodreads} book={book}></BookCard>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </>
  );
}

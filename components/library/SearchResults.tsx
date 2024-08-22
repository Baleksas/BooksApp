"use client";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import BookCard from "./BookCard";
import { BookAPI } from "@/types/Book";
import { useEffect, useState } from "react";
import { getAllCollections } from "@/app/actions";
import { Collection } from "@prisma/client";

export default function SearchResults({
  searchResults,
}: {
  searchResults: BookSearchResponse;
}) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionOptions, setCollectionOptions] = useState<Option[]>([]);
  const getCollections = async () => {
    const allCollections = await getAllCollections();
    setCollections(allCollections);
  };

  useEffect(() => {
    getCollections();
  }, []);

  useEffect(() => {
    const options = collections.map((collection) => ({
      name: collection.title,
      value: collection.id,
    }));
    setCollectionOptions(options);
  }, [collections]);

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
          searchResults.items.map((book: BookAPI) => (
            <BookCard
              collectionOptions={collectionOptions}
              key={book.id}
              bookData={book}
            ></BookCard>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </>
  );
}

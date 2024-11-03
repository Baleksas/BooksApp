"use client";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import BookCard from "./BookCard";
import { BookAPI } from "@/types/Book";
import React, { useEffect, useState } from "react";
import { getAllCollections, getPersonalReviews } from "@/app/actions";
import { Collection } from "@prisma/client";
import { Review } from "@/types/Review";

export default function SearchResults({
  searchResults,
  reviews,
}: {
  searchResults: BookSearchResponse;
  reviews: Review[];
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
    <React.Fragment>
      <div className="mt-3 ">
        {searchResults ? (
          searchResults.items.map((book: BookAPI) => (
            <BookCard
              collectionOptions={collectionOptions}
              key={book.id}
              bookData={book}
              reviews={reviews}
            />
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </React.Fragment>
  );
}

"use client";
import { Collection } from "@/types/Collection";
import CollectionBook from "./CollectionBook";
import { BookDB } from "@/types/Book";
import { deleteCollection, getAllCollections } from "@/app/actions";
import toast from "react-hot-toast/headless";
import { useContext, useEffect, useState } from "react";
import { Review } from "@/types/Review";
import { CollectionContext } from "@/lib/context/CollectionContext";

interface SelectedCollectionProps {
  selectedCollection: Collection | undefined;
  setSelectedCollection: (collection: Collection | undefined) => void;
  reviews: Review[];
}

export const CollectionContent = ({
  setSelectedCollection,
  selectedCollection,
  reviews,
}: SelectedCollectionProps) => {
  const context = useContext(CollectionContext);

  const { collections, setCollections } = context;

  const deleteReadingList = async (collectionId: string) => {
    const response = await deleteCollection(collectionId);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Collection deleted");

      getCollections();
    }
  };

  const getCollections = async () => {
    const response = await getAllCollections();

    setCollections(response as Collection[]);
  };

  const setCollectionBooks = async (books: BookDB[]) => {
    if (!selectedCollection) return;

    // Update the selected collection's books
    const updatedCollection = { ...selectedCollection, books };

    // Update the collections state
    setCollections((collections) =>
      collections
        ? collections.map((collection) =>
            collection.id === updatedCollection.id
              ? updatedCollection
              : collection
          )
        : [updatedCollection]
    );
    // Update the selected collection state
    setSelectedCollection(updatedCollection);
  };
  return (
    selectedCollection && (
      <div className="mt-3">
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">{selectedCollection?.title}</h2>
          <div className="flex gap-3">
            <button
              className="btn btn-outline text-red-500"
              onClick={() => deleteReadingList(selectedCollection.id)}
            >
              Delete collection
            </button>
          </div>
        </div>

        {selectedCollection.books?.length > 0 ? (
          selectedCollection.books.map((book: BookDB) => (
            <div key={book.id}>
              <CollectionBook
                bookData={book}
                selectedCollectionId={selectedCollection.id}
                setCollectionBooks={setCollectionBooks}
                reviews={reviews}
              />
            </div>
          ))
        ) : (
          <div className="mt-5 text-xl">No books in the collection</div>
        )}
      </div>
    )
  );
};

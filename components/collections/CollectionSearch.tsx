"use client";
import { AddCollectionForm } from "./AddCollectionForm";
import { useEffect, useState } from "react";
import { CollectionContent } from "./CollectionContent";
import toast from "react-hot-toast/headless";
import { Collection } from "@/types/Collection";
import { getBooksInCollection } from "@/app/actions";
import { BookDB } from "@/types/Book";

interface CollectionsProps {
  collectionsDictionary: { id: string; title: string }[];
}

const CollectionSearch = ({ collectionsDictionary }: CollectionsProps) => {
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | undefined
  >("dawdaw2");
  const [collectionBooks, setCollectionBooks] = useState<BookDB[] | []>([]);

  const setNewCollection = async (collectionId: string) => {
    const response = await fetch(`/api/collections?id=${collectionId}`, {
      next: {
        tags: ["collections"],
      },
      headers: {
        method: "GET",
        Accept: "application/json",
      },
    });

    const collection = await response.json();

    setSelectedCollection(collection);
  };

  useEffect(() => {
    if (!selectedCollectionId) return;

    const fetchBooks = async () => {
      const response = getBooksInCollection(selectedCollectionId);

      toast.promise(response, {
        loading: "Loading",
        success: "Books are loaded",
        error: "Error loading books",
      });
      const books = await response;
      // error handling needed
      setCollectionBooks(books as BookDB[]);
    };
    setNewCollection(selectedCollectionId);
    fetchBooks();
  }, [selectedCollectionId]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <AddCollectionForm />
        <div className="flex">
          <select
            defaultValue={"read"}
            onChange={(e) => setSelectedCollectionId(e.target.value)}
            className="select select-bordered w-full"
          >
            {collectionsDictionary.map(
              (collection: { title: string; id: string }) => (
                <option key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
              )
            )}
          </select>
        </div>
      </div>
      {selectedCollection && (
        <CollectionContent
          collectionBooks={collectionBooks}
          selectedCollection={selectedCollection}
          setCollectionBooks={setCollectionBooks}
        />
      )}
    </>
  );
};
export default CollectionSearch;

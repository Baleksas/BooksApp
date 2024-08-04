"use client";
import { AddCollectionForm } from "./AddCollectionForm";
import { useEffect, useState } from "react";
import { CollectionContent } from "./CollectionContent";
import toast from "react-hot-toast/headless";
import { Collection } from "@/types/Collection";
import { getBooksInCollection, getCollectionById } from "@/app/actions";
import { BookDB } from "@/types/Book";

interface CollectionsProps {
  collectionsDictionary: { id: string; title: string }[] | undefined;
}

const CollectionSearch = ({ collectionsDictionary }: CollectionsProps) => {
  const [selectedCollection, setSelectedCollection] = useState<
    Collection | undefined
  >(undefined);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | undefined
  >(undefined);

  const [collectionBooks, setCollectionBooks] = useState<BookDB[] | []>([]);

  const setNewCollection = async (collectionId: string) => {
    const response = await getCollectionById(collectionId);

    setSelectedCollection(response as Collection);
  };

  useEffect(() => {
    if (collectionsDictionary && collectionsDictionary.length > 0) {
      setSelectedCollectionId(collectionsDictionary[0].id);
    }
  }, [collectionsDictionary]);

  useEffect(() => {
    console.log(collectionsDictionary);
    if (!selectedCollectionId) return;

    const fetchBooks = async () => {
      const response = getBooksInCollection(selectedCollectionId);

      await toast.promise(response, {
        loading: "Loading",
        success: "Books are loaded",
        error: "Could not load books",
      });

      const books = (await response) as BookDB[];
      setCollectionBooks(books as BookDB[]);
    };

    setNewCollection(selectedCollectionId);
    fetchBooks();
  }, [selectedCollectionId]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <AddCollectionForm />
        {selectedCollection &&
          collectionsDictionary &&
          collectionsDictionary.length > 1 && (
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
          )}
      </div>
      {selectedCollection ? (
        <CollectionContent
          collectionBooks={collectionBooks}
          selectedCollection={selectedCollection}
          setCollectionBooks={setCollectionBooks}
        />
      ) : (
        <div className="text-xl mt-5">
          No collections found. Start by creating a collection
        </div>
      )}
    </>
  );
};
export default CollectionSearch;

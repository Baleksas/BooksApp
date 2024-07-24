import { Collection } from "@/types/Collection";
import CollectionBook from "./CollectionBook";
import { BookDB } from "@/types/Book";
import { getBooksInCollection } from "@/app/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CollectionProps {
  selectedCollection: Collection;
  collectionBooks: BookDB[];
}

export const CollectionContent = ({
  selectedCollection,
  collectionBooks,
}: CollectionProps) => {
  console.log("selected collection in collection content", selectedCollection);
  return (
    <div className="mt-3">
      <h2 className="text-xl">{selectedCollection?.title}</h2>
      {collectionBooks?.length > 0
        ? collectionBooks.map((book: BookDB) => (
            <div key={book.id}>
              <CollectionBook
                bookData={book}
                selectedCollectionId={selectedCollection.id}
              />
            </div>
          ))
        : "No books"}
    </div>
  );
};

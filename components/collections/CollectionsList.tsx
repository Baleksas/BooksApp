"use client";
import { Collection } from "@/types/Collection";
import { useState } from "react";
import BookCard from "../library/BookCard";

interface CollectionsListProps {
  collections: Collection[];
}

export const CollectionsList = ({ collections }: CollectionsListProps) => {
  const [collectionSelected, setCollectionSelected] = useState();
  console.log(collections);
  return (
    <div>
      Collections:
      {collections.map((collection: Collection) => (
        <div className="text-xl" key={collection.id}>
          {collection.title}
          <>
            {collection.bookIds.map((id: any) => (
              <div key={id}>{id}</div>
            ))}
          </>
        </div>
      ))}
    </div>
  );
};

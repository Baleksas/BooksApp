"use client";

import { Collection as CollectionType } from "@prisma/client";
import CollectionBook from "./CollectionBook";

interface CollectionProps {
  selectedCollection: CollectionType;
}

export const Collection = ({ selectedCollection }: CollectionProps) => {
  return (
    <div className="mt-3">
      <h2 className="text-xl">{selectedCollection?.title}</h2>
      {selectedCollection?.bookKeys.length > 0
        ? selectedCollection.bookKeys.map((bookKey: string) => (
            <div key={bookKey}>
              <CollectionBook
                bookKey={bookKey}
                selectedCollectionId={selectedCollection.id}
              />
            </div>
          ))
        : "No books"}
    </div>
  );
};

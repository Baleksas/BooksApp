"use client";
import { AddCollection } from "./AddCollection";
import { useEffect, useState } from "react";
import { Collection as CollectionType } from "@prisma/client";
import CollectionsFilter from "./CollectionsFilter";
import { Collection } from "./Collection";

interface CollectionsProps {
  collections: CollectionType[];
}

const CollectionForm = ({ collections }: CollectionsProps) => {
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionType | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | undefined
  >("read");

  useEffect(() => {
    setSelectedCollection(
      collections.filter((collection) => {
        return collection.id == selectedCollectionId;
      })[0]
    );
  }, [selectedCollectionId]);

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <AddCollection />
        <CollectionsFilter
          collections={collections}
          setSelectedCollectionId={setSelectedCollectionId}
        />
      </div>
      {selectedCollection && (
        <Collection selectedCollection={selectedCollection} />
      )}
    </>
  );
};
export default CollectionForm;

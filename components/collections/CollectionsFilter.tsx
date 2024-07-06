"use client";

import { Collection } from "@prisma/client";

interface CollectionsFilterProps {
  collections: Collection[];
  setSelectedCollectionId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function CollectionsFilter({
  collections,
  setSelectedCollectionId,
}: CollectionsFilterProps) {
  return (
    <div className="flex">
      <select
        defaultValue={"read"}
        onChange={(e) => setSelectedCollectionId(e.target.value)}
        className="select select-bordered w-full"
      >
        {/* TODO: Create initial collections */}
        {collections.map((collection: Collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.title}
          </option>
        ))}
      </select>
    </div>
  );
}

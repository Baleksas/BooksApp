"use client";
import { AddCollectionForm } from "./AddCollectionForm";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CollectionContent } from "./CollectionContent";
import toast from "react-hot-toast/headless";
import { Collection } from "@/types/Collection";
import {
  getPersonalReviews,
  getBooksInCollection,
  getCollectionById,
} from "@/app/actions";
import { BookDB } from "@/types/Book";
import { Review } from "@/types/Review";
import { CollectionContext } from "@/lib/context/CollectionContext";

const CollectionSearch = () => {
  const [selectedCollection, setSelectedCollection] = useState<
    Collection | undefined
  >(undefined);

  const context = useContext(CollectionContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const { collections } = context;

  const changeSelectedCollection = (collectionId: string) => {
    const selectedCollection = collections?.find(
      (collection) => collection.id === collectionId
    );
    setSelectedCollection(selectedCollection);
  };

  const prevLengthRef = useRef<number>(0);

  useEffect(() => {
    setIsLoadingReviews(true);
    const fetchReviews = async () => {
      const fetchedReviews = await getPersonalReviews();
      setReviews(fetchedReviews);
      setIsLoadingReviews(false);
    };

    fetchReviews().then(() => setIsLoadingReviews(false));
  }, []);

  useEffect(() => {
    const currentLength = collections?.length || 0;

    // TODO: Adjust logic to take deleted id into consideration
    if (
      (prevLengthRef.current === 0 && currentLength > 0) ||
      currentLength < prevLengthRef.current
    ) {
      setSelectedCollection(collections[0]);
    } else if (!collections) {
      setSelectedCollection(undefined);
    } else if (currentLength > prevLengthRef.current) {
      setSelectedCollection(collections[currentLength - 1]);
    }

    prevLengthRef.current = currentLength;
  }, [collections?.length]);

  return (
    <React.Fragment>
      <div className="flex flex-col sm:flex-row gap-3">
        <AddCollectionForm />
        {selectedCollection && collections && collections.length > 1 && (
          <div className="flex">
            <select
              value={selectedCollection.id}
              onChange={(e) => changeSelectedCollection(e.target.value)}
              className="select select-bordered w-full"
            >
              {collections.map((collection: { title: string; id: string }) => (
                <option key={collection.id} value={collection.id}>
                  {collection.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <CollectionContent
        setSelectedCollection={setSelectedCollection}
        selectedCollection={selectedCollection}
        reviews={reviews}
      />
    </React.Fragment>
  );
};
export default CollectionSearch;

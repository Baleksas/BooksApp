"use client";
import React, { createContext, useEffect, useState } from "react";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getPersonalReviews } from "../actions";
import { Review, ReviewDB } from "@/types/Review";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { ReviewContext } from "@/lib/context/ReviewContext";

const Page = () => {
  const [reviews, setReviews] = useState<ReviewDB[]>([]);

  const getData = async () => {
    const response = await getPersonalReviews();
    setReviews(response as ReviewDB[]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <ReviewContext.Provider value={{ reviews, setReviews }}>
        {reviews.length > 0 ? (
          <>
            <h2 className="text-xl font-bold">Your reviews</h2>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </>
        ) : (
          // FIXME: This is displayed when reviews are loading
          <p>No reviews yet</p>
        )}
      </ReviewContext.Provider>
    </div>
  );
};

export default withPageAuthRequired(Page);

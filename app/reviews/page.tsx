"use client";
import React, { createContext, useEffect, useState } from "react";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getReviews } from "../actions";
import { Review, ReviewDB } from "@/types/Review";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

interface ReviewContextType {
  reviews: ReviewDB[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewDB[]>>;
}

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  setReviews: () => {},
});

const Page = () => {
  const [reviews, setReviews] = useState<ReviewDB[]>([]);
  const { user, error, isLoading } = useUser();

  const getData = async () => {
    const response = await getReviews();
    setReviews(response as ReviewDB[]);
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="w-full">
      <ReviewContext.Provider value={{ reviews, setReviews }}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </ReviewContext.Provider>
    </div>
  );
};

export default withPageAuthRequired(Page);
export { ReviewContext };

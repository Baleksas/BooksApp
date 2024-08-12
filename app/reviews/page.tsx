import React from "react";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getReviews } from "../actions";
import { ReviewDB } from "@/types/Review";

export default async function Page() {
  const reviews = (await getReviews()) as ReviewDB[];

  return (
    <div className="w-full">
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
}

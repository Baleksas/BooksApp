import { ReviewDB } from "@/types/Review";
import { Review } from "@prisma/client";
import React from "react";

interface ReviewCardProps {
  review: ReviewDB;
}
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  console.log(review);
  return (
    <div className="card card-side bg-base-200 shadow-xl w-100">
      <figure>
        <img src={review.book.imageLink} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Rating: {review.rating}</h2>
        <p>Comment: {review.comment}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-outline text-red-500">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

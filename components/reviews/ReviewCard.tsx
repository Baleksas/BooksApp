"use client";
import { deleteReview, editReview, getPersonalReviews } from "@/app/actions";
import { Review, ReviewDB } from "@/types/Review";
import React, { useContext } from "react";
import toast from "react-hot-toast/headless";
import ReviewModal from "../shared/ReviewModal";
import { ReviewContext } from "@/lib/context/ReviewContext";
import Link from "next/link";
import { Rating } from "../shared/Rating";

interface ReviewCardProps {
  review: ReviewDB;
}
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const context = useContext(ReviewContext);

  const { reviews, setReviews } = context;

  const getReviews = async () => {
    const personalReviews = await getPersonalReviews();
    setReviews(personalReviews as ReviewDB[]);
  };

  const startEditReview = async (reviewId: string) => {
    const modalElement = document.getElementById(reviewId) as HTMLDialogElement;
    modalElement.showModal();
  };

  const editReviewFc = async (review: Review) => {
    const response = await editReview(review);
    if (response.error) {
      toast.error(response.error);
    } else
      toast.success(
        `Review for book "${response.data?.book.title}" edited sucessfully`
      );

    getReviews();
  };

  const deleteReviewFc = async (reviewId: string) => {
    const response = await deleteReview(reviewId);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(
        `Review for book "${response.data?.book.title}" deleted sucessfully`
      );
      getReviews();
    }
  };
  return (
    <>
      <ReviewModal
        reviewData={review}
        dialogId={review.id}
        action={(editedReview) => editReviewFc(editedReview)}
      />
      <div className="card card-side bg-base-300 shadow-xl my-4 px-4">
        <figure>
          <img src={review.book.imageLink} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Rating:
            <Rating rating={review.rating} readOnly />
          </h2>
          <p className="text-xl italic font-semibold text-gray-700 dark:text-gray-400">
            " {review.comment} "
          </p>
          <div className="card-actions justify-end">
            <Link
              className="btn btn-outline"
              href={`/books/${review.book.id}/reviews`}
            >
              See all reviews
            </Link>
            <button
              className="btn btn-secondary"
              onClick={() => startEditReview(review.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline text-red-500"
              onClick={() => deleteReviewFc(review.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;

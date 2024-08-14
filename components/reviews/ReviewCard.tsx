"use client";
import { deleteReview, editReview } from "@/app/actions";
import { Review, ReviewDB } from "@/types/Review";
import React from "react";
import toast from "react-hot-toast/headless";
import Modal from "../shared/Modal";

interface ReviewCardProps {
  review: ReviewDB;
}
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
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
  };

  const deleteReviewFc = async (reviewId: string) => {
    const response = await deleteReview(reviewId);
    if (response.error) {
      toast.error(response.error);
    } else
      toast.success(
        `Review for book "${response.data?.book.title}" deleted sucessfully`
      );
  };
  return (
    <>
      <Modal
        reviewData={review}
        dialogId={review.id}
        action={(editedReview) => editReviewFc(editedReview)}
      />
      <div className="card card-side bg-base-300 shadow-xl my-4 px-4">
        <figure>
          <img src={review.book.imageLink} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Rating: {review.rating}</h2>
          <p>Comment: {review.comment}</p>
          <div className="card-actions justify-end">
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

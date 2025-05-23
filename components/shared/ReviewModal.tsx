import { Review } from "@/types/Review";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  text?: string;
  title?: string;
  visible?: boolean;
  onClose?: () => void;
  action: (review: Review) => void;
  dialogId: string;
  reviewData?: Review;
}

const Modal = ({
  title,
  text,
  visible,
  onClose,
  action,
  dialogId,
  reviewData,
}: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const [review, setReview] = useState<Review>({
    id: "",
    rating: 0,
    comment: "",
    creatorId: "",
  });
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    setReview({
      id: reviewData?.id || "",
      rating: reviewData?.rating || 5,
      comment: reviewData?.comment || "",
      creatorId: user!.sub || "",
    });
  }, [reviewData]);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleESC = (event: Event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <dialog
      ref={modalRef}
      id={dialogId}
      className="modal"
      onCancel={() => handleESC}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{text}</p>
        <div className="w-100">
          <form method="dialog">
            <div className="flex flex-col">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Review</span>
                </div>
                <input
                  value={review.comment}
                  onChange={(e) =>
                    setReview({ ...review, comment: e.target.value })
                  }
                  className="input input-bordered"
                  type="text"
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Rating</span>
                </div>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <input
                      key={rating}
                      type="radio"
                      name="rating"
                      className="mask mask-star"
                      value={rating}
                      onChange={(e) =>
                        setReview({
                          ...review,
                          rating: parseInt(e.target.value),
                        })
                      }
                      defaultChecked={review.rating === rating}
                    />
                  ))}
                </div>
              </label>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  action(review);
                }}
              >
                submit
              </button>
              <button className="btn btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;

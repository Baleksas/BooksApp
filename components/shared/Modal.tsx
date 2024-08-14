import { createReview } from "@/app/actions";
import { Review, ReviewDB } from "@/types/Review";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast/headless";

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
    creatorId: "123",
  });

  useEffect(() => {
    setReview({
      id: reviewData?.id || "",
      rating: reviewData?.rating || 0,
      comment: reviewData?.comment || "",
      creatorId: "123",
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
                <input
                  value={review.rating || 0}
                  type="number"
                  onChange={(e) =>
                    setReview({ ...review, rating: parseInt(e.target.value) })
                  }
                  className="input input-bordered"
                />
              </label>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  console.log("review passed", review);
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

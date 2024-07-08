import { Book } from "@/types/Book";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast/headless";
import Loading from "../shared/Loading";
import { removeBookFromCollection } from "@/app/actions";
import { ToastBar } from "react-hot-toast";
import BookSkeleton from "../library/BookSkeleton";

interface CollectionBookProps {
  bookKey: string;
  selectedCollectionId: string;
}

export default function CollectionBook({
  bookKey,
  selectedCollectionId,
}: CollectionBookProps) {
  const [isBookLoading, setIsBookLoading] = useState(false);
  const [bookData, setBookData] = useState<Book | null>(null);
  const initialRender = useRef(true);

  const fetchBook = async () => {
    setIsBookLoading(true);
    try {
      const response = await fetch(`/api/collections?key=${bookKey}`, {
        headers: {
          method: "GET",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        setIsBookLoading(false);
      } else {
        const data = await response.json();
        setIsBookLoading(false);
        setBookData(data);
      }
    } catch (error) {
      console.log(error);
      setIsBookLoading(false);
    }
  };
  const removeBook = async (bookId: string, collectionId: string) => {
    const response = removeBookFromCollection(bookId, collectionId);

    toast.promise(response, {
      loading: "Loading",
      success: "Book removed from collection",
      error: "Error removing book",
    });
  };

  useEffect(() => {
    //TODO: implement loading skeleton for book card
    fetchBook();
  }, []);

  return isBookLoading ? (
    <BookSkeleton />
  ) : (
    bookData && (
      <>
        <div className="card card-side bg-base-100 shadow-xl my-4 px-4">
          {bookData.volumeInfo?.imageLinks?.thumbnail && (
            <figure>
              <Image
                width={200}
                height={400}
                quality={100}
                alt={bookData.volumeInfo.title}
                src={bookData.volumeInfo.imageLinks.thumbnail}
              />
            </figure>
          )}
          <div className="card-body">
            <h2 className="card-title">{bookData.volumeInfo.title}</h2>
            <h2>{bookData.volumeInfo.authors[0]}</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-outline text-pink-400">Review</button>
              <button
                onClick={() => removeBook(bookData.id, selectedCollectionId)}
                className="btn btn-outline text-red-700"
              >
                Remove from collection
              </button>
              <button className="btn btn-outline">Talk to the author</button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

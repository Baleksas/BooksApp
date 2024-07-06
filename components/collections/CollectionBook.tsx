import { Book } from "@/types/Book";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../shared/Loading";

interface CollectionBookProps {
  bookKey: string;
}

export default function CollectionBook({ bookKey }: CollectionBookProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookData, setBookData] = useState<Book | null>(null);
  const initialRender = useRef(true);

  const fetchBook = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/collections?key=${bookKey}`, {
        headers: {
          method: "GET",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        toast(error.message);
        setIsLoading(false);
      } else {
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
        setBookData(data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="card card-side bg-base-100 shadow-xl my-4 px-4 ">
      {bookData && (
        <div>
          <h1>{bookData.volumeInfo.title}</h1>
          <h2>{bookData.volumeInfo.authors[0]}</h2>
          {bookData.volumeInfo?.imageLinks?.smallThumbnail && (
            <figure>
              <Image
                width={100}
                height={200}
                alt={bookData.volumeInfo.title}
                src={bookData.volumeInfo.imageLinks.smallThumbnail}
              ></Image>{" "}
            </figure>
          )}
        </div>
      )}

      {/* <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p>{book.author_name}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline text-red-400">Review</button>
          <button className="btn btn-outline text-green-600">
            Mark as read
          </button>
          <button className="btn btn-outline">Talk to the author</button>
        </div>
      </div> */}
      {isLoading && <Loading></Loading>}
    </div>
  );
}

// author image
{
  /* <Image
  width={200}
  height={400}
  alt={book.author_name}
  src={`https://covers.openlibrary.org/a/olid/${book.author_key}-M.jpg`}
></Image> */
}

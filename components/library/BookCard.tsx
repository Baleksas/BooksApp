import { Book } from "@/types/Book";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="card card-side bg-base-100 shadow-xl my-4 px-4 ">
      <figure>
        <Image
          width={200}
          height={200}
          alt={book.title}
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
        ></Image>{" "}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book.title}</h2>
        <p>{book.author_name}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-outline text-red-400">Review</button>
          <button className="btn btn-outline text-green-600">
            Mark as read
          </button>
          <button className="btn btn-outline">Talk to the author</button>
        </div>
      </div>
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

import { addBookToCollection } from "@/app/actions";
import { Book } from "@/types/Book";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="card card-side bg-base-100 shadow-xl my-4 px-4 ">
      {book.volumeInfo?.imageLinks?.thumbnail && (
        //fix images sizing
        <figure>
          <Image
            width={200}
            height={400}
            quality={100}
            alt={book.volumeInfo.title}
            src={book.volumeInfo.imageLinks.thumbnail}
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{book.volumeInfo.title}</h2>
        {book.volumeInfo.subtitle && <h3>{book.volumeInfo.subtitle}</h3>}
        {book.volumeInfo?.authors?.[0] && <p>{book.volumeInfo.authors[0]}</p>}
        <div className="card-actions justify-end">
          <button className="btn btn-outline text-red-400">Review</button>
          <button
            onClick={() => addBookToCollection(book.id, "read")}
            className="btn btn-outline text-green-600"
          >
            Mark as read
          </button>
          <button className="btn btn-outline">Talk to the author</button>
        </div>
      </div>
    </div>
  );
}

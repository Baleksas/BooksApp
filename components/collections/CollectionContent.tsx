import { Collection } from "@/types/Collection";
import CollectionBook from "./CollectionBook";
import { BookDB } from "@/types/Book";

interface CollectionProps {
  selectedCollection: Collection;
  collectionBooks: BookDB[];
  setCollectionBooks: (books: BookDB[]) => void;
}

export const CollectionContent = ({
  selectedCollection,
  collectionBooks,
  setCollectionBooks,
}: CollectionProps) => {
  console.log("selected collection in collection content", selectedCollection);
  return (
    <div className="mt-3">
      <h2 className="text-xl">{selectedCollection?.title}</h2>
      {collectionBooks?.length > 0
        ? collectionBooks.map((book: BookDB) => (
            <div key={book.id}>
              <CollectionBook
                bookData={book}
                selectedCollectionId={selectedCollection.id}
                setCollectionBooks={setCollectionBooks}
              />
            </div>
          ))
        : "No books"}
    </div>
  );
};

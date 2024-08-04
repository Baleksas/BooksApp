import { Collection } from "@/types/Collection";
import CollectionBook from "./CollectionBook";
import { BookDB } from "@/types/Book";
import { deleteCollection } from "@/app/actions";
import toast from "react-hot-toast/headless";

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
  const deleteReadingList = async (collectionId: string) => {
    const response = await deleteCollection(collectionId);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Collection deleted");
    }
  };

  return selectedCollection ? (
    <div className="mt-3">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-bold">{selectedCollection?.title}</h2>
        <div className="flex gap-3">
          <button
            className="btn btn-outline text-red-500"
            onClick={() => deleteReadingList(selectedCollection.id)}
          >
            Delete collection
          </button>
        </div>
      </div>

      {collectionBooks?.length > 0 ? (
        collectionBooks.map((book: BookDB) => (
          <div key={book.id}>
            <CollectionBook
              bookData={book}
              selectedCollectionId={selectedCollection.id}
              setCollectionBooks={setCollectionBooks}
            />
          </div>
        ))
      ) : (
        <div className="mt-5 text-xl">No books in the collection</div>
      )}
    </div>
  ) : (
    <div className="mt-5 text-xl">No collections found</div>
  );
};

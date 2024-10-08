import { Collection } from "@/types/Collection";
import { createContext } from "react";

interface CollectionContextType {
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

const CollectionContext = createContext<CollectionContextType>({
  collections: [],
  setCollections: () => {},
});

export { CollectionContext };

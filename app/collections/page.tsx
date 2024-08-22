"use client";
import CollectionSearch from "@/components/collections/CollectionSearch";
import { Collection } from "@/types/Collection";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllCollections } from "../actions";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

interface CollectionContextType {
  collections: Collection[];
  setCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

const CollectionContext = createContext<CollectionContextType>({
  collections: [],
  setCollections: () => {},
});

const Page = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  const getData = async () => {
    const response = await getAllCollections();
    setCollections(response as Collection[]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <CollectionContext.Provider value={{ collections, setCollections }}>
        <CollectionSearch />
      </CollectionContext.Provider>
    </div>
  );
};

export { CollectionContext };
export default withPageAuthRequired(Page);

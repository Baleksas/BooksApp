"use client";
import CollectionSearch from "@/components/collections/CollectionSearch";
import { Collection } from "@/types/Collection";
import { useContext, useEffect, useState } from "react";
import { getAllCollections } from "../actions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { CollectionContext } from "@/lib/context/CollectionContext";

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

export default withPageAuthRequired(Page);

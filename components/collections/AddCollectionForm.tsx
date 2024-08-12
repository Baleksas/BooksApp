"use client";
import { addCollection } from "@/app/actions";
import { CollectionContext } from "@/app/collections/page";
import { Collection } from "@/types/Collection";
import State, { DataState } from "@/types/FormState";
import { useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast/headless";

interface SelectedCollectionProps {
  selectedCollection: Collection | undefined;
  setSelectedCollection: (collection: Collection | undefined) => void;
}
export const AddCollectionForm = ({
  setSelectedCollection,
  selectedCollection,
}: SelectedCollectionProps) => {
  const userId = "123";

  const context = useContext(CollectionContext);

  const { collections, setCollections } = context;

  const addCollectionWithUserId = async (
    prevState: State,
    formData: FormData
  ) => {
    const updatedState = await addCollection(prevState, formData, userId);
    setCollections([...collections!, updatedState.data as any]);
    return updatedState;
  };

  const [state, action] = useFormState<State, FormData>(
    addCollectionWithUserId,
    {
      error: null,
      resetKey: null,
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    action(formData);

    if (state.error) toast.error(state.error);
    else {
      getData();

      toast.success("Collection added");
    }
  };

  const getData = async () => {
    const response = await fetch("/api/collections");
    const collectionsData = await response.json();
    setCollections(collectionsData);
  };

  return (
    <form onSubmit={handleSubmit} key={state?.resetKey}>
      <div className="flex gap-3">
        <input
          className="input input-bordered"
          type="text"
          name="title"
          placeholder="Title"
          onBlur={(event) => {
            event.target.value = event.target.value.trim();
          }}
        />
        <button type="submit" className="btn btn-outline">
          Add
        </button>
      </div>
    </form>
  );
};

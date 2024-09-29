"use client";
import { addCollection, getAllCollections } from "@/app/actions";
import { CollectionContext } from "@/app/collections/page";
import { Collection } from "@/types/Collection";
import State, { DataState } from "@/types/FormState";
import { useContext } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast/headless";

export const AddCollectionForm = () => {
  const context = useContext(CollectionContext);

  const { collections, setCollections } = context;

  const addCollectionFc = async (prevState: State, formData: FormData) => {
    const updatedState = await addCollection(prevState, formData);
    // should this be here?
    // setCollections([...collections!, updatedState.data as any]);
    return updatedState;
  };

  const [state, action] = useFormState<State, FormData>(addCollection, {
    error: null,
    resetKey: null,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    action(formData);

    if (state.error) toast.error(state.error);
    else {
      toast.success("Collection added");

      getData();
    }
  };

  const getData = async () => {
    const allCollections = await getAllCollections();
    setCollections(allCollections as Collection[]);
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

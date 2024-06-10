"use client";
import { addCollectionList } from "@/app/actions";
import State from "@/types/FormState";
import { revalidatePath } from "next/cache";
import { useFormState } from "react-dom";
import toast from "react-hot-toast/headless";

export const AddCollectionsList = () => {
  const [state, action] = useFormState<State, FormData>(addCollectionList, {
    error: null,
    resetKey: null,
  });

  if (state.error) toast("Title is required");
  return (
    <div className="mt-4">
      <form action={action} key={state?.resetKey}>
        <div className="flex gap-3">
          <input
            className="input input-bordered"
            type="text"
            name="title"
            placeholder="Title"
          />
          <button className="btn btn-outline">Add</button>
        </div>
      </form>
    </div>
  );
};

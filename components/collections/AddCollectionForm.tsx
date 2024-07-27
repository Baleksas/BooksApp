"use client";
import { addCollection } from "@/app/actions";
import State from "@/types/FormState";
import { useFormState } from "react-dom";
import toast from "react-hot-toast/headless";

export const AddCollectionForm = () => {
  const userId = "aleksas.bag";

  const addCollectionWithUserId = (prevState: State, formData: FormData) =>
    addCollection(prevState, formData, userId);
  const [state, action] = useFormState<State, FormData>(
    addCollectionWithUserId,
    {
      error: null,
      resetKey: null,
    }
  );
  // TODO: Replace with actual user ID once authentication is implemented

  if (state.error) toast.error(state.error);

  return (
    <form action={action} key={state?.resetKey}>
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

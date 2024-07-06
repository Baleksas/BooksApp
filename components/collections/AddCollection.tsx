"use client";
import { addCollection } from "@/app/actions";
import State from "@/types/FormState";
import { useFormState } from "react-dom";
import toast from "react-hot-toast/headless";

export const AddCollection = () => {
  const [state, action] = useFormState<State, FormData>(addCollection, {
    error: null,
    resetKey: null,
  });

  if (state.error) toast(state.error);
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
        <button className="btn btn-outline">Add</button>
      </div>
    </form>
  );
};

"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import State from "@/types/FormState";

export const addCollectionList = async (
  prevState: State,
  formData: FormData
) => {
  const title = formData.get("title");

  if (!title) {
    return {
      resetKey: prevState.resetKey,
      error: "Title is required",
    };
  }

  const collection = await prisma.collection.create({
    data: {
      title: formData.get("title") as string,
      //TODO: Add authorId, author
    },
  });

  revalidatePath("/collections");

  return {
    error: null,
    data: collection,
    resetKey: collection.id,
  };
};

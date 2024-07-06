"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import State from "@/types/FormState";

export const addCollection = async (prevState: State, formData: FormData) => {
  const title = formData.get("title");

  if (!title) {
    return {
      resetKey: prevState.resetKey,
      error: "Title is required",
    };
  }

  const collectionExists = await prisma.collection.findFirst({
    where: {
      title: {
        equals: title as string,
        mode: "insensitive",
      },
    },
  });

  if (collectionExists) {
    return {
      resetKey: prevState.resetKey,
      error: "Collection with this title already exists",
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

export const addBookToCollection = async (
  key: string,
  collectionId: string
) => {
  await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      bookKeys: {
        push: key,
      },
    },
  });
};

export const getBookByKey = async (key: string) => {
  const response =
    await fetch(`https://www.googleapis.com/books/v1/volumes/${key}
  `);

  return await response.json();
};

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
  if (!collectionId) {
    return {
      error: "Collection id not provided",
    };
  }
  const bookInCollectionExists = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      bookKeys: {
        hasSome: [key],
      },
    },
  });

  if (bookInCollectionExists) {
    return {
      error: "This book is already in the collection",
    };
  }

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

  revalidatePath("/collections");
};

export const removeBookFromCollection = async (
  key: string,
  collectionId: string
) => {
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    throw new Error("Collection not found");
  }

  const newBookKeys = collection.bookKeys.filter((bookKey) => bookKey !== key);

  const bookInCollectionExists = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      bookKeys: {
        hasSome: [key],
      },
    },
  });

  if (!bookInCollectionExists) {
    throw new Error("This book is not in the collection");
  }

  const updatedCollection = await prisma.collection.update({
    where: {
      id: collectionId,
    },
    data: {
      bookKeys: newBookKeys,
    },
  });

  if (!updatedCollection) {
    throw new Error("Failed to update collection");
  }

  revalidatePath("/collections");

  return updatedCollection;
};

export const getBookByKey = async (key: string) => {
  const response =
    await fetch(`https://www.googleapis.com/books/v1/volumes/${key}
  `);

  return await response.json();
};

"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import State from "@/types/FormState";
import { BookAPI } from "@/types/Book";

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
  book: BookAPI,
  collectionId: string
) => {
  if (!collectionId) {
    return {
      error: "Collection id not provided",
    };
  }

  const bookData = {
    id: book.id,
    etag: book.etag,
    title: book.volumeInfo.title,
    authorName: book.volumeInfo.authors?.[0],
    imageLink: book.volumeInfo.imageLinks?.thumbnail,
  };

  const bookInCollectionExists = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      books: {
        some: {
          id: book.id,
        },
      },
    },
  });

  if (bookInCollectionExists) {
    console.log("bookInCollectionExists", bookInCollectionExists);
    return {
      error: "This book is already in the collection",
    };
  }
  console.log("bookData", bookData);
  console.log("collectionid", collectionId);

  // Ensure the book exists in the Book table
  try {
    await prisma.book.upsert({
      where: { id: bookData.id },
      update: bookData,
      create: bookData,
    });
  } catch (error) {
    console.log("error when adding book to books", error);

    return {
      error: error,
    };
  }

  // add to collection
  try {
    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        books: {
          connect: {
            id: bookData.id,
          },
        },
      },
    });
  } catch (error) {
    // console.log(typeof error);
    console.log("error when adding to collection", error);
    return {
      error: error,
    };
  }

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
  revalidateTag("collections");

  return updatedCollection;
};

export const getBooksInCollection = async (collectionId: string) => {
  console.log("collectionid", collectionId);
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
    include: {
      books: true,
    },
  });

  if (!collection) {
    return {
      error: "Collection not found",
    };
  }
  console.log("collection in db: ", collection);
  return collection.books;
};

export const getBookByKey = async (key: string) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${key}
  `,
    {
      next: {
        tags: ["book"],
      },
    }
  );

  return await response.json();
};

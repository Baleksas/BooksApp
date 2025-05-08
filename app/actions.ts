"use server";
import prisma from "@/lib/prisma";
import State from "@/types/FormState";
import { BookAPI, BookDB } from "@/types/Book";
import { Collection } from "@/types/Collection";
import { Review, ReviewDB } from "@/types/Review";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";

// ---------- External API - GOOGLE BOOKS ----------
export const getBooksByTitle = async (
  title: string,
  limit: number,
  page: number
) => {
  if (!title) {
    throw new Error("Provided title is empty");
  }

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=${page}&maxResults=${limit}`
  );
  return await response.json();
};

export const getBookByID = async (id: string) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}
  `
  );

  return await response.json();
};

// ---------- Collections ----------
export const addCollection = async (prevState: State, formData: FormData) => {
  const title = formData.get("title");

  if (!title) {
    return {
      resetKey: Date.now(),
      error: "Title is required",
    };
  }
  const session = await getSession();
  const user = session?.user;

  const collectionExists = await prisma.collection.findFirst({
    where: {
      title: {
        equals: title as string,
        mode: "insensitive",
      },
      creatorId: user!.sub,
    },
  });

  if (collectionExists) {
    return {
      resetKey: Date.now(),
      error: "Collection with this title already exists",
    };
  }

  const newCollection = await prisma.collection.create({
    data: {
      title: title as string,
      creatorId: user!.sub,
    },
  });

  return {
    error: null,
    data: newCollection,
    resetKey: Date.now(),
  };
};

export const deleteCollection = async (collectionId: string) => {
  if (!collectionId) {
    return {
      error: "Collection ID is required",
    };
  }

  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    return {
      error: "Collection not found",
    };
  }

  await prisma.collection.delete({
    where: {
      id: collectionId,
    },
  });

  return {
    error: null,
  };
};

export const getCollectionById = async (collectionId: string) => {
  if (!collectionId) {
    return {
      error: "Collection ID is required",
    };
  }

  const session = await getSession();
  const user = session?.user;

  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
      creatorId: user!.sub,
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

  return collection as Collection;
};

export const addBookToCollection = async (
  book: BookAPI,
  collectionId: string
) => {
  if (!collectionId || !book) {
    return {
      error: "Collection ID and book are required",
    };
  }

  const bookData = {
    id: book.id,
    etag: book.etag,
    title: book.volumeInfo.title,
    authorName: book.volumeInfo.authors?.[0] || "",
    imageLink:
      book.volumeInfo.imageLinks?.thumbnail ||
      book.volumeInfo.imageLinks?.smallThumbnail ||
      "",
  };
  const bookInCollectionExists = !!(await prisma.collection.findFirst({
    where: {
      id: collectionId,
      books: {
        some: {
          id: book.id,
        },
      },
    },
  }));
  if (bookInCollectionExists) {
    return {
      error: "Book already exists in the collection",
    };
  }

  // Book has to be added to the books table first so it could be referenced by the collection
  // Reason: storing etag of the book and fetching every book individually isn't performant and is
  // risk of relying on the external API to save the books data in the collections
  try {
    await prisma.book.upsert({
      where: { id: bookData.id },
      update: bookData,
      create: bookData,
    });
  } catch (error) {
    return {
      error: "Book could not be added to the books table",
    };
  }
  const session = await getSession();
  const user = session?.user;

  try {
    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        creatorId: user!.sub,
        books: {
          connect: {
            id: bookData.id,
          },
        },
      },
    });
  } catch (error) {
    // return book from the books table if the book couldn't be added to the collection

    await prisma.book.delete({
      where: {
        id: bookData.id,
      },
    });

    return {
      error: "Book couldn't be added to the collection",
    };
  }
};

export const removeBookFromCollection = async (
  bookId: string,
  collectionId: string
) => {
  if (!bookId || !collectionId) {
    return {
      error: "Book ID and collection ID are required",
    };
  }
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    return {
      error: "Collection not found",
    };
  }

  const bookInCollectionExists = await prisma.collection.findFirst({
    where: {
      id: collectionId,
      books: {
        some: {
          id: bookId,
        },
      },
    },
  });
  if (!bookInCollectionExists) {
    return {
      error: "Book not found in the collection",
    };
  }
  try {
    await prisma.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        books: {
          disconnect: {
            id: bookId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Could not remove book from collection",
    };
  }

  try {
    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });
  } catch (error) {
    return {
      error: "Could not remove book from books table",
    };
  }
};

export const getBooksInCollection = async (collectionId: string) => {
  const session = await getSession();
  const user = session?.user;

  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
      creatorId: user!.sub,
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
  return collection.books;
};

export const getAllCollections = async () => {
  const session = await getSession();
  const user = session?.user;

  const allCollections = await prisma.collection.findMany({
    include: {
      books: {
        include: {
          reviews: true,
        },
      },
    },
    where: {
      creatorId: user!.sub,
    },
  });

  return allCollections;
};

export const getCollectionsDictionary = async () => {
  const session = await getSession();
  const user = session?.user;

  const collectionsDictionary = await prisma.collection.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      creatorId: user!.sub,
    },
  });

  return collectionsDictionary;
};

// ---------- Reviews ----------

export const createReview = async (
  bookData: BookDB | BookAPI,
  review: Review
) => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return {
      error: "User not found - you need to log in to create a review",
    };
  }

  let bookExists = await prisma.book.findUnique({
    where: {
      id: bookData.id,
    },
  });

  if (!bookExists && "volumeInfo" in bookData) {
    const bookObject: BookDB = {
      id: bookData.id,
      etag: bookData.etag,
      title: bookData.volumeInfo.title,
      authorName: bookData.volumeInfo.authors?.[0] || "",
      imageLink:
        bookData.volumeInfo.imageLinks?.thumbnail ||
        bookData.volumeInfo.imageLinks?.smallThumbnail ||
        "",
    };

    bookExists = await prisma.book.create({
      data: bookObject,
    });
  }

  const reviewExists = await prisma.review.findFirst({
    where: {
      bookId: bookData.id,
      creatorId: review.creatorId,
    },
  });

  if (reviewExists) {
    return {
      error: "You already have a review for this book",
    };
  }

  await prisma.review.create({
    data: {
      comment: review.comment,
      rating: review.rating,
      bookId: bookData.id,
      creatorId: user.sub,
      creatorNickname: user.nickname,
    },
  });

  redirect("/reviews");
};

export const editReview = async (review: Review) => {
  const reviewExists = await prisma.review.findUnique({
    where: {
      id: review.id,
      creatorId: review.creatorId,
    },
  });

  if (!reviewExists) {
    return {
      error: "Review not found",
    };
  }

  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: review.id,
    },
    data: {
      comment: review.comment,
      rating: review.rating,
      creatorId: user.sub,
    },
    include: {
      book: true,
    },
  });

  return {
    data: updatedReview,
  };
};
export const deleteReview = async (reviewId: string) => {
  const reviewExists = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      book: true,
    },
  });

  if (!reviewExists) {
    return {
      error: "Review not found",
    };
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });

  return {
    data: reviewExists,
  };
};

export const getPersonalReviews = async () => {
  const session = await getSession();
  const user = session?.user;

  return prisma.review.findMany({
    where: {
      creatorId: user!.sub,
    },

    include: {
      book: true,
    },
  });
};

export const getAllReviewsOfChosenBook = async (chosenBookId: string) => {
  return prisma.review.findMany({
    where: {
      bookId: chosenBookId,
    },
    include: {
      book: true,
    },
  });
};

// ---------- Books DB ----------

export const getBookFromDB = async (bookId: string) => {
  return prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });
};

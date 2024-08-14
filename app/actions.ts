"use server";
import prisma from "@/lib/prisma";
import State from "@/types/FormState";
import { BookAPI } from "@/types/Book";
import { Collection } from "@/types/Collection";
import { Review, ReviewDB } from "@/types/Review";

export const addCollection = async (
  prevState: State,
  formData: FormData,
  userId: string
) => {
  const title = formData.get("title");
  if (!title) {
    return {
      resetKey: Date.now(),
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
      resetKey: Date.now(),
      error: "Collection with this title already exists",
    };
  }

  const newCollection = await prisma.collection.create({
    data: {
      title: title as string,
      creatorId: userId,
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

export const getAllCollections = async () => {
  //TODO: implement error handling
  const allCollections = await prisma.collection.findMany({
    include: {
      books: true,
    },
  });

  return allCollections;
};

export const getCollectionsDictionary = async () => {
  //TODO: implement error handling
  const collectionsDictionary = await prisma.collection.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return collectionsDictionary;
};

// Reviews

export const createReview = async (bookId: string, review: Review) => {
  const reviewExists = await prisma.review.findFirst({
    where: {
      bookId: bookId,
      creatorId: review.creatorId,
    },
  });
  console.log("review exists", reviewExists);
  if (reviewExists) {
    return {
      error: "You already have a review for this book",
    };
  }
  const newReview = await prisma.review.create({
    data: {
      comment: review.comment,
      rating: review.rating,
      bookId: bookId,
      creatorId: review.creatorId,
    },
  });

  return newReview;
};

export const editReview = async (review: Review) => {
  console.log("getting this review:", review);
  const reviewExists = await prisma.review.findUnique({
    where: {
      id: review.id,
    },
  });

  if (!reviewExists) {
    return {
      error: "Review not found",
    };
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: review.id,
    },
    data: {
      comment: review.comment,
      rating: review.rating,
    },
    include: {
      book: true,
    },
  });
  console.log("updated review : ", updatedReview);
  return {
    data: updatedReview,
  };
};
export const deleteReview = async (reviewId: string) => {
  // check if review exists

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

export const getReviews = async () => {
  return prisma.review.findMany({
    include: {
      book: true,
    },
  });
};

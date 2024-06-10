import React from "react";
import prisma from "@/lib/prisma";

export default async function Page() {
  const reviews = await prisma.review.findMany({
    where: {
      // TODO: Only show reviews for the currently logged in user
      authorId: "clx95f1120001mfyk227rrbgp",
    },
  });

  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h2>{review.rating}</h2>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </div>
  );
}

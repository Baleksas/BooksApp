import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { message: "Provided title is empty" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}
    `,
    {
      next: {
        tags: ["book"],
      },
    }
  );
  const books = await response.json();

  return NextResponse.json(books);
}

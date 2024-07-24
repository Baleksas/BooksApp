import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  if (!title) {
    return NextResponse.json(
      { message: "Provided title is empty" },
      { status: 400 }
    );
  }
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${title}&startIndex=${page}&maxResults=${limit}`,
    {
      next: {
        tags: ["library"],
      },
    }
  );
  const books = await response.json();
  return NextResponse.json(books);
}

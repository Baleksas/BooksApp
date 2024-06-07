import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const resultsPerPage = searchParams.get("limit");

  if (!title) {
    return {
      status: 400,
      body: {
        message: "Please enter a title",
      },
    };
  }

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${title}&page=1&limit=${resultsPerPage}`
  );
  const books = await response.json();
  return NextResponse.json(books);
}

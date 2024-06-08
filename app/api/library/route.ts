import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  if (!title) {
    return NextResponse.json(
      { error: "Provided title is empty" },
      { status: 400 }
    );
  }
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${title}&page=${page}&limit=${limit}`
  );
  const books = await response.json();
  return NextResponse.json(books);
}

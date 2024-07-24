import { NextRequest, NextResponse } from "next/server";

// left off - implement this somehow
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collectionId = searchParams.get("id");

  console.log("collectionId", collectionId);

  if (!collectionId) {
    return NextResponse.json(
      { message: "Provided ID is empty" },
      { status: 400 }
    );
  }
  console.log("being called in collection");
  const collection = await prisma.collection.findUnique({
    where: {
      id: collectionId,
    },
  });

  if (!collection) {
    return NextResponse.json(
      { message: "Collection not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(collection);
}

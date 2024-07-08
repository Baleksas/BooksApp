import CollectionForm from "@/components/collections/CollectionForm";
import prisma from "@/lib/prisma";

async function getData() {
  const collections = await prisma.collection.findMany();
  return collections;
}

const Page = async () => {
  const collections = await getData();

  return (
    <div className="w-full">
      <CollectionForm collections={collections} />
    </div>
  );
};
export default Page;

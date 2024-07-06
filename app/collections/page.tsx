import CollectionForm from "@/components/collections/CollectionForm";
import prisma from "@/lib/prisma";

const Page = async () => {
  const collections = await prisma.collection.findMany();

  return (
    <div className="w-full">
      <CollectionForm collections={collections} />
    </div>
  );
};
export default Page;

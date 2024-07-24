import CollectionSearch from "@/components/collections/CollectionSearch";
import prisma from "@/lib/prisma";

const Page = async () => {
  const collectionsDictionary = await prisma.collection.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return (
    <div className="w-full">
      <CollectionSearch collectionsDictionary={collectionsDictionary} />
    </div>
  );
};
export default Page;

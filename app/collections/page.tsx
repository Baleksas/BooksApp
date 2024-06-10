import { AddCollectionsList } from "@/components/collections/AddCollectionList";
import { CollectionsList } from "@/components/collections/CollectionsList";
import prisma from "@/lib/prisma";

const Page = async () => {
  const collections = await prisma.collection.findMany();
  return (
    <div className="w-full">
      <div className="flex gap-2 flex-col sm:flex-row">
        <select className="select select-bordered ">
          <option value="read" selected>
            Read
          </option>
          <option value="want-to-read">Want to read</option>
          <option value="want-to-read">Some other collection</option>
        </select>
        <button className="btn outline">Create new collection</button>
      </div>
      <AddCollectionsList />
      <CollectionsList collections={collections} />
    </div>
  );
};
export default Page;

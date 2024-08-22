"use client";
import LibrarySearch from "@/components/library/LibrarySearch";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const Page = () => {
  return (
    <div className="w-full">
      <LibrarySearch></LibrarySearch>
    </div>
  );
};
export default withPageAuthRequired(Page);

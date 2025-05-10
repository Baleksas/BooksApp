"use client";
import LibrarySearch from "@/components/library/LibrarySearch";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { LibraryProvider } from "@/lib/context/LibraryContext";

const Page = () => {
  return (
    <div className="w-full">
      <LibraryProvider>
        <LibrarySearch />
      </LibraryProvider>
    </div>
  );
};
export default withPageAuthRequired(Page);

"use client";
import SearchResults from "./SearchResults";
import { useEffect, useRef, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import Pagination from "../shared/Pagination";
import Loading from "../shared/Loading";
import toast from "react-hot-toast/headless";
import { getBooksByTitle } from "@/app/actions";

export default function BookSearch() {
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    resultsPerPage: 10,
  });
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [searchResults, setSearchResults] =
    useState<BookSearchResponse | null>();
  const [isLoading, setIsLoading] = useState(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getSearchResults();
    }
  }, [currentStartIndex]);

  const getSearchResults = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const response = await getBooksByTitle(
      searchOptions.title,
      searchOptions.resultsPerPage,
      currentStartIndex
    );
    setSearchResults(response);
  };

  return (
    <>
      <form onSubmit={getSearchResults}>
        <div className="flex gap-2 flex-col sm:flex-row sm:items-end ">
          <SearchInput
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          />
          <button type="submit" className="btn btn-outline">
            Search
          </button>
        </div>
      </form>
      {isLoading && <Loading></Loading>}
      {searchResults && !isLoading && (
        <>
          <SearchResults searchResults={searchResults} />
          <Pagination
            currentPage={currentStartIndex}
            resultsPerPage={searchOptions.resultsPerPage}
            setCurrentPage={setCurrentStartIndex}
          />
        </>
      )}
    </>
  );
}

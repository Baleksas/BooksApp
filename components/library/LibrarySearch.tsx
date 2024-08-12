"use client";
import SearchResults from "./SearchResults";
import { useEffect, useRef, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import Pagination from "../shared/Pagination";
import Loading from "../shared/Loading";
import toast from "react-hot-toast/headless";

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
      fetchData();
    }
  }, [currentStartIndex]);

  // TODO: can we change this to server function?
  const fetchData = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/library?title=${encodeURIComponent(
          searchOptions.title
        )}&limit=${encodeURIComponent(
          searchOptions.resultsPerPage
        )}&page=${currentStartIndex}`,
        {
          headers: {
            method: "GET",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message);
        setIsLoading(false);
      } else {
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
        setSearchResults(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <div className="flex gap-2 flex-col sm:flex-row sm:items-end ">
          <SearchInput
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          />
          <button onClick={fetchData} className="btn btn-outline">
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

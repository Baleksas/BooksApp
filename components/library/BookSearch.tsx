"use client";
import SearchResults from "./SearchResults";
import { useEffect, useRef, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import Pagination from "../shared/Pagination";
import Loading from "../shared/Loading";

export default function BookSearch() {
  const [searchParams, setSearchParams] = useState({
    title: "",
    resultsPerPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] =
    useState<BookSearchResponse | null>();
  const [isLoading, setIsLoading] = useState(false);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fetchData();
      console.log(currentPage);
    }
  }, [currentPage]);

  const fetchData = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/library?title=${encodeURIComponent(
          searchParams.title
        )}&limit=${encodeURIComponent(
          searchParams.resultsPerPage
        )}&page=${currentPage}`,
        {
          headers: {
            method: "GET",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
      } else {
        const data = await response.json();
        setIsLoading(false);
        setSearchResults(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form>
        <div className="flex gap-2 flex-col sm:flex-row sm:items-end ">
          <SearchInput
            searchParams={searchParams}
            setSearchParams={setSearchParams}
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
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

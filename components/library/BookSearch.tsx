"use client";
import SearchResults from "./SearchResults";
import { useEffect, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import BookCard from "./BookCard";
import { Book } from "@/types/Book";
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

  useEffect(() => {
    fetchData();
    console.log(currentPage);
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
        )}$page=${currentPage}`,
        {
          headers: {
            method: "GET",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setIsLoading(false);
      setSearchResults(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      {isLoading && <Loading></Loading>}
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
      {searchResults && (
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

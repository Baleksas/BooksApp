"use client";
import SearchResults from "./SearchResults";
import { useEffect, useRef, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import Pagination from "../shared/Pagination";
import Loading from "../shared/Loading";
import toast from "react-hot-toast/headless";

export default function BookSearch() {
  const [searchParams, setSearchParams] = useState({
    title: "",
    resultsPerPage: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] =
    useState<BookSearchResponse | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      fetchData(undefined, true);
    }
  }, [currentPage]);

  const fetchData = async (
    e?: React.MouseEvent<HTMLButtonElement>,
    pageChange = false
  ) => {
    e?.preventDefault();
    setIsLoading(true);
    setCurrentTitle(searchParams.title);

    if (!pageChange) {
      setCurrentPage(1);
    }
    try {
      const response = await fetch(
        `/api/library?title=${encodeURIComponent(
          pageChange ? currentTitle : searchParams.title
        )}&limit=${encodeURIComponent(searchParams.resultsPerPage)}&page=${
          pageChange ? currentPage : 1
        }`,
        {
          headers: {
            method: "GET",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        toast(error.message);
        setIsLoading(false);
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

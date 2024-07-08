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
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
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
  }, [currentStartIndex]);

  const fetchData = async (
    e?: React.MouseEvent<HTMLButtonElement>,
    pageChange = false
  ) => {
    e?.preventDefault();
    setIsLoading(true);
    setCurrentTitle(searchParams.title);

    if (!pageChange) {
      setCurrentStartIndex(0);
    }
    try {
      const response = await fetch(
        `/api/library?title=${encodeURIComponent(
          pageChange ? currentTitle : searchParams.title
        )}&limit=${encodeURIComponent(searchParams.resultsPerPage)}&page=${
          pageChange ? currentStartIndex : 0
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
            currentPage={currentStartIndex}
            resultsPerPage={searchParams.resultsPerPage}
            setCurrentPage={setCurrentStartIndex}
          />
        </>
      )}
    </>
  );
}

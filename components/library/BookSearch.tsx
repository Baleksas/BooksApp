"use client";
import SearchResults from "./SearchResults";
import { useEffect, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import BookCard from "./BookCard";
import { Book } from "@/types/Book";

export default function BookSearch() {
  const [searchParams, setSearchParams] = useState("harry");
  const [searchResults, setSearchResults] =
    useState<BookSearchResponse | null>();

  const fetchData = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/library?title=${encodeURIComponent(searchParams)}`,
        {
          headers: {
            method: "GET",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchResults);
  return (
    <div className="w-full">
      <form>
        <div className="flex">
          <SearchInput
            searchParams={searchParams}
            setsearchParams={setSearchParams}
          />
          <button onClick={fetchData} className="btn btn-outline ms-2">
            Search
          </button>
        </div>
      </form>
      {searchResults && <SearchResults searchResults={searchResults} />}
    </div>
  );
}

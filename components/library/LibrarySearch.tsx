"use client";
import SearchResults from "./SearchResults";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import Pagination from "../shared/Pagination";
import Loading from "../shared/Loading";
import { getPersonalReviews, getBooksByTitle } from "@/app/actions";
import { Review } from "@/types/Review";
import toast from "react-hot-toast/headless";

export default function BookSearch() {
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    resultsPerPage: 10,
  });
  const currentStartIndex = useRef(0);
  const [searchResults, setSearchResults] =
    useState<BookSearchResponse | null>();
  const initialRender = useRef(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const currentSearchTitle = useRef("");

  const getSearchResults = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      // Update the current search title when explicitly searching
      if (event) {
        if (!searchOptions.title.trim()) {
          toast.error("Please enter a title");
          return;
        }
        currentSearchTitle.current = searchOptions.title;
      }

      // Don't search if we don't have a title
      if (!currentSearchTitle.current) {
        toast.error("Please enter a title");
        return;
      }

      const response = await getBooksByTitle(
        currentSearchTitle.current,
        searchOptions.resultsPerPage,
        currentStartIndex.current
      );

      setSearchResults(response);

      // Fetch reviews only when we have search results
      if (response?.items?.length) {
        try {
          setIsLoadingReviews(true);
          const fetchedReviews = await getPersonalReviews();
          setReviews(fetchedReviews);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
        } finally {
          setIsLoadingReviews(false);
        }
      }
    },
    [searchOptions.resultsPerPage, searchOptions.title]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      currentStartIndex.current = page;
      if (searchResults && currentSearchTitle.current) {
        getSearchResults();
      }
    },
    [getSearchResults, searchResults]
  );

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={getSearchResults}>
        <div className="flex gap-2 flex-col sm:flex-row sm:items-end ">
          <SearchInput
            searchOptions={searchOptions}
            setSearchOptions={setSearchOptions}
          />
        </div>
      </form>
      {isLoadingReviews ? (
        <Loading />
      ) : (
        searchResults && (
          <>
            <SearchResults searchResults={searchResults} reviews={reviews} />
            <Pagination
              currentPage={currentStartIndex.current}
              resultsPerPage={searchOptions.resultsPerPage}
              setCurrentPage={handlePageChange}
            />
          </>
        )
      )}
    </React.Fragment>
  );
}

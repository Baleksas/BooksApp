"use client";
import { getBooksByTitle, getPersonalReviews } from "@/app/actions";
import { useLibrary } from "@/lib/context/LibraryContext";
import { Review } from "@/types/Review";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast/headless";
import SearchInput from "../SearchInput";
import Loading from "../shared/Loading";
import Pagination from "../shared/Pagination";
import SearchResults from "./SearchResults";

export default function LibrarySearch() {
  const {
    searchResults,
    setSearchResults,
    currentSearchTitle,
    setCurrentSearchTitle,
    currentStartIndex,
    setCurrentStartIndex,
    resultsPerPage,
    setResultsPerPage,
  } = useLibrary();
  const [searchOptions, setSearchOptions] = useState({
    title: currentSearchTitle,
    resultsPerPage: resultsPerPage,
  });
  const initialRender = useRef(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Update searchOptions when context values change
  useEffect(() => {
    setSearchOptions((prev) => ({
      ...prev,
      title: currentSearchTitle,
      resultsPerPage: resultsPerPage,
    }));
  }, [currentSearchTitle, resultsPerPage]);

  const getSearchResults = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();

      // Update the current search title when explicitly searching
      if (event) {
        if (!searchOptions.title.trim()) {
          toast.error("Please enter a title");
          return;
        }
        setCurrentSearchTitle(searchOptions.title);
        setResultsPerPage(searchOptions.resultsPerPage);
        // Use the new title for this search
        const response = await getBooksByTitle(
          searchOptions.title,
          searchOptions.resultsPerPage,
          currentStartIndex
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
        return;
      }

      // For pagination, use the currentSearchTitle from context
      if (!currentSearchTitle) {
        toast.error("Please enter a title");
        return;
      }

      const response = await getBooksByTitle(
        currentSearchTitle,
        resultsPerPage,
        currentStartIndex
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
    [
      searchOptions.resultsPerPage,
      searchOptions.title,
      currentSearchTitle,
      currentStartIndex,
      setSearchResults,
      setCurrentSearchTitle,
      setResultsPerPage,
      resultsPerPage,
    ]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentStartIndex(page);
      if (searchResults && currentSearchTitle) {
        getSearchResults();
      }
    },
    [getSearchResults, searchResults, currentSearchTitle, setCurrentStartIndex]
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
              currentPage={currentStartIndex}
              resultsPerPage={resultsPerPage}
              setCurrentPage={handlePageChange}
            />
          </>
        )
      )}
    </React.Fragment>
  );
}

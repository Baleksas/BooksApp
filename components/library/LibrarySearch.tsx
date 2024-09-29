"use client";
import SearchResults from "./SearchResults";
import React, { useEffect, useRef, useState } from "react";
import { BookSearchResponse } from "@/types/BookSearchResponse";
import SearchInput from "../SearchInput";
import Pagination from "../shared/Pagination";
import Loading from "../shared/Loading";
import { getAllReviews, getBooksByTitle } from "@/app/actions";
import { Review } from "@/types/Review";

export default function BookSearch() {
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    resultsPerPage: 10,
  });
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [searchResults, setSearchResults] =
    useState<BookSearchResponse | null>();
  const initialRender = useRef(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      getSearchResults();
    }
  }, [currentStartIndex]);

  useEffect(() => {
    setIsLoadingReviews(true);
    const fetchReviews = async () => {
      const fetchedReviews = await getAllReviews();
      setReviews(fetchedReviews);
      setIsLoadingReviews(false);
    };

    fetchReviews().then(() => setIsLoadingReviews(false));
  }, []);

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
    <React.Fragment>
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
      {isLoadingReviews ? (
        <Loading />
      ) : (
        searchResults && (
          <>
            <SearchResults searchResults={searchResults} reviews={reviews} />
            <Pagination
              currentPage={currentStartIndex}
              resultsPerPage={searchOptions.resultsPerPage}
              setCurrentPage={setCurrentStartIndex}
            />
          </>
        )
      )}
    </React.Fragment>
  );
}

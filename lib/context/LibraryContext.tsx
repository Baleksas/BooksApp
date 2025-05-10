"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BookSearchResponse } from "../../types/BookSearchResponse";

interface LibraryContextType {
  searchResults: BookSearchResponse | null;
  setSearchResults: (results: BookSearchResponse | null) => void;
  currentSearchTitle: string;
  setCurrentSearchTitle: (title: string) => void;
  currentStartIndex: number;
  setCurrentStartIndex: (index: number) => void;
  resultsPerPage: number;
  setResultsPerPage: (count: number) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchResults, setSearchResults] = useState<BookSearchResponse | null>(
    null
  );
  const [currentSearchTitle, setCurrentSearchTitle] = useState("");
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("libraryState");
    if (savedState) {
      const {
        searchResults,
        currentSearchTitle,
        currentStartIndex,
        resultsPerPage,
      } = JSON.parse(savedState);
      setSearchResults(searchResults);
      setCurrentSearchTitle(currentSearchTitle);
      setCurrentStartIndex(currentStartIndex);
      setResultsPerPage(resultsPerPage);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "libraryState",
      JSON.stringify({
        searchResults,
        currentSearchTitle,
        currentStartIndex,
        resultsPerPage,
      })
    );
  }, [searchResults, currentSearchTitle, currentStartIndex, resultsPerPage]);

  return (
    <LibraryContext.Provider
      value={{
        searchResults,
        setSearchResults,
        currentSearchTitle,
        setCurrentSearchTitle,
        currentStartIndex,
        setCurrentStartIndex,
        resultsPerPage,
        setResultsPerPage,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
};

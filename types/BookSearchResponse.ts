import { Book } from "./Book";

export interface BookSearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: Book[];
}

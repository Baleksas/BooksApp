import { Book } from "./Book";

export interface BookSearchResponse {
  totalItems: number;
  items: Book[];
}

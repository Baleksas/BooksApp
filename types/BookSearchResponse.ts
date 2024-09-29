import { BookAPI } from "./Book";
import { Review } from "./Review";

export interface BookSearchResponse {
  totalItems: number;
  items: BookAPI[];
}

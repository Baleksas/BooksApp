import { BookDB } from "./Book";

export interface Review {
  comment: string;
  rating: number;
  bookId?: string;
  creatorId: string;
}
export interface ReviewDB {
  id: string;
  comment: string;
  rating: number;
  bookId: string;
  creatorId: string;
  book: BookDB;
}

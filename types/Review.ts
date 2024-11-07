import { BookDB } from "./Book";

export interface Review {
  id?: string;
  comment: string;
  rating: number;
  bookId?: string;
  creatorId: string;
  creatorNickname?: string;
}
export interface ReviewDB {
  id: string;
  comment: string;
  rating: number;
  bookId: string;
  creatorId: string;
  book: BookDB;
  creatorNickname: string;
}

import { BookDB } from "./Book";

export interface Collection {
  id: string;
  title: string;
  books: BookDB[] | [];
  // TODO: Add creatorId and creator once auth is implemented
  creatorId?: string;
  creator?: object;
}

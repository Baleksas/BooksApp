import { BookDB } from "./Book";

export interface Collection {
  id: string;
  title: string;
  books: BookDB[] | [];
  creatorId?: string;
}

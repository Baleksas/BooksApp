export interface Collection {
  id: string;
  title: string;
  bookIds: string[];
  authorId: string | null;
}

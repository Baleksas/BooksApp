export interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  categories: string[];
  description: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: {
    type: string;
    identifier: string;
  }[];
  pageCount: number;
  publishedDate: string;
}

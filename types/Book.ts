export interface BookAPI {
  id: string;
  etag: string;
  volumeInfo: VolumeInfo;
}

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

export interface BookDB {
  id: string;
  etag: string;
  title: string;
  authorName: string;
  imageLink: string;
}

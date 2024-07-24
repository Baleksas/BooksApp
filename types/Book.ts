import { VolumeInfo } from "./VolumeInfo";

export interface BookAPI {
  id: string;
  etag: string;
  volumeInfo: VolumeInfo;
}

export interface BookDB {
  id: string;
  etag: string;
  title: string;
  authorName: string;
  imageLink: string;
}

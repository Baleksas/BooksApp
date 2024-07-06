import { VolumeInfo } from "./VolumeInfo";

export interface Book {
  id: string;
  etag: string;
  volumeInfo: VolumeInfo;
}


// [VideoMetadata] interface used for video metadata
export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  views: string;
  availableQualities: QualityOption[];
}


// [QualityOption] interface used for video quality options
export interface QualityOption {
  id: string;
  label: string;
  resolution: string;
  fileSize: string;
}


// [DownloadItem] interface used for downloaded video items
export interface DownloadItem {
  id: string;
  videoId: string;
  title: string;
  thumbnail: string;
  quality: string;
  fileSize: string;
  filePath: string;
  downloadedAt: Date;
}

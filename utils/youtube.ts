import { VideoMetadata, QualityOption } from '@/types/video';

export function validateYouTubeURL(url: string): boolean {
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]+/,
  ];
  
    console.log('[validateYouTubeURL] called with url:', url);
    const result = patterns.some(pattern => pattern.test(url));
    console.log('[validateYouTubeURL] result:', result);
    return result;
}

export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
    /youtube\.com\/shorts\/([\w-]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

export async function fetchVideoMetadata(url: string): Promise<VideoMetadata> {
  // Simulate API call - in production, this would call a backend service
  // that uses youtube-dl or similar to fetch metadata
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
    const videoId = extractVideoId(url);
    console.log('[fetchVideoMetadata] extracted videoId:', videoId);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  
  // Mock data for demonstration
  return {
    id: videoId,
    title: 'Amazing Nature Documentary - Wildlife in 4K',
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    channel: 'Nature Channel',
    duration: '12:34',
    views: '1.2M',
    availableQualities: [
      { id: '1080p', label: 'Full HD', resolution: '1080P', fileSize: '245 MB' },
      { id: '720p', label: 'HD', resolution: '720P', fileSize: '156 MB' },
      { id: '480p', label: 'SD', resolution: '480P', fileSize: '89 MB' },
      { id: 'audio', label: 'Audio Only', resolution: 'MP3', fileSize: '12 MB' },
    ],
  };
    // console.log('[fetchVideoMetadata] returning metadata:', metadata);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  // console.log('[formatFileSize] result:', result);
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
    let result;
    if (hours > 0) {
      result = `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
      result = `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    console.log('[formatDuration] result:', result);
    return result;
}

export function formatViews(views: number): string {
  if (views < 1000) return views.toString();
  if (views < 1000000) return (views / 1000).toFixed(1) + 'K';
  if (views < 1000000000) return (views / 1000000).toFixed(1) + 'M';
  return (views / 1000000000).toFixed(1) + 'B';
  // console.log('[formatViews] result:', result);
}

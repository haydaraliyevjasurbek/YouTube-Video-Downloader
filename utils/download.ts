import { VideoMetadata } from '@/types/video';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';

export async function downloadVideo(
  metadata: VideoMetadata,
  qualityId: string,
  onProgress: (progress: number) => void
): Promise<string> {
  console.log('[downloadVideo] called with metadata:', metadata, 'qualityId:', qualityId);
  // 1. Permission so‘rash
  const { status } = await MediaLibrary.requestPermissionsAsync();
  console.log('[downloadVideo] MediaLibrary.requestPermissionsAsync status:', status);
  if (status !== 'granted') {
    console.log('[downloadVideo] Permission not granted!');
    throw new Error('Fayl saqlash uchun ruxsat berilmadi.');
  }

  // 2. Foydalanuvchidan joy tanlash (faqat Android 13+ uchun, boshqa platformalarda default papka)
  let directoryUri: string | undefined;
  if (Platform.OS === 'android' && Platform.Version >= 33 && MediaLibrary.getAlbumAsync) {
    const downloadsDir = FileSystem.documentDirectory + 'Download/';
    try {
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });
      console.log('[downloadVideo] Created downloadsDir:', downloadsDir);
    } catch (e) {
      console.log('[downloadVideo] Error creating downloadsDir:', e);
    }
    directoryUri = downloadsDir;
  } else {
    directoryUri = FileSystem.documentDirectory;
  }
  console.log('[downloadVideo] directoryUri:', directoryUri);

  // 3. Video faylini yuklab olish (bu yerda faqat soxta yuklab olish simulyatsiyasi bor, haqiqiy yuklab olish uchun url kerak)
  // TODO: haqiqiy video url dan foydalanish kerak
  let progress = 0;
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      progress += 10;
      console.log('[downloadVideo] progress:', progress);
      onProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        const filePath = `${directoryUri}${metadata.id}_${qualityId}.mp4`;
        console.log('[downloadVideo] Download complete, filePath:', filePath);
        resolve(filePath);
      }
    }, 300);
  });
}

export async function simulateNetworkCheck(): Promise<boolean> {
  console.log('[simulateNetworkCheck] called');
  // In production, check actual network connectivity
  return true;
}

import React, { useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import * as Haptics from 'expo-haptics';
import URLInput from '@/components/URLInput';
import VideoPreviewCard from '@/components/VideoPreviewCard';
import QualitySelector from '@/components/QualitySelector';
import DownloadButton from '@/components/DownloadButton';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';
import LoadingOverlay from '@/components/LoadingOverlay';
import { VideoMetadata } from '@/types/video';
import { validateYouTubeURL, fetchVideoMetadata } from '@/utils/youtube';
import { downloadVideo } from '@/utils/download';


type AppState = 'input' | 'loading' | 'preview' | 'downloading' | 'complete' | 'error';

// Xatolik tafsilotlari uchun state

// Debug: log state changes
// (Note: useEffect hooks must be inside the component)


const HomeScreen = React.forwardRef<any, any>((props, ref) => {
  const [state, setState] = useState<AppState>('input');
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Debug: log state changes
  React.useEffect(() => { console.log('[HomeScreen] state:', state); }, [state]);
  React.useEffect(() => { console.log('[HomeScreen] videoMetadata:', videoMetadata); }, [videoMetadata]);
  React.useEffect(() => { console.log('[HomeScreen] selectedQuality:', selectedQuality); }, [selectedQuality]);
  React.useEffect(() => { console.log('[HomeScreen] downloadProgress:', downloadProgress); }, [downloadProgress]);
  React.useEffect(() => { console.log('[HomeScreen] error:', error); }, [error]);
  React.useEffect(() => { console.log('[HomeScreen] errorDetails:', errorDetails); }, [errorDetails]);

  const handleURLSubmit = async (url: string) => {
    console.log('[handleURLSubmit] called with url:', url);
    setError(null);
    setErrorDetails(null);
    if (!validateYouTubeURL(url)) {
      console.log('[handleURLSubmit] Invalid YouTube URL:', url);
      setError('YouTube havolasi noto‘g‘ri. Iltimos, to‘g‘ri havolani kiriting.');
      setErrorDetails(`URL: ${url}`);
      setState('error');
      return;
    }
    setState('loading');
    try {
      const metadata = await fetchVideoMetadata(url);
      setVideoMetadata(metadata);
      setState('preview');
      if (metadata.availableQualities.length > 0) {
        setSelectedQuality(metadata.availableQualities[0].id);
      }
      console.log('[handleURLSubmit] fetched metadata:', metadata);
    } catch (err: any) {
      console.log('[handleURLSubmit] Error:', err);
      setError('Video ma’lumotlarini olishda xatolik. Internetni tekshirib, qayta urinib ko‘ring.');
      setErrorDetails(err?.message || JSON.stringify(err));
      setState('error');
    }
  };

  const handleDownload = async () => {
    console.log('[handleDownload] called');
    if (!videoMetadata || !selectedQuality) {
      console.log('[handleDownload] videoMetadata or selectedQuality missing', { videoMetadata, selectedQuality });
      return;
    }
    setState('downloading');
    setDownloadProgress(0);
    setErrorDetails(null);
    try {
      await downloadVideo(videoMetadata, selectedQuality, (progress) => {
        setDownloadProgress(progress);
        console.log('[handleDownload] progress:', progress);
      });
      setState('complete');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log('[handleDownload] Download complete!');
    } catch (err: any) {
      console.log('[handleDownload] Error:', err);
      if (err.message && err.message.includes('ruxsat')) {
        setError('Faylni saqlash uchun ruxsat so‘ralmadi yoki rad etildi.');
      } else {
        setError('Yuklab olishda xatolik. Qayta urinib ko‘ring.');
      }
      setErrorDetails(err?.message || JSON.stringify(err));
      setState('error');
      setDownloadProgress(0);
    }
  };

  const handleRetry = () => {
    console.log('[handleRetry] called');
    setError(null);
    setErrorDetails(null);
    setState('input');
    setVideoMetadata(null);
    setSelectedQuality(null);
    setDownloadProgress(0);
  };

  const handleNewDownload = () => {
    console.log('[handleNewDownload] called');
    setState('input');
    setVideoMetadata(null);
    setSelectedQuality(null);
    setDownloadProgress(0);
  };

  return (
    <View ref={ref} className="flex-1 bg-brutalist-bg">
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <URLInput onSubmit={handleURLSubmit} isLoading={state === 'loading'} />

        {state === 'loading' && (
          <LoadingOverlay message="FETCHING VIDEO..." />
        )}

        {error && state === 'error' && (
          <ErrorMessage
            message={error}
            details={errorDetails || undefined}
            onRetry={handleRetry}
            onDismiss={() => { setError(null); setErrorDetails(null); }}
          />
        )}

        {videoMetadata && (state === 'preview' || state === 'downloading' || state === 'complete') && (
          <>
            <VideoPreviewCard
              thumbnail={videoMetadata.thumbnail}
              title={videoMetadata.title}
              channel={videoMetadata.channel}
              duration={videoMetadata.duration}
              views={videoMetadata.views}
            />

            {state !== 'complete' && (
              <QualitySelector
                options={videoMetadata.availableQualities}
                selectedId={selectedQuality}
                onSelect={setSelectedQuality}
              />
            )}

            {state === 'complete' ? (
              <SuccessMessage
                onNewDownload={handleNewDownload}
              />
            ) : (
              <DownloadButton
                onPress={handleDownload}
                disabled={!selectedQuality || state === 'downloading'}
                progress={state === 'downloading' ? downloadProgress : undefined}
                isComplete={state === 'complete'}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
});

export default HomeScreen;


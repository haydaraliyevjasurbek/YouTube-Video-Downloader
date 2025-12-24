import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Eye, Clock } from 'lucide-react-native';

interface VideoPreviewCardProps {
  thumbnail: string;
  title: string;
  channel: string;
  duration: string;
  views: string;
}

const VideoPreviewCard = React.forwardRef<View, VideoPreviewCardProps>(
  ({ thumbnail, title, channel, duration, views }, ref) => {
    console.log('[VideoPreviewCard] render', { thumbnail, title, channel, duration, views });
    // Fallback mexanizmi: maxresdefault -> hqdefault -> mqdefault
    const [thumbUri, setThumbUri] = useState(thumbnail);
    const [fallbackStep, setFallbackStep] = useState(0);

    const fallbackUrls = [
      thumbUri,
      thumbUri.replace('maxresdefault', 'hqdefault'),
      thumbUri.replace('maxresdefault', 'mqdefault'),
    ];

    const handleImageError = () => {
      if (fallbackStep < fallbackUrls.length - 1) {
        setFallbackStep(fallbackStep + 1);
        setThumbUri(fallbackUrls[fallbackStep + 1]);
      }
    };

    return (
      <View ref={ref} className="mx-6 mb-6">
        <View
        className="bg-gradient-to-br from-brutalist-blue to-brutalist-cyan border-4 border-brutalist-accent rounded-2xl shadow-2xl overflow-hidden"
        style={{ transform: [{ rotate: '-0.5deg' }] }}
      >
        {/* Thumbnail */}
        <View className="relative">
          <Image
            source={{ uri: fallbackUrls[fallbackStep] }}
            className="w-full h-48"
            resizeMode="cover"
            style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            onError={handleImageError}
          />
          <View className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded-lg">
            <Text className="text-brutalist-accent text-xs font-bold tracking-wider drop-shadow">
              {duration}
            </Text>
          </View>
        </View>

        {/* Metadata */}
        <View className="p-4">
          <Text className="text-brutalist-pink text-lg font-extrabold mb-2 leading-tight drop-shadow">
            {title}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-brutalist-yellow text-sm flex-1 font-semibold">
              {channel}
            </Text>

            <View className="flex-row items-center">
              <Eye size={14} color="#ffe066" strokeWidth={2} />
              <Text className="text-brutalist-yellow text-xs ml-1 font-mono font-bold">
                {views} marta ko‘rilgan
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
    );
  }
);

export default VideoPreviewCard;

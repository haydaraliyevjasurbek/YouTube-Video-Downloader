import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Download, Check } from 'lucide-react-native';

interface DownloadButtonProps {
  onPress: () => void;
  disabled?: boolean;
  progress?: number;
  isComplete?: boolean;
}

const DownloadButton = React.forwardRef<React.ElementRef<typeof Pressable>, DownloadButtonProps>(
  ({ onPress, disabled, progress, isComplete }, ref) => {
    const isDownloading = progress !== undefined && progress > 0 && progress < 100;

    // Haptic feedback funksiyasi
    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onPress();
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled || isDownloading}
        className={`relative overflow-hidden border-2 border-brutalist-accent rounded-xl shadow-lg py-5 active:scale-95 transition-all duration-200
          ${
            disabled && !isDownloading
              ? 'bg-brutalist-card opacity-60'
              : isComplete
              ? 'bg-brutalist-green'
              : 'bg-brutalist-accent'
          }
        `}
        style={{ elevation: 4 }}
      >
        {/* Progress bar gradient overlay */}
        {isDownloading && (
          <View
            className="absolute left-0 top-0 bottom-0 z-0 rounded-xl"
            style={{
              width: `${progress}%`,
              backgroundColor: 'rgba(212,255,0,0.25)',
            }}
          />
        )}
        <View className="flex-row items-center justify-center z-10">
          {isDownloading ? (
            <Text className="text-black text-2xl font-bold uppercase tracking-tight">
              {Math.round(progress ?? 0)}%
            </Text>
          ) : isComplete ? (
            <>
              <Check size={28} color="#000" strokeWidth={3} />
              <Text className="text-black text-2xl font-bold uppercase tracking-tight ml-2">
                YUKLAB OLINDI
              </Text>
            </>
          ) : (
            <>
              <Download size={28} color="#000" strokeWidth={3} />
              <Text className="text-black text-2xl font-bold uppercase tracking-tight ml-2">
                YUKLAB OLISH
              </Text>
            </>
          )}
        </View>
      </Pressable>
    );
  }
);

export default DownloadButton;

import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CheckCircle, Play, Plus } from 'lucide-react-native';

interface SuccessMessageProps {
  onOpenVideo?: () => void;
  onNewDownload?: () => void;
}

const SuccessMessage = React.forwardRef<View, SuccessMessageProps>(
  ({ onOpenVideo, onNewDownload }, ref) => {
    console.log('[SuccessMessage] render', { onOpenVideo, onNewDownload });
    // Haptic feedback
    const handleOpen = () => {
      console.log('[SuccessMessage] onOpenVideo');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onOpenVideo && onOpenVideo();
    };
    const handleNew = () => {
      console.log('[SuccessMessage] onNewDownload');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onNewDownload && onNewDownload();
    };

    return (
      <View ref={ref} className="mx-6 mb-6">
        <View className="bg-brutalist-card border-2 border-brutalist-green rounded-xl shadow-md p-4">
          <View className="flex-row items-center mb-3">
            <CheckCircle size={28} color="#000" strokeWidth={2.5} />
            <Text className="text-black text-xl font-extrabold uppercase ml-2 drop-shadow">
              YUKLAB OLISH MUVOFAQQIYATLI
            </Text>
          </View>

          <View className="flex-row space-x-3">
            {onOpenVideo && (
              <Pressable
                onPress={handleOpen}
                className="flex-1 bg-black border-2 border-black py-3 rounded-lg active:scale-95 shadow-md"
              >
                <View className="flex-row items-center justify-center">
                  <Play size={18} color="#d4ff00" strokeWidth={2.5} fill="#d4ff00" />
                  <Text className="text-brutalist-accent text-sm font-bold uppercase ml-1">
                    OCHISH
                  </Text>
                </View>
              </Pressable>
            )}

            {onNewDownload && (
              <Pressable
                onPress={handleNew}
                className="flex-1 bg-white border-2 border-black py-3 rounded-lg active:scale-95 shadow-md"
              >
                <View className="flex-row items-center justify-center">
                  <Plus size={18} color="#000" strokeWidth={2.5} />
                  <Text className="text-black text-sm font-bold uppercase ml-1">
                    YANGI VIDEO
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }
);

export default SuccessMessage;

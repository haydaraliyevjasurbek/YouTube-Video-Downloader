import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { AlertCircle, X } from 'lucide-react-native';

interface ErrorMessageProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage = React.forwardRef<View, ErrorMessageProps>(
  ({ message, details, onRetry, onDismiss }, ref) => {
    console.log('[ErrorMessage] render', { message, details });
    // Haptic feedback
    const handleRetry = () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      onRetry && onRetry();
    };
    const handleDismiss = () => {
      console.log('[ErrorMessage] onDismiss');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onDismiss && onDismiss();
    };

    return (
      <View ref={ref} className="mx-6 mb-6">
        <View className="bg-brutalist-card border-2 border-brutalist-error rounded-xl shadow-md p-4">
          <View className="flex-row items-start">
            <AlertCircle size={24} color="#fff" strokeWidth={2.5} />
            <View className="flex-1 ml-3">
              <Text className="text-white text-base font-extrabold uppercase mb-1 drop-shadow">
                XATO
              </Text>
              <Text className="text-white/90 text-sm leading-tight font-semibold">
                {message}
              </Text>
              {details && (
                <Text className="text-brutalist-yellow text-xs mt-2 font-mono">
                  {details}
                </Text>
              )}
            </View>
            {onDismiss && (
              <Pressable onPress={handleDismiss} className="ml-2">
                <X size={20} color="#fff" strokeWidth={2.5} />
              </Pressable>
            )}
          </View>

          {onRetry && (
            <Pressable
              onPress={handleRetry}
              className="bg-brutalist-yellow border-2 border-black py-2 mt-3 rounded-lg active:scale-95 shadow-md"
            >
              <Text className="text-black text-center text-sm font-bold uppercase">
                QAYTA URINISH
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  }
);

export default ErrorMessage;

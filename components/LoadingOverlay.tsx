import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingOverlayProps {
  message?: string;
}

export default function LoadingOverlay({ message = 'LOADING...' }: LoadingOverlayProps) {
  console.log('[LoadingOverlay] render', { message });
  return (
    <View className="mx-6 mb-6" onLayout={() => console.log('[LoadingOverlay] layout')}>
      <View className="bg-brutalist-card border-2 border-brutalist-accent rounded-xl shadow-md p-6 items-center">
        <ActivityIndicator size="large" color="#d4ff00" />
        <Text className="text-white text-lg font-extrabold uppercase mt-4 tracking-tight drop-shadow">
          {message === 'LOADING...' ? 'YUKLANMOQDA...' : message}
        </Text>
      </View>
    </View>
  );
}

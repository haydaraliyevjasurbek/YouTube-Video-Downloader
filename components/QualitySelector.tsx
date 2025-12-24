import React, { forwardRef } from 'react';
import { View, Text, Pressable } from 'react-native';

export interface QualityOption {
  id: string;
  label: string;
  resolution: string;
  fileSize: string;
}

interface QualitySelectorProps {
  options: QualityOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}


const QualitySelector = React.forwardRef<View, QualitySelectorProps>(
  ({ options, selectedId, onSelect }, ref) => {
    return (
      <View ref={ref} className="mx-6 mb-6">
        {/* eslint-disable-next-line no-console */}
        {console.log('[QualitySelector] render', { options, selectedId })}
        <Text className="text-brutalist-accent text-xl font-extrabold uppercase tracking-tight mb-4 drop-shadow">
          SIFATNI TANLANG
        </Text>

        <View className="space-y-3">
          {options.map((option) => {
            const isSelected = option.id === selectedId;

            return (
              <Pressable
                key={option.id}
                onPress={() => {
                  console.log('[QualitySelector] onSelect', option.id);
                  onSelect(option.id);
                }}
                className={`bg-brutalist-card border-2 p-4 rounded-xl shadow-md active:scale-98 transition-all duration-200 ${
                  isSelected ? 'border-brutalist-accent' : 'border-brutalist-card opacity-80'
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View
                      className={`w-6 h-6 border-2 mr-3 rounded-full transition-all duration-200 ${
                        isSelected
                          ? 'border-brutalist-accent bg-brutalist-accent scale-110'
                          : 'border-brutalist-accent bg-brutalist-card'
                      }`}
                    />
                    <View>
                      <Text className="text-white text-lg font-extrabold uppercase">
                        {option.resolution}
                      </Text>
                      <Text className="text-brutalist-yellow text-xs font-semibold">
                        {option.label}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-brutalist-accent font-mono text-sm font-bold">
                    {option.fileSize}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }
);

export default QualitySelector;

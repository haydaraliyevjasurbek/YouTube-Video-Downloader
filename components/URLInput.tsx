import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Clipboard as RNClipboard } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Clipboard as ClipboardIcon } from 'lucide-react-native';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

const URLInput = React.forwardRef<View, URLInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [url, setUrl] = useState('');
    React.useEffect(() => {
      console.log('[URLInput] url:', url);
    }, [url]);

    const handlePaste = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const text = await RNClipboard.getString();
      console.log('[URLInput] handlePaste:', text);
      setUrl(text);
      if (text.trim()) {
        onSubmit(text.trim());
      }
    };

    const handleSubmit = () => {
      if (url.trim()) {
        console.log('[URLInput] handleSubmit, submitting:', url.trim());
        onSubmit(url.trim());
      }
    };

    return (
      <View ref={ref} className="w-full px-6 pt-16 pb-8">
        <Text className="text-brutalist-accent text-3xl font-extrabold uppercase tracking-tight mb-2 drop-shadow-lg">
          HAVOLANI JOYLASH
        </Text>
        <Text className="text-brutalist-cyan text-sm mb-6 font-semibold">
          YouTube video havolasini kiriting
        </Text>

        <View className="flex-row items-center">
          <View className="flex-1 bg-brutalist-card border-2 border-brutalist-accent rounded-xl shadow-md mr-3">
            <TextInput
              value={url}
              onChangeText={setUrl}
              placeholder="https://youtube.com/watch?v=..."
              placeholderTextColor="#a0aec0"
              className="text-white px-4 py-5 text-base font-semibold"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              onSubmitEditing={handleSubmit}
              style={{ borderRadius: 12 }}
            />
          </View>

          <Pressable
            onPress={handlePaste}
            disabled={isLoading}
            className="bg-brutalist-accent border-2 border-brutalist-accent p-5 rounded-xl shadow-md active:scale-95 transition-all duration-200"
          >
            <ClipboardIcon size={24} color="#000" strokeWidth={2.5} />
          </Pressable>
        </View>
      </View>
    );
  }
);

export default URLInput;

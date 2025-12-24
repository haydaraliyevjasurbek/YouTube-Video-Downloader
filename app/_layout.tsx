import React from 'react';
import {
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Global error logger
if (typeof global !== 'undefined') {
  const origHandler = global.ErrorUtils?.getGlobalHandler && global.ErrorUtils.getGlobalHandler();
  if (global.ErrorUtils && global.ErrorUtils.setGlobalHandler) {
    global.ErrorUtils.setGlobalHandler((error, isFatal) => {
      console.error('GLOBAL ERROR:', error, isFatal);
      if (origHandler) origHandler(error, isFatal);
    });
  }
}

if (typeof window !== 'undefined') {
  window.onerror = function (message, source, lineno, colno, error) {
    console.error('WINDOW ERROR:', message, source, lineno, colno, error);
  };
  window.onunhandledrejection = function (event) {
    console.error('UNHANDLED PROMISE REJECTION:', event.reason);
  };
}

const RootLayout = React.forwardRef<any, any>((props, ref) => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    console.log('[RootLayout] useFonts loaded:', loaded);
    if (loaded) {
      SplashScreen.hideAsync();
      console.log('[RootLayout] SplashScreen.hideAsync called');
    }
  }, [loaded]);

  if (!loaded) {
    console.log('[RootLayout] Fonts not loaded yet');
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={({ route }) => ({
          headerShown: !route.name.startsWith("tempobook"),
        })}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
});

export default RootLayout;

import { LightTheme } from "@/common/theme/lightTheme";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectionProvider } from "@/common/webSockets/ConnectionProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "react-native-reanimated";
import 'react-native-get-random-values';
import "./../i18n";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LibreCaslonText: require("../assets/fonts/LibreCaslonText-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  } 

  return (
    <SafeAreaProvider>
      <ConnectionProvider>
        <QueryClientProvider client={queryClient}>
          <KeyboardProvider navigationBarTranslucent statusBarTranslucent>
            <ThemeProvider value={LightTheme}>
              <StatusBar backgroundColor={"transparent"} translucent />
              <Stack
                screenOptions={{
                  headerShown: false,
                  statusBarTranslucent: true,
                  statusBarBackgroundColor: "transparent",
                  navigationBarTranslucent: true,
                  navigationBarColor: "transparent",
                  contentStyle: {
                    touchAction: "none",
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="signIn" />
              </Stack>
            </ThemeProvider>
          </KeyboardProvider>
        </QueryClientProvider>
      </ConnectionProvider>
    </SafeAreaProvider>
  );
}

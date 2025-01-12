import { LightTheme } from "@/common/theme/lightTheme";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "./../i18n";
import { StatusBar } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectionProvider } from "@/common/webSockets/ConnectionProvider";

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
  );
}

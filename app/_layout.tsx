import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect } from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-native-paper";
import { LightTheme } from "@/components/Themes/theme";
import MediaViewerPortal from "@/components/MediaViewer/MediaViewerPortal";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LibreCaslonText: require("../assets/fonts/LibreCaslonText-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
  const queryClient = new QueryClient();

  return (
    <Provider theme={LightTheme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                </Stack>
                <MediaViewerPortal />
              </GestureHandlerRootView>
        </QueryClientProvider>
      </RecoilRoot>
    </Provider>
  );
}

import { AsymmetricKeyProvider } from "@/common/contexts/AsymmetricKeyProvider";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function MainLayout() {
  const theme = useTheme();

  return (
    <AsymmetricKeyProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarBackgroundColor: "transparent",
          navigationBarTranslucent: true,
          navigationBarColor: "transparent",
          contentStyle: {
            touchAction: "none",
            backgroundColor: theme.colors.backgroundColor,
          },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(forms)" />
      </Stack>
    </AsymmetricKeyProvider>
  );
}

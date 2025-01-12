import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function FormsLayout() {
  const theme = useTheme();
  return (
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
      <Stack.Screen name="newProject" />
    </Stack>
  );
}

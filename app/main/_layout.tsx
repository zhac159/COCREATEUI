import { AsymmetricKeyProvider } from "@/common/contexts/AsymmetricKeyProvider";
import { MessageConnectionProvider } from "@/common/contexts/MessageConnectionProvider";
import { MessagesProvider } from "@/common/contexts/MessagesProvider";
import { SymmetricKeyProvider } from "@/common/contexts/SymmetricKeyProvider";
import { migrateDbIfNeeded } from "@/common/database/migrations";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";

export default function MainLayout() {
  const theme = useTheme();
  return (
    <SQLiteProvider databaseName="main" onInit={migrateDbIfNeeded}>
      <AsymmetricKeyProvider>
        <SymmetricKeyProvider>
          <MessagesProvider>
            <MessageConnectionProvider>
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
                <Stack.Screen name="chat" />
              </Stack>
            </MessageConnectionProvider>
          </MessagesProvider>
        </SymmetricKeyProvider>
      </AsymmetricKeyProvider>
    </SQLiteProvider>
  );
}

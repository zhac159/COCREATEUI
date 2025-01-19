import { ChatProvider } from "@/common/contexts/ChatProvider";
import { useAuthStore } from "@/common/stores/authStore";
import { useTheme } from "@react-navigation/native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useShallow } from "zustand/shallow";

type IndexParams = {
  id: string;
  symmetricKey: string;
};

export default function ChatLayout() {
  const theme = useTheme();

  const { id, symmetricKey } = useLocalSearchParams<IndexParams>();
  const intId = parseInt(id);
  const chat = useAuthStore(
    useShallow((state) => state.getChatWithFilteredMembersById(intId))
  );


  if (!chat || !symmetricKey) {
    return null;
  }

  return (
    <ChatProvider chat={chat} symmetricKey={symmetricKey}>
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
        <Stack.Screen name="[id]" />
      </Stack>
    </ChatProvider>
  );
}

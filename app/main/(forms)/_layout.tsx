import { JsStack } from "@/common/contexts/JsStackContext";
import { useTheme } from "@react-navigation/native";

export default function FormsLayout() {
  const theme = useTheme();
  return (
    <JsStack
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },

      }}
    >
      <JsStack.Screen name="newProject" />
    </JsStack>
  );
}

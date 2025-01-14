import { JsStack } from "@/common/contexts/JsStackContext";
import { useTheme } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { Modal } from "react-native";

export default function FormsLayout() {
  const theme = useTheme();
  return (
    <JsStack
      screenOptions={{
        headerShown: false,
      }}
    >
      <JsStack.Screen name="newProject" />
      <JsStack.Screen
        name="test"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          presentation: "modal",
          gestureEnabled: true,
        }}
      />
    </JsStack>
  );
}

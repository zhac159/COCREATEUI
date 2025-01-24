import {
  useReanimatedKeyboardAnimation,
} from "react-native-keyboard-controller";
import {
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { generalPadding } from "@/common/constants/generalPadding";

export const useChatAnimatedStyles = () => {
  // Current keyboard height from react-native-keyboard-controller
  const { height: keyboardHeight } = useReanimatedKeyboardAnimation();

  const scrollViewStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: keyboardHeight.value }, ...chatAnimatedStyles.inverted.transform],
  }));

  const textInputStyle = useAnimatedStyle(() => ({
    width: "100%",
    transform: [{ translateY: keyboardHeight.value }],
  }));

  return { scrollViewStyle, textInputStyle };
};

export const chatAnimatedStyles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
  },
  header: {
    color: "black",
    marginRight: 12,
  },
  inverted: {
    marginBottom: 200,
    marginTop: 20,
    paddingHorizontal: generalPadding,
    transform: [{ rotate: "180deg" }],
  },
});

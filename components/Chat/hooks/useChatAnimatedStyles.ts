import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { useAnimatedStyle } from "react-native-reanimated";
import { StyleSheet } from "react-native";

export const useChatAnimatedStyles = () => {
  const { height: platform } = useReanimatedKeyboardAnimation();
  const scrollViewStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: platform.value },
        ...chatAnimatedStyles.inverted.transform,
      ],
    }),
    []
  );
  const textInputStyle = useAnimatedStyle(
    () => ({
      width: "100%",
      transform: [{ translateY: platform.value }],
    }),
    []
  );
  const fakeView = useAnimatedStyle(
    () => ({
      height: Math.abs(platform.value),
    }),
    []
  );

  return { scrollViewStyle, textInputStyle, fakeView };
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
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
});

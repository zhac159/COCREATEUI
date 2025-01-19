import { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { generalPadding } from "@/common/constants/generalPadding";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type ChatInputProps = {};

export const ChatInput: FC<ChatInputProps> = ({}) => {
  const styles = useThemedStyles(getStyles);

  const { height } = useReanimatedKeyboardAnimation();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: height.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TextInput style={styles.textInput} />
    </Animated.View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 50,
      paddingTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 0.3,
      paddingHorizontal: 16,
      backgroundColor: "white",
    },
    textInput: {
      width: "90%",
      paddingHorizontal: generalPadding,
      backgroundColor: theme.colors.backgroundColor,
      borderRadius: 25,
      height: 30,
    },
  });

import React, { FC, useEffect, useMemo, useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { colors } from "react-native-keyboard-controller/lib/typescript/components/KeyboardToolbar/colors";

const animationDuration = 2000;
const animationToValue = 150;

const gradientColors = [
  "rgba(255, 255, 255, 0)",
  "rgba(255, 255, 255, 0.01)",
  "rgba(255, 255, 255, 0.02)",
  "rgba(255, 255, 255, 0.03)",
  "rgba(255, 255, 255, 0.04)",
  "rgba(255, 255, 255, 0.05)",
  "rgba(255, 255, 255, 0.06)",
  "rgba(255, 255, 255, 0.07)",
  "rgba(255, 255, 255, 0.08)",
  "rgba(255, 255, 255, 0.09)",
  "rgba(255, 255, 255, 0.1)",
  "rgba(255, 255, 255, 0.11)",
  "rgba(255, 255, 255, 0.12)",
  "rgba(255, 255, 255, 0.13)",
  "rgba(255, 255, 255, 0.14)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.15)",
  "rgba(255, 255, 255, 0.14)",
  "rgba(255, 255, 255, 0.13)",
  "rgba(255, 255, 255, 0.12)",
  "rgba(255, 255, 255, 0.11)",
  "rgba(255, 255, 255, 0.1)",
  "rgba(255, 255, 255, 0.09)",
  "rgba(255, 255, 255, 0.08)",
  "rgba(255, 255, 255, 0.07)",
  "rgba(255, 255, 255, 0.06)",
  "rgba(255, 255, 255, 0.05)",
  "rgba(255, 255, 255, 0.04)",
  "rgba(255, 255, 255, 0.03)",
  "rgba(255, 255, 255, 0.02)",
  "rgba(255, 255, 255, 0.01)",
  "rgba(255, 255, 255, 0)",
] as [string, string, ...string[]];

type StyledButtonProps = {
  onPress: () => void;
  text: string;
  icon?: string;
  error?: boolean;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  success?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
};

const StyledButton: FC<StyledButtonProps> = ({
  onPress,
  style,
  text,
  error,
  icon,
  textStyle,
  isLoading,
  success,
  disabled,
  backgroundColor,
}) => {
  const theme = useTheme();

  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(animationToValue, {
        duration: animationDuration,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [{ translateX: translateX.value }],
    };
  });

  const backgroundColorStyle = useMemo(() => {
    if (error) {
      return theme.colors.red;
    }
    if (success) {
      return theme.colors.green;
    }
    if (style && "backgroundColor" in style) {
      return style.backgroundColor;
    }
    if (backgroundColor) {
      return backgroundColor;
    }
    return theme.colors.primary;
  }, [backgroundColor, theme.colors.primary]);

  return (
    <TouchableOpacity
      style={{
        opacity: disabled ? 0.5 : 1,
        ...styles.container,
        ...(style as {}),
        backgroundColor: backgroundColorStyle,
      }}
      onPress={onPress}
      disabled={isLoading || disabled}
    >
      {isLoading && (
        <Animated.View style={[animatedStyle]}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: "50%",
              height: "100%",
            }}
          />
        </Animated.View>
      )}
      {icon && (
        <FontAwesome6
          name={icon}
          size={15}
          solid
          style={[
            {
              opacity: isLoading ? 0.5 : 1,
              color: theme.colors.white,
            },
            textStyle,
          ]}
        />
      )}
      <Text
        style={[
          {
            ...theme.customFonts.primary.medium,
            opacity: isLoading ? 0.5 : 1,
            color: theme.colors.white,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default StyledButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    borderRadius: 20,
    gap: 15,
    paddingVertical: 10,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
});

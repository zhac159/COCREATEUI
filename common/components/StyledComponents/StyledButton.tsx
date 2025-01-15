import React, { FC, useEffect, useMemo } from "react";
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
import { Theme, useTheme } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import {
  StyledTouchableOpacity,
  StyledTouchableOpacityProps,
} from "./StyledTouchableOpacity";
import useThemedStyles from "@/common/theme/getThemedStylesheet";

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

export type StyledButtonProps = StyledTouchableOpacityProps & {
  onPress: () => void;
  text: string;
  icon?: string;
  error?: boolean;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  success?: boolean;
  disabled?: boolean;
};

const StyledButton: FC<StyledButtonProps> = ({
  onPress,
  style,
  text,
  error,
  icon,
  textStyle,
  iconStyle,
  isLoading,
  success,
  disabled,
}) => {
  const theme = useTheme();

  const translateX = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [{ translateX: translateX.value }],
    };
  });

  const styles = useThemedStyles((theme) => getStyles(theme));

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(animationToValue, {
        duration: animationDuration,
      }),
      -1,
      false
    );
  }, []);

  return (
    <StyledTouchableOpacity
      style={[
        styles.container,
        style,
        error && { backgroundColor: styles.redError.backgroundColor },
      ]}
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
          style={[
            {
              opacity: isLoading ? 0.5 : 1,
              color: theme.colors.white,
            },
            iconStyle,
          ]}
        />
      )}
      <Text style={[styles.textStyle, textStyle]}>{text}</Text>
    </StyledTouchableOpacity>
  );
};
export default StyledButton;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
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
    textStyle: {
      ...theme.customFonts.primary.medium,
      color: theme.colors.white,
    },
    redError: {
      backgroundColor: theme.colors.red,
    },
  });

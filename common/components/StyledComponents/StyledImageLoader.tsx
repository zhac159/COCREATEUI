import { Theme } from "@react-navigation/native";
import { Image, ImageProps, useImage } from "expo-image";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { FC, useEffect } from "react";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import * as Progress from "react-native-progress";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const animationDuration = 2000;
const animationToValue = 150;

const gradientColors = ["transparent", "white", "transparent"] as [
  string,
  string,
  ...string[]
];

type StyledImageLoaderProps = ViewProps & {};

export const StyledImageLoader: FC<StyledImageLoaderProps> = ({ style, ...props }) => {
  const styles = useThemedStyles(getStyles);

  const translateX = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

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
    <View style={[style]} {...props}>
      <Animated.View style={[styles.animated, animatedStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
        />
      </Animated.View>
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    linearGradient: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    animated: {
      backgroundColor: "white",
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
  });

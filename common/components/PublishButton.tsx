import { FC, useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
import StyledButton, {
  StyledButtonProps,
} from "./StyledComponents/StyledButton";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import useThemedStyles from "../theme/getThemedStylesheet";

type PublishButtonProps = StyledButtonProps &
  StyledButtonProps & {
    isSubmitting?: boolean;
  };

export const PublishButton: FC<PublishButtonProps> = ({
  error,
  style,
  isSubmitting,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  const shakeAnimation = useSharedValue(0);

  useEffect(() => {
    if (error) {
      shakeAnimation.value = withSequence(
        withTiming(-6, { duration: 50, easing: Easing.linear }),
        withTiming(5, { duration: 50, easing: Easing.linear }),
        withTiming(-4, { duration: 60, easing: Easing.linear }),
        withTiming(3, { duration: 60, easing: Easing.linear }),
        withTiming(-2, { duration: 70, easing: Easing.linear }),
        withTiming(1, { duration: 70, easing: Easing.linear })
      );
    }
  }, [error]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeAnimation.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <StyledButton
        error={error}
        {...props}
        icon={"check"}
        isLoading={isSubmitting}
        style={[style, styles.container]}
        iconStyle={styles.icon}
      />
    </Animated.View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
    },
    icon: {
      color: theme.colors.black,
      fontSize: 17,
    },
  });

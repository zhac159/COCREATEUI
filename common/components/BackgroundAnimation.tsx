import { FC, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const animationDuration = 20000;

type StyledBackgroundAnimationProps = {};

export const StyledBackgroundAnimation: FC<
  StyledBackgroundAnimationProps
> = () => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: animationDuration,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.scene,
      ]}
      pointerEvents="none"
    >
      <Animated.View style={[animatedStyle]}>
        <Animated.Image
          source={require("../../assets/images/backgroundColurs/blue.png")}
          style={styles.firstImage}
        />
        <Animated.Image
          source={require("../../assets/images/backgroundColurs/cyan.png")}
          style={styles.secondImage}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scene: {
    alignItems: "center",
    ...StyleSheet.absoluteFillObject,
  },
  firstImage: {
    width: 700,
    height: 1000,
    position: "absolute",
    top: -500,
    left: -220,
  },
  secondImage: {
    width: 800,
    height: 1100,
    position: "absolute",
    top: -500,
    right: -300,
  },
});

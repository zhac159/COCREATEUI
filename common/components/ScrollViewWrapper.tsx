import { FC, ReactNode, useCallback } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { StyledBackgroundAnimation } from "./BackgroundAnimation";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const additionalTopInset = 10;

export type ScrollViewWrapperProps = KeyboardAwareScrollViewProps & {
  children: ReactNode;
  header?: ReactNode;
  showBackgroundColor?: boolean;
  keyboardShouldPersistTaps?: "always" | "never" | "handled";
};

export const ScrollViewWrapper: FC<ScrollViewWrapperProps> = ({
  children,
  header,
  contentContainerStyle,
  showBackgroundColor,
  keyboardShouldPersistTaps = "never",
  ...props
}) => {
  const { top } = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerHeight = useSharedValue(0);

  const onHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    headerHeight.value = height;
  }, []);

  const titleStyle = useAnimatedStyle(() => {
    const opacity = Math.max(
      0,
      Math.min(1, 1 - scrollY.value / (headerHeight.value * 0.5))
    );
    return {
      opacity,
    };
  });
  return (
    <>
      {showBackgroundColor && <StyledBackgroundAnimation />}
      <View
        style={{
          height: top + additionalTopInset,
          ...styles.topInset,
        }}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        {...props}
      >
        <SafeAreaView style={[styles.container, contentContainerStyle]}>
          {header && (
            <Animated.View style={titleStyle} onLayout={onHeaderLayout}>
              {header}
            </Animated.View>
          )}
          {children}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: additionalTopInset,
    paddingHorizontal: "1.5%",
    backgroundColor: "transparent",
  },
  topInset: {
    position: "absolute",
    backgroundColor: "lightgrey",
    width: "100%",
    zIndex: 1000,
    top: 0,
  },
});

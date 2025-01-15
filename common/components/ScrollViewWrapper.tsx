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
import { Theme } from "@react-navigation/native";
import useThemedStyles from "../theme/getThemedStylesheet";

const additionalTopInset = 10;

export type ScrollViewWrapperProps = KeyboardAwareScrollViewProps & {
  children: ReactNode;
  header?: ReactNode;
  showBackgroundColor?: boolean;
  disableTopInset?: boolean;
  keyboardShouldPersistTaps?: "always" | "never" | "handled";
};

export const ScrollViewWrapper: FC<ScrollViewWrapperProps> = ({
  children,
  header,
  contentContainerStyle,
  showBackgroundColor,
  StickyHeaderComponent,
  disableTopInset = false,
  keyboardShouldPersistTaps = "never",
  ...props
}) => {
  const styles = useThemedStyles((theme: Theme) =>
    getStyles(theme, disableTopInset)
  );
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
      {!disableTopInset && (
        <View
          style={{
            height: top + additionalTopInset,
            ...styles.topInset,
          }}
        />
      )}
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
      {StickyHeaderComponent && <StickyHeaderComponent />}
    </>
  );
};

const getStyles = (theme: Theme, disableTopInset?: boolean) =>
  StyleSheet.create({
    container: {
      paddingTop: disableTopInset ? 0 : additionalTopInset,
      paddingHorizontal: "2%",
      backgroundColor: "transparent",
    },
    topInset: {
      position: "absolute",
      backgroundColor: theme.colors.backgroundColor,
      width: "100%",
      zIndex: 1000,
      top: 0,
    },
  });

import { FC, ReactNode } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { StyledBackgroundAnimation } from "./BackgroundAnimation";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

type ScrollViewWrapperProps = KeyboardAwareScrollViewProps & {
  children: ReactNode;
  showBackgroundColor?: boolean;
};

export const ScrollViewWrapper: FC<ScrollViewWrapperProps> = ({
  children,
  contentContainerStyle,
  showBackgroundColor,
  ...props
}) => {
  return (
    <>
      {showBackgroundColor && <StyledBackgroundAnimation />}
      <KeyboardAwareScrollView
        contentContainerStyle={[styles.container, contentContainerStyle]}
        onTouchStart={Keyboard.dismiss}
        {...props}
      >
        {children}
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    paddingBottom: 200,
    paddingHorizontal: "1.5%",
    backgroundColor: "transparent",
  },
});

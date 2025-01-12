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
};

export const ScrollViewWrapper: FC<ScrollViewWrapperProps> = ({
  children,
  contentContainerStyle,
  ...props
}) => {
  return (
    <>
      <StyledBackgroundAnimation />
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
    paddingVertical: "20%",
    paddingHorizontal: "3%",
    backgroundColor: "transparent",
  },
});

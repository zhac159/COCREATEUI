import { FC, ReactNode } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { StyledBackgroundAnimation } from "./BackgroundAnimation";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

type ScrollViewWrapperProps = {
  children: ReactNode;
};

export const ScrollViewWrapper: FC<ScrollViewWrapperProps> = ({ children }) => {
  return (
    <>
      <StyledBackgroundAnimation />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        onTouchStart={Keyboard.dismiss}
      >
        {children}
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "20%",
    paddingHorizontal: "3%",
    height: "100%",
    backgroundColor: "transparent",
  },
});

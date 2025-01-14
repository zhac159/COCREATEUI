import { FC, ReactNode } from "react";
import { StyleSheet } from "react-native";
import { StyledBackgroundAnimation } from "./BackgroundAnimation";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        {...props}
      >
        {children}
      </KeyboardAwareScrollView>
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

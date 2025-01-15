import { FC } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";

export type StyledTouchableOpacityProps = TouchableOpacityProps & {};

export const StyledTouchableOpacity: FC<StyledTouchableOpacityProps> = ({
  style,
  ...props
}) => {
  const styles = useThemedStyles(getStyles);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, style]}
      {...props}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
    },
  });

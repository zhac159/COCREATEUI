import { FC } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";

type StyledDividerProps = ViewProps & {
  contrast?: boolean;
};

export const StyledDivider: FC<StyledDividerProps> = ({
  contrast = false,
  style,
  ...props
}) => {
  const styles = useThemedStyles((theme) => getStyles(theme, contrast));
  return <View style={[styles.divider, style]} {...props} />;
};

const getStyles = (theme: Theme, contrast?: boolean) =>
  StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: contrast
        ? theme.colors.white
        : theme.colors.backgroundColor,
      width: "100%",
    },
  });

import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Theme, useTheme } from "@react-navigation/native";
import { FC, useMemo } from "react";
import {
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  StyleSheet,
} from "react-native";

export type StyledTextProps = TextProps & {
  color?: string;
  fontSize?: number;
  text: string;
  weight?: "900" | "700" | "500" | "400" | "300";
  secondary?: boolean;
  error?: boolean;
  style?: StyleProp<TextStyle>;
};

const StyledText: FC<StyledTextProps> = ({
  color,
  text,
  fontSize,
  weight,
  error,
  secondary = false,
  style,
  ...props
}) => {
  const styles = useThemedStyles((theme) => getStyles(theme, secondary));

  return (
    <Text style={[styles.text, style]} {...props}>
      {text}
    </Text>
  );
};

export default StyledText;

const getStyles = (theme: Theme, secondary?: boolean) =>
  StyleSheet.create({
    text: {
      ...(secondary
        ? theme.customFonts.secondary.medium
        : theme.customFonts.primary.medium),
    },
  });

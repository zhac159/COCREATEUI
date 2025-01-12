import { useTheme } from "@react-navigation/native";
import { FC, useMemo } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

export type StyledTextProps = TextProps & {
  color?: string;
  fontSize?: number;
  text: string;
  weight?: "900" | "700" | "500" | "400" | "300";
  secondary?: boolean;
  error?: boolean;
  style?: StyleProp<TextStyle>;
}

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
  const theme = useTheme();

  const themedStyle: StyleProp<TextStyle> = useMemo(() => {
    return secondary
      ? theme.customFonts.secondary.medium
      : theme.customFonts.primary.medium;
  }, [secondary, theme]);

  const colorStyle = useMemo(() => {
    return error ? theme.colors.red : color || theme.colors.black;
  }, [error, color, theme]);

  return (
    <Text
      style={{
        ...themedStyle,
        color: colorStyle,
        fontSize: fontSize || 17,
        fontWeight: weight || "700",
        ...(style as {}),
      }}
      {...props}
    >
      {text}
    </Text>
  );
};

export default StyledText;

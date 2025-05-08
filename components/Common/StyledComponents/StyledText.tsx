import { useTheme } from "@/components/Themes/theme";
import { FC, useMemo } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type StyledTextProps = {
  color?: string;
  fontSize?: number;
  content: string | undefined;
  weight?: "900" | "700" | "500" | "400" | "300";
  secondary?: boolean;
  error?: boolean;
  style?: StyleProp<TextStyle>;
};

const StyledText: FC<StyledTextProps> = ({
  color,
  content,
  fontSize,
  weight,
  error,
  secondary = false,
  style
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

  if (!content) {
    return null;
  }

  return (
    <Text
      style={{
        ...themedStyle,
        color: colorStyle,
        fontSize: fontSize || 17,
        fontWeight: weight || "400",
        ...style as {},
      }}
    >
      {content}
    </Text>
  );
};

export default StyledText;

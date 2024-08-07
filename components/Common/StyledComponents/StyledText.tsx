import { useTheme } from "@/components/Themes/theme";
import { FC } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type StyledTextProps = {
  color?: string;
  fontSize?: number;
  content: string;
  weight?: "900" | "700" | "500" | "400" | "300";
  secondary?: boolean;
};

const StyledText: FC<StyledTextProps> = ({
  color,
  content,
  fontSize,
  weight,
  secondary = false,
}) => {
  const theme = useTheme();

  const themedStyle: StyleProp<TextStyle> = secondary
    ? theme.customFonts.secondary.medium
    : theme.customFonts.primary.medium;

  return (
    <Text
      style={{
        ...themedStyle,
        color: color || theme.colors.black,
        fontSize: fontSize || 17,
        fontWeight: weight || "400" ,
      }}
    >
      {content}
    </Text>
  );
};

export default StyledText;

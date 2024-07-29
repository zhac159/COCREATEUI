import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { t } from "i18next";
import { FC, useMemo } from "react";
import { View, Text } from "react-native";

type TabBarIconProps = {
  routeName: string;
  focused: boolean;
  darkMode?: boolean;
};

const TabBarIcon: FC<TabBarIconProps> = ({ routeName, focused, darkMode }) => {
  const theme = useTheme();

  const color = useMemo(() => {
    if (focused) {
      return theme.colors.primary;
    } else if (darkMode) {
      return theme.colors.white;
    } else {
      return theme.colors.black;
    }
  }, [focused, darkMode]);

  const icon = useMemo(() => {
    switch (routeName) {
      case "discovery":
        return "compass";
      case "work":
        return "bolt";
      case "project":
        return "lightbulb";
      case "account":
        return "user";
      default:
        return "user";
    }
  }, [routeName]);

  return (
    <View
      style={{
        alignItems: "center",
        gap: 6,
      }}
    >
      <FontAwesome6 name={icon} size={20} color={color} />
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontSize: 11,
          fontWeight: "600",
          color: color,
        }}
      >
        {routeName}
      </Text>
    </View>
  );
};

export default TabBarIcon;

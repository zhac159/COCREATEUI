import StyledText from "@/common/components/StyledComponents/StyledText";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";

type TabBarIconProps = {
  routeName: string;
  focused: boolean;
};

const TabBarIcon: FC<TabBarIconProps> = ({ routeName, focused }) => {
  const theme = useTheme();

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
      style={styles.tabBarIcon}
    >
      <FontAwesome6
        name={icon}
        size={20}
        color={focused ? theme.colors.primary : theme.colors.black}
      />
      <StyledText
        text={routeName}
        color={focused ? theme.colors.primary : theme.colors.black}
      />
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  tabBarIcon: {
    alignItems: "center",
    gap: 6,
  },
});

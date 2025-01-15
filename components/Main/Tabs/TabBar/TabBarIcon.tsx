import StyledText from "@/common/components/StyledComponents/StyledText";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { FontAwesome6 } from "@expo/vector-icons";
import { Theme, useTheme } from "@react-navigation/native";
import { FC, useMemo } from "react";
import { View, StyleSheet } from "react-native";

type TabBarIconProps = {
  routeName: string;
  focused: boolean;
};

const TabBarIcon: FC<TabBarIconProps> = ({ routeName, focused }) => {
  const styles = useThemedStyles((theme) => getStyles(theme, focused));

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
    <View style={styles.tabBarIcon}>
      <FontAwesome6 name={icon} size={20} style={styles.text} />
      <StyledText text={routeName} style={styles.text} />
    </View>
  );
};

export default TabBarIcon;

const styles = StyleSheet.create({
  tabBarIcon: {
    alignItems: "center",
    gap: 6,
  },
  text: {
    color: "red",
  },
});

const getStyles = (theme: Theme, focused?: boolean) =>
  StyleSheet.create({
    tabBarIcon: {
      alignItems: "center",
      gap: 6,
    },
    text: {
      color: focused ? theme.colors.primary : theme.colors.black,
    },
  });

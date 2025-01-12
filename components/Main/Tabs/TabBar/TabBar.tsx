import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { FC, memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TabBarIcon from "./TabBarIcon";

type TabBarProps = {
  BottomTabBarProps: BottomTabBarProps;
};

const TabBar: FC<TabBarProps> = ({ BottomTabBarProps }) => {
  return (
    <BlurView style={styles.tabBar} intensity={50} tint="light">
      {BottomTabBarProps.state.routeNames.map((routeName, index) => {
        return (
          <TouchableOpacity
            key={routeName}
            activeOpacity={1}
            hitSlop={{ top: 14, bottom: 33, left: 15, right: 15 }}
            onPress={() => {
              BottomTabBarProps.navigation.navigate(routeName);
            }}
          >
            <TabBarIcon
              key={routeName}
              routeName={routeName}
              focused={BottomTabBarProps.state.index === index}
            />
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

export default memo(TabBar);

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 14,
    paddingBottom: 30,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
});

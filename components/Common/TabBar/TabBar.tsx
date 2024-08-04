import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React, { FC, memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import TabBarIcon from "./TabBarIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

type TabBarProps = {
  BottomTabBarProps: BottomTabBarProps;
};

const TabBar: FC<TabBarProps> = ({ BottomTabBarProps }) => {

  const darkMode = useMemo(() => {
    return BottomTabBarProps.state.index === 0;
  }, [BottomTabBarProps.state.index]);

  return (
    <BlurView
    tint={darkMode ? "dark" : "light"}
    style={{
        width: "100%",
        paddingTop: 14,
        paddingBottom: 30,
        height: 80,
        position: "absolute",
        top: windowHeight - 25 - 55,
        zIndex: 100,
        flexDirection: "row",
        justifyContent: "space-around",
      }}
      intensity={50}
    >
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
              darkMode={darkMode}
              focused={BottomTabBarProps.state.index === index}
            />
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
};

export default memo(TabBar);

const styles = StyleSheet.create({});

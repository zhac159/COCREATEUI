import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { FC } from "react";
import { StyleSheet } from "react-native";

type TabBarProps = {
  BottomTabBarProps: BottomTabBarProps;
};

const TabBar: FC<TabBarProps> = ({ BottomTabBarProps }) => {
  return (
    <BottomTabBar
      {...BottomTabBarProps}
      style={{
        backgroundColor: "red",
        position: "absolute",
      }}
    />
  );
};

export default TabBar;

const styles = StyleSheet.create({});

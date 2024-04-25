import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(55, 55, 55, 0.8)",
          position: "absolute",
          padding: 0,
          margin: 0,
          elevation: 0,
        },
        headerStyle: {
          height: 0,
          backgroundColor: "transparent",
          shadowOpacity: 0,
        },
      }}
      sceneContainerStyle={{ backgroundColor: "transparent"}}
    >
      <Tabs.Screen
        name="discovery"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="compass" size={24} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="dragon" size={24} color={color} solid />
          ),
        }}
      />

      <Tabs.Screen
        name="project"
        options={{
          headerTitle: "",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="lightbulb" size={24} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="user" size={24} color={focused ? theme.colors.primary:color} solid />
          ),
        }}
      />
    </Tabs>
  );
}

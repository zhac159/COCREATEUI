import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useGetIntUserIdValue } from "@/components/RecoilStates/profileState";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: "transparent",
          padding: 0,
          margin: 0,
        },
        headerStyle: {
          height: 0,
          backgroundColor: "transparent",
          shadowOpacity: 0,
        },
      }}
      sceneContainerStyle={{ backgroundColor: "transparent" }}
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

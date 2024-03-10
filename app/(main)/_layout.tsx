import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
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
          name="account"
          options={{
            headerTitle: "",
            tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
          }}
        />
        <Tabs.Screen
          name="work"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="project"
          options={{
            title: "Project",
            headerTitle: "",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="music" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

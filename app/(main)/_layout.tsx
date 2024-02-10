import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <BackgroundColourAnimation />
      <LinearGradient
        colors={["transparent", "white"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.42 }}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: true,
          tabBarStyle: {
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
          },
          headerStyle: {
            height: 50,
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
            title: "Tab cocreate",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

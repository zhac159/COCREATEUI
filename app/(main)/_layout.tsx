import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={15} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="eye" color={color} />,
          headerRight: () => (
            <Link href="/loginpage" asChild>
              <Pressable>
                {({ pressed }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "rgba(100, 100, 100, 0.5)",
                      borderRadius: 30,
                      padding: 10,
                      width: 50,
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 30,
                      marginRight: 10,
                    }}
                  >
                    <FontAwesome name="cog" size={25} color="white" />
                  </TouchableOpacity>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: "Tab cocreate",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

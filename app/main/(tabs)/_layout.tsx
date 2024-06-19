import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export default function TabLayout() {
  const theme = useTheme();

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(55, 55, 55, 0.8)",
          position: "absolute",
          display: keyboardVisible ? "none" : "flex",
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
            <FontAwesome6
              name="user"
              size={24}
              color={focused ? theme.colors.primary : color}
              solid
            />
          ),
        }}
      />
    </Tabs>
  );
}

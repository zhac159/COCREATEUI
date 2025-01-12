import { FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import TabBar from "@/components/Main/TabBar/TabBar";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <TabBar BottomTabBarProps={props} />}
    >
      <Tabs.Screen
        name="project"
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="compass" size={24} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="dragon" size={24} color={color} solid />
          ),
        }}
      />
    </Tabs>
  );
}

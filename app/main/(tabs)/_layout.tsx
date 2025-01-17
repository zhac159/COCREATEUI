import { Tabs } from "expo-router";
import TabBar from "@/components/Main/Tabs/TabBar/TabBar";

export default function MainTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
        },
        sceneStyle: {
          backgroundColor: "transparent",
        },
      }}
      tabBar={(props) => <TabBar BottomTabBarProps={props} />}
    >
      <Tabs.Screen
        name="project"
        options={{
          tabBarShowLabel: true,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarShowLabel: true,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarShowLabel: true,
        }}
      />
    </Tabs>
  );
}

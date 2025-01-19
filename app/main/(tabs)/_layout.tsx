import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import TabBar from "@/components/Common/TabBar/TabBar";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={() => ({
        gestureEnabled: false,
        headerStyle: {
          height: 0,
          backgroundColor: "transparent",
          shadowOpacity: 0,
        },
      })}
      tabBar={(props) => (
        <TabBar BottomTabBarProps={props}  />
      )}
      // sceneContainerStyle={{ backgroundColor: "transparent" }}
    >
      <Tabs.Screen
        name="discovery"
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="compass" size={24} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="dragon" size={24} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="project"
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="lightbulb" size={24} color={color} solid />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerTitle: "",
          tabBarShowLabel: true,
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

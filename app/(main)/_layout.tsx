import React, { useEffect, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import {
  Animated,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";

const AccountComponent = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 30000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 30000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const colorInterpolation = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "rgba(0, 128, 0, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(173, 216, 230, 1)",
    ],
  });

  return (
    <View
      style={[
        styles.scene,
        {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: "42%",
          width: "100%",
        },
      ]}
      pointerEvents="none"
    >
      <Animated.View
        style={{
          ...styles.gradient,
          backgroundColor: colorInterpolation,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
      </Animated.View>
    </View>
  );
};

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
      <AccountComponent  />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white", zIndex: 0 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: true,
            headerStyle: {
              height: 50,
              backgroundColor: "white",
              shadowOpacity: 0,
            },
          }}
        >
          <Tabs.Screen
            name="account"
            options={{
              headerTitle: "",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="eye" color={color} />
              ),
              headerRight: () => (
                <Link href="/" asChild>
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
                          marginRight: 10,
                          marginTop: -50,
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
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="code" color={color} />
              ),
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
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  card: {
    width: 200,
    margin: 10,
    height: 200,
  },
  scene: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

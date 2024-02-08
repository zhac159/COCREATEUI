import { StyleSheet, Animated, Dimensions } from "react-native";
import { View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useEffect, useRef, useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";
import AccountMainInfo from "@/components/Account/AccountMainInfo";
import TabButtons from "@/components/Account/TabButtons";
import AssetTab from "@/components/Account/Assets/AssetTab";

const SecondRoute = () => (
  <View style={[styles.scene]}>
    <AssetTab />
  </View>
);

const FirstRoute = () => (
  <View style={[styles.scene]}>
    <SkillsTab />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "green" }]} />
);

const FourthRoute = () => (
  <View style={[styles.scene, { backgroundColor: "blue" }]} />
);

const FifthRoute = () => (
  <View style={[styles.scene, { backgroundColor: "yellow" }]} />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function Account() {
  const currentUser = useCurrentUserValue();

  const [selectedTab, setSelectedTab] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
    { key: "fifth", title: "Fifth" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
  });

  const buttonNames = ["Skills", "Assets", "Portofolio", "About", "Feedback"];

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "transparent" }}>
        <AccountMainInfo
          coins={currentUser.coins || 0}
          username={currentUser.username || "username"}
          rating={currentUser.rating || 0}
          address={currentUser.address || "address"}
        />
        <TabButtons
          tabs={buttonNames}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <TabView
          navigationState={{ index: selectedTab, routes }}
          renderScene={renderScene}
          onIndexChange={setSelectedTab}
          swipeEnabled={false} 
          initialLayout={initialLayout}
          renderTabBar={() => null}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
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


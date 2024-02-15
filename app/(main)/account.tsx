import {
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { TabView, SceneMap } from "react-native-tab-view";
import { useEffect, useRef, useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";
import AccountMainInfo from "@/components/Account/AccountMainInfo";
import TabButtons from "@/components/Account/TabButtons";
import AssetTab from "@/components/Account/Assets/AssetTab";
import { BlurView } from "expo-blur";

export default function Account() {
  const currentUser = useCurrentUserValue();

  const [selectedTab, setSelectedTab] = useState(0);

  const buttonNames = ["Skills", "Assets", "Portofolio", "Experience"];

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsSticky(offsetY - 20 > Dimensions.get("window").height * 0.21);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <ScrollView
      style={{
        height: "100%",
        width: "100%",
        paddingTop: !isSticky ? 0 : 0,
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      pointerEvents="box-none"
      stickyHeaderIndices={[1]}
      scrollEventThrottle={20}
      onScroll={handleScroll}
    >
      <AccountMainInfo
        coins={currentUser.coins || 0}
        username={currentUser.username || "username"}
        rating={currentUser.rating || 0}
      />

      <TabButtons
        tabs={buttonNames}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isSticky={isSticky}
      />
      <View
        style={{
          ...styles.scene,
          display: selectedTab !== 0 ? "none" : "flex",
        }}
      >
        <SkillsTab />
      </View>
      <View
        style={{
          ...styles.scene,
          display: selectedTab !== 1 ? "none" : "flex",
        }}
      >
        <AssetTab />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "transparent",
    paddingBottom: "20%",
    paddingTop: "2.3%",
    paddingHorizontal: "3%",
    height: "100%",
    width: "100%",
  },
});

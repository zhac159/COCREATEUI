import {
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { View } from "@/components/Themed";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";
import AccountMainInfo from "@/components/Account/AccountMainInfo";
import TabButtons from "@/components/Account/TabButtons";
import AssetTab from "@/components/Account/Assets/AssetTab";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PortofolioContentTab from "@/components/Account/PortofolioContents/PortofolioContentTab";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

export default function Account() {
  const currentUser = useCurrentUserValue();

  const [selectedTab, setSelectedTab] = useState(0);

  const buttonNames = ["Skills", "Assets", "Portofolio", "Experience"];

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsSticky(offsetY - 15 > windowHeight * 0.22);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      style={{
        height: "100%",
        width: "100%",
        paddingTop: !isSticky ? 0 : 0,
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      pointerEvents="box-none"
      stickyHeaderIndices={[1]}
      scrollEventThrottle={5}
      onScroll={handleScroll}
    >
      <AccountMainInfo
        coins={currentUser.coins || 0}
        username={currentUser.username || "username"}
        rating={currentUser.rating || 0}
        isSticky={isSticky}

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
      <View
        style={{
          ...styles.scene,
          display: selectedTab !== 2 ? "none" : "flex",
        }}
      >
        <PortofolioContentTab />
      </View>
    </KeyboardAwareScrollView>
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

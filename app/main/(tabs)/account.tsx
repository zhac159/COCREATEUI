import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
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
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";

export default function Account() {
  const currentUser = useCurrentUserValue();

  const [selectedTab, setSelectedTab] = useState(0);

  const buttonNames = ["Skills", "Assets", "Portofolio", "Experience"];

  const [isSticky, setIsSticky] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsSticky((offsetY - windowHeight * 0.22 + 200) / 10);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <BackgroundColourAnimation />
      <KeyboardAwareScrollView
        style={{
          height: "100%",
          width: "100%",
          flex: 1,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        pointerEvents="box-none"
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <AccountMainInfo
          coins={currentUser.coins || 0}
          username={currentUser.username || "username"}
          rating={currentUser.rating || 0}
          blur={isSticky}
        />
        <TabButtons
          tabs={buttonNames}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          blur={isSticky}
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
    </>
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

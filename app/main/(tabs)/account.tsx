import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  View,
} from "react-native";
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
import ExperienceTab from "@/components/Experience/ExperienceTab";
import { TabView, SceneMap } from "react-native-tab-view";

const renderScene = SceneMap({
  first: SkillsTab,
  second: AssetTab,
  third: PortofolioContentTab,
  fourth: ExperienceTab,
});

export default function Account() {
  const currentUser = useCurrentUserValue();

  // const [selectedTab, setSelectedTab] = useState(0);

  const buttonNames = ["Skills", "Assets", "Portofolio", "Experience"];

  const [isSticky, setIsSticky] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsSticky((offsetY - windowHeight * 0.22 + 200) / 10);
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
  ]);

  return (
    <>
      <BackgroundColourAnimation />
      <KeyboardAwareScrollView
        style={{
          height: "100%",
          width: "100%",
          paddingBottom: 200,
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        // onScroll={handleScroll}
      >
        <AccountMainInfo
          coins={currentUser.coins || 0}
          username={currentUser.username || "username"}
          rating={currentUser.rating || 0}
          blur={isSticky}
        />
        <TabButtons
          tabs={buttonNames}
          selectedTab={index}
          setSelectedTab={setIndex}
          blur={isSticky}
        />
        <TabView
          sceneContainerStyle={styles.scene}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={() => null}
          animationEnabled={false}
          swipeEnabled={false}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "transparent",
    paddingBottom: "20%",
    paddingTop: "2.3%",
    paddingHorizontal: "3%",
    height: "100%",
    width: "100%",
  },
});

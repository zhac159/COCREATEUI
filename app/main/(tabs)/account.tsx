import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
import SettingsTab from "@/components/Account/Settings/SettingsTab";

const renderScene = SceneMap({
  first: SkillsTab,
  second: AssetTab,
  third: PortofolioContentTab,
  fourth: ExperienceTab,
  fifth: SettingsTab,
});

export default function Account() {
  const currentUser = useCurrentUserValue();

  const tabsNames = ["Skills", "Assets", "Portofolio", "Experience"];

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsSticky(offsetY > windowHeight * 0.22);
  };

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
    { key: "fifth", title: "Fifth" },
  ]);

  return (
    <>
      <BackgroundColourAnimation />
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <AccountMainInfo
          coins={currentUser.coins || 0}
          username={currentUser.username}
          rating={currentUser.rating}
        />
        <TabButtons
          tabs={tabsNames}
          selectedTab={index}
          setSelectedTab={setIndex}
          isSticky={isSticky}
        />
        <TabView
          sceneContainerStyle={styles.scene}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          
          renderTabBar={() => null}
          style={{ height: 1000 }}
          // animationEnabled={false}
          // swipeEnabled={false}
        />
        {/* <PortofolioContentTab /> */}
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
  container: {
    height: "100%",
    width: "100%",
    flex: 1
  },
});

import {
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
} from "react-native";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { useRef, useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";
import AccountMainInfo from "@/components/Account/AccountMainInfo";
import TabButtons from "@/components/Account/TabButtons";
import AssetTab from "@/components/Account/Assets/AssetTab";
import PortofolioContentTab from "@/components/Account/PortofolioContents/PortofolioContentTab";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import ExperienceTab from "@/components/Experience/ExperienceTab";
import SettingsTab from "@/components/Account/Settings/SettingsTab";
import { CollapsibleRef, Tabs } from "react-native-collapsible-tab-view";

const HEADER_HEIGHT = 250;

export default function Account() {
  const currentUser = useCurrentUserValue();

  const collapsibleRef = useRef<CollapsibleRef>(null);

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
      <Tabs.Container
        headerContainerStyle={{ backgroundColor: "transparent" }}
        snapThreshold={0.5}
        renderHeader={() => (
          <AccountMainInfo
            coins={currentUser.coins || 0}
            username={currentUser.username}
            rating={currentUser.rating}
          />
        )}
        onTabChange={(data) => console.log(data)}
        renderTabBar={(state) => (
          <TabButtons
            tabs={tabsNames}
            selectedTab={index}
            setSelectedTab={(index) => {
              collapsibleRef.current?.setIndex(index);
              setIndex(index);
              console.log(state);
            }}
            isSticky={isSticky}
          />
        )}
        pagerProps={
          {
            scrollEnabled: false,
          }
        }
        onIndexChange={(index) => console.log(index)}
        ref={collapsibleRef}
      >
        <Tabs.Tab name="skills">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
          >
            <SkillsTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="assets">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
          >
            <AssetTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="portofolio">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
          >
            <PortofolioContentTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="experience">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
          >
            <ExperienceTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="settings">
          <Tabs.ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
          >
            <SettingsTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    paddingHorizontal: "3%",
    marginTop: 30,
    paddingBottom: 200,
  },
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "white",
  },
  boxB: {
    backgroundColor: "#D8D8D8",
  },
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});

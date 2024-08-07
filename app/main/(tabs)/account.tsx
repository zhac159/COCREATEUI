import {
  StyleSheet
} from "react-native";
import { useCurrentUserValue } from "@/components/RecoilStates/profileState";
import { useRef, useState } from "react";
import SkillsTab from "@/components/Account/Skills/SkillsTab";
import AccountMainInfo from "@/components/Account/AccountMainInfo";
import TabButtons from "@/components/Account/TabButtons";
import AssetTab from "@/components/Account/Assets/AssetTab";
import PortofolioContentTab from "@/components/Account/PortofolioContents/PortofolioContentTab";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import ExperienceTab from "@/components/Experience/ExperienceTab";
import SettingsTab from "@/components/Account/Settings/SettingsTab";
import { CollapsibleRef, Tabs } from "react-native-collapsible-tab-view";

const HEADER_HEIGHT = 250;

export default function Account() {

  const currentUser = useCurrentUserValue();

  const collapsibleRef = useRef<CollapsibleRef>(null);

  const [index, setIndex] = useState(0);

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
        renderTabBar={() => (
          <TabButtons
            selectedTab={index}
            setSelectedTab={(index) => {
              collapsibleRef.current?.setIndex(index);
              setIndex(index);
            }}
          />
        )}
        pagerProps={
          {
            scrollEnabled: false,
          }
        }
        ref={collapsibleRef}
      >
        <Tabs.Tab name="skills">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
            automaticallyAdjustKeyboardInsets
          >
            <SkillsTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="assets">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
            automaticallyAdjustKeyboardInsets
          >
            <AssetTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="portofolio">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
            automaticallyAdjustKeyboardInsets
          >
            <PortofolioContentTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="experience">
          <Tabs.ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scene}
            automaticallyAdjustKeyboardInsets
          >
            <ExperienceTab />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="settings">
          <Tabs.ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
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

import { StyleSheet, View } from "react-native";
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
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import UserDetails from "@/components/Account/MainAccountPage/UserDetails";

const HEADER_HEIGHT = 250;

export default function Account() {
  const currentUser = useCurrentUserValue();

  const collapsibleRef = useRef<CollapsibleRef>(null);

  const [index, setIndex] = useState(0);

  return (
    <ScrollView
      style={{
        gap: 10,
      }}
      contentContainerStyle={{
        gap: 10,
      }}
    >
      <UserDetails />
    </ScrollView>
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

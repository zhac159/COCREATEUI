import { FC } from "react";
import { Button, IconButton, Text } from "react-native-paper";
import { View } from "@/components/Themed";
import { useTheme } from "../Themes/theme";
import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

type TabButtonsProps = {
  tabs: string[];
  selectedTab: number;
  setSelectedTab: (inx: number) => void;
  blur: number;
};

const TabButtons: FC<TabButtonsProps> = ({
  tabs,
  selectedTab,
  setSelectedTab,
  blur,
}) => {
  const theme = useTheme();

  return (
    <BlurView
      style={{...styles.container, paddingTop: 55}}
      intensity={blur}
    >
      {tabs.map((name, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            setSelectedTab(idx);
          }}
          style={{
            backgroundColor: selectedTab == idx ? theme.colors.black : "transparent",
            opacity: 0.7,
            borderRadius: 20,
          }}
          hitSlop={{ bottom: 20, top: 20 }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              color: selectedTab == idx ? theme.colors.white : theme.colors.black,
              ...styles.buttonLabel
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>
      ))}
      <View
        style={{
          width: 1,
          height: "100%",
          backgroundColor: theme.colors.black,
          marginHorizontal: 10,
        }}
      />
      <IconButton
        icon="cog"
        size={20}
        onPress={() => {
          console.log("Pressed");
        }}
        style={styles.icon}
        iconColor={theme.colors.black}
      />
    </BlurView>
  );
};

export default TabButtons;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 22,
    paddingRight: 16,
    paddingLeft: 18,
    width: "100%",
    backgroundColor: "transparent",
  },
  buttonLabel : {
    marginBottom: 5,
    marginTop: 5,
    marginRight: 9,
    marginLeft: 9,
  },
  icon : {
    margin: 0,
    marginBottom: -1000,
    padding: 0,
  }
});
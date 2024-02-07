import { FC } from "react";
import { Button, Text } from "react-native-paper";
import { View } from "@/components/Themed";


type TabButtonsProps = {
  tabs: string[];
  selectedTab: number;
  setSelectedTab: (inx: number) => void;
};

const TabButtons: FC<TabButtonsProps> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        paddingBottom: 15,
        paddingTop: 15,
        width: "100%",
        backgroundColor: "transparent",
      }}
    >
      {tabs.map((name, idx) => (
        <Button
          key={idx}
          onPress={() => {
            setSelectedTab(idx);
          }}
          style={{
            backgroundColor: selectedTab == idx ? "blue" : "transparent",
          }}
        >
          <Text
            style={{
              color: selectedTab == idx ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            {name}
          </Text>
        </Button>
      ))}
    </View>
  );
};

export default TabButtons;
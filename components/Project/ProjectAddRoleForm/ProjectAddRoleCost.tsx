import Coins from "@/components/Common/Coins";
import { useCoinsValue } from "@/components/RecoilStates/profileState";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction, useRef } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type ProjectAddRoleCostProps = {
  cost?: number;
  setCost: Dispatch<SetStateAction<number | undefined>>;
};

const ProjectAddRoleCost: FC<ProjectAddRoleCostProps> = ({ cost, setCost }) => {
  const theme = useTheme();
  const availableCoins = useCoinsValue();
  const coinsRef = useRef<TextInput>(null);
  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        gap: 30,
        marginBottom: "10%",
      }}
    >
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        How Much Do You Want To Offer ?
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 14,
          paddingVertical: 13,
          paddingLeft: 18,
          paddingRight: 12,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 22,
            color: theme.colors.darkGray,
          }}
        >
          Credits Available:
        </Text>
        <Coins coins={availableCoins || 0} showShadow={false} />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          coinsRef.current?.focus();
          console.log("Pressed");
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
          borderRadius: 15,
          paddingVertical: 13,
          paddingLeft: 18,
          paddingRight: 12,
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 22,
            color: theme.colors.white,
          }}
        >
          Offer:
        </Text>
        <Coins
          coins={cost || 0}
          showShadow={false}
          setCoins={(coins: number) => {
            setCost(coins);
          }}
          textInputRef={coinsRef}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProjectAddRoleCost;

const styles = StyleSheet.create({
  titleTextInput: {
    fontSize: 25,
    height: "12%",
    padding: 10,
    borderRadius: 7,
  },
  desciptionTextInput: {
    fontSize: 16,
    height: "25%",
    padding: 10,
    borderRadius: 7,
  },
  mainImage: {
    borderRadius: 7,
    flex: 1,
  },
});

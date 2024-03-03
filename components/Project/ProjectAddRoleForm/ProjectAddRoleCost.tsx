import { useCoinsValue } from "@/components/RecoilStates/profileState";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction } from "react";
import { Text, StyleSheet, TextInput, View } from "react-native";

type ProjectAddRoleCostProps = {
  cost: number;
  setCost: Dispatch<SetStateAction<number>>;
};

const ProjectAddRoleCost: FC<ProjectAddRoleCostProps> = ({ cost, setCost }) => {
  const theme = useTheme();
  const availableCoins = useCoinsValue();
  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
        }}
      >
        How Much Do You Want To Offer ?
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontWeight: "500",
          fontSize: 14,
        }}
      >
        What is Your Project About
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
            color: theme.colors.darkerGray,
          }}
        >
          Credits Available:
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 22,
          }}
        >
          {availableCoins}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme.colors.primary,
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
            color: theme.colors.white,
          }}
        >
          Offer:
        </Text>
        <TextInput
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.white,
            fontSize: 22,
            minWidth: "5%",
          }}
          keyboardType="numeric"
          value={cost.toString()}
          onChangeText={(text) => setCost(Number(text))}
        />
      </View>
    </>
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

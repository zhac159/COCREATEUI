import { SkillType } from "@/common/api/model";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../Themes/theme";
import Coins from "@/components/Common/Coins";
import { getSkill } from "@/components/Account/Skills/skillHelper";
import { BlurView } from "expo-blur";

type RoleDetailCoinRoleProps = {
  cost: number;
  skillType: SkillType | undefined;
};

const RoleDetailCoinRole: FC<RoleDetailCoinRoleProps> = ({
  cost,
  skillType,
}) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.coinsRoleContainer }}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.role,
          color: theme.colors.white,
        }}
      >
        {skillType !== undefined ? getSkill(skillType) : "N/A"}
      </Text>
      <Coins coins={cost} showShadow={false} />
      <BlurView
        style={{
          ...styles.blurView,
          backgroundColor: theme.colors.black,
          opacity: 0.7,
        }}
        intensity={15}
      />
    </View>
  );
};

export default RoleDetailCoinRole;

const styles = StyleSheet.create({
  coinsRoleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
    paddingLeft: 20,
    marginBottom: 10,
    gap: 20,
  },
  blurView: {
    zIndex: -1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  role: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});

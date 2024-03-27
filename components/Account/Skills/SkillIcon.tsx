import { SkillType } from "@/common/api/model";
import { FC } from "react";
import { getSkillGroupColor, getSkillIcon, skillGroupMap } from "./skillHelper";
import { View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";

type SkillIconProps = {
  skillType: SkillType | undefined;
};

const SkillIcon: FC<SkillIconProps> = ({ skillType }) => {
  const skillGroupType = skillGroupMap[skillType || 0];

  const color = getSkillGroupColor(skillGroupType);
  const icon = getSkillIcon(skillType || 0);

  const theme = useTheme();

  if(skillType === undefined)
    return <View></View>
  return (
    <View style={{ ...skillStyles.skillIcon, backgroundColor: color }}>
      <FontAwesome6 name={icon} size={17} color={theme.colors.white} solid />
    </View>
  );
};

export const skillStyles = StyleSheet.create({
  skillIcon: {
    backgroundColor: "#FF00FF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
  },
});

export default SkillIcon;

import { SkillType } from "@/common/api/model";
import { FC, useMemo } from "react";
import { StyleSheet, View, Text, ViewStyle, TextStyle } from "react-native";
import { getSkill } from "./skillHelper";
import { useTheme } from "@/components/Themes/theme";
import SkillIcon from "./SkillIcon";

type SkillTagProps = {
  skill?: SkillType;
  style?: ViewStyle;
  textStyle?: TextStyle;  
};

const SkillTag: FC<SkillTagProps> = ({ skill, style,  textStyle }) => {
  const theme = useTheme();

  const name = useMemo(() => getSkill(skill).replace(" ", "\n"), [skill]);

  if (skill === undefined) return null;

  return (
    <View
      style={{
        ...styles.skill,
        ...style,
      }}
    >
      <SkillIcon skillType={skill} />
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          ...textStyle,
          fontSize: 13,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default SkillTag;

const styles = StyleSheet.create({
  skill: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    gap: 10,
  },
});

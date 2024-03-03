import { SkillDTO, SkillType } from "@/common/api/model";
import { FC } from "react";
import { Text } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { getSkill, getSkillGroupColor } from "./skillHelper";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@/components/Themes/theme";
import SkillIcon from "./SkillIcon";

type SkillProps = {
  skill: SkillDTO;
  editMode: boolean;
  deselectSkill?: (skillDTO: SkillDTO) => void;
  selectSkill?: (skillDTO: SkillDTO) => void;
  selectedSkillType?: SkillType;
};

const Skill: FC<SkillProps> = ({
  skill,
  editMode,
  deselectSkill,
  selectSkill,
  selectedSkillType,
}) => {
  if (
    !skill ||
    skill.skillGroupType === undefined ||
    skill.skillType == undefined
  )
    return null;

  const color = getSkillGroupColor(skill.skillGroupType);
  const name = getSkill(skill.skillType).replace(" ", "\n");

  const handlePress = () => {
    deselectSkill ? deselectSkill(skill) : null;
  };

  const WiggleAnimation = {
    0: {
      transform: [{ rotate: "-1deg" }],
    },
    0.5: {
      transform: [{ rotate: "1deg" }],
    },
    1: {
      transform: [{ rotate: "-1deg" }],
    },
  };

  const theme = useTheme();

  return (
    <TouchableOpacity
      disabled={!selectSkill}
      onPress={() => (selectSkill ? selectSkill(skill) : null)}
    >
      <Animatable.View
        duration={500}
        iterationCount="infinite"
        animation={editMode ? WiggleAnimation : undefined}
      >
        <View
          style={{
            ...skillStyles.skillContainer,
            backgroundColor:
              selectedSkillType === skill.skillType
                ? color
                : theme.colors.white,
          }}
        >
          <SkillIcon
            skillType={skill.skillType}
          />
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 13,
              color:
                selectedSkillType === skill.skillType
                  ? theme.colors.white
                  : theme.colors.black,
            }}
          >
            {name}
          </Text>
          {editMode && (
            <TouchableOpacity
              style={skillStyles.deleteIconButton}
              onPress={handlePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <FontAwesome6 name="minus" size={15} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default Skill;

export const skillStyles = StyleSheet.create({
  skillContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    gap: 11,
    paddingHorizontal: 15,
    paddingVertical: 11,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    shadowOpacity: 0.05,
    shadowRadius: 6,
    position: "relative",
  },
  deleteIconButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 5,
  },
});

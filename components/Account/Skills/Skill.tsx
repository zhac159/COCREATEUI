import { SkillDTO } from "@/common/api/model";
import { FC } from "react";
import { Text } from "react-native-paper";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { getSkill, getSkillGroupColor, getSkillIcon } from "./skillHelper";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@/components/Themes/theme";

type SkillProps = {
  skill: SkillDTO;
  editMode: boolean;
  deselectSkill?: (skillDTO: SkillDTO) => void;
  selectSkill?: (skillDTO: SkillDTO) => void;
};

const Skill: FC<SkillProps> = ({
  skill,
  editMode,
  deselectSkill,
  selectSkill,
}) => {
  if (
    !skill ||
    skill.skillGroupType === undefined ||
    skill.skillType == undefined
  )
    return null;

  const color = getSkillGroupColor(skill.skillGroupType);
  const icon = getSkillIcon(skill.skillGroupType);
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
        <View style={styles.skillContainer}>
          <View
            style={styles.skillIcon}
          >
            <FontAwesome6
              name="camera"
              size={17}
              color={theme.colors.white}
              solid
            />
          </View>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 13,
            }}
          >
            {name}
          </Text>
          {editMode && (
            <TouchableOpacity
              style={styles.deleteIconButton}
              onPress={handlePress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name="minus-thick"
                size={15}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default Skill;

const styles = StyleSheet.create({
  skillContainer: {
    backgroundColor: "white",
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
  skillIcon: {
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 11,
  },
  deleteIconButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 50,
    padding: 5,
  }
});

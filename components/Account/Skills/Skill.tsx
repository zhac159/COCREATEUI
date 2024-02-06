import { SkillDTO, SkillGroupType, SkillType } from "@/common/api/model";
import { FC, useRef } from "react";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Tags from "react-native-tags";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { getSkill, getSkillGroupColor, getSkillIcon } from "./skillHelper";
import * as Animatable from "react-native-animatable";

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
        <Shadow distance={8}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 25,
              padding: 16,
              margin: 5,
              width: 190,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              position: "relative",
            }}
          >
            <View
              style={{
                backgroundColor: color,
                borderRadius: 90,
                padding: 5,
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name={icon as any}
                size={30}
                color="white"
              />
            </View>
            <Text style={{ color: "black", marginLeft: 12 }}>{name}</Text>
            {editMode && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "red",
                  borderRadius: 50,
                  padding: 5,
                }}
                onPress={handlePress}
              >
                <MaterialCommunityIcons
                  name="minus-thick"
                  size={15}
                  color="white"
                />
              </TouchableOpacity>
            )}
          </View>
        </Shadow>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default Skill;

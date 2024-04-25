import React, { FC, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { getSkill, getSkillGroupColor } from "./skillHelper";
import SkillIcon from "./SkillIcon";
import { SkillDTO, SkillType } from "@/common/api/model";

type SkillFrontSideProps = {
  skill: SkillDTO;
  editMode: boolean;
  deselectSkill?: (skillDTO: SkillDTO) => void;
  selectSkill?: (skillDTO: SkillDTO) => void;
  selectedSkill?: SkillType;
  flipMode?: boolean;
};

const SkillFrontSide: FC<SkillFrontSideProps> = ({
  skill,
  editMode,
  deselectSkill,
  selectSkill,
  selectedSkill,
  flipMode = false,
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
      activeOpacity={1}
      onPress={() => (selectSkill ? selectSkill(skill) : null)}
    >
      <Animatable.View
        duration={500}
        iterationCount="infinite"
        animation={editMode ? WiggleAnimation : undefined}
        style={{ backgroundColor: "transparent" }}
      >
        <View
          style={{
            ...skillStyles.skillContainer,
            backgroundColor:
              selectedSkill === skill.skillType ? color : theme.colors.white,
          }}
        >
          <SkillIcon skillType={skill.skillType} />
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 13,
              color:
                selectedSkill === skill.skillType
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

export default SkillFrontSide;

const skillStyles = StyleSheet.create({
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
  
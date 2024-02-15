import { SkillDTO } from "@/common/api/model";
import { TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Skill from "./Skill";
import React, { FC, useState } from "react";
import { SkillGroups } from "./skillHelper";
import { useTheme } from "@/components/Themes/theme";

type SkillsAddMenuProps = {
  restOfTheSkills: SkillDTO[];
  show: boolean;
  selectSkill: (skillDTO: SkillDTO) => void;
};

const SkillsAddMenu: FC<SkillsAddMenuProps> = ({
  restOfTheSkills,
  show,
  selectSkill,
}) => {
  if (!show) return null;

  const [skillGroupType, setSkillGroupType] = useState<SkillGroups>(
    SkillGroups.Fashion
  );

  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        top: "10%",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "50%",
        }}
      >
        {Object.keys(SkillGroups)
          .filter((key) => isNaN(Number(key)))
          .map((skillGroup, index) => (
            <View key={index + "skill-types"} style={{ alignSelf: "flex-start" }}>
              <TouchableOpacity
                onPress={() =>
                  setSkillGroupType(
                    SkillGroups[skillGroup as keyof typeof SkillGroups]
                  )
                }
                style={{
                  backgroundColor:
                    skillGroupType ===
                    SkillGroups[skillGroup as keyof typeof SkillGroups]
                      ? theme.colors.primary
                      : "transparent",
                  marginTop: 10,
                  paddingHorizontal: 11,
                  paddingVertical: 5,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    ...theme.customFonts.primary.medium,
                    color:
                      skillGroupType ===
                      SkillGroups[skillGroup as keyof typeof SkillGroups]
                        ? theme.colors.white
                        : theme.colors.black,
                  }}
                >
                  {skillGroup}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <View
        style={{
          width: "48%",
        }}
      >
        {restOfTheSkills.map((skill, index) =>
          skill.skillGroupType == skillGroupType ? (
            <View key={index + "-add-skill-list"} style={{ width: "100%", paddingBottom: "5%" }}>
              <Skill
                skill={skill}
                editMode={false}
                selectSkill={selectSkill}
              />
            </View>
          ) : null
        )}
      </View>
    </View>
  );
};

export default SkillsAddMenu;

import { SkillDTO } from "@/common/api/model";
import { View } from "react-native";
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
        justifyContent: "space-between",
        top: "10%",
      }}
    >
      <View>
        {Object.keys(SkillGroups)
          .filter((key) => isNaN(Number(key))) // Filter out the numbers
          .map((skillGroup, index) => (
            <Button
              key={index}
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
                alignContent: "flex-start",
                justifyContent: "flex-start",
              }}
              labelStyle={{
                ...theme.customFonts.primary.medium,
                color:
                  skillGroupType ===
                  SkillGroups[skillGroup as keyof typeof SkillGroups]
                    ? theme.colors.white
                    : theme.colors.black,
                textAlign: "left",
                alignSelf: "flex-start",
                justifyContent: "flex-start",
                marginBottom: 0,
                marginTop: 0,
                marginLeft: 0,
                marginRight: 0,
                paddingVertical: 5,
              }}
            >
              {skillGroup}
            </Button>
          ))}
      </View>
      <View style={{ paddingRight: 20 }}>
        {restOfTheSkills.map((skill, index) =>
          skill.skillGroupType == skillGroupType ? (
            <Skill
              skill={skill}
              editMode={false}
              selectSkill={selectSkill}
              key={skill.id}
            />
          ) : null
        )}
      </View>
    </View>
  );
};

export default SkillsAddMenu;

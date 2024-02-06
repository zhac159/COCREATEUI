import { SkillDTO } from "@/common/api/model";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Skill from "./Skill";
import React, { FC, useState } from "react";
import { SkillGroups } from "./skillHelper";

type SkillsAddMenuProps = {
  restOfTheSkills: SkillDTO[];
  show: boolean;
  selectSkill: (skillDTO: SkillDTO) => void;
};

const SkillsAddMenu: FC<SkillsAddMenuProps> = ({ restOfTheSkills, show, selectSkill}) => {
  if (!show) return null;

  const [skillGroupType, setSkillGroupType] = useState<SkillGroups>(
    SkillGroups.Fashion
  );

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
      <View style={{paddingLeft: 20, paddingTop: 20}}>
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
                    ? "lightgreen"
                    : "white",
              }}
            >
              {skillGroup}
            </Button>
          ))}
      </View>
      <View style={{paddingRight: 20}}>
        {restOfTheSkills.map((skill, index) => (
          skill.skillGroupType == skillGroupType ? <View key={index} style={{ width: "47.5%", margin: "1.25%",  paddingTop: 14 }}>
            <Skill skill={skill} editMode={false} selectSkill = {selectSkill} />
          </View> : null
        ))}
      </View>
    </View>
  );
};

export default SkillsAddMenu;

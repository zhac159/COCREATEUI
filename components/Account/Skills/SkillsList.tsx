import { SkillDTO } from "@/common/api/model";
import { chunk, flatten, groupBy, map } from "lodash";
import { FC } from "react";
import {  View } from "react-native";
import Skill from "./Skill";

type SkillsListProps = {
  skills: SkillDTO[];
  editMode: boolean;
  deselectSkill: (skillDTO: SkillDTO) => void;
};

const SkillsList: FC<SkillsListProps> = ({
  skills,
  editMode,
  deselectSkill,
}) => {
  const groupedSkills = map(groupBy(skills, "SkillGroupType"), (data) => data);
  const joinedSkills = flatten(groupedSkills);
  const skillChunks = chunk(joinedSkills, 2);

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {skillChunks.map((skillChunk, index) => (
        <View
          key={index + "chunk"}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          {skillChunk.map((skill, index) => (
            <View key={index + "skill-list-has"} style={{ width: "48%" }}>
              <Skill
                skill={skill}
                editMode={editMode}
                deselectSkill={deselectSkill}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SkillsList;

import { SkillDTO } from "@/common/api/model";
import { chunk, flatten, groupBy, map } from "lodash";
import { FC } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { Text } from "react-native-paper";
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
          key={index}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          {skillChunk.map((skill) => (
            <View key={skill.id} style={{ width: "48%" }}>
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

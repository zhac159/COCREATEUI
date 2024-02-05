import { SkillDTO } from "@/common/api/model";
import { flatten, groupBy, map } from "lodash";
import { FC } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import Skill from "./Skill";

type SkillsListProps = {
  skills: SkillDTO[];
  editMode: boolean;
  deselectSkill: (skillDTO: SkillDTO) => void

};

const SkillsList: FC<SkillsListProps> = ({ skills, editMode, deselectSkill }) => {
  if (!skills || skills.length === 0) return <Text>No skills</Text>;

  const groupedSkills = map(groupBy(skills, "SkillGroupType"), (data) => data);
  const joinedSkills = flatten(groupedSkills);

  return (
    <FlatList
      data={joinedSkills}
      renderItem={({ item: skill }) => (
        <View style={{ width: "47.5%", margin: "1.25%" }}>
          <Skill skill={skill} editMode={editMode} deselectSkill={deselectSkill}/>
        </View>
      )}
      scrollEnabled={false}
      keyExtractor={(_, index) => index.toString()}
      numColumns={2}
      style={{
        alignSelf: joinedSkills.length === 1  ?  "auto":"center",
        width: "100%",
      }}
      contentContainerStyle={{
        marginTop: 10,
        gap: 10,
        height: "auto",
        alignItems: joinedSkills.length === 1 ? "flex-start" : "center",
      }}
    />
  );
};

export default SkillsList;

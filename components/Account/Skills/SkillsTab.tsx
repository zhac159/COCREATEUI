import { useSkillsState } from "@/components/RecoilStates/profileState";
import { flatten, groupBy, map } from "lodash";
import React, { useEffect, useState } from "react";
import SkillsList from "./SkillsList";
import SkillsAddMenu from "./SkillsAddMenu";
import { SkillDTO } from "@/common/api/model";
import { usePutApiUserSkills } from "@/common/api/endpoints/cocreateApi";
import { getRestOfSkills, mapSkillDTOToSkillUpdateDTO } from "./skillHelper";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { StyleSheet, View } from "react-native";

const SkillsTab = () => {
  const { mutate } = usePutApiUserSkills();
  const [editMode, setEditMode] = useState(false);

  const [skills, setSkills] = useSkillsState();
  const [restOfTheSkills, setRestOfTheSkills] = useState<SkillDTO[]>([]);

  const deselectSkill = (skillDTO: SkillDTO) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill.skillType !== skillDTO.skillType)
    );
    setRestOfTheSkills((prevRestOfSkills) => [...prevRestOfSkills, skillDTO]);
  };

  const selectSkill = (skillDTO: SkillDTO) => {
    setRestOfTheSkills((prevRestOfSkills) =>
      prevRestOfSkills.filter((skill) => skill.skillType !== skillDTO.skillType)
    );
    setSkills((prevSkills) => [...prevSkills, skillDTO]);
  };

  const groupedSkills = map(groupBy(skills, "SkillGroupType"), (data) => data);
  const skillsSelected = flatten(groupedSkills);

  const handleSubmit = () => {
    mutate({
      data: skills.map(mapSkillDTOToSkillUpdateDTO),
    });
  };

  useEffect(() => {
    setRestOfTheSkills(getRestOfSkills(skills));
  }, []);

  useEffect(() => {
    if (!editMode && (!skills || skills.length === 0)) {
      setEditMode(true);
    }
  }, [skills]);

  return (
    <View style={styles.scene}>
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        onDone={handleSubmit}
        showPlayButton={true}
      />
      <View style={styles.listsConstiner}>
        <SkillsList
          skills={skillsSelected}
          editMode={editMode}
          deselectSkill={deselectSkill}
          flipMode={editMode}
        />
        <SkillsAddMenu
          restOfTheSkills={restOfTheSkills}
          show={editMode}
          selectSkill={selectSkill}
        />
      </View>
    </View>
  );
};

export default SkillsTab;

export const styles = StyleSheet.create({
  scene: {
    flexGrow: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
  },
  listsConstiner: {
    gap: 60,
  },
});

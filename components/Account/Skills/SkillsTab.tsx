import { useSkillsState } from "@/components/RecoilStates/profileState";
import { flatten, groupBy, map } from "lodash";
import React, { useEffect, useState } from "react";
import SkillsList from "./SkillsList";
import SkillsAddMenu from "./SkillsAddMenu";
import { SkillDTO } from "@/common/api/model";
import { usePutApiUserSkills } from "@/common/api/endpoints/cocreateApi";
import { getRestOfSkills, mapSkillDTOToSkillUpdateDTO } from "./skillHelper";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { View } from "react-native";

const SkillsTab = () => {
  const [skills, setSkills] = useSkillsState();
  const [restOfTheSkills, setRestOfTheSkills] = useState<SkillDTO[]>([]);
  const { mutate } = usePutApiUserSkills();

  const [editMode, setEditMode] = useState(false);

  const deselectSkill = (skillDTO: SkillDTO) => {
    setSkills((prevSkills) =>
      prevSkills
        ? prevSkills.filter((skill) => skill.skillType !== skillDTO.skillType)
        : []
    );
    setRestOfTheSkills((prevRestOfSkills) => [...prevRestOfSkills, skillDTO]);
  };

  const selectSkill = (skillDTO: SkillDTO) => {
    setRestOfTheSkills((prevRestOfSkills) =>
      prevRestOfSkills.filter((skill) => skill.skillType !== skillDTO.skillType)
    );
    setSkills((prevSkills) => (prevSkills ? [...prevSkills, skillDTO] : []));
  };

  const groupedSkills = map(groupBy(skills, "SkillGroupType"), (data) => data);
  const skillsSelected = flatten(groupedSkills);

  const handleSubmit = () => {
    if (editMode && skills) {
      mutate({
        data: skills.map(mapSkillDTOToSkillUpdateDTO),
      });
    }
  };

  useEffect(() => {
    setRestOfTheSkills(getRestOfSkills(skills ?? []));
  }, []);

  useEffect(() => {
    if (!editMode && (!skills || skills.length === 0)) {
      setEditMode(true);
    }
  }, [skills]);

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-start",
      }}
    >
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        onDone={handleSubmit}
      />
      <SkillsList
        skills={skillsSelected}
        editMode={editMode}
        deselectSkill={deselectSkill}
      />
      <SkillsAddMenu
        restOfTheSkills={restOfTheSkills}
        show={editMode}
        selectSkill={selectSkill}
      />
    </View>
  );
};

export default SkillsTab;

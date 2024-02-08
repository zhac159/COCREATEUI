import { useSkillsState } from "@/components/RecoilStates/profileState";
import { Button, Divider, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { flatten, groupBy, map } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import SkillsList from "./SkillsList";
import SkillsAddMenu from "./SkillsAddMenu";
import { SkillDTO, SkillUpdateDTO } from "@/common/api/model";
import { usePutApiUserSkills } from "@/common/api/endpoints/cocreateApi";
import { getRestOfSkills } from "./skillHelper";

const SkillsTab = () => {
  const [skills, setSkills] = useSkillsState();

  const [editMode, setEditMode] = useState(false);

  const { mutate } = usePutApiUserSkills();

  const [restOfTheSkills, setRestOfTheSkills] = useState<SkillDTO[]>([]);

  useEffect(() => {
    setRestOfTheSkills(getRestOfSkills(skills ?? []));
  }, []);

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
  const joinedSkills = flatten(groupedSkills);

  const mapSkillDTOToSkillUpdateDTO = (skillDTO: SkillDTO): SkillUpdateDTO => {
    return {
      description: skillDTO.description,
      id: skillDTO.id,
      level: skillDTO.level,
      skillGroupType: skillDTO.skillGroupType,
      skillType: skillDTO.skillType,
    };
  };

  useEffect(() => {
    if (!editMode && (!skills || skills.length === 0)) {
      setEditMode(true);
    }
  }, [skills]);

  return (
    <ScrollView
      style={{ height: "100%", width: "100%" }}
      pointerEvents="box-none"
    >
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <View style={{ flex: 1, width: "100%", flexGrow: 1, flexWrap: "wrap" }}>
          <View
            style={{ width: "100%", flexWrap: "wrap", flex: 1, marginTop: 25 }}
          >
            <SkillsList
              skills={joinedSkills}
              editMode={editMode}
              deselectSkill={deselectSkill}
            />
            <Divider
              style={{
                width: "100%",
                marginTop: 30,
                borderWidth: 0.5,
                borderColor: "black",
              }}
            />
            <SkillsAddMenu
              restOfTheSkills={restOfTheSkills}
              show={editMode}
              selectSkill={selectSkill}
            />

            {editMode && (
              <Divider
                style={{
                  width: "100%",
                  marginTop: 30,
                  borderWidth: 0.5,
                  borderColor: "black",
                }}
              />
            )}
            <Button
              mode="contained"
              style={{
                marginTop: 20,
                width: 120,
                borderRadius: 20,
                backgroundColor: editMode ? "blue" : "black", // changes color based on editMode
                alignSelf: "center",
              }}
              onPress={() => {
                setEditMode(!editMode);

                if (editMode && skills) {
                  mutate({
                    data: skills.map(mapSkillDTOToSkillUpdateDTO),
                  });
                }
              }}
            >
              <Text style={{ color: "white" }}>
                {editMode ? "Save" : "Edit Skills"}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SkillsTab;

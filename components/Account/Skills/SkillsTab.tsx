import { useSkillsState } from "@/components/RecoilStates/profileState";
import { Button, Divider, IconButton, Text } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import { flatten, groupBy, map } from "lodash";
import React, { useEffect, useState } from "react";
import SkillsList from "./SkillsList";
import SkillsAddMenu from "./SkillsAddMenu";
import { SkillDTO } from "@/common/api/model";
import { usePutApiUserSkills } from "@/common/api/endpoints/cocreateApi";
import { getRestOfSkills, mapSkillDTOToSkillUpdateDTO } from "./skillHelper";
import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";

const SkillsTab = () => {
  const [skills, setSkills] = useSkillsState();

  const [editMode, setEditMode] = useState(false);

  const { mutate } = usePutApiUserSkills();

  const theme = useTheme();

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

  const handleSubmit = () => {
    setEditMode(!editMode);

    if (editMode && skills) {
      mutate({
        data: skills.map(mapSkillDTOToSkillUpdateDTO),
      });
    }
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
      <View style={styles.container}>
        <View
          style={styles.buttonsContainer}
        >
          {!editMode ? (
            <>
              <IconButton
                icon={() => (
                  <FontAwesome6 name="pen" size={18} color="white" solid />
                )}
                size={26}
                onPress={() => {
                  setEditMode(!editMode);
                }}
                style={{
                  backgroundColor: theme.colors.primary,
                  margin: 0,
                  padding: 0
                }}
              />
              <IconButton
                icon={() => (
                  <FontAwesome6 name="play" size={18} color="white" solid />
                )}
                size={26}
                onPress={() => {
                  console.log("Pressed");
                }}
                style={{
                  backgroundColor: theme.colors.black,
                  margin: 0,
                  padding: 0
                }}
              />
            </>
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: "1%",
                  paddingVertical: "2%",
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    ...theme.customFonts.primary.medium,
                    color: theme.colors.white,
                  }}
                >
                  {"Done"}
                </Text>
              </Button>
            </>
          )}
        </View>
        <SkillsList
          skills={joinedSkills}
          editMode={editMode}
          deselectSkill={deselectSkill}
        />
        <SkillsAddMenu
          restOfTheSkills={restOfTheSkills}
          show={editMode}
          selectSkill={selectSkill}
        />
      </View>
    </ScrollView>
  );
};

export default SkillsTab;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    flexGrow: 1,
    paddingTop: "2.3%",
    paddingHorizontal: "3%",
  },
  buttonsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginTop: "2.5%",
    paddingBottom: "8%",
    gap: 16
  },
  card: {
    width: 200,
    margin: 10,
    height: 200,
  },
  scene: {
    flex: 1,
    flexGrow: 1,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "transparent",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

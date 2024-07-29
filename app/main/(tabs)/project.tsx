import { StyleSheet } from "react-native";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import Projects from "@/components/Project/ProjectsMainPage/Projects";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import NoProjectsPage from "@/components/Project/NoProjectsPage";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const projects = useProjectValue();

  if (projects.length === 0) {
    return <NoProjectsPage setCreateMode={() => setCreateMode(true)} />;
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Projects
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 120,
    minHeight: windowHeight,
    justifyContent: "space-between",
    gap: 25,
  },
});

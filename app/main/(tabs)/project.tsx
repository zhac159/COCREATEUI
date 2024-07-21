import { StyleSheet } from "react-native";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectCreate from "@/components/Project/ProjectCreate/ProjectCreate";
import ProjectAddRoles from "@/components/Project/EditProjects/ProjectAddRoles";
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

  function renderContent() {
    if (projects.length === 0 && !createMode) {
      return <NoProjectsPage setCreateMode={() => setCreateMode(true)} />;
    } else if (editMode) {
      return (
        <ProjectAddRoles
          projectIndex={selectedProject}
          onCancel={() => setEditMode(false)}
        />
      );
    } else if (createMode) {
      return (
        <ProjectCreate
          onCancel={() => setCreateMode(false)}
          setEditMode={() => setEditMode(true)}
        />
      );
    } else {
      return (
        <Projects
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setCreateMode={setCreateMode}
          setEditMode={setEditMode}
        />
      );
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {renderContent()}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 200,
    minHeight: windowHeight,
    justifyContent: "space-between",
    gap: 25,
  },
});

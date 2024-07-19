import { StyleSheet } from "react-native";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectCreate from "@/components/Project/ProjectCreate/ProjectCreate";
import ProjectAddRoles from "@/components/Project/EditProjects/ProjectAddRoles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import Projects from "@/components/Project/ProjectsMainPage/Projects";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const projects = useProjectValue();

  function renderContent() {
    if (projects.length === 0 || createMode) {
      return <ProjectCreate onCancel={() => setCreateMode(false)} />;
    } else if (editMode) {
      return (
        <ProjectAddRoles
          projectIndex={selectedProject}
          onCancel={() => setEditMode(false)}
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
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 50,
        paddingBottom: 200,
        minHeight: windowHeight,
        paddingHorizontal: "2%",
        justifyContent: "space-between",
        gap: 25,
      }}
      keyboardShouldPersistTaps="handled"
    >
      {renderContent()}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 0,
  },
});

{
  /* {projects?.length === 0 || createMode ? (
        <ProjectCreate onCancel={() => setCreateMode(false)} />
      ) : editMode ? (
        <ProjectAddRoles
          projectIndex={selectedProject}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <Projects
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setCreateMode={setCreateMode}
          setEditMode={setEditMode}
        />
      )} */
}

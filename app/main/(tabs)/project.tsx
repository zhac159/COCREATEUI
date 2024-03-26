import {
  StyleSheet,
} from "react-native";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectCreate from "@/components/Project/EditProjects/ProjectCreate";
import ProjectAddRoles from "@/components/Project/EditProjects/ProjectAddRoles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import Projects from "@/components/Project/ProjectsMainPage/Projects";

export default function Project() {

  const [selectedProject, setSelectedProject] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);

  const projects = useProjectValue();

  if (projects?.length === 0 || createMode) {
    return <ProjectCreate onCancel={() => setCreateMode(false)} />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      pointerEvents="box-none"
      keyboardShouldPersistTaps="handled"
    >
      {editMode ? (
        <ProjectAddRoles
          projectIndex={selectedProject}
          onCancel={() => setEditMode(false)}
        />
      ) : 
        <Projects
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setCreateMode={setCreateMode}
          setEditMode={setEditMode}
        />
      }
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    padding: 0,
  },
});

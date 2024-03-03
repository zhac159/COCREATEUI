import { StyleSheet } from "react-native";
import { useProjectValue } from "@/components/RecoilStates/profileState";
import ProjectCreate from "@/components/Project/ProjectCreate";
import ProjectAddRoles from "@/components/Project/ProjectAddRoles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Project() {
  const project = useProjectValue();

  if (project?.length === 0) {
    return <ProjectCreate />;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      pointerEvents="box-none"
      keyboardShouldPersistTaps='handled'
    >
      <ProjectAddRoles />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
});

import ProjectAddRoles from "@/components/Project/EditProjects/ProjectAddRoles";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

export default function EditProject() {
    
  const { projectId } = useLocalSearchParams<{
    projectId: string;
  }>();

  const projectIdInt = parseInt(projectId as string, 10);

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <ProjectAddRoles
        projectId={projectIdInt}
      />
    </ScrollView>
  );
}

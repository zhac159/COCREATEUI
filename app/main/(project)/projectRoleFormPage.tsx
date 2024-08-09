import ProjectRoleForm from "@/components/Project/ProjectRoleForm/ProjectRoleForm";
import { useLocalSearchParams } from "expo-router";

export default function ProjectRoleFormPage() {
  const { projectId, projectRoleId } = useLocalSearchParams<{
    projectId: string;
    projectRoleId: string;
  }>();

  const intId = parseInt(projectId as string, 10);
  const intRoleId = parseInt(projectRoleId as string, 10);

  return <ProjectRoleForm projectId={intId} />;
}

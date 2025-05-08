import { useGetApiProjectRole } from "@/common/api/endpoints/cocreateApi";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import ProjectRoleForm from "@/components/Project/ProjectRoleForm/ProjectRoleForm";
import { useLocalSearchParams } from "expo-router";

export default function ProjectRoleFormPage() {
  const { projectId, projectRoleId } = useLocalSearchParams<{
    projectId: string;
    projectRoleId: string;
  }>();

  const intId = parseInt(projectId as string, 10);
  const intRoleId = parseInt(projectRoleId as string, 10);

  const { data: projectRole, isLoading } = useGetApiProjectRole(
    {
      id: intRoleId,
    },
    {
      query: {
        enabled: !!projectRoleId,
      },
    }
  );

  if (isLoading) {
    return <LoadingBackdrop showVideo />;
  }

  return <ProjectRoleForm projectId={intId} projectRole={projectRole} />;
}

import { useGetApiProjectProjectId } from "@/common/api/endpoints/cocreateApi";
import GoBackButton from "@/components/Common/goBackButton";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";
import MatchingProject from "@/components/Discovery/MatchingProjectRole/MatchingProjectRole";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function ProjectRolePreview() {
  const { projectRoleId, projectId } = useLocalSearchParams<{
    projectId: string;
    projectRoleId: string;
  }>();

  const intProjectRoleId = parseInt(projectRoleId!);
  const intProjectId = parseInt(projectId!);

  const { data: project, isLoading } = useGetApiProjectProjectId(intProjectId);

  if (isLoading || !project) return <LoadingBackdrop />;

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <GoBackButton />
      <MatchingProject
        matchingProject={{
          project: project,
          projectRoleId: intProjectRoleId,
        }}
      />
    </View>
  );
}

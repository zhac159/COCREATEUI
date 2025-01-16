import { FC } from "react";
import { View } from "react-native";
import { useAuthStore } from "@/common/stores/authStore";
import { ManageProject } from "./ManageProject";

type ManageProjectsProps = {};

export const ManageProjects: FC<ManageProjectsProps> = ({}) => {
  const projectsInfos = useAuthStore((state) => state.auth.projectsManaging);
  
  return (
    <View>
      {projectsInfos.map((projectInfo) => (
        <ManageProject key={projectInfo.id} projectInfo={projectInfo} />
      ))}
    </View>
  );
};


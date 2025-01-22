import { FC } from "react";
import { View } from "react-native";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { ManageProject } from "./ManageProject";
import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { generalPadding } from "@/common/constants/generalPadding";
import { StyledDivider } from "@/common/components/StyledComponents/StyledDivider";

type ManageProjectsProps = {};

export const ManageProjects: FC<ManageProjectsProps> = ({}) => {
  const projectsInfos = useAuthStore((state) => state.auth.projectsManaging);
  const styles = useThemedStyles(getStyles);

  if (projectsInfos?.length === 0) return null;

  return (
    <View style={styles.container}>
      {projectsInfos.map((projectInfo) => (
        <ManageProject key={projectInfo.id} projectInfo={projectInfo} />
      ))}
      <StyledDivider />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      gap: 20,
      backgroundColor: theme.colors.white,
      paddingTop: 30,
      marginHorizontal: `-${generalPadding}`,
      paddingHorizontal: generalPadding,
    },
  });

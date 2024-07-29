import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { View, Text, StyleSheet } from "react-native";
import Media from "../../../MediaViewer/Media";
import ProjectBannerHeader from "./ProjectBannerHeader";
import CompleteProjectButton from "./CompleteProjectButton";
import ProjectBannerFooter from "./ProjectBannerFooter";
import { ProjectRoleDTO } from "@/common/api/model";
import { Dispatch, SetStateAction } from "react";
import { SelectedRole, bannerHeight } from "../projectMainPageHelper";

type ProjectBannerProps = {
  id: number;
  name: string | undefined | null;
  uri: string | undefined | null;
  roles: ProjectRoleDTO[];
  selectedRole: SelectedRole;
  setSelectedRole: Dispatch<SetStateAction<SelectedRole>>;
};

const ProjectBanner: FC<ProjectBannerProps> = ({
  id,
  name,
  uri,
  roles,
  selectedRole,
  setSelectedRole,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.imageContainer} key={uri}>
      <Media
        uri={uri}
        style={{ flex: 1 }}
      />
      <View
        style={{
          ...styles.content,
        }}
      >
        <ProjectBannerHeader id={id} />
        <Text
          style={{
            ...theme.customFonts.secondary.medium,
            ...styles.name,
            color: theme.colors.white,
          }}
        >
          {name}
        </Text>
        <ProjectBannerFooter
          id={id}
          roles={roles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </View>
    </View>
  );
};

export default ProjectBanner;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    padding: 0,
  },
  imageContainer: {
    height: bannerHeight,
    width: "100%",
  },
  name: {
    fontSize: 40,
    paddingBottom: 20,
    fontWeight: "400",
  },
  content: {
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: "15%",
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

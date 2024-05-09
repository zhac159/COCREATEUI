import { FC } from "react";
import { useTheme } from "../../../Themes/theme";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { ProjectRoleDTO } from "@/common/api/model";
import { Dispatch, SetStateAction } from "react";
import ProjectRoleSelection from "../ProjectRoleSelection";

type ProjectBannerFooterProps = {
  id: number;
  roles: ProjectRoleDTO[];
  selectedRole: ProjectRoleDTO | null;
  setSelectedRole: Dispatch<SetStateAction<ProjectRoleDTO | null>>;
  selectAssetsMode: boolean;
  setSelectAssetsMode: Dispatch<SetStateAction<boolean>>;
};

const ProjectBannerFooter: FC<ProjectBannerFooterProps> = ({
  id,
  roles,
  selectedRole,
  setSelectedRole,
  selectAssetsMode,
  setSelectAssetsMode,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.footer,
      }}
    >
      <TouchableOpacity
        style={{
          ...styles.findAssetButton,
          backgroundColor: selectAssetsMode
            ? theme.colors.primary
            : theme.colors.secondary,
        }}
        onPress={() => setSelectAssetsMode((state) => !state)}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.white,
            fontSize: 20,
          }}
        >
          Assets
        </Text>
      </TouchableOpacity>
      <View>
        <ProjectRoleSelection
          roles={roles}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
      </View>
    </View>
  );
};

export default ProjectBannerFooter;

const styles = StyleSheet.create({
  footer: {
    gap: 10,
    alignItems: "flex-start",
    flexDirection: "row",
  },
  findAssetButton: {
    borderRadius: 8,
    paddingTop: 4,
    paddingBottom: 5,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
});

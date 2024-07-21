import { ProjectRoleDTO } from "@/common/api/model";
import { useTheme } from "@/components/Themes/theme";
import { Dispatch, FC, SetStateAction, useCallback, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SelectedRole } from "./projectMainPageHelper";
import { useTranslation } from "react-i18next";

type ProjectRoleSelectionProps = {
  roles: ProjectRoleDTO[];
  selectedRole: SelectedRole;
  setSelectedRole: Dispatch<SetStateAction<SelectedRole>>;
};

const ProjectRoleSelection: FC<ProjectRoleSelectionProps> = ({
  roles,
  selectedRole,
  setSelectedRole,
}) => {
  roles = [...roles];
  
  const {t} = useTranslation();

  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  function isRoleSelected(projectRole: ProjectRoleDTO | null) {
    if (!projectRole && selectedRole.allRoles) return true;
    if (!projectRole || !selectedRole) return false;
    return projectRole.id === selectedRole?.role?.id;
  }

  const handleRoleSelection = useCallback(
    (projectRole: ProjectRoleDTO | null) => {
      setSelectedRole(projectRole ? { role: projectRole } : { allRoles: true });
      if (!roles || !projectRole) return;
      const index = roles.indexOf(projectRole);

      if (index !== undefined && index !== -1) {
        flatListRef?.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    },
    [roles]
  );

  if (!roles) return null;

  return (
    <FlatList<ProjectRoleDTO | null>
      ref={flatListRef}
      horizontal
      data={[null, ...roles]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      renderItem={({ item: projectRole }) => (
        <TouchableOpacity
          onPress={() => {
            handleRoleSelection(projectRole);
          }}
          style={{
            ...styles.roleButton,
            backgroundColor: isRoleSelected(projectRole)
              ? theme.colors.primary
              : "transparent",
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              ...styles.buttonLabel,
              color: isRoleSelected(projectRole)
                ? theme.colors.white
                : theme.colors.black,
            }}
          >
            {projectRole ? projectRole.name : t("projects.view-projects.all-roles")}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(projectRole, index) =>
        projectRole ? projectRole.id?.toString() + "-key" : `all-${index}`
      }
    />
  );
};

export default ProjectRoleSelection;

const styles = StyleSheet.create({
  buttonLabel: {
    minWidth: 50,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 9,
    marginLeft: 9,
    textAlign: "center",
  },
  roleButton: {
    borderRadius: 20,
    marginRight: 10,
    alignContent: "center",
    justifyContent: "center",
  },
});

import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useProjectValue } from "../../RecoilStates/profileState";
import { useTheme } from "../../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { FC, useState } from "react";
import ProjectAddRoleForm from "../ProjectAddRoleForm/ProjectAddRoleForm";
import ProjectRole from "./ProjectRole";
import { ProjectRoleDTO } from "@/common/api/model";
import StyledButton from "@/components/Common/StyledButton";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

type ProjectAddRolesProps = {
  projectId: number;
};

const ProjectAddRoles: FC<ProjectAddRolesProps> = ({projectId}) => {
  const projects = useProjectValue();

  const { t } = useTranslation();
  
  const project = projects.find((project) => project.id === projectId); 


  const [addRole, setAddRole] = useState(false);
  const [editRole, setEditRole] = useState<ProjectRoleDTO>();

  const handleEditRole = (role: ProjectRoleDTO) => {
    setEditRole(role);
    setAddRole(true);
  };

  const theme = useTheme();

  if(!project) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {!addRole && (
          <>
            <StyledButton
              onPress={() => router.navigate("/main/(tabs)/project")}
              text={t("button.complete")}
              style={{
                backgroundColor: theme.colors.darkerGray,
                alignSelf: "flex-end",
                borderRadius: 21,
              }}
            />
            <Text
              style={{
                ...theme.customFonts.secondary.large,
                fontWeight: "400",
                fontSize: 35,
              }}
            >
              {t("projects.add-role.title")}
            </Text>
            {project.projectRoles.map((role) => {
              return (
                <ProjectRole
                  key={role.id}
                  projectRole={role}
                  handleEditRole={handleEditRole}
                />
              );
            })}
            <TouchableOpacity
              style={{
                ...styles.buttonContainer,
                backgroundColor: theme.colors.primary,
              }}
              onPress={() => {
                setAddRole(true);
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  ...styles.addRoleText,
                  color: theme.colors.white,
                }}
              >
                Add Role
              </Text>
              <FontAwesome6
                name="arrow-right"
                style={{
                  ...styles.icon,
                  color: theme.colors.white,
                }}
              />
            </TouchableOpacity>
          </>
        )}
        {addRole && (
          <ProjectAddRoleForm
            exitForm={() => {
              setEditRole(undefined);
              setAddRole(false);
            }}
            editRole={editRole}
            projectId={projectId}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProjectAddRoles;

const styles = StyleSheet.create({
  addRoleText: {
    fontSize: 25,
    paddingTop: 17,
    paddingBottom: 17,
    paddingRight: 14,
    paddingLeft: 14,
  },
  icon: {
    paddingRight: 16,
    fontWeight: "bold",
    fontSize: 25,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 25,
    paddingTop: "20%",
  },
  buttonContainer: {
    borderRadius: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});

import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useProjectValue } from "../RecoilStates/profileState";
import CancelButton from "./CancelButton";
import { useTheme } from "../Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState } from "react";
import ProjectAddRoleForm from "./ProjectAddRoleForm/ProjectAddRoleForm";
import ProjectRole from "./ProjectRole";
import { ProjectRoleDTO } from "@/common/api/model";

const ProjectAddRoles = () => {
  const project = useProjectValue();

  const [addRole, setAddRole] = useState(false);
  const [editRole, setEditRole] = useState<ProjectRoleDTO>();

  const handleEditRole = (role: ProjectRoleDTO) => {
    setEditRole(role);
    setAddRole(true);
  }

  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          padding: 20,
          gap: 25,
          paddingTop: "20%",
        }}
      >
        {!addRole && (
          <>
            <CancelButton
              onPress={() => {
                null;
              }}
            />
            <Text
              style={{
                ...theme.customFonts.secondary.large,
                fontWeight: "400",
                fontSize: 35,
              }}
            >
              Who Are You Looking For?
            </Text>
            {project &&
              project[0] &&
              project[0].projectRoles &&
              project[0].projectRoles.map((role) => {
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
                backgroundColor: theme.colors.primary,
                borderRadius: 14,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                setAddRole(true);
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                  color: theme.colors.white,
                  fontSize: 25,
                  paddingTop: 17,
                  paddingBottom: 17,
                  paddingRight: 14,
                  paddingLeft: 14,
                }}
              >
                Add Role
              </Text>
              <FontAwesome6
                name="arrow-right"
                style={{
                  paddingRight: 16,
                  fontWeight: "bold",
                  color: theme.colors.white,
                  fontSize: 25,
                }}
              />
            </TouchableOpacity>
          </>
        )}
        {addRole && project && (
          <ProjectAddRoleForm
            exitForm={() => {
              setEditRole(undefined);
              setAddRole(false);
            }}
            editRole={editRole}
            projectId={project[0].id ?? 0}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProjectAddRoles;

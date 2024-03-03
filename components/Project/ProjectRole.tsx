import { ProjectRoleDTO } from "@/common/api/model";
import { Dispatch, FC, SetStateAction } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../Themes/theme";
import SkillIcon from "../Account/Skills/SkillIcon";
import { FontAwesome6 } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import {
  getSkillGroupColor,
  skillGroupMap,
} from "../Account/Skills/skillHelper";

type ProjectRoleProps = {
  projectRole: ProjectRoleDTO;
  handleEditRole: (role: ProjectRoleDTO) => void
};

const ProjectRole: FC<ProjectRoleProps> = ({ projectRole, handleEditRole }) => {
  const theme = useTheme();

  const skillGroupType = skillGroupMap[projectRole.skillType || 0];
  const color = getSkillGroupColor(skillGroupType, 0.12);

  return (
    <View
      style={{
        height: 173,
        borderRadius: 17,
        padding: 13,
        paddingTop: 19,
        backgroundColor: color,
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <SkillIcon skillType={projectRole.skillType || 0} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name="bolt"
              size={15}
              color={theme.colors.black}
              regular={true}
            />
            <Text
              style={{
                ...theme.customFonts.primary.small,
                fontSize: 20,
              }}
            >
              {projectRole.cost}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              borderRadius: 21,
              paddingVertical: 10,
              paddingHorizontal: 13,
              backgroundColor: theme.colors.white,
            }}
          >
            <FontAwesome6
              name="play"
              size={16}
              color={theme.colors.black}
              solid
            />
            <Text
              style={{
                ...theme.customFonts.primary.small,
                fontSize: 17,
              }}
            >
              Preview
            </Text>
          </TouchableOpacity>
          <IconButton
            onPress={() => handleEditRole(projectRole)}
            icon={() => (
              <FontAwesome6
                name="pen"
                size={18}
                color={theme.colors.white}
                solid
              />
            )}
            size={26}
            style={{
              backgroundColor: theme.colors.black,
              margin: 0,
            }}
          />
        </View>
      </View>
      <Text
        style={{
          ...theme.customFonts.primary.large,
          fontSize: 30,
        }}
      >
        {projectRole.name}
      </Text>
    </View>
  );
};

export default ProjectRole;

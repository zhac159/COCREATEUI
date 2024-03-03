import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Text, TextInput, View } from "react-native";
import projectAddRoleWhenWhereHowLongStyles from "./projectAddRoleWhenWhereHowLongStyles";
import {
  Skills,
  getSkillGroupColor,
  skillGroupMap,
} from "@/components/Account/Skills/skillHelper";

type ProjectAddRoleHowLongProps = {
  effort: number;
  setEffort: Dispatch<SetStateAction<number>>;
  hours: boolean;
  setHours: Dispatch<SetStateAction<boolean>>;
  skill: Skills | undefined;
};

const ProjectAddRoleHowLong: FC<ProjectAddRoleHowLongProps> = ({
  effort,
  setEffort,
  hours,
  setHours,
  skill,
}) => {
  const theme = useTheme();

  const skillGroupType = skillGroupMap[skill || 0];
  const color =
    skill === undefined
      ? theme.colors.lightestGray
      : getSkillGroupColor(skillGroupType, 0.12);

  return (
    <>
      <View
        style={{
          ...projectAddRoleWhenWhereHowLongStyles.formElementContainer,
          backgroundColor: theme.colors.white,
        }}
      >
        <View
          style={projectAddRoleWhenWhereHowLongStyles.formElementTitleContainer}
        >
          <FontAwesome6
            name="stopwatch"
            style={projectAddRoleWhenWhereHowLongStyles.formElementTitleIcon}
          />
          <Text
            style={{
              ...theme.customFonts.primary.large,
              fontSize: 17,
            }}
          >
            Time Effort
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              ...theme.customFonts.primary.medium,
              ...projectAddRoleWhenWhereHowLongStyles.formTextInput,
              color: theme.colors.black,
              backgroundColor: color,
            }}
            value={effort.toString()}
            onChangeText={(text) =>
              setEffort(hours ? Number(text) : Number(text) * 24)
            }
            keyboardType="numeric"
          />
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: hours ? theme.colors.black : theme.colors.gray,
              }}
              onPress={() => setHours(true)}
            >
              Hours
            </Text>
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: !hours ? theme.colors.black : theme.colors.gray,
              }}
              onPress={() => setHours(false)}
            >
              Working Days
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ProjectAddRoleHowLong;

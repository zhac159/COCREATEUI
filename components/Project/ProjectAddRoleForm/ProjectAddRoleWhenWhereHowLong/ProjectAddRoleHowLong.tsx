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
import DurationPicker from "@/components/Common/Forms/DurationPicker";

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
        <DurationPicker
          duration={effort}
          setDuration={setEffort}
          hours={hours}
          setHours={setHours}
        />
      </View>
    </>
  );
};

export default ProjectAddRoleHowLong;

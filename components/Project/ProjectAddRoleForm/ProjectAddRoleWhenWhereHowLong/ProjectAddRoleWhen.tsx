import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import projectAddRoleWhenWhereHowLongStyles from "./projectAddRoleWhenWhereHowLongStyles";
import {
  Skills,
  getSkillGroupColor,
  skillGroupMap,
} from "@/components/Account/Skills/skillHelper";
import FromToDatePicker from "@/components/Common/Forms/FromToDatePicker";

type ProjectAddRoleWhenProps = {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
  skill: Skills | undefined;
};

const ProjectAddRoleWhen: FC<ProjectAddRoleWhenProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  skill,
}) => {
  const theme = useTheme();

  const skillGroupType = skillGroupMap[skill || 0];

  const color =
    skill === undefined
      ? theme.colors.lightestGray
      : getSkillGroupColor(skillGroupType, 0.20);

  return (
    <>
      <View
        style={{
          ...projectAddRoleWhenWhereHowLongStyles.formElementContainer,
          backgroundColor: theme.colors.white,
          zIndex: -1,
        }}
      >
        <View
          style={projectAddRoleWhenWhereHowLongStyles.formElementTitleContainer}
        >
          <FontAwesome6
            name="calendar"
            style={projectAddRoleWhenWhereHowLongStyles.formElementTitleIcon}
          />
          <Text
            style={{
              ...theme.customFonts.primary.large,
              fontSize: 17,
            }}
          >
            Dates
          </Text>
        </View>
        {/* <FromToDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          colour={color}
        /> */}
      </View>
    </>
  );
};

export default ProjectAddRoleWhen;

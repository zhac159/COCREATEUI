import { useTheme } from "@/components/Themes/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import projectAddRoleWhenWhereHowLongStyles from "./projectAddRoleWhenWhereHowLongStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Skills,
  getSkillGroupColor,
  skillGroupMap,
} from "@/components/Account/Skills/skillHelper";

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
      : getSkillGroupColor(skillGroupType, 0.12);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startDateEdit, setStartDateEdit] = useState(true);

  const showDatePicker = (isStartDate: boolean) => {
    setDatePickerVisibility(true);
    setStartDateEdit(isStartDate);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    startDateEdit ? setStartDate(date) : setEndDate(date);
    hideDatePicker();
  };

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
            Production Location
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "5%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 11,
            }}
          >
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: theme.colors.darkerGray,
                fontSize: 20,
              }}
            >
              From
            </Text>
            <TouchableOpacity
              onPress={() => showDatePicker(true)}
              style={{
                ...theme.customFonts.primary.medium,
                backgroundColor: color,
                borderRadius: 7,
                padding: 10,
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                }}
              >
                {startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 11,
            }}
          >
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: theme.colors.darkerGray,
                fontSize: 20,
              }}
            >
              To
            </Text>
            <TouchableOpacity
              onPress={() => showDatePicker(false)}
              style={{
                ...theme.customFonts.primary.medium,
                backgroundColor: color,
                borderRadius: 7,
                padding: 10,
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.primary.medium,
                }}
              >
                {endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        date={startDateEdit ? startDate : endDate}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default ProjectAddRoleWhen;

import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../Themes/theme";
import DatePicker from "react-native-date-picker";

type FromToDatePickerProps = {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
};

const FromToDatePicker: FC<FromToDatePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const theme = useTheme();

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
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
        alignSelf: "center",
        height: "50%",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 11,
          width: "50%",
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.darkGray,
            fontSize: 20,
          }}
        >
          From
        </Text>
        <TouchableOpacity
          onPress={() => showDatePicker(true)}
          style={{
            ...theme.customFonts.primary.medium,
            backgroundColor: theme.colors.lightGray,
            borderRadius: 7,
            padding: 10,
            width: "70%",
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
          width: "50%",
        }}
      >
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.darkGray,
            fontSize: 20,
          }}
        >
          To
        </Text>
        <TouchableOpacity
          onPress={() => showDatePicker(false)}
          style={{
            ...theme.customFonts.primary.medium,
            width: "70%",
            backgroundColor: theme.colors.lightGray,
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
      <DatePicker
        date={startDateEdit ? startDate : endDate}
        mode="date"
        open={isDatePickerVisible}
        modal
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default FromToDatePicker;

const styles = StyleSheet.create({});

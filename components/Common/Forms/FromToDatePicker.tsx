import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useTheme } from "../../Themes/theme";

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

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const handleDateChange = (
    value: string,
    setDate: React.Dispatch<React.SetStateAction<string>>
  ) => {
    // Allow only digits and auto-format as MM/DD/YYYY
    const formattedValue = value
      .replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3")
      .replace(/[^0-9]/g, "")
      .substring(0, 8);

    setDate(formattedValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.datePicker}>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.darkGray,
            fontSize: 20,
          }}
        >
          From
        </Text>
        <TextInput
          style={{ width: "100%" }}
          value={fromDate}
          onChangeText={(value) => handleDateChange(value, setFromDate)}
          placeholder="MM/DD/YYYY"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.datePicker}>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            color: theme.colors.darkGray,
            fontSize: 20,
          }}
        >
          To
        </Text>
        <TextInput
          value={toDate}
          onChangeText={(value) => handleDateChange(value, setToDate)}
          placeholder="MM/DD/YYYY"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default FromToDatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
    justifyContent: "space-between",
  },
  datePicker: {
    flex: 1,
    alignItems: "center",
  },
});

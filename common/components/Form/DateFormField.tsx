import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import DatePicker from "react-native-date-picker";

type DateFormFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const DateFormField: FC<DateFormFieldProps> = ({ value, onChange }) => {
  const styles = useThemedStyles(getStyles);
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      mode="date"
      date={date}
      style={styles.datePicker}
      onDateChange={(newDate) => onChange(newDate.toISOString())}
    />
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    datePicker: {
      flexGrow: 1,
      alignSelf: "center",
      flex: 1,
    },
  });

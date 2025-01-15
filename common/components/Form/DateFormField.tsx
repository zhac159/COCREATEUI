import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Theme } from "@react-navigation/native";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import DatePicker from "react-native-date-picker";
import { InformationMessage } from "../InformationMessage";

type DateFormFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export const DateFormField: FC<DateFormFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  const styles = useThemedStyles(getStyles);
  const [date, setDate] = useState(new Date(value));

  return (
    <View style={styles.container}>
      <DatePicker
        mode="date"
        date={date}
        style={styles.datePicker}
        onDateChange={(newDate) => onChange(newDate.toISOString())}
      />
      <InformationMessage message={error} type={"error"} />
    </View>
  );
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 20,
    },
    datePicker: {
      flexGrow: 1,
      alignSelf: "center",
      flex: 1,
    },
  });

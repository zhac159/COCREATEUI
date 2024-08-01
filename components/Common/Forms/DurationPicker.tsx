import React, { FC, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useTheme } from "../../Themes/theme";

type DurationPicker = {
  duration: string;
  setDuration: Dispatch<SetStateAction<string>>;
  hours: boolean;
  setHours: Dispatch<SetStateAction<boolean>>;
  colour?: string;
};

const DurationPicker: FC<DurationPicker> = ({
  duration,
  setDuration,
  hours,
  colour,
  setHours,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        inputMode="numeric"
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.formTextInput,
          color: theme.colors.black,
          backgroundColor: colour ? colour : theme.colors.lightGray,
        }}
        value={duration}
        onChangeText={(text) => setDuration(text)}
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
  );
};

export default DurationPicker;

const styles = StyleSheet.create({
  formTextInput: {
    fontSize: 16,
    marginTop: "5%",
    padding: 10,
    width: "50%",
    alignContent: "flex-end",
    borderRadius: 7,
    textAlign: "right",
  },
});

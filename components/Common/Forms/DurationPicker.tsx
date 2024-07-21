import React, { FC, Dispatch, SetStateAction } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import { useTheme } from "../../Themes/theme";

type DurationPicker = {
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  hours: boolean;
  setHours: Dispatch<SetStateAction<boolean>>;
};

const DurationPicker: FC<DurationPicker> = ({
  duration,
  setDuration,
  hours,
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
        style={{
          ...theme.customFonts.primary.medium,
          ...styles.formTextInput,
          color: theme.colors.black,
          backgroundColor: "white",
        }}
        value={hours ? (duration).toString() : (duration / 24).toString()}
        onChangeText={(text) =>
          setDuration(hours ? Number(text) : Number(text) * 24)
        }
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

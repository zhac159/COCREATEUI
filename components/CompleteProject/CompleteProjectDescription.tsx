import React, { FC, Dispatch, SetStateAction } from "react";
import { Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../Themes/theme";

type CompleteProjectDescriptionProps = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};

const CompleteProjectDescription: FC<CompleteProjectDescriptionProps> = ({
  description,
  setDescription,
}) => {
  const theme = useTheme();

  return (
    <>
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          fontWeight: "400",
          fontSize: 35,
          marginBottom: 10,
        }}
      >
        Project Description
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontWeight: "500",
          fontSize: 14,
          marginBottom: 50,
        }}
      >
        Describe your project in detail. What was the goal, how did you achieve
        it, what were the challenges, and what did you learn?
      </Text>
      <TextInput
        style={{
          ...theme.customFonts.primary.small,
          ...styles.titleTextInput,
          backgroundColor: theme.colors.lightGray,
        }}
        value={description}
        onChangeText={setDescription}
        placeholder="Project Description"
        multiline
      />
    </>
  );
};

export default CompleteProjectDescription;

const styles = StyleSheet.create({
  titleTextInput: {
    fontWeight: "700",
    padding: 10,
    borderRadius: 7,
    height: "70%",
    textAlignVertical: "top",
  },
});

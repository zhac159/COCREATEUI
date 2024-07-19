import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import StyledButton from "../Common/StyledButton";
import { useTheme } from "../Themes/theme";
import useSkillsAddForm from "../Account/Skills/useSkillsAddForm";
import { FormPageProps } from "@/common/forms/formsHelper";

const AddSkillForm: FC<FormPageProps> = ({ nextStep }) => {
  const theme = useTheme();

  const { handleSubmit, FormNode } = useSkillsAddForm();

  const handleNextStep = () => {
    handleSubmit();
    nextStep?.();
  };

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: "2%",
        gap: 50,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.secondary.medium,
          fontWeight: "400",
          fontSize: 40,
        }}
      >
        What Are You Creative Skills?
      </Text>
      {FormNode}
      <StyledButton text="Next" onPress={handleNextStep} icon="arrow-right" />
    </View>
  );
};

export default AddSkillForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleTextInput: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
  },
});

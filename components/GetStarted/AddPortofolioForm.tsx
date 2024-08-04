import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "../Themes/theme";
import useNewPortofolioContentForm from "../Account/PortofolioContents/useNewPortofolioContentForm";
import StyledButton from "../Common/StyledButton";
import { FormPageProps } from "@/common/forms/formsHelper";

const AddPortofolioForm: FC<FormPageProps> = ({ nextStep }) => {
  const theme = useTheme();

  const { FormNode, handleCreate } = useNewPortofolioContentForm();

  const handleNextStep = () => {
    handleCreate();
    nextStep?.();
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.secondary.medium,
          fontWeight: "400",
          fontSize: 40,
        }}
      >
        Add portofolio
      </Text>
      {FormNode}
      <StyledButton text="Next" onPress={handleNextStep} icon="arrow-right" />
    </View>
  );
};

export default AddPortofolioForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    gap: 50,
  },
  buttonsContainer: {
    marginTop: 50,
  },
});

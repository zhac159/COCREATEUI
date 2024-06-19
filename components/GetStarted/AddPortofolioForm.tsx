import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "../Themes/theme";
import useNewPortofolioContentForm from "../Account/PortofolioContents/useNewPortofolioContentForm";
import StyledButton from "../Common/StyledButton";
import { router } from "expo-router";

type AddPortofolioFormProps = {
  nextStep: () => void;
};

const AddPortofolioForm: FC<AddPortofolioFormProps> = ({ nextStep }) => {
  const theme = useTheme();

  const { FormNode, handleCreate } = useNewPortofolioContentForm();

  const handleNextStep = () => {
    handleCreate();
    router.navigate("main/(tabs)/account");

  };

  return (
    <View
      style={styles.container}
    >
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
    paddingHorizontal: "2%",
    gap: 50,
  },
  buttonsContainer: {
    marginTop: 50,
  },
});

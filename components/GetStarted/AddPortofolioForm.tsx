import React, { FC } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "../Themes/theme";
import useNewPortofolioContentForm from "../Account/PortofolioContents/useNewPortofolioContentForm";
import StyledButton from "../Common/StyledButton";
import { FormPageProps } from "@/common/forms/formsHelper";

const AddPortofolioForm: FC<FormPageProps> = ({ nextStep }) => {
  const theme = useTheme();

  const { FormNode, handleCreate, isLoading } =
    useNewPortofolioContentForm(nextStep);

  const handleNextStep = async () => {
    await handleCreate();
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
        Add a project to your portofolio
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontWeight: "400",
          fontSize: 20,
        }}
      >
        Let's start creating your portfolio: upload photos and video previews of
        your best work (up to three min). You can upload up to three items for
        each project you showcase. Link more extensive samples of your work,
        professional social media handles or documents in your bio. You can add
        more projects and create a more extensive portfolio after setup.
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

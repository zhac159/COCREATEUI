import { FormPageProps } from "@/common/forms/formsHelper";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { useTheme } from "../Themes/theme";
import StyledButton from "../Common/StyledButton";

type GetStartedTutorialProps = {
  message: string;
  title: string;
};

const GetStartedTutorial: FC<FormPageProps & GetStartedTutorialProps> = ({
  message,
  title,
  nextStep,
}) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.black }}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.gray,
          marginBottom: "10%",
          fontSize: 50,
        }}
      >
        {title + ":"}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          color: theme.colors.white,
          fontSize: 40,
          lineHeight: 48,
        }}
      >
        {message}
      </Text>
      <StyledButton
        text="Next"
        onPress={() => nextStep?.()}
        style={{ bottom: '10%', position: "absolute", backgroundColor: theme.colors.darkOrange }}
        icon="arrow-right"
      />
    </View>
  );
};

export default GetStartedTutorial;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: "20%",
    paddingHorizontal: "5%",
  },
});

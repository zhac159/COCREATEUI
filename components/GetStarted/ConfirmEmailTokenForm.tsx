import { UserVerifyEmailDTO } from "@/common/api/model";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { useTheme } from "../Themes/theme";
import StyledButton from "../Common/StyledButton";
import { usePostApiUserVerifyEmail } from "@/common/api/endpoints/cocreateApi";
import { FormPageProps } from "@/common/forms/formsHelper";

const ConfirmEmailTokenForm: FC<FormPageProps> = ({ nextStep }) => {
  const theme = useTheme();

  const {
    control,
    setValue,
    handleSubmit: handleSubmitForm,
  } = useForm<UserVerifyEmailDTO>();

  const { mutate } = usePostApiUserVerifyEmail({
    mutation: {
      onSuccess: (data) => {
        nextStep?.();
      },
    },
  });

  const handleSubmit = (data: UserVerifyEmailDTO) => {
    mutate({ data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formEntryContainer}>
        <Text
          style={{
            ...theme.customFonts.secondary.medium,
            fontWeight: "400",
            fontSize: 40,
          }}
        >
          Enter Confirmation Code (make sure to check your spam folder please)
        </Text>
        <TextInput
          style={{
            ...theme.customFonts.primary.medium,
            ...styles.titleTextInput,
            backgroundColor: theme.colors.lightGray,
            color: theme.colors.black,
          }}
          numberOfLines={1}
          multiline={true}
          onChangeText={(text) => setValue("token", text)}
        />
      </View>
      <StyledButton
        text="Next"
        onPress={handleSubmitForm(handleSubmit)}
        icon="arrow-right"
      />
    </View>
  );
};

export default ConfirmEmailTokenForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 7,
  },
  formEntryContainer: {
    gap: 20,
  },
});

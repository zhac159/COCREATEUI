import { usePostApiUserUpdateEmail } from "@/common/api/endpoints/cocreateApi";
import { UserUpdateEmailDTO } from "@/common/api/model";
import StyledButton from "@/components/Common/StyledButton";
import StyledTextField from "@/components/Common/StyledTextField";
import { useTheme } from "@/components/Themes/theme";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

export function ChangeEmailForm() {
  const theme = useTheme();
  const { t } = useTranslation();

  const { handleSubmit, control } = useForm<UserUpdateEmailDTO>();

  const { mutate, isLoading, isSuccess, error } = usePostApiUserUpdateEmail();

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 25,
        }}
      >
        {t("account.settings.account-details-and-location.change-email.title")}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <StyledTextField
            value={value}
            error={error?.message}
            editable
            textInputProps={{
              style: {
                ...theme.customFonts.primary.medium,
                ...styles.titleTextInput,
                backgroundColor: theme.colors.lightGray,
                color: theme.colors.black,
              },
              numberOfLines: 1,
              multiline: true,
              onChangeText: onChange,
              placeholder: t(
                "account.settings.account-details-and-location.change-email.email-placeholder"
              ),
            }}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      <StyledButton
        text={t("button.submit")}
        success={isSuccess}
        style={{ backgroundColor: theme.colors.primary }}
        onPress={handleSubmit((data) => mutate({ data }))}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingHorizontal: 20,
  },
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 7,
  },
});

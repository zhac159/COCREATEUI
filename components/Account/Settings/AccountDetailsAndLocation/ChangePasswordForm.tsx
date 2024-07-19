import { usePostApiUserChangePassword } from "@/common/api/endpoints/cocreateApi";
import { UserChangePasswordDTO } from "@/common/api/model";
import { hashPassword } from "@/common/encryption/encryptionHelper";
import StyledButton from "@/components/Common/StyledButton";
import StyledTextField from "@/components/Common/StyledTextField";
import { useTheme } from "@/components/Themes/theme";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text } from "react-native";

export default function ChangePasswordForm() {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    mutate: changePassword,
    isLoading,
    isSuccess,
    error,
  } = usePostApiUserChangePassword();

  const { handleSubmit, control } = useForm<UserChangePasswordDTO>();

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 25,
        }}
      >
        {t(
          "account.settings.account-details-and-location.change-password.title"
        )}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledTextField
            value={value}
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
                "account.settings.account-details-and-location.change-password.old-password-placeholder"
              ),
            }}
          />
        )}
        name="oldPassword"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
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
                "account.settings.account-details-and-location.change-password.new-password-placeholder"
              ),
            }}
          />
        )}
        name="newPassword"
        rules={{ required: true }}
        defaultValue=""
      />
      <StyledButton
        text={t("button.submit")}
        success={isSuccess}
        style={{ backgroundColor: theme.colors.primary }}
        onPress={handleSubmit(async (data) => {
          const hashedOldPassword = await hashPassword(data.oldPassword);
          const hashedNewPassword = await hashPassword(data.newPassword);
          changePassword({
            data: {
              oldPassword: hashedOldPassword,
              newPassword: hashedNewPassword,
            },
          });
        })}
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

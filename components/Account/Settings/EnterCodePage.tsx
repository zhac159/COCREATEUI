import { usePostApiVoucherCodeRedeem } from "@/common/api/endpoints/cocreateApi";
import { RedeemVoucherCodeDTO } from "@/common/api/model";
import StyledButton from "@/components/Common/StyledButton";
import StyledTextField from "@/components/Common/StyledTextField";
import { useSetCoinsState } from "@/components/RecoilStates/profileState";
import { useTheme } from "@/components/Themes/theme";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TextInput } from "react-native";

export function EnterCodePage() {
  const theme = useTheme();
  const useSetCoin = useSetCoinsState();
  const { t } = useTranslation();

  const {
    mutate: redeemCode,
    isLoading,
    error,
  } = usePostApiVoucherCodeRedeem({
    mutation: {
      onSuccess: (data) => {
        useSetCoin(data.coin);
      },
    },
  });

  const { handleSubmit: handleSubmitForm, control } =
    useForm<RedeemVoucherCodeDTO>();

  return (
    <View style={styles.container}>
      <Text style={{ ...theme.customFonts.primary.medium }}>
        {t("account.settings.enter-code.title")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
        }}
      >
        {t("account.settings.enter-code.code-tooltip")}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <StyledTextField
            value={value}
            editable
            error={error?.message}
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
              placeholder: t("account.settings.enter-code.code-placeholder"),
            }}
          />
        )}
        name="code"
        rules={{ required: true }}
        defaultValue=""
      />
      <StyledButton
        text={t("button.submit")}
        style={{ backgroundColor: theme.colors.primary }}
        onPress={handleSubmitForm((data) =>
          redeemCode({
            data,
          })
        )}
        isLoading={isLoading}
        icon="arrow-right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

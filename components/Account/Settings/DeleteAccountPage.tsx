import { useDeleteApiUserAccount } from "@/common/api/endpoints/cocreateApi";
import StyledButton from "@/components/Common/StyledButton";
import { useTheme } from "@/components/Themes/theme";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export function DeleteAccountPage() {
  const theme = useTheme();
  const { t } = useTranslation();

  const { mutate: deleteAccount } = useDeleteApiUserAccount({
    mutation: {
      onSuccess: () => {
        router.replace("/");
      },
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        gap: 50,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.large,
        }}
      >
        {t("account.settings.delete.title")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
        }}
      >
        {t("account.settings.delete.description")}
      </Text>
      <StyledButton onPress={() => deleteAccount()} text={t("button.delete")} />
    </View>
  );
}

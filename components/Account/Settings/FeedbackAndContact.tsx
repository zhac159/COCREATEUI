import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/Themes/theme";

export function FeedbackAndContact() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontSize: 25,
        }}
      >
        {t("account.settings.feedback-and-contact.title")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontSize: 15,
        }}
      >
        {t("account.settings.feedback-and-contact.content")}
      </Text>
    </View>
  );
}

const styles = {
  container: {
    gap: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
};
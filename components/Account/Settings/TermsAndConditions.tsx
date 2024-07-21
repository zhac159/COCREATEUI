import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/Themes/theme";

export function TermsAndConditions() {
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
        {t("account.settings.term-and-conditions.title")}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontSize: 15,
        }}
      >
        {t("account.settings.term-and-conditions.content")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 25,
    paddingHorizontal: 20,
    flex: 1,
  },
});

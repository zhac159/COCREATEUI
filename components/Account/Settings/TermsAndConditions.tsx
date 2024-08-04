import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/Themes/theme";
import { Image } from "react-native";

export function TermsAndConditions() {
  const { t } = useTranslation();
  const theme = useTheme();

  const terms = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...theme.customFonts.primary.medium,
          fontWeight: "400",
          fontSize: 20,
        }}
      >
        {t(`terms-and-conditions.content.introduction-title`)}
      </Text>
      <Text
        style={{
          ...theme.customFonts.primary.small,
          fontSize: 15,
        }}
      >
        {t(`terms-and-conditions.content.introduction`)}
      </Text>
      {terms.map((term) => (
        <View>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "400",
              fontSize: 20,
            }}
          >
            {term +
              ". " +
              t(`terms-and-conditions.content.title-${term as "1"}`)}
          </Text>
          <Text
            style={{
              ...theme.customFonts.primary.small,
              fontSize: 15,
            }}
          >
            {t(`terms-and-conditions.content.content-${term as "1"}`)}
          </Text>
        </View>
      ))}
      <Image
        source={require("@/assets/images/consent-form.png")}
        style={{ width: "100%", height: 800 }}
      />
      <Image
        source={require("@/assets/images/ethical-clearance-1.png")}
        style={{ width: "100%", height: 600 }}
      />
      <Image
        source={require("@/assets/images/ethical-clearance-2.png")}
        style={{ width: "100%", height: 600 }}
      />
      <Image
        source={require("@/assets/images/ethical-clearance-3.png")}
        style={{ width: "100%", height: 350 }}
      />
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

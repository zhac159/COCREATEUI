import React, { FC } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import {
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Themes/theme";
import BlackHalfOpacityBackdrop from "../Common/BlackHalfOpacityBackdrop";

type NoMatchingProjectsPageProps = {};

const NoMatchingProjectsPage: FC<NoMatchingProjectsPageProps> = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../../assets/images/backdrops/no-matching-project-backdrop.png")}
      style={styles.image}
    >
      <BlackHalfOpacityBackdrop />
      <View style={styles.container}>
        <Text
          style={{
            ...theme.customFonts.primary.large,
            fontSize: 55,
            color: theme.colors.white,
            textAlign: "left",
          }}
        >
          {t("discovery.no-projects.title")}
        </Text>
        <Text
          style={{
            ...theme.customFonts.primary.medium,
            fontSize: 20,
            marginTop: "10%",
            color: theme.colors.white,
            textAlign: "left",
          }}
        >
          {t("discovery.no-projects.description")}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default NoMatchingProjectsPage;

const styles = StyleSheet.create({
  image: {
    marginHorizontal: -20,
    position: "absolute",
    width: windowWidth + 40,
    height: windowHeight + 200,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: "10%",
    paddingHorizontal: "7%",
  }
});

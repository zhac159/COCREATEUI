import React, { FC } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import {
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Themes/theme";
import BlackHalfOpacityBackdrop from "../Common/BlackHalfOpacityBackdrop";

type NoWorkPageProps = {
};

const NoWorkPage: FC<NoWorkPageProps> = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../../assets/images/backdrops/no-work-background.png")}
      style={styles.image}
    >
      <View style={styles.container}>
        <BlackHalfOpacityBackdrop />
        <Text
          style={{
            ...theme.customFonts.primary.large,
            fontSize: 55,
            color: theme.colors.white,
            textAlign: "left",
          }}
        >
          {t("work.no-work-title")}
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
          {t("work.no-work-description")}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default NoWorkPage;

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
  },
});

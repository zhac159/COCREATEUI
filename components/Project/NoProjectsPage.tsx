import React, { FC } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import {
  windowHeight,
  windowWidth,
} from "../Account/Common/getWindowDimensions";
import { useTranslation } from "react-i18next";
import { useTheme } from "../Themes/theme";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import BlackHalfOpacityBackdrop from "../Common/BlackHalfOpacityBackdrop";

type NoProjectsPageProps = {
  setCreateMode: () => void;
};

const NoProjectsPage: FC<NoProjectsPageProps> = ({ setCreateMode }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../../assets/images/backdrops/create-project-backdrop.png")}
      style={styles.image}
    >
      <View style={styles.container}>
      <BlackHalfOpacityBackdrop />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10%",
          }}
        >
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontSize: 25,
              color: theme.colors.white,
              textAlign: "left", 
            }}
          >
            {t("projects.default-page.your-projects")}
          </Text>
          <IconButton
            icon={() => (
              <FontAwesome6
                name="plus"
                size={18}
                color={theme.colors.white}
                solid
              />
            )}
            onPress={() => setCreateMode()}
            size={30}
            style={{
              backgroundColor: theme.colors.primary,
              margin: 0,
            }}
          />
        </View>
        <Text
          style={{
            ...theme.customFonts.primary.large,
            fontSize: 55,
            color: theme.colors.white,
            textAlign: "left",
          }}
        >
          {t("projects.default-page.title")}
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
          {t("projects.default-page.description")}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default NoProjectsPage;

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

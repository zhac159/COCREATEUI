import React, { FC } from "react";
import { ImageBackground, StyleSheet, View, Text } from "react-native";

import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { useTheme } from "@/components/Themes/theme";
import { windowHeight, windowWidth } from "@/components/Account/Common/getWindowDimensions";
import BlackHalfOpacityBackdrop from "@/components/Common/BlackHalfOpacityBackdrop";

type NoApplicationsPageProps = {
  turnBack: () => void;
};

const NoApplicationsPage: FC<NoApplicationsPageProps> = ({ turnBack }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <ImageBackground
      source={require("../../../assets/images/backdrops/no-application-background.png")}
      style={styles.image}
    >
      <View style={styles.container}>
        <BlackHalfOpacityBackdrop />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10%",
            alignSelf: "flex-end",
          }}
        >
          <IconButton
            onPress={turnBack}
            icon={() => (
              <FontAwesome6
                name="x"
                size={20}
                color={theme.colors.black}
                solid
              />
            )}
            size={30}
            style={{
              backgroundColor: theme.colors.white,
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
          {t("projects.view-applications.no-applications-title")}
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
          {t("projects.view-applications.no-applications-description")}
        </Text>
      </View>
    </ImageBackground>
  );
};

export default NoApplicationsPage;

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

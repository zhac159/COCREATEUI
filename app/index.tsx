import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { StyledImageBackground } from "@/common/components/StyledComponents/StyledImageBackground";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <StyledImageBackground
      blackLayer
      source={require("../assets/images/backdrops/home-page-background.png")}
      style={styles.container}
    >
      <StyledText
        text={t("welcome-page.title")}
        fontSize={50}
        color={theme.colors.orange}
      />
      <View style={styles.buttonsContainer}>
        <StyledButton
          text={t("sign-in.sign-in")}
          style={{
            backgroundColor: theme.colors.black,
          }}
          onPress={() => {
            router.navigate({
              pathname: "/signIn",
            });
          }}
        />
        <StyledButton
          text={t("get-started.get-started")}
          style={{
            backgroundColor: theme.colors.orange,
          }}
          onPress={() => {
            router.navigate({
              pathname: "/signIn",
            });
          }}
        />
      </View>
    </StyledImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "20%",
    paddingHorizontal: "3%",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    alignSelf: "center",
    gap: 20,
  },
});

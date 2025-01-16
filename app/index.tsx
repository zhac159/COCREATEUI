import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { StyledImageBackground } from "@/common/components/StyledComponents/StyledImageBackground";
import StyledText from "@/common/components/StyledComponents/StyledText";
import { generalPadding } from "@/common/constants/generalPadding";
import useThemedStyles from "@/common/theme/getThemedStylesheet";
import { Theme, useTheme } from "@react-navigation/native";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { t } = useTranslation();
  const styles = useThemedStyles(getStyles);

  return (
    <StyledImageBackground
      blackLayer
      source={require("../assets/images/backdrops/home-page-background.png")}
      style={styles.container}
    >
      <StyledText text={t("welcome-page.title")} style={styles.title} />
      <View style={styles.buttonsContainer}>
        <StyledButton
          text={t("sign-in.sign-in")}
          style={styles.signInButton}
          onPress={() => {
            router.navigate({
              pathname: "/signIn",
            });
          }}
        />
        <StyledButton
          text={t("get-started.get-started")}
          style={styles.getStartedButton}
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

const styles = StyleSheet.create({});

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: "20%",
      paddingHorizontal: generalPadding,
      justifyContent: "space-between",
    },
    signInButton: {
      backgroundColor: theme.colors.black,
    },
    getStartedButton: {
      backgroundColor: theme.colors.orange,
    },
    buttonsContainer: {
      alignSelf: "center",
      gap: 20,
    },
    title: {
      fontSize: 50,
      color: theme.colors.orange,
    },
  });

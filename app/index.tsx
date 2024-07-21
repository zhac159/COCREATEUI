import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { useTheme } from "@/components/Themes/theme";
import StyledButton from "@/components/Common/StyledButton";
import { router } from "expo-router";
import { windowHeight, windowWidth } from "@/components/Account/Common/getWindowDimensions";
import BlackHalfOpacityBackdrop from "@/components/Common/BlackHalfOpacityBackdrop";

const LoginPage = () => {
  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require("../assets/images/backdrops/home-page-background.png")}
        style={styles.container}
      >
        <BlackHalfOpacityBackdrop />
        <View>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              color: theme.colors.white,
              fontWeight: "bold",
              fontSize: 50,
              lineHeight: 48,
            }}
          >
            Welcome to the
          </Text>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "bold",
              color: theme.colors.orange,
              fontSize: 50,
            }}
          >
            {"Future of\nCreative Work"}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <StyledButton
            text="Sign In"
            style={{ backgroundColor: theme.colors.black }}
            onPress={() =>
              router.navigate({
                pathname: "/signIn",
              })
            }
            icon="arrow-right"
          />
          <StyledButton
            text="Get Started"
            style={{ backgroundColor: theme.colors.orange }}
            onPress={() =>
              router.navigate({
                pathname: "/getStarted",
              })
            }
            icon="arrow-right"
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

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
  opacityContainer: {
    width: windowWidth * 1.5,
    height: windowHeight * 1.5,
    position: "absolute",
    backgroundColor: "black",
    opacity: 0.5,
  },
});

export default LoginPage;

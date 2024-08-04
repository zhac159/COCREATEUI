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
import {
  windowHeight,
  windowWidth,
} from "@/components/Account/Common/getWindowDimensions";
import BlackHalfOpacityBackdrop from "@/components/Common/BlackHalfOpacityBackdrop";
import { usePostApiLoginTokenLogin, usePutApiUserPublicKey } from "@/common/api/endpoints/cocreateApi";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import SecureStoreKeys from "@/common/api/enum/secureStoreKeys";
import {
  generateDatabaseKey,
  generateKeyPair,
  toBase64,
} from "@/common/encryption/encryptionHelper";
import { useSetCurrentUserState } from "@/components/RecoilStates/profileState";
import LoadingBackdrop from "@/components/Common/LoadingBackdrop";

const LoginPage = () => {
  const theme = useTheme();
  const setCurrentUser = useSetCurrentUserState();
  const { t } = useTranslation();
  const { mutate: setPublicKey } = usePutApiUserPublicKey();

  const { mutate: authenticate, isLoading } = usePostApiLoginTokenLogin({
    mutation: {
      onSuccess: async (data) => {
        setCurrentUser(data.user);
        generateDatabaseKey();
        SecureStore.setItemAsync(SecureStoreKeys.USER_TOKEN, data.token);
        var publicKey = await generateKeyPair(data.user.userId);
        if (publicKey) {
          setPublicKey({ data: { publicKey: toBase64(publicKey.publicKey) } });
        }
       router.replace("/main/(tabs)/discovery");
      },
    },
  });

  useEffect(() => {
    const autoLogin = async () => {
      const token = await SecureStore.getItemAsync(SecureStoreKeys.USER_TOKEN);
      if (token) {
        authenticate({
          data: {
            token: token,
          },
        });
      }
    };

    autoLogin();
  }, [authenticate]);

  if (isLoading) {
    return <LoadingBackdrop />;
  }

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
            {t("welcome-page.title-1")}
          </Text>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "bold",
              color: theme.colors.orange,
              fontSize: 50,
              lineHeight: 48,
            }}
          >
            {t("welcome-page.title-2")}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <StyledButton
            text="Sign In"
            style={{ backgroundColor: theme.colors.black }}
            onPress={() =>
              router.replace({
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

export default LoginPage;

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

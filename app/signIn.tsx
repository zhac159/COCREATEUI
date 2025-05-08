import {
  usePostApiLogin,
  usePutApiUserPublicKey,
} from "@/common/api/endpoints/cocreateApi";
import { UserLoginDTO } from "@/common/api/model";
import { useSetCurrentUserState } from "@/components/RecoilStates/profileState";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View, Text, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { useTheme } from "@/components/Themes/theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";
import StyledButton from "@/components/Common/StyledButton";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import StyledTextField from "@/components/Common/StyledTextField";
import SecureStoreKeys from "@/common/api/enum/secureStoreKeys";
import {
  generateDatabaseKey,
  generateKeyPair,
  hashPassword,
  toBase64,
} from "@/common/encryption/encryptionHelper";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";

export default function SignIn() {
  const theme = useTheme();
  const { t } = useTranslation();

  const setCurrentUser = useSetCurrentUserState();

  const { handleSubmit, control } = useForm<UserLoginDTO>();
  const { mutate: setPublicKey } = usePutApiUserPublicKey();

  const { mutate, isLoading, error } = usePostApiLogin({
    mutation: {
      onSuccess: async (data) => {
        // setCurrentUser(data.user);
        generateDatabaseKey();
        var publicKey = await generateKeyPair(data.user.userId);
        if (publicKey) {
          setPublicKey({ data: { publicKey: toBase64(publicKey.publicKey) } });
        }
        SecureStore.setItemAsync(SecureStoreKeys.USER_TOKEN, data.token);
        router.replace("/main/(tabs)/discovery");
      },
    },
  });

  const onSubmit = async (userLoginDTO: UserLoginDTO) => {
    const hashedPassword = await hashPassword(userLoginDTO.password);
    mutate({
      data: {
        ...userLoginDTO,
        password: hashedPassword,
      },
    });
  };

  return (
    <TouchableWithoutFeedback>
      <BackgroundColourAnimation />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <IconButton
          icon={() => (
            <FontAwesome6
              name="chevron-left"
              color={theme.colors.black}
              size={30}
            />
          )}
          hitSlop={40}
          onPress={() => router.replace("/")}
          size={30}
          style={{ position: "absolute", top: "10%", left: "1%", zIndex: 1000 }}
        />
        <View style={styles.formContainer}>
          <View>
            <Text
              style={{
                ...theme.customFonts.secondary.medium,
                fontWeight: "400",
                fontSize: 40,
              }}
            >
              {t("sign-in.username-email")}
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    ...theme.customFonts.primary.medium,
                    ...styles.titleTextInput,
                    backgroundColor: theme.colors.lightGray,
                    color: theme.colors.black,
                  }}
                  numberOfLines={1}
                  multiline={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="usernameOrEmail"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <View>
            <Text
              style={{
                ...theme.customFonts.secondary.medium,
                fontWeight: "400",
                fontSize: 40,
              }}
            >
              {t("sign-in.password")}
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledTextField
                  editable
                  textInputProps={{
                    secureTextEntry: true,
                    style: {
                      ...theme.customFonts.primary.medium,
                      ...styles.titleTextInput,
                      backgroundColor: theme.colors.lightGray,
                      color: theme.colors.black,
                    },
                    numberOfLines: 1,
                    onBlur: onBlur,
                    onChangeText: onChange,
                    value: value,
                  }}
                  tooltip={t("sign-in.password-tool-tip")}
                  error={error?.message}
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
        </View>
        <StyledButton
          text="Next"
          onPress={handleSubmit(onSubmit)}
          icon="arrow-right"
          isLoading={isLoading}
        />
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 75,
    minHeight: windowHeight,
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    gap: 25,
  },
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 7,
  },
  formContainer: {
    justifyContent: "center",
    flex: 1,
    gap: 50,
  },
});

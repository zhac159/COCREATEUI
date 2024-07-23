import { usePostApiLogin } from "@/common/api/endpoints/cocreateApi";
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
import { hashPassword } from "@/common/encryption/encryptionHelper";

export default function SignIn() {
  const theme = useTheme();

  const setCurrentUser = useSetCurrentUserState();

  const { handleSubmit, control } = useForm<UserLoginDTO>();

  
  const { mutate, isLoading, error } = usePostApiLogin({
    mutation: {
      onSuccess: async (data) => {
        setCurrentUser(data.user);
        SecureStore.setItemAsync(SecureStoreKeys.USER_TOKEN, data.token);
        router.replace("/main/(tabs)/account");
        
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
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={styles.formContainer}
        >
          <View>
            <Text
              style={{
                ...theme.customFonts.secondary.medium,
                fontWeight: "400",
                fontSize: 40,
              }}
            >
              Username
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
              name="username"
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
              Password
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
    paddingHorizontal: "2%",
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

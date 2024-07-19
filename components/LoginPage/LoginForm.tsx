import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { Button, TextInput, Text } from "react-native-paper";
import { useSetCurrentUserState } from "../RecoilStates/profileState";
import {
  usePostApiLogin,
  usePutApiUserPublicKey,
} from "@/common/api/endpoints/cocreateApi";
import { UserLoginDTO } from "@/common/api/model";
import * as SecureStore from "expo-secure-store";
import SecureStoreKeys from "@/common/api/enum/secureStoreKeys";

const LoginForm = () => {
  const setCurrentUser = useSetCurrentUserState();

  const { setValue, handleSubmit } = useForm<UserLoginDTO>();

  const { mutate, isLoading, error } = usePostApiLogin({
    mutation: {
      onSuccess: async (data) => {
        setCurrentUser(data.user!);
        SecureStore.setItemAsync(SecureStoreKeys.USER_TOKEN, data.token);
        router.replace("/main/(tabs)/account");
      },
    },
  });

  const onSubmit = (data: UserLoginDTO) => {
    mutate({ data });
  };

  return (
    <View>
      <Text>Username:</Text>
      <TextInput
        autoCapitalize="none"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
        }}
        onChangeText={(text) => setValue("username", text)}
      />
      <Text>Password:</Text>
      <TextInput
        secureTextEntry
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
        }}
        onChangeText={(text) => setValue("password", text)}
      />
      {error && error.code === "404" && (
        <Text>Username or password is wrong</Text>
      )}
      <Button
        role="button"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={{ paddingTop: 20 }}
      >
        Submit
      </Button>
    </View>
  );
};

export default LoginForm;

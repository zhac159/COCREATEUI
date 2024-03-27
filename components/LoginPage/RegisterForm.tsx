import React from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { Button, TextInput, Text } from "react-native-paper";
import { useSetCurrentUserState } from "../RecoilStates/profileState";
import {
  usePostApiLogin,
  usePostApiLoginRegister,
  usePutApiUserPublicKey,
} from "@/common/api/endpoints/cocreateApi";
import { UserCreateDTO, UserLoginDTO } from "@/common/api/model";
import * as SecureStore from "expo-secure-store";
import {
  generateDatabaseKey,
  generateKeyPair,
} from "@/common/encryption/encryptionHelper";

const RegisterForm = () => {
  const setCurrentUser = useSetCurrentUserState();

  const { mutate: setPublicKey } = usePutApiUserPublicKey();

  const { setValue, handleSubmit } = useForm<UserCreateDTO>();

  const { mutate, isLoading, error } = usePostApiLoginRegister({
    mutation: {
      onSuccess: async (data) => {
        setCurrentUser(data.user);
        const token = data.token;
        if (!token) {
          return;
        }
        SecureStore.setItemAsync("userToken", token);
        generateDatabaseKey();

        var publicKey = await generateKeyPair();

        setPublicKey({ data: { publicKey: publicKey.publicKey.toString() } });

        if (data.user?.address == null) {
          router.replace("/main/locationForm");
          return;
        }
        router.replace("/main/(tabs)/account");
      },
      onError: (error) => {
        console.log(error.code);
      },
    },
  });

  const onSubmit = (data: UserCreateDTO) => {
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
      <Text>Email:</Text>
      <TextInput
        autoCapitalize="none"
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 200,
        }}
        onChangeText={(text) => setValue("email", text)}
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
      {error && error.code === "409" && (
        <Text>User with this username or email already exists</Text>
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

export default RegisterForm;

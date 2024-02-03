import React from "react";
import { useMutation } from "react-query";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { Button, TextInput, Text } from "react-native-paper";
import { useSetCurrentUser } from "../RecoilStates/profileState";
import { usePostApiLogin } from "@/common/api/endpoints/cocreateApi";
import { UserLoginDTO } from "@/common/api/model";



function LoginForm() {
  const navigation = useNavigation();
  const setCurrentUser = useSetCurrentUser();

  const { register, setValue, handleSubmit } = useForm<UserLoginDTO>();

  const { data, mutate, isLoading } = usePostApiLogin();

  const onSubmit = (data: UserLoginDTO) => {
    console.log(data);
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
}

export default LoginForm;

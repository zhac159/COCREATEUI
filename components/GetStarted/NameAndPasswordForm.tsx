import {
  usePostApiLoginRegister,
  usePutApiUserPublicKey,
} from "@/common/api/endpoints/cocreateApi";
import { UserCreateDTO } from "@/common/api/model";
import { useForm } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import {
  generateDatabaseKey,
  generateKeyPair,
  toBase64,
} from "@/common/encryption/encryptionHelper";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../Themes/theme";
import { useSetCurrentUserState } from "../RecoilStates/profileState";
import StyledButton from "../Common/StyledButton";
import { FC } from "react";
import * as Crypto from "expo-crypto";

type NameAndPasswordFormProps = {
  nextStep: () => void;
};

const NameAndPasswordForm: FC<NameAndPasswordFormProps> = ({ nextStep }) => {
  const theme = useTheme();

  const setCurrentUser = useSetCurrentUserState();

  const { mutate: setPublicKey } = usePutApiUserPublicKey();

  const { mutate, isLoading, error } = usePostApiLoginRegister({
    mutation: {
      onSuccess: async (data) => {
        setCurrentUser(data.user);
        SecureStore.setItemAsync("userToken", data.token);
        generateDatabaseKey();
        var publicKey = await generateKeyPair();
        setPublicKey({ data: { publicKey: toBase64(publicKey.publicKey) } });
        nextStep();
      },
    },
  });

  const { setValue, handleSubmit: handleSubmitForm } = useForm<UserCreateDTO>();

  const handleSubmit = async (userCreateDTO: UserCreateDTO) => {

    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      userCreateDTO.password
    );

    mutate({
      data: {
        ...userCreateDTO,
        password: hashedPassword,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          gap: 75,
        }}
      >
        <View style={styles.formEntryContainer}>
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              fontWeight: "400",
              fontSize: 40,
            }}
          >
            Select A Username
          </Text>
          <TextInput
            style={{
              ...theme.customFonts.primary.medium,
              ...styles.titleTextInput,
              backgroundColor: theme.colors.lightGray,
              color: theme.colors.black,
            }}
            numberOfLines={1}
            multiline={true}
            onChangeText={(text) => setValue("username", text)}
          />
        </View>
        <View style={styles.formEntryContainer}>
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              fontWeight: "400",
              fontSize: 40,
            }}
          >
            Select A Password
          </Text>
          <TextInput
            secureTextEntry
            style={{
              ...theme.customFonts.primary.medium,
              ...styles.titleTextInput,
              backgroundColor: theme.colors.lightGray,
              color: theme.colors.black,
            }}
            numberOfLines={1}
            onChangeText={(text) => setValue("password", text)}
          />
        </View>
        <View style={styles.formEntryContainer}>
          <Text
            style={{
              ...theme.customFonts.secondary.medium,
              fontWeight: "400",
              fontSize: 40,
            }}
          >
            What Is Your Email?
          </Text>
          <TextInput
            style={{
              ...theme.customFonts.primary.medium,
              ...styles.titleTextInput,
              backgroundColor: theme.colors.lightGray,
              color: theme.colors.black,
            }}
            numberOfLines={1}
            multiline={true}
            onChangeText={(text) => setValue("email", text)}
          />
        </View>
      </View>
      <StyledButton
        text="Next"
        onPress={handleSubmitForm(handleSubmit)}
        icon="arrow-right"
      />
    </View>
  );
};

export default NameAndPasswordForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "2%",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  titleTextInput: {
    fontSize: 25,
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 7,
  },
  formEntryContainer: {
    gap: 20,
  },
});

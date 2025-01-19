import * as Crypto from "expo-crypto";
import { useSecureStorage } from "../useSecureStorage";
import SecureStoreKeys from "@/common/constants/secureStoreKeys";
import Aes from "react-native-aes-crypto";

export const useEncryption = () => {
  const { setSecureValue, getSecureValue } = useSecureStorage();

  const hashPassword = async (password: string): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  };

  const generateSymmetricKey = async (): Promise<string> => {
    const symmetricKey = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString()
    );
    return symmetricKey;
  };

  const generateAndStoreSymmetricKey = async (chatId: number) => {
    const symmetricKey = await generateSymmetricKey();
    await setSecureValue(SecureStoreKeys.SYMMETRIC_KEY, symmetricKey, {
      keyAdditions: [chatId],
    });
    return symmetricKey;
  };

  const storeSymmetricKey = async (symmetricKey: string, chatId: number) => {
    await setSecureValue(SecureStoreKeys.SYMMETRIC_KEY, symmetricKey, {
      keyAdditions: [chatId],
    });
  };

  const getSymmetricKey = async (chatId: number) => {
    return await getSecureValue(SecureStoreKeys.SYMMETRIC_KEY, {
      keyAdditions: [chatId],
    });
  };

  const encryptSymmetricMessage = (text: string, key: string) => {
    return Aes.randomKey(16).then((salt) => {
      return Aes.encrypt(text, key, salt, "aes-256-cbc").then((cipher) => ({
        cipher,
        salt,
      }));
    });
  };

  const decryptSymmetricMessage = (
    encryptedData: string,
    key: string,
    salt: string
  ) => {
    return Aes.decrypt(encryptedData, key, salt, "aes-256-cbc");
  };

  const getRandomUUID = async () => {
    var uuid = await Aes.randomUuid();
    return uuid;
  };

  return {
    hashPassword,
    generateAndStoreSymmetricKey,
    storeSymmetricKey,
    getSymmetricKey,
    encryptSymmetricMessage,
    decryptSymmetricMessage,
    getRandomUUID,
  };
};

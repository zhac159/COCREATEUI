import * as Crypto from "expo-crypto";
import { useSecureStorage } from "../useSecureStorage";
import SecureStoreKeys from "@/common/constants/secureStoreKeys";

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

  return {
    hashPassword,
    generateAndStoreSymmetricKey,
    storeSymmetricKey,
    getSymmetricKey,
  };
};

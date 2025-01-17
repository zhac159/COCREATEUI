import * as Crypto from "expo-crypto";
import { useSecureStorage } from "../useSecureStorage";
import SecureStoreKeys from "@/common/constants/secureStoreKeys";

export const useEncryption = () => {
  const { setSecureValue } = useSecureStorage();

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

  const generateAndStoreSymmetricKey = async (chatId: string) => {
    const symmetricKey = await generateSymmetricKey();
    await setSecureValue(SecureStoreKeys.SYMMETRIC_KEY, symmetricKey, {
      keyAdditions: [chatId],
    });
    return symmetricKey;
  };

  return {
    hashPassword,
    generateAndStoreSymmetricKey,
  };
};

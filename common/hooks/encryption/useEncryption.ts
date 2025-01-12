import * as Crypto from 'expo-crypto';

export const useEncryption = () => {
  const hashPassword = async (password: string): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  };

  return {
    hashPassword,
  };
};
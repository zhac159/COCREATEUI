import SecureStoreKeys from '@/common/constants/secureStoreKeys';
import * as SecureStore from 'expo-secure-store';

export const useSecureStorage = () => {
  const setSecureValue = async (key: SecureStoreKeys, value: string) => {
      await SecureStore.setItemAsync(key, value);
  };

  const getSecureValue = async (key: SecureStoreKeys) => {
      return await SecureStore.getItemAsync(key);
  };

  const removeSecureValue = async (key: SecureStoreKeys) => {
      await SecureStore.deleteItemAsync(key);
  };

  return { setSecureValue, getSecureValue, removeSecureValue };
};
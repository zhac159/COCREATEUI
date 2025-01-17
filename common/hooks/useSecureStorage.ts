import SecureStoreKeys from "@/common/constants/secureStoreKeys";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "../stores/authStore";

type KeyOptions = {
  keyAdditions?: (string | number)[];
  nonUserSpecific?: boolean;
};

export const useSecureStorage = () => {
  const userId = useAuthStore((state) => state.auth.userId);

  const getKey = (key: SecureStoreKeys, keyOptions?: KeyOptions): string => {
    const { keyAdditions = [], nonUserSpecific = false } = keyOptions || {};

    const prefix = nonUserSpecific ? "" : `${userId}_`;
    const suffix =
      keyAdditions.length > 0 ? `_${keyAdditions.map(String).join("_")}` : "";
      
    return `${prefix}${key}${suffix}`;
  };

  const setSecureValue = async (
    key: SecureStoreKeys,
    value: string,
    keyOptions?: KeyOptions
  ) => {
    await SecureStore.setItemAsync(getKey(key, keyOptions), value);
  };

  const getSecureValue = async (
    key: SecureStoreKeys,
    keyOptions?: KeyOptions
  ) => {
    return await SecureStore.getItemAsync(getKey(key, keyOptions));
  };

  const removeSecureValue = async (
    key: SecureStoreKeys,
    keyOptions?: KeyOptions
  ) => {
    await SecureStore.deleteItemAsync(getKey(key, keyOptions));
  };

  return { setSecureValue, getSecureValue, removeSecureValue };
};

import SecureStoreKeys from "@/common/constants/secureStoreKeys";
import { useSecureStorage } from "@/common/hooks/useSecureStorage";
import { useAuthStore } from "@/common/stores/authStore/authStore";
import { useConnectionContext } from "@/common/contexts/ConnectionProvider";
import { router } from "expo-router";
import { useCallback } from "react";
import { LoginResponse } from "@/api2/model";

export const useOnUserLogIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { setSecureValue } = useSecureStorage();
  const { createAndSetConnection } = useConnectionContext();

  const onUserLogIn = useCallback(
    async (data: LoginResponse) => {
      setAuth(data.user);
      await setSecureValue(SecureStoreKeys.USER_TOKEN, data.token, {
        nonUserSpecific: true,
      });
      await createAndSetConnection(data.token);
      router.replace("/main/(tabs)/account");
    },
    [setSecureValue, createAndSetConnection]
  );

  return { onUserLogIn };
};

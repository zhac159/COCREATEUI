import { LoginResponseDTO } from "@/api/model";
import SecureStoreKeys from "@/common/constants/secureStoreKeys";
import { useSecureStorage } from "@/common/hooks/useSecureStorage";
import { useAuthStore } from "@/common/stores/authStore";
import { useConnectionContext } from "@/common/webSockets/ConnectionProvider";
import { router } from "expo-router";
import { useCallback } from "react";

export const useOnUserLogIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const { setSecureValue } = useSecureStorage();
  const { createAndSetConnection } = useConnectionContext();

  const onUserLogIn = useCallback(
    async (data: LoginResponseDTO) => {
      setAuth(data.user);
      await setSecureValue(SecureStoreKeys.USER_TOKEN, data.token, {
        nonUserSpecific: true,
      });
      createAndSetConnection(data.token);

      router.replace("/main/(tabs)/account");
    },
    [setSecureValue, createAndSetConnection]
  );

  return { onUserLogIn };
};

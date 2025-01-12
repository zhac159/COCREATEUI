import { LoginResponseDTO } from "@/api/model";
import SecureStoreKeys from "@/common/constants/secureStoreKeys";
import { useSecureStorage } from "@/common/hooks/useSecureStorage";
import { useAuthStore } from "@/common/stores/authStore";
import {
  createConnection,
  useConnectionContext,
} from "@/common/webSockets/ConnectionProvider";
import { useCallback } from "react";

export const useOnUserLogIn = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const { setSecureValue } = useSecureStorage();
  const { setConnection } = useConnectionContext();

  const onUserLogIn = useCallback(
    async (data: LoginResponseDTO) => {
      setAuth(data.user);
      setSecureValue(SecureStoreKeys.USER_TOKEN, data.token);
      setConnection(createConnection(data.token));
    },
    [setAuth, setSecureValue, setConnection]
  );

  return { onUserLogIn };
};

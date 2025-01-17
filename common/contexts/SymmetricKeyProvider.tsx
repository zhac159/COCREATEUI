import { createContext } from "react";
import { useConnectionContext } from "../webSockets/ConnectionProvider";
import { useAuthStore } from "../stores/authStore";
import { useAsymmetricKey } from "./AsymmetricKeyProvider";
import { useEncryption } from "../hooks/encryption/useEncryption";
import { WebSocketInvocations } from "../constants/webSocketInvocations";
import { ChatDTO } from "@/api/model";
import { getChatId } from "../functions/getChatId";

type SymmetricContextType = {
  createAndExchangeKey: (createKeyExchange: ChatDTO) => void;
};

const SymmetricKeyContext = createContext<SymmetricContextType | null>(null);

export function SymmetricKeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sendWebSocketMessage } = useConnectionContext();
  const userId = useAuthStore((state) => state.auth.userId);

  const { generateAndStoreSymmetricKey } = useEncryption();
  const { encryptMessageAsymmetric, publicKey } = useAsymmetricKey();

  const createAndExchangeKey = async (createKeyExchange: ChatDTO) => {
    const chatId = getChatId(createKeyExchange);
    const symmetricKey = await generateAndStoreSymmetricKey(chatId);

    createKeyExchange.chatMembers.forEach(async (member) => {
      const { message, nonce } = await encryptMessageAsymmetric(
        symmetricKey,
        member.publicKey
      );

      sendWebSocketMessage(WebSocketInvocations.ExchangeKey, {
        chatId: chatId,
        chatType: createKeyExchange.chatType,
        encryptedSymmetricKey: message,
        nonce: nonce,
        publicKey: publicKey,
        targetId: member.userId,
      });
    });
  };

  return (
    <SymmetricKeyContext.Provider value={{ createAndExchangeKey }}>
      {children}
    </SymmetricKeyContext.Provider>
  );
}

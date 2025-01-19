import { createContext, useContext } from "react";
import { useConnectionContext } from "./ConnectionProvider";
import { useAsymmetricKey } from "./AsymmetricKeyProvider";
import { useEncryption } from "../hooks/encryption/useEncryption";
import { WebSocketInvocations } from "../constants/webSocketInvocations";
import { ChatDTO } from "@/api/model";
import { WebSocketConnections } from "../constants/webSocketConnections";
import { router } from "expo-router";

type SymmetricContextType = {
  createAndExchangeKeyIfNotExist: (chat: ChatDTO) => Promise<string>;
  navigateToChat: (chat: ChatDTO) => void;
};

const SymmetricKeyContext = createContext<SymmetricContextType | null>(null);

export const useSymmetricKey = () => {
  const context = useContext(SymmetricKeyContext);
  if (!context) {
    throw new Error(
      "useSymmetricKey must be used within a SymmetricKeyProvider"
    );
  }
  return context;
};

export function SymmetricKeyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sendWebSocketMessage, setupWebSocketConnection } =
    useConnectionContext();
  const { generateAndStoreSymmetricKey, storeSymmetricKey, getSymmetricKey } =
    useEncryption();
  const { encryptMessageAsymmetric, publicKey, decryptMessageAsymmetric } =
    useAsymmetricKey();

  setupWebSocketConnection(
    WebSocketConnections.ReceiveEncryptedKeysExchange,
    async (data) => {
      const receivedKeys = await Promise.all(
        data.map(async (keyExchange) => {
          const symmetricKey = await decryptMessageAsymmetric(
            keyExchange.encryptedSymmetricKey,
            keyExchange.nonce,
            keyExchange.publicKey
          );
          await storeSymmetricKey(symmetricKey, keyExchange.chatId);
          return keyExchange.id;
        })
      );

      await sendWebSocketMessage(
        WebSocketInvocations.AknowledgeEncryptedKeyExchangeAsync,
        receivedKeys
      );
    }
  );

  sendWebSocketMessage(
    WebSocketInvocations.GetEncryptedKeyExchangesAsync,
    null
  );

  const createAndExchangeKeyIfNotExist = async (chat: ChatDTO) => {
    const existingSymmetricKey = await getSymmetricKey(chat.id);
    if (existingSymmetricKey) {
      return existingSymmetricKey;
    }

    const symmetricKey = await generateAndStoreSymmetricKey(chat.id);

    const encyptedKeyExchanges = await Promise.all(
      chat.chatMembers.map(async (member) => {
        const { message, nonce } = await encryptMessageAsymmetric(
          symmetricKey,
          member.publicKey
        );

        return {
          chatId: chat.id,
          encryptedSymmetricKey: message,
          nonce: nonce,
          publicKey: publicKey,
          targetUserId: member.userId,
        };
      })
    );

    await sendWebSocketMessage(
      WebSocketInvocations.ExchangeKey,
      encyptedKeyExchanges
    );

    return symmetricKey;
  };

  const navigateToChat = async (chat: ChatDTO) => {
    const symmetricKey = await createAndExchangeKeyIfNotExist(chat);
    router.push({
      pathname: "/main/chat/[id]",
      params: { id: chat.id, symmetricKey: symmetricKey },
    });
  };

  return (
    <SymmetricKeyContext.Provider
      value={{ createAndExchangeKeyIfNotExist, navigateToChat }}
    >
      {children}
    </SymmetricKeyContext.Provider>
  );
}

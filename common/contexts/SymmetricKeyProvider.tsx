import { createContext } from "react";
import {
  useConnection,
  useConnectionContext,
} from "../webSockets/ConnectionProvider";
import { useAuthStore } from "../stores/authStore";
import { ChatType } from "../constants/skill/chatType";
import { useAsymmetricKey } from "./AsymmetricKeyProvider";
import { useEncryption } from "../hooks/encryption/useEncryption";
import { WebSocketInvocations } from "../constants/webSocketInvocations";

type ChatMember = {
  userId: number;
  publicKey: string;
};

type CreateKeyExchange = {
  chatTypeId: number;
} & (
  | {
      chatType: ChatType.Project;
      recipients: ChatMember[];
    }
  | {
      chatType: Exclude<ChatType, ChatType.Project>;
      recipient: ChatMember;
    }
);

type SymmetricContextType = {
  createAndExchangeKey: (createKeyExchange: CreateKeyExchange) => void;
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

  const createChatId = (createKeyExchange: CreateKeyExchange) => {
    if (createKeyExchange.chatType === ChatType.Project) {
      return `${createKeyExchange.chatType}-${createKeyExchange.chatTypeId}`;
    }
    if (userId < createKeyExchange.recipient.userId) {
      return `${createKeyExchange.chatType}-${createKeyExchange.chatTypeId}-${userId}-${createKeyExchange.recipient.userId}`;
    }
    return `${createKeyExchange.chatType}-${createKeyExchange.chatTypeId}-${createKeyExchange.recipient.userId}-${userId}`;
  };

  const createAndExchangeKey = async (createKeyExchange: CreateKeyExchange) => {
    const chatId = createChatId(createKeyExchange);
    const symmetricKey = await generateAndStoreSymmetricKey(chatId);

    const recipients =
      createKeyExchange.chatType === ChatType.Project
        ? createKeyExchange.recipients
        : [createKeyExchange.recipient];

    recipients.forEach(async (recipientId) => {
      const { message, nonce } = await encryptMessageAsymmetric(
        symmetricKey,
        recipientId.publicKey
      );

      sendWebSocketMessage(WebSocketInvocations.ExchangeKey, {
        chatId: chatId,
        chatType: createKeyExchange.chatType,
        encryptedSymmetricKey: message,
        nonce: nonce,
        publicKey: publicKey,
        targetId: recipientId.userId,
      });
    });
  };

  return (
    <SymmetricKeyContext.Provider value={{ createAndExchangeKey }}>
      {children}
    </SymmetricKeyContext.Provider>
  );
}

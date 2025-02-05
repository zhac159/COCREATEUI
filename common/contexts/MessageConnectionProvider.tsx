import { FC, ReactNode } from "react";
import { useMessagesStore } from "../stores/messagesStore";
import { useDatabase } from "../hooks/database/useDatabase";
import { useEncryption } from "../hooks/encryption/useEncryption";
import { useConnectionContext } from "./ConnectionProvider";
import { WebSocketConnections } from "../constants/webSocketConnections";
import { WebSocketInvocations } from "../constants/webSocketInvocations";

type MessageConnectionProviderProps = {
  children: ReactNode;
};

export const MessageConnectionProvider: FC<MessageConnectionProviderProps> = ({
  children,
}) => {
  const addMessages = useMessagesStore((state) => state.addMessages);
  const { addDbMessages } = useDatabase();
  const { decryptChatMessage } = useEncryption();
  const { setupWebSocketConnection, sendWebSocketMessage } =
    useConnectionContext();

  setupWebSocketConnection(
    WebSocketConnections.ReceiveMessages,
    async (data) => {
      const messages = await Promise.all(
        data.map(async (messageDto) => {
          const message = await decryptChatMessage(messageDto);
          return message;
        })
      );
      const enrichedMessages = await addDbMessages(messages);
      sendWebSocketMessage(
        WebSocketInvocations.AknowledgeMessagesAsync,
        messages.map((message) => message.id)
      );
      addMessages(enrichedMessages);
    }
  );

  return <>{children}</>;
};

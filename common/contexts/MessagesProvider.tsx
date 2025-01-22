import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { useConnectionContext } from "./ConnectionProvider";
import { WebSocketConnections } from "../constants/webSocketConnections";
import { WebSocketInvocations } from "../constants/webSocketInvocations";
import { useEncryption } from "../hooks/encryption/useEncryption";
import { useDatabase } from "../hooks/database/useDatabase";
import { useMessagesStore } from "../stores/messagesStore";

type MessagesContextType = {};

const MessagesContext = createContext<MessagesContextType | null>(null);

const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};

type MessagesProviderProps = {
  children: ReactNode;
};

export const MessagesProvider: FC<MessagesProviderProps> = ({ children }) => {
  const addInitialMessages = useMessagesStore(
    (state) => state.addInitialMessages
  );
  const { addDbMessages, getDbMessages } = useDatabase();
  const { decryptChatMessage } = useEncryption();
  const { setupWebSocketConnection, sendWebSocketMessage } =
    useConnectionContext();

  useEffect(() => {
    const getInitialMessages = async () => {
      const message = await getDbMessages("dsa");
      console.log(message);
      addInitialMessages(message);
    };
    getInitialMessages();
  }, []);

  setupWebSocketConnection(
    WebSocketConnections.ReceiveMessages,
    async (data) => {
      const messages = await Promise.all(
        data.map(async (messageDto) => {
          const message = await decryptChatMessage(messageDto);
          return message;
        })
      );
      addDbMessages(messages);
      sendWebSocketMessage(
        WebSocketInvocations.AknowledgeMessagesAsync,
        messages.map((message) => message.id)
      );
    }
  );

  return (
    <MessagesContext.Provider value={{}}>{children}</MessagesContext.Provider>
  );
};

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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

  const [isLoadingInitialMessages, setIsLoadingInitialMessages] =
    useState(true);

  const { getDbMessagesByChat } = useDatabase();

  useEffect(() => {
    const getInitialMessages = async () => {
      const message = await getDbMessagesByChat();
      addInitialMessages(message);
      setIsLoadingInitialMessages(false);
    };
    getInitialMessages();
  }, []);

  if (isLoadingInitialMessages) {
    return null;
  }

  return (
    <MessagesContext.Provider value={{}}>{children}</MessagesContext.Provider>
  );
};

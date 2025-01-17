import { createContext, useContext, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import {
  WebSocketInvocations,
  WebSocketMessage,
} from "../constants/webSocketInvocations";

type ConnectionContextType = {
  connection: HubConnection | null;
  setConnection: (connection: HubConnection) => void;
  createAndSetConnection: (token: string) => Promise<void>;
  sendWebSocketMessage: <T extends WebSocketInvocations>(invocation: T, data: WebSocketMessage[T]) => Promise<void>
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

const chatPath = "/chatHub";

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (!context?.connection) {
    throw new Error("useConnection must be used inside a ConnectionProvider");
  }
  return context.connection;
}

export function useConnectionContext() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error(
      "useConnectionContext must be used inside a ConnectionProvider"
    );
  }
  return context;
}

type ConnectionProviderProps = {
  children: React.ReactNode;
};

export function ConnectionProvider({ children }: ConnectionProviderProps) {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const createAndSetConnection = async (token: string) => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.EXPO_PUBLIC_API_URL + chatPath, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    await newConnection.start();
    setConnection(newConnection);
  };

  const sendWebSocketMessage = async <T extends WebSocketInvocations>(
    invocation: T,
    data: WebSocketMessage[T]
  ) => {
    if (connection) {
      await connection.invoke(invocation, data);
    }
  };

  return (
    <ConnectionContext.Provider
      value={{ connection, setConnection, createAndSetConnection, sendWebSocketMessage }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

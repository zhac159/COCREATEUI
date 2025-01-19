import { createContext, useContext, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import {
  WebSocketInvocations,
  WebSocketMessage,
} from "../constants/webSocketInvocations";
import {
  WebSocketCallback,
  WebSocketConnections,
  WebSocketReceivingMessage,
} from "../constants/webSocketConnections";

type ConnectionContextType = {
  connection: HubConnection | null;
  setConnection: (connection: HubConnection) => void;
  createAndSetConnection: (token: string) => Promise<void>;
  sendWebSocketMessage: <T extends WebSocketInvocations>(
    invocation: T,
    data: WebSocketMessage[T]
  ) => Promise<void>;
  setupWebSocketConnection: <T extends WebSocketConnections>(
    connectionType: T,
    callback: WebSocketCallback<T>
  ) => void;
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
    invocationType: T,
    data: WebSocketMessage[T]
  ) => {
    if (!connection) return;
    if (!data) {
      await connection.invoke(invocationType);
      return;
    }
    await connection.invoke(invocationType, data);
  };

  const setupWebSocketConnection = <T extends WebSocketConnections>(
    connectionType: T,
    callback: WebSocketCallback<T>
  ) => {
    useEffect(() => {
      if (!connection) return;
      connection.on(connectionType, (data: WebSocketReceivingMessage[T]) => {
        callback(data);
      });
      return () => {
        if (connection) {
          connection.off(connectionType);
        }
      };
    }, [connection, connectionType, callback]);
  };

  return (
    <ConnectionContext.Provider
      value={{
        connection,
        setConnection,
        createAndSetConnection,
        sendWebSocketMessage,
        setupWebSocketConnection,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

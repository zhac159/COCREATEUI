import { createContext, useContext, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

type ConnectionContextType = {
  connection: HubConnection | null;
  setConnection: (connection: HubConnection) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined
);

const chatPath = "/chatHub";

export const createConnection = (token: string) => {
  const connection = new HubConnectionBuilder()
    .withUrl(process.env.EXPO_PUBLIC_API_URL + chatPath, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();
  return connection;
};

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

  return (
    <ConnectionContext.Provider value={{ connection, setConnection }}>
      {children}
    </ConnectionContext.Provider>
  );
}

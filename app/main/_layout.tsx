import { Stack } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { HubConnection} from "@microsoft/signalr";
import * as SQLite from "expo-sqlite";
import { MessageDTO } from "@/common/api/model";
import { initializeDatabase } from "@/common/database/databaseHelper";
import { fetchTokenAndStartConnection } from "@/common/webSockets/webSocketsHelper";
import {  handleReceivedMessages } from "@/common/chat/chatHelper";

export const ConnectionContext = createContext<HubConnection | null>(null);

export const DatabaseContext = createContext<SQLite.SQLiteDatabase | null>(
  null
);

export default function HelperScreenNav() {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    fetchTokenAndStartConnection().then((connection) => {
      setConnection(connection);
    });

    return () => {
      connection?.stop().then(() => console.log("Connection stopped"));
    };
  }, []);

  useEffect(() => {
    const database = initializeDatabase();
    setDb(database);
  }, []);

  useEffect(() => {
    if (!connection || !db) return;
  
    connection.on("ReceiveMessages", (messages: MessageDTO[]) => {
      handleReceivedMessages(connection, db, messages);
    });
  }, [connection, db]);
  
  return (
    <ConnectionContext.Provider value={connection}>
      <DatabaseContext.Provider value={db}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="portofolioModal"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen name="chat" />
          <Stack.Screen name="locationForm" />
        </Stack>
      </DatabaseContext.Provider>
    </ConnectionContext.Provider>
  );
}

import { Stack } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { MessageDTO } from "@/common/api/model";
import {
  initializeDatabase,
  migrateDbIfNeeded,
} from "@/common/database/databaseHelper";
import { fetchTokenAndStartConnection } from "@/common/webSockets/webSocketsHelper";
import { handleReceivedMessages } from "@/common/chat/chatHelper";
import { useSQLiteContext } from "expo-sqlite/next";

export const ConnectionContext = createContext<HubConnection | null>(null);

export default function HelperScreenNav() {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const database = useSQLiteContext();

  useEffect(() => {
    fetchTokenAndStartConnection().then((connection) => {
      setConnection(connection);
    });

    return () => {
      connection?.stop().then(() => console.log("Connection stopped"));
    };
  }, []);


  useEffect(() => {
    if (!connection || !database) return;

    connection.on("ReceiveMessages", (messages: MessageDTO[]) => {
      handleReceivedMessages(connection, database, messages);
    });
  }, [connection, database]);

  return (
    <ConnectionContext.Provider value={connection}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="portofolioModal"
            options={{ presentation: "modal" }}
          />
          <Stack.Screen name="chat" />
          <Stack.Screen name="locationForm" />
        </Stack>
    </ConnectionContext.Provider>
  );
}

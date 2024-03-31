import { Stack } from "expo-router";
import React, { createContext, useEffect, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import { EncryptedKeyExchangeDTO, MessageDTO } from "@/common/api/model";
import { migrateDbIfNeeded } from "@/common/database/databaseHelper";
import { fetchTokenAndStartConnection } from "@/common/webSockets/webSocketsHelper";
import {
  handleReceiveEncryptedKeysExchange,
  handleReceivedMessages,
} from "@/common/chat/chatHelper";
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

  useEffect(() => {
    if (!connection) return;

    connection.on(
      "ReceiveEncryptedKeysExchange",
      (encryptedKeys: EncryptedKeyExchangeDTO[]) => {
        handleReceiveEncryptedKeysExchange(connection, encryptedKeys);
      }
    );
  }, [connection]);

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

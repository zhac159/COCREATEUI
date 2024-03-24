import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-native-paper";
import { LightTheme } from "@/components/Themes/theme";
import MediaViewerPortal from "@/components/MediaViewer/MediaViewerPortal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { MessageDTO } from "@/common/api/model";
import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import * as SQLite from "expo-sqlite";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    LibreCaslonText: require("../assets/fonts/LibreCaslonText-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const ConnectionContext = createContext<HubConnection | null>(null);

export const DatabaseContext = createContext<SQLite.WebSQLDatabase | null>(
  null
);

function RootLayoutNav() {
  const queryClient = new QueryClient();

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    const fetchTokenAndStartConnection = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        throw new Error("Token not found");
      }
      const connection = new HubConnectionBuilder()
        .withUrl("http://192.168.1.92:5000/chatHub", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => console.log("Connection started"))
        .catch((err) => console.log("Error while starting connection: " + err));

      setConnection(connection);
    };

    fetchTokenAndStartConnection();

    return () => {
      connection?.stop().then(() => console.log("Connection stopped"));
    };
  }, []);

  useEffect(() => {
    const database = SQLite.openDatabase("cocreateLocalDatabase.db");

    database.transaction((tx) => {
      tx.executeSql(
        `create table if not exists messages (
          id TEXT PRIMARY KEY NOT NULL,
          senderId INTEGER NOT NULL,
          content TEXT,
          uri TEXT,
          mediaType INTEGER,
          date TEXT NOT NULL,
          chatType INTEGER NOT NULL,
          chatId INTEGER NOT NULL
        );`,
        [],
        (_, resultSet) => console.log("Table creation result:", resultSet),
        (_, error) => {
          console.log("Table creation error:", error);
          return true;
        }
      );

      tx.executeSql(
        `create index if not exists idx_messages_chatId_chatType on messages (chatId, chatType);`,
        [],
        (_, resultSet) => console.log("Index creation result:", resultSet),
        (_, error) => {
          console.log("Index creation error:", error);
          return true;
        }
      );
    });

    setDb(database);
  }, []);

  useEffect(() => {
    if (!connection || !db) return;

    connection.on("ReceiveMessage", (message: MessageDTO) => {
      if (
        db &&
        message &&
        message.id &&
        message.chatType !== undefined &&
        message.chatId !== undefined &&
        message.date &&
        message.senderId !== undefined
      ) {
        const { id, chatType, senderId, date, chatId } = message;
        
        db.transaction((tx) => {
          tx.executeSql(
            `insert into messages (id, senderId, content, uri, mediaType, date, chatType, chatId) values (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              id,
              senderId,
              message.content || null,
              message.uri || null,
              message.mediaType || null,
              date,
              chatType,
              chatId,
            ],
            (_, resultSet) => console.log("Insert success:", resultSet),
            (_, error) => {
              console.log("Insert error:", error);
              return true; // return true to stop transaction
            }
          );
        });
      }
    });
  }, [connection, db]);

  return (
    <Provider theme={LightTheme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ConnectionContext.Provider value={connection}>
            <DatabaseContext.Provider value={db}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen
                    name="modal"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen
                    name="portofolioModal"
                    options={{ presentation: "modal" }}
                  />
                  <Stack.Screen name="chat" />
                </Stack>
                <MediaViewerPortal />
              </GestureHandlerRootView>
            </DatabaseContext.Provider>
          </ConnectionContext.Provider>
        </QueryClientProvider>
      </RecoilRoot>
    </Provider>
  );
}

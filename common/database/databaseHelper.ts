import * as SQLite from "expo-sqlite";
import { MessageDTO } from "../api/model";
import { IMessage } from "react-native-gifted-chat";
import { decryptMessage, getAesKey } from "../encryption/encryptionHelper";
import { SQLiteDatabase } from "expo-sqlite/build/next/SQLiteDatabase";

export function initializeDatabase() {
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

    tx.executeSql(
      `CREATE INDEX IF NOT EXISTS idx_messages_date ON messages (date DESC);`,
      [],
      (_, resultSet) => console.log("Index creation result:", resultSet),
      (_, error) => {
        console.log("Index creation error:", error);
        return true;
      }
    );
  });

  return database;
}

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`create table if not exists messages (
    id TEXT PRIMARY KEY NOT NULL,
    senderId INTEGER NOT NULL,
    content TEXT,
    uri TEXT,
    mediaType INTEGER,
    date TEXT NOT NULL,
    chatType INTEGER NOT NULL,
    chatId INTEGER NOT NULL
  );`);
  await db.execAsync(
    `create index if not exists idx_messages_chatId_chatType on messages (chatId, chatType);`
  );
  await db.execAsync(
    `CREATE INDEX IF NOT EXISTS idx_messages_date ON messages (date DESC);`
  );
}

export async function fetchMessages(
  database: SQLiteDatabase,
  chatIdTypePair: { chatId: number; chatType: number }
): Promise<MessageDTO[]> {
  const aesKey = await getAesKey();

  if (!aesKey) throw new Error("AES key not found");

  const resultSet = await database.getAllAsync(
    `SELECT * FROM messages WHERE chatId = ? AND chatType = ? ORDER BY date DESC`,
    [chatIdTypePair.chatId, chatIdTypePair.chatType]
  );

  const rows: MessageDTO[] = resultSet.map((row: any) => {
    row.content = row.content ? decryptMessage(row.content, aesKey) : null;
    return row as MessageDTO;
  });

  return rows;
}
export function convertMessageDTOToIMessage(message: MessageDTO): IMessage {
  return {
    _id: `${message.id}`,
    text: message.content || "",
    createdAt: new Date(message.date || ""),
    user: {
      _id: message.senderId || "unknown",
    },
    sent: true,
  };
}

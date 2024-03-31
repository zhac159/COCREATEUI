import { MessageDTO } from "../api/model";
import { IMessage } from "react-native-gifted-chat";
import { decryptMessageAES, getAesKey } from "../encryption/encryptionHelper";
import { SQLiteDatabase } from "expo-sqlite/build/next/SQLiteDatabase";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`create table if not exists messages (
    id TEXT PRIMARY KEY NOT NULL,
    senderId INTEGER NOT NULL,
    content TEXT,
    uri TEXT,
    mediaType INTEGER,
    date TEXT NOT NULL,
    chatType INTEGER NOT NULL,
    targetId INTEGER NOT NULL
  );`);
  await db.execAsync(
    `create index if not exists idx_messages_targetId_chatType on messages (targetId, chatType);`
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
    `SELECT * FROM messages WHERE targetId = ? AND chatType = ? ORDER BY date DESC`,
    [chatIdTypePair.chatId, chatIdTypePair.chatType]
  );

  const rows: MessageDTO[] = resultSet.map((row: any) => {
    row.content = row.content ? decryptMessageAES(row.content, aesKey) : null;
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

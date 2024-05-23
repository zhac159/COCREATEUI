import Message from "@/components/Common/Messages/Message";
import { MessageDTO } from "../api/model";
import {
  decryptMessageAES,
  getDatabasKey,
} from "../encryption/encryptionHelper";
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

  const resultSet = await db.getAllAsync(`PRAGMA table_info(messages);`);

  const columnExists = resultSet.some(
    (row: any) => row.name === "replyMessageId"
  );

  if (!columnExists) {
    await db.execAsync(`ALTER TABLE messages ADD COLUMN replyMessageId TEXT;`);
  }
}

export async function fetchLastMessages(
  database: SQLiteDatabase,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number }
): Promise<MessageDTO[]> {
  const aesKey = await getDatabasKey();

  if (!aesKey) throw new Error("AES key not found");

  const resultSet = await database.getAllAsync(
    `SELECT * FROM messages WHERE targetId = ? AND chatType = ? ORDER BY date DESC LIMIT 3`,
    [chatTargetIdTypePair.chatTargetId, chatTargetIdTypePair.chatType]
  );

  const rows: MessageDTO[] = resultSet.map((row: any) => {
    row.content = row.content ? decryptMessageAES(row.content, aesKey) : null;
    return row as MessageDTO;
  });

  return rows;
}

export async function fetchMessages(
  database: SQLiteDatabase,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number },
  lastMessageDate?: string
): Promise<Message[]> {
  const aesKey = await getDatabasKey();

  if (!aesKey) throw new Error("AES key not found");

  const limit = 40;

  lastMessageDate = lastMessageDate || new Date().toISOString();

  const resultSet = await database.getAllAsync(
    `SELECT m.*, 
      r.chatType as replyMessage_chatType, 
      r.content as replyMessage_content, 
      r.date as replyMessage_date, 
      r.id as replyMessage_id, 
      r.mediaType as replyMessage_mediaType, 
      r.replyMessageId as replyMessage_replyMessageId, 
      r.senderId as replyMessage_senderId, 
      r.targetId as replyMessage_targetId, 
      r.uri as replyMessage_uri
    FROM messages m
    LEFT JOIN messages r ON m.replyMessageId = r.id
    WHERE m.targetId = ? AND m.chatType = ? AND m.date < ? 
    ORDER BY m.date DESC 
    LIMIT ?`,
    [
      chatTargetIdTypePair.chatTargetId,
      chatTargetIdTypePair.chatType,
      lastMessageDate,
      limit,
    ]
  );

  const rows: Message[] = resultSet.map((row: any) => (
    
    {
    chatType: row.chatType,
    content: row.content ? decryptMessageAES(row.content, aesKey) : null,
    date: row.date,
    id: row.id,
    mediaType: row.mediaType,
    replyMessageId: row.replyMessageId,
    senderId: row.senderId,
    targetId: row.targetId,
    uri: row.uri,
    replyMessage: {
      chatType: row.replyMessage_chatType,
      content: row.replyMessage_content ? decryptMessageAES(row.replyMessage_content, aesKey) : null,
      date: row.replyMessage_date,
      id: row.replyMessage_id,
      mediaType: row.replyMessage_mediaType,
      replyMessageId: row.replyMessage_replyMessageId,
      senderId: row.replyMessage_senderId,
      targetId: row.replyMessage_targetId,
      uri: row.replyMessage_uri,
    },
  }));

  return rows;
}

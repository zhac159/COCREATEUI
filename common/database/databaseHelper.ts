import Message from "@/components/Common/Messages/Message";
import {
  decryptMessageAES,
  getDatabasKey,
} from "../encryption/encryptionHelper";
import { SQLiteDatabase } from "expo-sqlite/build/next/SQLiteDatabase";
import { MediaType } from "@/components/Account/Common/Media/MediaType";
import MessageReaction from "@/components/Common/Messages/MessageReaction";
import ChatType from "../chat/chatType";

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

  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS messageReactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId TEXT NOT NULL,
    reaction INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    multiplier INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (messageId) REFERENCES messages(id)
  );
`);

  await db.execAsync(`
  CREATE INDEX IF NOT EXISTS idx_messageReactions_messageId ON messageReactions (messageId);
`);

  const resultSet = await db.getAllAsync(`PRAGMA table_info(messages);`);

  const columnExists = resultSet.some(
    (row: any) => row.name === "replyMessageId"
  );

  if (!columnExists) {
    await db.execAsync(`ALTER TABLE messages ADD COLUMN replyMessageId TEXT;`);
  }
}

type Row = {
  chatType: ChatType | undefined;
  content: string | null;
  date: string;
  id: string;
  mediaType: MediaType | undefined;
  replyMessageId: string | null;
  senderId: number;
  targetId: number;
  uri: string | null;
  replyMessage_chatType: ChatType | undefined;
  replyMessage_content: string | null;
  replyMessage_date: string;
  replyMessage_id: string;
  replyMessage_mediaType: MediaType | undefined;
  replyMessage_replyMessageId: string | null;
  replyMessage_senderId: number;
  replyMessage_targetId: number;
  replyMessage_uri: string | null;
};

function rowToMessage(row: Row, aesKey: string): Message {
  return {
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
      content: row.replyMessage_content
        ? decryptMessageAES(row.replyMessage_content, aesKey)
        : null,
      date: row.replyMessage_date,
      id: row.replyMessage_id,
      mediaType: row.replyMessage_mediaType,
      replyMessageId: row.replyMessage_replyMessageId,
      senderId: row.replyMessage_senderId,
      targetId: row.replyMessage_targetId,
      uri: row.replyMessage_uri,
    },
  };
}

export async function addReactionsToMessages(
  database: SQLiteDatabase,
  messageReactions: MessageReaction[]
) {
  for (const messageReaction of messageReactions) {
    const existingReaction = await database.getFirstAsync(
      `SELECT * FROM messageReactions WHERE messageId = ? AND reaction = ? AND userId = ?`,
      [
        messageReaction.messageId,
        messageReaction.reaction,
        messageReaction.userId || null,
      ]
    );

    if (existingReaction) {
      await database.runAsync(
        `UPDATE messageReactions SET multiplier = multiplier + 1 WHERE messageId = ? AND reaction = ? AND userId = ?`,
        [
          messageReaction.messageId,
          messageReaction.reaction,
          messageReaction.userId || null,
        ]
      );
    } else {
      await database.runAsync(
        `INSERT INTO messageReactions (messageId, reaction, userId, multiplier) VALUES (?, ?, ?, ?)`,
        [
          messageReaction.messageId,
          messageReaction.reaction,
          messageReaction.userId || null,
          1,
        ]
      );
    }
  }
}

export async function fetchMessages(
  database: SQLiteDatabase,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number },
  limit: number,
  lastMessageDate?: string,
  previous: boolean = true
): Promise<Message[]> {
  const aesKey = await getDatabasKey();

  if (!aesKey) throw new Error("AES key not found");

  lastMessageDate = lastMessageDate || new Date().toISOString();

  const comparisonOperator = previous ? "<" : ">";
  const order = previous ? "DESC" : "ASC";

  const messageRows: Row[] = await database.getAllAsync(
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
    WHERE m.targetId = ? AND m.chatType = ? AND m.date ${comparisonOperator} ? 
    ORDER BY m.date ${order} 
    LIMIT ?`,
    [
      chatTargetIdTypePair.chatTargetId,
      chatTargetIdTypePair.chatType,
      lastMessageDate,
      limit,
    ]
  );

  const messageIds = messageRows.map((row) => row.id);

  const placeholders = messageIds.map(() => "?").join(",");
  const reactionRows: MessageReaction[] = await database.getAllAsync(
    `SELECT * FROM messageReactions WHERE messageId IN (${placeholders})`,
    messageIds
  );

  const reactionsByMessageId = reactionRows.reduce(
    (acc, row) => {
      if (!acc[row.messageId]) {
        acc[row.messageId] = [];
      }
      acc[row.messageId].push(row);
      return acc;
    },
    {} as Record<string, MessageReaction[]>
  );

  const messages: Message[] = messageRows.map((row) => {
    const message = rowToMessage(row, aesKey);
    message.reactions = reactionsByMessageId[row.id] || [];
    return message;
  });

  return messages;
}

export async function fetchMessageById(
  database: SQLiteDatabase,
  messageId: string | undefined | null
): Promise<Message | undefined> {
  if (!messageId) return undefined;

  const aesKey = await getDatabasKey();

  if (!aesKey) throw new Error("AES key not found");

  const row: Row | null = await database.getFirstAsync(
    `SELECT * FROM messages WHERE id = ?`,
    [messageId]
  );

  if (!row) return undefined;

  return rowToMessage(row, aesKey);
}

export async function fetchMessagesAroundId(
  database: SQLiteDatabase,
  message: Message,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number },
  limit: number
): Promise<Message[]> {
  const aesKey = await getDatabasKey();

  if (!aesKey) throw new Error("AES key not found");

  if (!message) throw new Error("Message not found");

  const resultSetBefore: Row[] = await database.getAllAsync(
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
    WHERE m.date < ? 
    ORDER BY m.date DESC 
    LIMIT ?`,
    [message.date!, 20]
  );

  const resultSetAfter: Row[] = await database.getAllAsync(
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
    WHERE m.date > ? 
    ORDER BY m.date ASC 
    LIMIT ?`,
    [message.date!, 20]
  );

  const rowsBefore: Message[] = resultSetBefore.map((row) =>
    rowToMessage(row, aesKey)
  );
  const rowsAfter: Message[] = resultSetAfter.map((row) =>
    rowToMessage(row, aesKey)
  );

  return [...rowsAfter.reverse(), message, ...rowsBefore];
}

export async function fetchUrisByChatTargetIdTypePair(
  database: SQLiteDatabase,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number }
): Promise<string[]> {
  const { chatTargetId, chatType } = chatTargetIdTypePair;

  const resultSet: Row[] = await database.getAllAsync(
    `SELECT m.uri 
    FROM messages m
    WHERE m.targetId = ? AND m.chatType = ?`,
    [chatTargetId, chatType]
  );

  const uris: string[] = [];

  resultSet.forEach((row) => {
    if (row.uri) {
      uris.push(row.uri);
    }
  });

  console.log(uris);
  
  return uris;
}

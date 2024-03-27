import { HubConnection } from "@microsoft/signalr";
import { ChatType, MessageDTO } from "../api/model";
import { MessageCreateDTO } from "../api/model";
import { Dispatch, SetStateAction } from "react";
import { IMessage } from "react-native-gifted-chat";
import { convertMessageDTOToIMessage } from "../database/databaseHelper";
import * as Crypto from "expo-crypto";
import {
  toBase64,
  encryptMessage,
  getAesKey,
  getNonce,
} from "../encryption/encryptionHelper";
import { SQLiteDatabase } from "expo-sqlite/build/next/SQLiteDatabase";

export async function handleReceivedMessages(
  connection: HubConnection,
  db: SQLiteDatabase,
  messages: MessageDTO[]
): Promise<void> {
  if (!db) return;

  const aesKey = await getAesKey();

  if (!aesKey) return;

  const validMessages = messages.filter(
    ({ id, chatType, senderId, date, chatId }) =>
      id &&
      chatType !== undefined &&
      senderId !== undefined &&
      date &&
      chatId !== undefined
  );

  if (validMessages.length > 0) {
    const placeholders = validMessages
      .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
      .join(", ");
    const values = validMessages.flatMap(
      ({ id, chatType, senderId, date, chatId, content, uri, mediaType }) => [
        id || null,
        senderId || null,
        content ? encryptMessage(content, aesKey) : null,
        uri || null,
        mediaType || null,
        date || null,
        chatType || null,
        chatId || null,
      ]
    );

    console.log("Inserting messages:", values);

    try {
      await db.runAsync(
        `INSERT INTO messages (id, senderId, content, uri, mediaType, date, chatType, chatId) VALUES ${placeholders}`,
        values
      );
      console.log("Insert success");
    } catch (error) {
      console.log("Insert error:", error);
    }

    const ids = validMessages.map((message) => message.id);
    try {
      await connection.invoke("AknowledgeMessageAsync", ids);
    } catch (error) {
      console.log("Error invoking AknowledgeMessageAsync:", error);
    }
  }
}

export async function sendMessage(
  connection: HubConnection | null,
  database: SQLiteDatabase | null,
  userId: number,
  chatIdTypePair: { chatId: number; chatType: ChatType },
  message: any
): Promise<MessageDTO> {
  if (!connection) {
    throw new Error("Connection is not established");
  }

  if (!database) {
    throw new Error("Database is not available");
  }

  const aesKey = await getAesKey();

  if (!aesKey) throw new Error("AES key not found");

  const id: string = Crypto.randomUUID();

  const nonce = getNonce();

  const base64String = toBase64(nonce);

  const messageCreateDTO: MessageCreateDTO = {
    id,
    content: message.text,
    chatId: chatIdTypePair.chatId,
    chatType: chatIdTypePair.chatType,
    date: new Date().toISOString(),
    uri: null,
    nonce: base64String,
  };

  try {
    await database.runAsync(
      `insert into messages (id, senderId, content, uri, mediaType, date, chatType, chatId) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        message.text ? encryptMessage(message.text, aesKey) : null,
        message.uri || null,
        message.mediaType || null,
        messageCreateDTO.date,
        chatIdTypePair.chatType,
        chatIdTypePair.chatId,
      ]
    );
    connection.invoke("SendMessageAsync", messageCreateDTO);
    return { ...messageCreateDTO, senderId: userId };
  } catch (err) {
    throw err;
  }
}

export function handleReceivedMessagesInChat(
  connection: HubConnection,
  chatIdTypePair: { chatId: number; chatType: number },
  setMessages: Dispatch<SetStateAction<IMessage[]>>
): () => void {
  const handleMessage = (messages: MessageDTO[]) => {
    var filteredMessages = messages.filter(
      (message) =>
        message.chatId === chatIdTypePair.chatId &&
        message.chatType === chatIdTypePair.chatType
    );
    setMessages((state) => [
      ...filteredMessages.map((message, index) =>
        convertMessageDTOToIMessage(message)
      ),
      ...state,
    ]);
  };

  connection.on("ReceiveMessages", handleMessage);

  return () => {
    connection.off("ReceiveMessages", handleMessage);
  };
}

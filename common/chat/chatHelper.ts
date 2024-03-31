import { HubConnection } from "@microsoft/signalr";
import { ChatType, MessageDTO } from "../api/model";
import { MessageCreateDTO } from "../api/model";
import { Dispatch, SetStateAction } from "react";
import { IMessage } from "react-native-gifted-chat";
import { convertMessageDTOToIMessage } from "../database/databaseHelper";
import * as Crypto from "expo-crypto";
import {
  toBase64,
  encryptMessageAES,
  getAesKey,
  getNonce,
  encryptMessageDFH,
  decryptMessageDFH,
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

  console.log("Received messages:", messages);

  const publicKey = "nHbJYq7nFY+4ZFFk8+HhU0NRK12RNoSrPNN0JXlNolA=";

  const validMessages = messages.filter(
    ({ id, chatType, senderId, date, targetId, nonce }) =>
      id &&
      chatType !== undefined &&
      senderId !== undefined &&
      nonce !== undefined &&
      date &&
      targetId !== undefined
  );

  if (validMessages.length > 0) {
    const placeholders = validMessages
      .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
      .join(", ");
    let values = [];
    for (const {
      id,
      chatType,
      senderId,
      date,
      targetId,
      content,
      uri,
      mediaType,
      nonce,
    } of validMessages) {
      // const decryptedContent = content
      //   ? await decryptMessageDFH(content, nonce, publicKey)
      //   : null;

      const encryptedContent = content
        ? encryptMessageAES(content, aesKey)
        : null;

      values.push(
        id || null,
        senderId || null,
        encryptedContent,
        uri || null,
        mediaType || null,
        date || null,
        chatType !== undefined ? chatType : null,
        senderId || null
      );
    }

    console.log("Inserting messages:", values);

    try {
      await db.runAsync(
        `INSERT INTO messages (id, senderId, content, uri, mediaType, date, chatType, targetId) VALUES ${placeholders}`,
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

  const publicKey = "02UO+o4Uw1SY1xg1PEY9t/X4cT+/2Rb1dtVF4TxUvhw=";

  const aesKey = await getAesKey();

  if (!aesKey) throw new Error("AES key not found");

  const id: string = Crypto.randomUUID();

  const nonce = getNonce();

  const base64String = toBase64(nonce);

  // const encryptedMessage = await encryptMessageDFH(
  //   message.text,
  //   nonce,
  //   publicKey
  // );

  const messageCreateDTO: MessageCreateDTO = {
    id,
    content: message.text,
    targetId: chatIdTypePair.chatId,
    chatType: chatIdTypePair.chatType,
    date: new Date().toISOString(),
    uri: null,
    nonce: base64String,
  };

  console.log("Sending message:", messageCreateDTO);

  try {
    await database.runAsync(
      `insert into messages (id, senderId, content, uri, mediaType, date, chatType, targetId) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        message.text ? encryptMessageAES(message.text, aesKey) : null,
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
        message.targetId === chatIdTypePair.chatId &&
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

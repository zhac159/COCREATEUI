import { HubConnection } from "@microsoft/signalr";
import { EncryptedKeyExchangeDTO, MessageDTO } from "../api/model";
import { MessageCreateDTO } from "../api/model";
import { Dispatch, SetStateAction } from "react";
import { IMessage } from "react-native-gifted-chat";
import { convertMessageDTOToIMessage } from "../database/databaseHelper";
import * as Crypto from "expo-crypto";
import {
  encryptMessageAES,
  getDatabasKey,
  decryptMessageDFH,
  getAesKeyString,
  getSymmetricAesKey,
  decryptMessageAES,
} from "../encryption/encryptionHelper";
import { SQLiteDatabase } from "expo-sqlite/build/next/SQLiteDatabase";
import * as SecureStore from "expo-secure-store";
import { ChatType, ChatTypeIdPair } from "@/components/Chats/ChatHelper";

export async function handleReceiveEncryptedKeysExchange(
  connection: HubConnection,
  encryptedKeys: EncryptedKeyExchangeDTO[]
): Promise<void> {
  console.log("Received encrypted keys:", encryptedKeys);

  encryptedKeys.forEach(async (encryptedKey) => {
    if (
      encryptedKey.encryptedSymmetricKey &&
      encryptedKey.nonce &&
      encryptedKey.publicKey &&
      encryptedKey.chatType !== undefined &&
      encryptedKey.senderId
    ) {
      const decryptedKey = await decryptMessageDFH(
        encryptedKey.encryptedSymmetricKey,
        encryptedKey.nonce,
        encryptedKey.publicKey
      );

      console.log("Decrypted key:", decryptedKey);

      const targetId = encryptedKey.groupChatId
        ? encryptedKey.groupChatId
        : encryptedKey.senderId;

      console.log("Target id:", targetId);
      console.log("Chat type:", encryptedKey.chatType);

      await SecureStore.setItemAsync(
        getAesKeyString(encryptedKey.chatType, targetId),
        decryptedKey
      );
    }
  });

  const ids = encryptedKeys.map((encryptedKeys) => encryptedKeys.id);
  await connection.invoke("AknowledgeEncryptedKeyExchangeAsync", ids);

  connection.invoke("GetMessagesAsync");
}

export async function handleReceivedMessages(
  connection: HubConnection,
  db: SQLiteDatabase,
  messages: MessageDTO[],
  setLastMessages: (
    chatTypeIdPair: ChatTypeIdPair,
    newValue: MessageDTO
  ) => void
): Promise<void> {
  if (!db) return;

  const aesKey = await getDatabasKey();

  if (!aesKey) return;

  const placeholders = messages
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?)")
    .join(", ");

  let values = [];
  for (const message of messages) {
    if (message.chatType === undefined || !message.senderId) return;

    const symmetricAesKey = await getSymmetricAesKey(
      message.chatType,
      message.senderId
    );

    if (!symmetricAesKey) {
      return;
    }

    const decryptedContent = message.content
      ? decryptMessageAES(message.content, symmetricAesKey)
      : null;

    if (!decryptedContent) return;

    setLastMessages(
      { chatTargetId: message.senderId, chatType: message.chatType },
      { ...message, content: decryptedContent }
    );

    const encryptedContent = message.content
      ? encryptMessageAES(decryptedContent, aesKey)
      : null;

    values.push(
      message.id !== undefined ? message.id : null,
      message.senderId !== undefined ? message.senderId : null,
      encryptedContent,
      message.uri !== undefined ? message.uri : null,
      message.mediaType !== undefined ? message.mediaType : null,
      message.date !== undefined ? message.date : null,
      message.chatType !== undefined ? message.chatType : null,
      message.senderId !== undefined ? message.senderId : null
    );
  }

  try {
    await db.runAsync(
      `INSERT INTO messages (id, senderId, content, uri, mediaType, date, chatType, targetId) VALUES ${placeholders}`,
      values
    );
  } catch (error) {
    console.log("Insert error:", error);
  }

  const ids = messages.map((message) => message.id);
  await connection.invoke("AknowledgeMessageAsync", ids);
}

export function handleReceivedMessagesInChat(
  connection: HubConnection,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number },
  setMessages: Dispatch<SetStateAction<IMessage[]>>
): () => void {
  const handleMessage = async (messages: MessageDTO[]) => {
    var filteredMessages = messages.filter(
      (message) =>
        message.senderId === chatTargetIdTypePair.chatTargetId &&
        message.chatType === chatTargetIdTypePair.chatType
    );

    const symmetricAesKey = await getSymmetricAesKey(
      chatTargetIdTypePair.chatType,
      chatTargetIdTypePair.chatTargetId
    );

    if (!symmetricAesKey) {
      return;
    }

    setMessages((state) => [
      ...filteredMessages.map((message, index) =>
        convertMessageDTOToIMessage({
          ...message,
          content: message.content
            ? decryptMessageAES(message.content, symmetricAesKey)
            : message.content,
        })
      ),
      ...state,
    ]);
  };

  connection.on("ReceiveMessages", handleMessage);

  return () => {
    connection.off("ReceiveMessages", handleMessage);
  };
}

export async function sendMessage(
  connection: HubConnection | null,
  database: SQLiteDatabase | null,
  userId: number,
  chatTargetIdTypePair: { chatTargetId: number; chatType: ChatType },
  message: any
): Promise<MessageDTO> {
  if (!connection) {
    throw new Error("Connection is not established");
  }
  if (!database) {
    throw new Error("Database is not available");
  }

  const symmetricAesKey = await getSymmetricAesKey(
    chatTargetIdTypePair.chatType,
    chatTargetIdTypePair.chatTargetId
  );
  if (!symmetricAesKey) throw new Error("Symmetric key not found");

  const encryptedMessage = encryptMessageAES(message.text, symmetricAesKey);

  const aesKey = await getDatabasKey();
  if (!aesKey) throw new Error("AES key not found");

  const id: string = Crypto.randomUUID();

  const messageCreateDTO: MessageCreateDTO = {
    id,
    content: encryptedMessage,
    targetId: chatTargetIdTypePair.chatTargetId,
    chatType: chatTargetIdTypePair.chatType,
    date: new Date().toISOString(),
    uri: null,
  };

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
        chatTargetIdTypePair.chatType,
        chatTargetIdTypePair.chatTargetId,
      ]
    );
    connection.invoke("SendMessageAsync", messageCreateDTO);
    return { ...messageCreateDTO, content: message.text, senderId: userId };
  } catch (err) {
    throw err;
  }
}

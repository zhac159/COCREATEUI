import { HubConnection } from "@microsoft/signalr";
import {
  EncryptedKeyExchangeDTO,
  EnquiryDTO,
  MessageDTO,
  MessageReactionCreateDTO,
  MessageReactionDTO,
  ProjectDTO,
  UserInformationDTO,
} from "../api/model";
import { MessageCreateDTO } from "../api/model";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  addReactionsToMessages,
  fetchMessageById,
  fetchMessages,
  fetchMessagesAroundId,
} from "../database/databaseHelper";
import * as Crypto from "expo-crypto";
import {
  encryptMessageAES,
  getDatabasKey,
  decryptMessageDFH,
  getAesKeyString,
  getSymmetricAesKey,
  decryptMessageAES,
} from "../encryption/encryptionHelper";
import * as SecureStore from "expo-secure-store";
import { ChatMember, ChatTypeIdPair } from "@/components/Chats/chatHelper";
import { useSetLastMessagesByTargetAndChatTypeState } from "@/components/RecoilStates/lastMessagesState";
import { downloadFile, usePrepareAndUpload } from "../media/mediaHooks";
import { EntityType } from "@/components/Account/Common/Media/EntityType";
import Message from "@/components/Common/Messages/Message";
import MessageReaction from "@/components/Common/Messages/MessageReaction";
import { SetterOrUpdater } from "recoil";
import ChatType from "./chatType";
import UserInformationAndSkill from "@/components/Common/userInformationAndSkill";
import { SQLiteDatabase } from "expo-sqlite";

export const chatFetchLimit = 20;

export async function handleReceiveEncryptedKeysExchange(
  connection: HubConnection,
  encryptedKeys: EncryptedKeyExchangeDTO[]
): Promise<void> {

  encryptedKeys.forEach(async (encryptedKey) => {
    const decryptedKey = await decryptMessageDFH(
      encryptedKey.encryptedSymmetricKey,
      encryptedKey.nonce,
      encryptedKey.publicKey
    );

    const targetId = encryptedKey.groupChatId ?? encryptedKey.senderId;

    await SecureStore.setItemAsync(
      getAesKeyString(encryptedKey.chatType, targetId),
      decryptedKey
    );
  });

  const ids = encryptedKeys.map((encryptedKeys) => encryptedKeys.id);
  
  await connection.invoke("AknowledgeEncryptedKeyExchangeAsync", ids);

  connection.invoke("GetMessagesAsync");
  connection.invoke("GetMessagesReactionsAsync");
}

export async function handleReceivedMessages(
  connection: HubConnection,
  db: SQLiteDatabase,
  messages: MessageDTO[],
  setLastMessages: (chatTypeIdPair: ChatTypeIdPair, newValue: Message) => void
): Promise<void> {
  if (!db) return;

  const aesKey = await getDatabasKey();

  if (!aesKey) return;

  const placeholders = messages
    .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)")
    .join(", ");

  let values = [];
  for (const message of messages) {
    if (message.chatType === undefined || !message.senderId) return;

    const chatTargetId = getChatId(message);

    if (!chatTargetId) return;

    const symmetricAesKey = await getSymmetricAesKey(
      message.chatType,
      chatTargetId
    );

    if (!symmetricAesKey) {
      return;
    }

    const decryptedContent = message.content
      ? decryptMessageAES(message.content, symmetricAesKey)
      : null;

    const decryptedUri = message.uri
      ? decryptMessageAES(message.uri, symmetricAesKey)
      : null;

    const repliedMessage = await fetchMessageById(db, message.replyMessageId);

    const encryptedContent =
      message.content && decryptedContent
        ? encryptMessageAES(decryptedContent, aesKey)
        : null;

    let uri: string | null = null;

    if (decryptedUri) {
      uri = await downloadFile(decryptedUri);
    }

    setLastMessages(
      { chatTargetId: chatTargetId, chatType: message.chatType },
      {
        ...message,
        content: decryptedContent,
        replyMessage: repliedMessage,
        uri,
      }
    );

    values.push(
      message.id !== undefined ? message.id : null,
      message.senderId !== undefined ? message.senderId : null,
      encryptedContent,
      uri !== undefined ? uri : null,
      message.mediaType !== undefined ? message.mediaType : null,
      message.date !== undefined ? message.date : null,
      message.chatType !== undefined ? message.chatType : null,
      chatTargetId,
      message.replyMessageId !== undefined ? message.replyMessageId : null
    );
  }

  try {
    if (values.length === 0) return;
    await db.runAsync(
      `INSERT INTO messages (id, senderId, content, uri, mediaType, date, chatType, targetId, replyMessageId) VALUES ${placeholders}`,
      values
    );
  } catch (error) {
    console.log("Insert error:", error);
  }

  const ids = messages.map((message) => message.id);
  await connection.invoke("AknowledgeMessageAsync", ids);
}

export function getChatId(message: MessageDTO): number {
  const id =
    message.chatType === ChatType.Project ? message.targetId : message.senderId;

  if (!id) throw new Error("Chat id not found");

  return id;
}

export function findUserById(
  project: ProjectDTO,
  id: number
): UserInformationDTO | null {
  if (project.projectManager?.userId === id) {
    return project.projectManager;
  }
  for (const role of project.projectRoles || []) {
    if (role.assignee?.userId === id) {
      return role.assignee;
    }
  }
  return null;
}

export function getProjectUsers(
  project: ProjectDTO
): UserInformationAndSkill[] {
  const usersInProject: UserInformationAndSkill[] = [];

  if (project.projectManager) {
    usersInProject.push({
      userInformation: project.projectManager,
    });
  }

  for (const role of project.projectRoles) {
    if (role.assignee)
      usersInProject.push({
        userInformation: role.assignee,
        skill: role.skillType,
      });
  }

  return usersInProject;
}

export function handleReceiveNewEnquiry(
  connection: HubConnection,
  updateProjectRoleEnquiries: (enquiry: EnquiryDTO) => void
): () => void {
  connection.on("ReceiveNewEnquiry", updateProjectRoleEnquiries);

  return () => {
    connection.off("ReceiveNewEnquiry  ", updateProjectRoleEnquiries);
  };
}

export function handleUpdateEnquiryShortlistStatus(
  connection: HubConnection,
  updateEnquiriyShortlist: (enquiryId: number) => void
): () => void {
  connection.on("ReceiveNewShortlist", updateEnquiriyShortlist);

  return () => {
    connection.off("ReceiveNewShortlist  ", updateEnquiriyShortlist);
  };
}

export function handleUpdateCompleteProject(
  connection: HubConnection,
  updateProject: (projectId: number) => void
): () => void {
  connection.on("ReceiveCompleteProject", updateProject);

  return () => {
    connection.off("ReceiveCompleteProject", updateProject);
  };
}

function useWebSocketConnection<T>(
  connection: HubConnection,
  identifier: string,
  onReceive: (data: T) => void
): void {
  useEffect(() => {
    connection.on(identifier, onReceive);

    return () => {
      connection.off(identifier, onReceive);
    };
  }, [connection, identifier, onReceive]);
}

export default useWebSocketConnection;

export async function sendMessage(
  connection: HubConnection,
  database: SQLiteDatabase,
  userId: number,
  chatTargetIdTypePair: { chatTargetId: number; chatType: ChatType },
  message: MessageCreateDTO,
  upload: (uris: string[]) => Promise<string[]>
): Promise<Message> {
  const symmetricAesKey = await getSymmetricAesKey(
    chatTargetIdTypePair.chatType,
    chatTargetIdTypePair.chatTargetId
  );
  if (!symmetricAesKey) throw new Error("Symmetric key not found");

  const databaseAesKey = await getDatabasKey();
  if (!databaseAesKey) throw new Error("AES key not found");

  const encryptedMessage = encryptMessageAES(
    message.content ?? "",
    symmetricAesKey
  );

  const id: string = Crypto.randomUUID();

  const url = message.uri ? await upload([message.uri]) : null;

  const encryptedUri = encryptMessageAES(url ? url[0] : "", symmetricAesKey);

  const date = new Date().toISOString();

  try {
    await database.runAsync(
      `insert into messages (id, senderId, content, uri, mediaType, date, chatType, targetId, replyMessageId) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        encryptMessageAES(message.content ?? "", databaseAesKey),
        message.uri || null,
        message.mediaType || null,
        date,
        chatTargetIdTypePair.chatType,
        chatTargetIdTypePair.chatTargetId,
        message.replyMessageId || null,
      ]
    );

    const messageCreateDTO: MessageCreateDTO = {
      id,
      content: encryptedMessage,
      targetId: chatTargetIdTypePair.chatTargetId,
      chatType: chatTargetIdTypePair.chatType,
      date: date,
      uri: url ? encryptedUri : null,
      replyMessageId: message.replyMessageId,
    };

    connection.invoke("SendMessageAsync", messageCreateDTO);

    const replyMessage = await fetchMessageById(
      database,
      messageCreateDTO.replyMessageId
    );

    return {
      ...messageCreateDTO,
      content: message.content,
      uri: message.uri,
      senderId: userId,
      replyMessage: replyMessage,
    };
  } catch (err) {
    throw err;
  }
}

export const useSendMessage = (
  connection: any,
  database: any,
  userId: number,
  chatTargetIdTypePair: any,
  setMessages: any
) => {
  const setLastMessages = useSetLastMessagesByTargetAndChatTypeState();

  const { upload, isLoading: isUploadingImages } = usePrepareAndUpload(
    EntityType.CHATS,
    () => {},
    false
  );

  return useCallback(
    (message: MessageCreateDTO) => {
      sendMessage(
        connection,
        database,
        userId,
        chatTargetIdTypePair,
        message,
        upload
      )
        .then((messageDTO) => {
          if (messageDTO.targetId && messageDTO.chatType !== undefined) {
            setLastMessages(
              {
                chatTargetId: messageDTO.targetId,
                chatType: messageDTO.chatType,
              },
              messageDTO
            );
          }
          setMessages((prev: Message[]) => [messageDTO, ...prev]);
        })
        .catch((error) => console.error("Error sending message:", error));
    },
    [
      connection,
      database,
      userId,
      chatTargetIdTypePair,
      setLastMessages,
      setMessages,
    ]
  );
};

export const useLoadMessages = (
  database: SQLiteDatabase,
  chatTargetIdTypePair: ChatTypeIdPair,
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  const loadMessages = useCallback(
    async (previous: boolean, lastMessageDate?: string) => {
      try {
        const fetchedMessages = await fetchMessages(
          database,
          chatTargetIdTypePair,
          chatFetchLimit,
          lastMessageDate,
          previous
        );
        if (previous) {
          setMessages((state) => [...state, ...fetchedMessages]);
        } else {
          setMessages((state) => [...fetchedMessages.reverse(), ...state]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [database, chatTargetIdTypePair, setMessages]
  );

  return loadMessages;
};

export const useLoadMessagesAroundMessage = (
  database: SQLiteDatabase,
  chatTargetIdTypePair: ChatTypeIdPair,
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  const loadMessagesAroundMessage = useCallback(
    async (message: Message) => {
      try {
        const fetchedMessages = await fetchMessagesAroundId(
          database,
          message,
          chatTargetIdTypePair,
          chatFetchLimit
        );

        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [database, chatTargetIdTypePair, setMessages]
  );

  return loadMessagesAroundMessage;
};

export const useAddReaction = (
  connection: HubConnection | null,
  database: SQLiteDatabase,
  userId: number,
  chatTargetIdTypePair: ChatTypeIdPair
) => {
  return useCallback(
    async (messageReaction: MessageReaction) => {
      if (!connection) {
        return;
      }
      try {
        const messageReactionCreateDTO: MessageReactionCreateDTO = {
          messageId: messageReaction.messageId,
          reaction: messageReaction.reaction,
          chatType: chatTargetIdTypePair.chatType,
          multiplier: messageReaction.multiplier,
          targetId: chatTargetIdTypePair.chatTargetId,
        };

        connection.invoke("SendMessageReactionAsync", messageReactionCreateDTO);

        messageReaction.userId = userId;

        await addReactionsToMessages(database, [messageReaction]);
      } catch (error) {
        console.error("Error adding reaction:", error);
      }
    },
    [connection, database, userId]
  );
};

export async function handleReceiveMessagesReactions(
  connection: HubConnection,
  db: SQLiteDatabase,
  messageReactions: MessageReactionDTO[],
  setNewReactionMessage: SetterOrUpdater<MessageReaction | null>
): Promise<void> {
  if (!db) return;

  setNewReactionMessage(messageReactions[0]);

  console.log("Received message reactions:", messageReactions);

  await addReactionsToMessages(db, messageReactions);

  connection.invoke("AknowledgeMessageReactionsAsync");
}

export const useGetUserIdUsernameMap = (
  users: ChatMember[]
): Record<number, string> => {
  const userIdUsernameMap = useMemo(() => {
    const map: Record<number, string> = {};

    users.forEach((user) => {
      map[user.userId] = user.username;
    });

    return map;
  }, [users]);

  return userIdUsernameMap;
};

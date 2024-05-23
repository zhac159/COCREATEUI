import { HubConnection } from "@microsoft/signalr";
import {
  EncryptedKeyExchangeDTO,
  EnquiryDTO,
  MessageDTO,
  ProjectDTO,
  UserInformationDTO,
} from "../api/model";
import { MessageCreateDTO } from "../api/model";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { IMessage } from "react-native-gifted-chat";
import {
  fetchMessages,
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
import { SQLiteDatabase } from "expo-sqlite/build/next/SQLiteDatabase";
import * as SecureStore from "expo-secure-store";
import { ChatType, ChatTypeIdPair } from "@/components/Chats/chatHelper";
import { useSetLastMessagesByTargetAndChatTypeState } from "@/components/RecoilStates/lastMessagesState";
import { downloadFile, usePrepareAndUpload } from "../media/mediaHooks";
import { EntityType } from "@/components/Account/Common/Media/EntityType";
import Message from "@/components/Common/Messages/Message";

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

    if (!decryptedContent) return;

    setLastMessages(
      { chatTargetId: chatTargetId, chatType: message.chatType },
      { ...message, content: decryptedContent }
    );

    const encryptedContent = message.content
      ? encryptMessageAES(decryptedContent, aesKey)
      : null;

    let uri: string | null = null;

    if (decryptedUri) {
      uri = await downloadFile(decryptedUri);
    }

    values.push(
      message.id !== undefined ? message.id : null,
      message.senderId !== undefined ? message.senderId : null,
      encryptedContent,
      uri !== undefined ? uri : null,
      message.mediaType !== undefined ? message.mediaType : null,
      message.date !== undefined ? message.date : null,
      message.chatType !== undefined ? message.chatType : null,
      chatTargetId,
      message.replyMessageId !== undefined ? message.replyMessageId : null,
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

export function handleReceivedMessagesInChat(
  connection: HubConnection,
  chatTargetIdTypePair: { chatTargetId: number; chatType: number },
  setMessages: Dispatch<SetStateAction<MessageDTO[]>>
): () => void {
  const handleMessage = async (messages: MessageDTO[]) => {
    var filteredMessages = messages.filter(
      (message) =>
        getChatId(message) === chatTargetIdTypePair.chatTargetId &&
        message.chatType === chatTargetIdTypePair.chatType
    );

    const symmetricAesKey = await getSymmetricAesKey(
      chatTargetIdTypePair.chatType,
      chatTargetIdTypePair.chatTargetId
    );

    if (!symmetricAesKey) {
      return;
    }

    var decryptedMessages = filteredMessages.map((message) => {
      const decryptedContent = message.content
        ? decryptMessageAES(message.content, symmetricAesKey)
        : null;

      const decryptedUri = message.uri
        ? decryptMessageAES(message.uri, symmetricAesKey)
        : null;

      return {
        ...message,
        content: decryptedContent,
        uri: decryptedUri,
      };
    });

    setMessages((state) => [
      ...decryptedMessages,
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
  message: MessageCreateDTO,
  upload: (uris: string[]) => Promise<string[]>
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

  const encryptedMessage = encryptMessageAES(
    message.content ?? "",
    symmetricAesKey
  );

  const aesKey = await getDatabasKey();
  if (!aesKey) throw new Error("AES key not found");

  const id: string = Crypto.randomUUID();

  const url = message.uri ? await upload([message.uri]) : null;

  const encryptedUri = encryptMessageAES(url ? url[0] : "", symmetricAesKey);

  const messageCreateDTO: MessageCreateDTO = {
    id,
    content: encryptedMessage,
    targetId: chatTargetIdTypePair.chatTargetId,
    chatType: chatTargetIdTypePair.chatType,
    date: new Date().toISOString(),
    uri: url ? encryptedUri : null,
    replyMessageId: message.replyMessageId,
  };

  try {
    await database.runAsync(
      `insert into messages (id, senderId, content, uri, mediaType, date, chatType, targetId) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        encryptMessageAES(message.content ?? "", aesKey),
        message.uri || null,
        message.mediaType || null,
        messageCreateDTO.date!,
        chatTargetIdTypePair.chatType,
        chatTargetIdTypePair.chatTargetId,
      ]
    );
    connection.invoke("SendMessageAsync", messageCreateDTO);
    return {
      ...messageCreateDTO,
      content: message.content,
      uri: message.uri,
      senderId: userId,
    };
  } catch (err) {
    throw err;
  }
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

export function getProjectUsers(project: ProjectDTO): UserInformationDTO[] {
  console.log("Project:", project);

  const usersInProject: UserInformationDTO[] = [];

  if (project.projectManager) {
    usersInProject.push(project.projectManager);
  }

  for (const role of project.projectRoles || []) {
    if (role.assignee) usersInProject.push(role.assignee);
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

export const useSendMessage = (
  connection: any,
  database: any,
  userId: number,
  chatTargetIdTypePair: any,
  setMessages: any
) => {
  const setLastMessages = useSetLastMessagesByTargetAndChatTypeState();
  const upload = usePrepareAndUpload(EntityType.CHATS, false);

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
              { ...messageDTO }
            );
          }
          // setMessages((state: MessageDTO[]) => [
          //   messageDTO,
          //   ...state,
          // ]);
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

export const useChatMessages = (
  database: any,
  chatTargetIdTypePair: any,
  setMessages: Dispatch<SetStateAction<Message[]>>
) => {
  const loadMessages = useCallback(
    async (lastMessageDate?: string) => {
      if (!database) return;
      try {
        const fetchedMessages = await fetchMessages(
          database,
          chatTargetIdTypePair,
          lastMessageDate
        );

        if (fetchedMessages.length === 0) return;

        setMessages((state) => [...state, ...fetchedMessages]);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    },
    [database, chatTargetIdTypePair, setMessages]
  );

  return loadMessages;
};
export function convertIMessageToCreateMessageDTO(
  message: IMessage,
  uri?: string
): MessageCreateDTO {
  const messageCreateDTO: MessageCreateDTO = {
    content: message.text,
    uri: uri ?? null,
  };
  return messageCreateDTO;
}

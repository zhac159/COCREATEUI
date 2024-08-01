import { useUserIdValue } from "@/components/RecoilStates/profileState";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import "react-native-get-random-values";
import { ConnectionContext } from "./_layout";

import {
  useAddReaction,
  useGetUserIdUsernameMap,
  useLoadMessages,
  useLoadMessagesAroundMessage,
  useSendMessage,
} from "@/common/chat/chatHelper";
import { useGetMedia } from "@/components/Account/Common/Media/mediaHelper";
import SendImagePortal from "@/components/Chats/SendImagePortal";
import { useCurrentChatDataValue } from "@/components/RecoilStates/currentChatDataState";
import Chat from "@/components/Chats/Chat";
import Message from "@/components/Common/Messages/Message";
import { useLastMessagesByChatIdValue } from "@/components/RecoilStates/lastMessagesState";
import MessageReaction from "@/components/Common/Messages/MessageReaction";
import BackgroundColourAnimation from "@/components/Account/BackgroundColourAnimation";
import { useNewMessageReactionValue } from "@/components/RecoilStates/newMessageReactionState";
import { createAndExchangeKeysIfThereIsNoKey } from "@/common/encryption/encryptionHelper";
import ChatType from "@/common/chat/chatType";
import { useSQLiteContext } from "expo-sqlite";
import ChatHeader from "@/components/Chats/ChatHeader/CheatHeader";

export default function EnquiryChat() {
  const database = useSQLiteContext();
  const connection = useContext(ConnectionContext)!;
  const currentChatDataValue = useCurrentChatDataValue();

  const showNames = useMemo(() => {
    return currentChatDataValue.chatType === ChatType.Project;
  }, [currentChatDataValue]);

  const momoizedBackgroundColourAnimation = useMemo(() => {
    return <BackgroundColourAnimation />;
  }, []);


  const targetId = useMemo(() => {
    if (currentChatDataValue.chatType === ChatType.Project && currentChatDataValue.projectId) {
      return currentChatDataValue.projectId;
    }
    return currentChatDataValue.chatMembers[0].userId;
  }, [currentChatDataValue.chatMembers]);

  const userId = useUserIdValue();

  const userIdUsernameMap = useGetUserIdUsernameMap(
    currentChatDataValue.chatMembers
  );

  console.log("userIdUsernameMap", userIdUsernameMap);

  const [messages, setMessages] = useState<Message[]>([]);
  const [uris, setUris] = useState<string[]>([]);
  const getMedia = useGetMedia(setUris, true);

  const lastMessages = useLastMessagesByChatIdValue(
    currentChatDataValue.chatId
  );
  
  const newMessageReaction = useNewMessageReactionValue();

  useEffect(() => {
    (async () => {
      console.log("currentChatDataValue", currentChatDataValue);
      if (
        !connection ||
        !currentChatDataValue.chatMembers[0] ||
        !currentChatDataValue.chatMembers[0].publicKey
      )
        return;

      await createAndExchangeKeysIfThereIsNoKey(
        currentChatDataValue.chatMembers[0].publicKey,
        currentChatDataValue.chatMembers[0].userId,
        currentChatDataValue.chatId,
        connection
      );
    })();
  }, []);

  const handleSendMessage = useSendMessage(
    connection,
    database,
    userId,
    targetId,
    currentChatDataValue.chatType,
    currentChatDataValue.chatId,
    setMessages
  );

  const loadMessages = useLoadMessages(
    database,
    currentChatDataValue.chatId,
    setMessages
  );

  const loadMessagesAroundMessage = useLoadMessagesAroundMessage(
    database,
    currentChatDataValue.chatId,
    setMessages
  );

  const addReaction = useAddReaction(
    connection,
    database,
    userId,
    currentChatDataValue.chatType,
    targetId,
    currentChatDataValue.chatId
  );

  const handleAddReaction = useCallback(
    async (messageReaction: MessageReaction) => {
      await addReaction(messageReaction);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageReaction.messageId
            ? {
                ...message,
                reactions: [
                  ...(message.reactions || []),
                  { ...messageReaction, user: userId },
                ],
              }
            : message
        )
      );
    },
    [addReaction, setMessages]
  );

  const handleLoadMessages = useCallback(async () => {
    const lastmessage = messages[messages.length - 1];

    if (!lastmessage) return;
    const lastMessageDate = new Date(lastmessage.date!);

    lastMessageDate.setMilliseconds(lastMessageDate.getMilliseconds() - 10);

    await loadMessages(true, lastMessageDate.toISOString());
  }, [loadMessages, messages]);

  const handleLoadLaterMessages = useCallback(async () => {
    const firstMessage = messages[0];
    if (!firstMessage) return;

    let firstMessageDate = new Date(firstMessage.date!);

    firstMessageDate.setMilliseconds(firstMessageDate.getMilliseconds() + 10);

    await loadMessages(false, firstMessageDate.toISOString());
  }, [loadMessages, messages]);

  const handleLoadMessagesAroundMessage = useCallback(
    async (message: Message) => {
      await loadMessagesAroundMessage(message);
    },
    [loadMessagesAroundMessage]
  );

  useEffect(() => {
    const fetchMessages = async () => {
      await loadMessages(true);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (lastMessages[0] === undefined) return;
    if (messages.length === 0) {
      return;
    } else if (
      lastMessages[0].senderId !== userId &&
      lastMessages[0].id !== messages[0].id
    ) {
      setMessages([lastMessages[0], ...messages]);
    }
  }, [lastMessages]);


  
  useEffect(() => {
    if (newMessageReaction === null) return;

    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === newMessageReaction.messageId
          ? {
              ...message,
              reactions: [
                ...(message.reactions || []),
                { ...newMessageReaction, user: userId },
              ],
            }
          : message
      )
    );
  }, [newMessageReaction]);

  if (connection === null) return null;

  if (uris.length > 0) {
    return (
      <SendImagePortal
        handleSendMessage={handleSendMessage}
        setUris={setUris}
        uri={uris[0]}
      />
    );
  }

  return (
    <>
      {momoizedBackgroundColourAnimation}
      <Chat
        userIdUsernameMap={userIdUsernameMap}
        messages={messages}
        handleLoadMessages={handleLoadMessages}
        handleLoadLaterMessages={handleLoadLaterMessages}
        handleLoadMessagesAroundMessage={handleLoadMessagesAroundMessage}
        handleSendMessage={handleSendMessage}
        handleAddReaction={handleAddReaction}
        getMedia={getMedia}
        userId={userId}
        showNames={showNames}
      />
      <ChatHeader
        currentChatData={currentChatDataValue}
        connection={connection}
        userId={userId}
      />
    </>
  );
}
